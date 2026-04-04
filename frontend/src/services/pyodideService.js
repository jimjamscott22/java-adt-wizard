let pyodideInstance = null;
let loadingPromise = null;

export function isPyodideLoaded() {
  return pyodideInstance !== null;
}

export async function loadPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    // Load Pyodide script from CDN
    if (!window.loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
      });
    }

    const pyodide = await window.loadPyodide();

    // Install sortedcontainers for SortedDict support
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('sortedcontainers');

    pyodideInstance = pyodide;
    return pyodide;
  })();

  return loadingPromise;
}

export async function executePython(code) {
  const startTime = performance.now();

  try {
    const pyodide = await loadPyodide();

    // Capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

    // Run user code with timeout
    const result = await Promise.race([
      (async () => {
        pyodide.runPython(code);
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        const stderr = pyodide.runPython('sys.stderr.getvalue()');
        return { stdout, stderr };
      })(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Execution timed out (5s limit)')), 5000)
      ),
    ]);

    // Reset stdout/stderr
    pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

    const elapsed = Math.round(performance.now() - startTime);

    return {
      success: true,
      output: result.stdout,
      error: result.stderr || '',
      allTestsPassed: false,
      executionTimeMs: elapsed,
    };
  } catch (err) {
    const elapsed = Math.round(performance.now() - startTime);

    // Reset stdout/stderr on error
    if (pyodideInstance) {
      try {
        pyodideInstance.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
      } catch (_) {
        // ignore cleanup errors
      }
    }

    // Extract Python error message from Pyodide's wrapper
    let errorMsg = err.message;
    if (err.type) {
      // Pyodide wraps Python exceptions with a .type property
      errorMsg = `${err.type}: ${err.message}`;
    }

    return {
      success: false,
      output: '',
      error: errorMsg,
      allTestsPassed: false,
      executionTimeMs: elapsed,
    };
  }
}
