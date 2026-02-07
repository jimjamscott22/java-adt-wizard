import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { executeCode } from '../../utils/api';

export default function ChallengePanel({ challenge }) {
  const [code, setCode] = useState(challenge?.starterCode || '');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setResult(null);
    try {
      const res = await executeCode(code, challenge?.id);
      setResult(res);
    } catch (err) {
      setResult({ success: false, output: '', error: err.message, allTestsPassed: false, executionTimeMs: 0 });
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setCode(challenge?.starterCode || '');
    setResult(null);
  };

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-64 text-surface-400">
        Select a challenge to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Challenge description */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-surface-100">{challenge.title}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            challenge.difficulty === 'EASY' ? 'bg-emerald-500/20 text-emerald-400' :
            challenge.difficulty === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {challenge.difficulty}
          </span>
        </div>
        <p className="text-surface-300 text-sm leading-relaxed">{challenge.description}</p>
      </div>

      {/* Code editor */}
      <CodeEditor value={code} onChange={(val) => setCode(val || '')} />

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          {running ? 'Running...' : 'Run Code'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-surface-700 hover:bg-surface-600 text-surface-200 text-sm font-medium rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Result output */}
      {result && (
        <div className={`rounded-xl border p-4 ${
          result.allTestsPassed
            ? 'border-emerald-500/50 bg-emerald-500/10'
            : result.error
              ? 'border-red-500/50 bg-red-500/10'
              : 'border-surface-600 bg-surface-800'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {result.allTestsPassed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : result.error ? (
              <XCircle className="w-5 h-5 text-red-400" />
            ) : null}
            <span className={`text-sm font-medium ${
              result.allTestsPassed ? 'text-emerald-400' : result.error ? 'text-red-400' : 'text-surface-200'
            }`}>
              {result.allTestsPassed ? 'All tests passed!' : result.error ? 'Error' : 'Output'}
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs text-surface-400">
              <Clock className="w-3 h-3" />
              {result.executionTimeMs}ms
            </span>
          </div>
          {result.output && (
            <pre className="text-sm font-mono text-surface-200 bg-surface-900 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
              {result.output}
            </pre>
          )}
          {result.error && (
            <pre className="text-sm font-mono text-red-300 bg-surface-900 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap mt-2">
              {result.error}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
