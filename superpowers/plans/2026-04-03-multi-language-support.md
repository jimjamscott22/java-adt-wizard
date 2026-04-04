# Multi-Language Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Python as a second language track with in-browser Pyodide execution, using a tabbed landing page for language selection and route-based language scoping.

**Architecture:** Landing page at `/` with Java/Python tab toggle above the existing ADT grid. Practice routes become `/:lang/practice/:adtType`. Python code runs client-side via Pyodide; Java execution remains server-side via JShell. Separate ADT data files per language.

**Tech Stack:** React 18, React Router 6, Pyodide (CDN), Monaco Editor, Framer Motion, Tailwind CSS

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `frontend/src/data/adtData.js` | Rename to `javaAdtData.js` | Java ADT metadata |
| `frontend/src/data/pythonAdtData.js` | Create | Python ADT metadata |
| `frontend/src/services/pyodideService.js` | Create | Pyodide loading, code execution, micropip |
| `frontend/src/App.jsx` | Modify | Add `/:lang/practice/:adtType` route, redirect old route |
| `frontend/src/pages/HomePage.jsx` | Modify | Add language tab toggle, pass lang to ADTSelector |
| `frontend/src/components/ADTSelector/ADTSelector.jsx` | Modify | Accept `lang` prop, use correct data file, update links |
| `frontend/src/pages/PracticePage.jsx` | Modify | Read `:lang` param, branch execution path |
| `frontend/src/components/CodeEditor/CodeEditor.jsx` | Modify | Accept `language` prop for Monaco |
| `frontend/src/components/ChallengePanel/ChallengePanel.jsx` | Modify | Accept `lang` prop, use Pyodide or API |
| `frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx` | Modify | Accept `lang` prop, show correct data |
| `frontend/src/components/Layout/Navbar.jsx` | Modify | Show active language on practice routes |

---

### Task 1: Rename adtData.js to javaAdtData.js

**Files:**
- Rename: `frontend/src/data/adtData.js` -> `frontend/src/data/javaAdtData.js`
- Modify: `frontend/src/pages/PracticePage.jsx:8`
- Modify: `frontend/src/components/ADTSelector/ADTSelector.jsx:4`
- Modify: `frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx:3`

- [ ] **Step 1: Rename the file**

```bash
cd /home/jimjamscozz22/Desktop/GitHub/repo/java-adt-wizard
mv frontend/src/data/adtData.js frontend/src/data/javaAdtData.js
```

- [ ] **Step 2: Update import in ADTSelector.jsx**

Change line 4 of `frontend/src/components/ADTSelector/ADTSelector.jsx`:

```jsx
// Old:
import adtData from '../../data/adtData';
// New:
import adtData from '../../data/javaAdtData';
```

- [ ] **Step 3: Update import in ADTReferencePanel.jsx**

Change line 3 of `frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx`:

```jsx
// Old:
import adtData from '../../data/adtData';
// New:
import adtData from '../../data/javaAdtData';
```

- [ ] **Step 4: Update import in PracticePage.jsx**

Change line 8 of `frontend/src/pages/PracticePage.jsx`:

```jsx
// Old:
import adtData from '../data/adtData';
// New:
import adtData from '../data/javaAdtData';
```

- [ ] **Step 5: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/data/javaAdtData.js frontend/src/data/adtData.js \
  frontend/src/pages/PracticePage.jsx \
  frontend/src/components/ADTSelector/ADTSelector.jsx \
  frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx
git commit -m "refactor: rename adtData.js to javaAdtData.js"
```

---

### Task 2: Create pythonAdtData.js

**Files:**
- Create: `frontend/src/data/pythonAdtData.js`

- [ ] **Step 1: Create the Python ADT data file**

Create `frontend/src/data/pythonAdtData.js` with the following content:

```jsx
import { Layers, ListOrdered, Hash, Link2, TreePine, ArrowUpDown } from 'lucide-react';

const pythonAdtData = [
  {
    type: 'STACK',
    name: 'Stack (list)',
    icon: Layers,
    color: 'from-blue-500 to-blue-700',
    description: 'Last-In, First-Out (LIFO) using Python\'s built-in list. append() pushes, pop() removes from the end.',
    timeComplexity: 'O(1) append/pop',
    bestFor: 'Undo/redo systems, expression evaluation, backtracking algorithms, and function call management.',
    keyOperations: [
      { method: 'append(item)', description: 'Add element to top', complexity: 'O(1)' },
      { method: 'pop()', description: 'Remove and return top element', complexity: 'O(1)' },
      { method: 'stack[-1]', description: 'View top element without removing', complexity: 'O(1)' },
      { method: 'len(stack) == 0', description: 'Check if stack is empty', complexity: 'O(1)' },
      { method: 'len(stack)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `stack = []
stack.append("A")
stack.append("B")
stack.append("C")

print(stack[-1])   # "C"
print(stack.pop())  # "C"
print(len(stack))   # 2`,
  },
  {
    type: 'QUEUE',
    name: 'Queue (deque)',
    icon: ListOrdered,
    color: 'from-emerald-500 to-emerald-700',
    description: 'First-In, First-Out (FIFO) using collections.deque. O(1) operations on both ends.',
    timeComplexity: 'O(1) append/popleft',
    bestFor: 'Task scheduling, breadth-first search, buffering, and order processing systems.',
    keyOperations: [
      { method: 'append(item)', description: 'Add element to rear', complexity: 'O(1)' },
      { method: 'popleft()', description: 'Remove and return front element', complexity: 'O(1)' },
      { method: 'queue[0]', description: 'View front element without removing', complexity: 'O(1)' },
      { method: 'len(queue) == 0', description: 'Check if queue is empty', complexity: 'O(1)' },
      { method: 'len(queue)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `from collections import deque

queue = deque()
queue.append("A")
queue.append("B")
queue.append("C")

print(queue[0])       # "A"
print(queue.popleft()) # "A"
print(len(queue))      # 2`,
  },
  {
    type: 'HASHMAP',
    name: 'Dictionary (dict)',
    icon: Hash,
    color: 'from-amber-500 to-amber-700',
    description: 'Key-value pairs with constant-time lookup. Python\'s built-in dict is hash-based.',
    timeComplexity: 'O(1) avg get/set',
    bestFor: 'Caching, counting frequencies, indexing data, and implementing lookup tables.',
    keyOperations: [
      { method: 'dict[key] = val', description: 'Insert or update key-value pair', complexity: 'O(1) avg' },
      { method: 'dict[key]', description: 'Retrieve value by key', complexity: 'O(1) avg' },
      { method: 'del dict[key]', description: 'Remove entry by key', complexity: 'O(1) avg' },
      { method: 'key in dict', description: 'Check if key exists', complexity: 'O(1) avg' },
      { method: 'len(dict)', description: 'Return number of entries', complexity: 'O(1)' },
    ],
    pythonExample: `scores = {}
scores["Alice"] = 90
scores["Bob"] = 85
scores["Carol"] = 92

print(scores["Bob"])        # 85
print("Eve" in scores)      # False
del scores["Alice"]`,
  },
  {
    type: 'LINKEDLIST',
    name: 'LinkedList (deque)',
    icon: Link2,
    color: 'from-purple-500 to-purple-700',
    description: 'Double-ended queue from collections. Efficient insert/delete at both ends.',
    timeComplexity: 'O(1) insert ends, O(n) index',
    bestFor: 'Implementing queues/deques, frequent insertions/deletions at ends, and building other data structures.',
    keyOperations: [
      { method: 'appendleft(item)', description: 'Insert at beginning', complexity: 'O(1)' },
      { method: 'append(item)', description: 'Insert at end', complexity: 'O(1)' },
      { method: 'popleft()', description: 'Remove first element', complexity: 'O(1)' },
      { method: 'deque[index]', description: 'Access element by index', complexity: 'O(n)' },
      { method: 'len(deque)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `from collections import deque

ll = deque()
ll.append("A")
ll.append("B")
ll.appendleft("Z")

print(ll[0])    # "Z"
print(ll[1])    # "A"
ll.popleft()`,
  },
  {
    type: 'TREEMAP',
    name: 'SortedDict',
    icon: TreePine,
    color: 'from-rose-500 to-rose-700',
    description: 'Sorted key-value store from the sortedcontainers library. Keys stay in sorted order.',
    timeComplexity: 'O(log n) get/set',
    bestFor: 'Maintaining sorted keys, range queries, finding nearest keys, and ordered iteration.',
    keyOperations: [
      { method: 'sd[key] = val', description: 'Insert or update entry (sorted)', complexity: 'O(log n)' },
      { method: 'sd[key]', description: 'Retrieve value by key', complexity: 'O(log n)' },
      { method: 'sd.peekitem(0)', description: 'Get smallest key-value pair', complexity: 'O(1)' },
      { method: 'sd.peekitem(-1)', description: 'Get largest key-value pair', complexity: 'O(1)' },
      { method: 'del sd[key]', description: 'Remove entry by key', complexity: 'O(log n)' },
    ],
    pythonExample: `from sortedcontainers import SortedDict

tree = SortedDict()
tree["Banana"] = 2
tree["Apple"] = 5
tree["Cherry"] = 3

print(tree.peekitem(0))   # ("Apple", 5)
print(tree.peekitem(-1))  # ("Cherry", 3)
print(tree["Banana"])      # 2`,
  },
  {
    type: 'PRIORITYQUEUE',
    name: 'PriorityQueue (heapq)',
    icon: ArrowUpDown,
    color: 'from-cyan-500 to-cyan-700',
    description: 'Min-heap via the heapq module. Smallest element is always at the front.',
    timeComplexity: 'O(log n) push/pop',
    bestFor: 'Dijkstra\'s algorithm, event-driven simulation, job scheduling, and finding top-K elements.',
    keyOperations: [
      { method: 'heappush(heap, item)', description: 'Insert element by priority', complexity: 'O(log n)' },
      { method: 'heappop(heap)', description: 'Remove smallest element', complexity: 'O(log n)' },
      { method: 'heap[0]', description: 'View smallest element', complexity: 'O(1)' },
      { method: 'len(heap) == 0', description: 'Check if heap is empty', complexity: 'O(1)' },
      { method: 'len(heap)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `import heapq

pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)

print(pq[0])             # 10 (min-heap)
print(heapq.heappop(pq)) # 10
print(pq[0])             # 20`,
  },
];

export default pythonAdtData;
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds (file is created but not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/data/pythonAdtData.js
git commit -m "feat: add Python ADT data file"
```

---

### Task 3: Create pyodideService.js

**Files:**
- Create: `frontend/src/services/pyodideService.js`

- [ ] **Step 1: Create the Pyodide service**

Create `frontend/src/services/pyodideService.js`:

```js
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
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds (file is created but not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/services/pyodideService.js
git commit -m "feat: add Pyodide execution service for Python"
```

---

### Task 4: Update routing in App.jsx

**Files:**
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Update App.jsx with new routes**

Replace the full content of `frontend/src/App.jsx`:

```jsx
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import OOPPage from './pages/OOPPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import DataStructuresPage from './pages/DataStructuresPage';
import ComplexityPage from './pages/ComplexityPage';
import StrategiesPage from './pages/StrategiesPage';

function PracticeRedirect() {
  const { adtType } = useParams();
  return <Navigate to={`/java/practice/${adtType}`} replace />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:lang/practice/:adtType" element={<PracticePage />} />
          <Route path="/practice/:adtType" element={<PracticeRedirect />} />
          <Route path="/learn/oop" element={<OOPPage />} />
          <Route path="/learn/algorithms" element={<AlgorithmsPage />} />
          <Route path="/learn/data-structures" element={<DataStructuresPage />} />
          <Route path="/learn/complexity" element={<ComplexityPage />} />
          <Route path="/learn/strategies" element={<StrategiesPage />} />
        </Routes>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/App.jsx
git commit -m "feat: add language-scoped practice routes with legacy redirect"
```

---

### Task 5: Update HomePage with language tabs

**Files:**
- Modify: `frontend/src/pages/HomePage.jsx`

- [ ] **Step 1: Rewrite HomePage.jsx with tab toggle**

Replace the full content of `frontend/src/pages/HomePage.jsx`:

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import ADTSelector from '../components/ADTSelector/ADTSelector';
import ADTReferencePanel from '../components/ADTReferencePanel/ADTReferencePanel';

const languages = [
  { key: 'java', label: 'Java', icon: '☕' },
  { key: 'python', label: 'Python', icon: '🐍' },
];

export default function HomePage() {
  const [activeLang, setActiveLang] = useState('java');
  const [referenceType, setReferenceType] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-surface-100 mb-4">
          Master <span className="text-primary-400">Data Structures</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl mx-auto">
          Practice abstract data types with interactive visualizations and coding challenges.
        </p>
      </div>

      {/* Language tab toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-surface-800 border border-surface-700 rounded-xl p-1">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => setActiveLang(lang.key)}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeLang === lang.key
                  ? 'text-white'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              {activeLang === lang.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-600 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span>{lang.icon}</span>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ADTSelector lang={activeLang} onInfoClick={(type) => setReferenceType(type)} />
      <ADTReferencePanel
        lang={activeLang}
        adtType={referenceType}
        isOpen={referenceType !== null}
        onClose={() => setReferenceType(null)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds (ADTSelector and ADTReferencePanel don't use the `lang` prop yet, but React won't error on unused props).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/HomePage.jsx
git commit -m "feat: add language tab toggle to home page"
```

---

### Task 6: Update ADTSelector to be language-aware

**Files:**
- Modify: `frontend/src/components/ADTSelector/ADTSelector.jsx`

- [ ] **Step 1: Update ADTSelector.jsx to use lang prop**

Replace the full content of `frontend/src/components/ADTSelector/ADTSelector.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import javaAdtData from '../../data/javaAdtData';
import pythonAdtData from '../../data/pythonAdtData';

const dataByLang = {
  java: javaAdtData,
  python: pythonAdtData,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ADTSelector({ lang = 'java', onInfoClick }) {
  const adtData = dataByLang[lang] || javaAdtData;

  return (
    <motion.div
      key={lang}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {adtData.map((adt) => {
        const Icon = adt.icon;
        return (
          <motion.div key={adt.type} variants={item}>
            <Link
              to={`/${lang}/practice/${adt.type}`}
              className="block group"
            >
              <div className="bg-surface-800 border border-surface-700 rounded-xl p-6 hover:border-primary-500/50 hover:bg-surface-800/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${adt.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {onInfoClick && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onInfoClick(adt.type);
                      }}
                      className="p-1.5 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-surface-700 transition-colors"
                      title={`${adt.name} reference`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-surface-100 group-hover:text-primary-400 transition-colors">
                  {adt.name}
                </h3>
                <p className="text-surface-400 text-sm mt-2 leading-relaxed">
                  {adt.description}
                </p>
                <span className="inline-block mt-3 text-xs font-mono px-2 py-1 rounded bg-surface-700 text-surface-300">
                  {adt.timeComplexity}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/ADTSelector/ADTSelector.jsx
git commit -m "feat: make ADTSelector language-aware"
```

---

### Task 7: Update ADTReferencePanel to be language-aware

**Files:**
- Modify: `frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx`

- [ ] **Step 1: Update ADTReferencePanel.jsx to use lang prop**

Replace the full content of `frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx`:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, Lightbulb } from 'lucide-react';
import javaAdtData from '../../data/javaAdtData';
import pythonAdtData from '../../data/pythonAdtData';

const dataByLang = {
  java: javaAdtData,
  python: pythonAdtData,
};

export default function ADTReferencePanel({ lang = 'java', adtType, isOpen, onClose }) {
  const adtData = dataByLang[lang] || javaAdtData;
  const adt = adtData.find((a) => a.type === adtType);

  if (!adt) return null;

  const Icon = adt.icon;
  const exampleCode = adt.javaExample || adt.pythonExample || '';
  const exampleLabel = lang === 'python' ? 'Python Example' : 'Java Example';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface-900 border-l border-surface-700 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${adt.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-100">{adt.name}</h3>
                  <span className="text-xs font-mono text-surface-400">{adt.timeComplexity}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Description */}
              <div>
                <p className="text-surface-300 text-sm leading-relaxed">{adt.description}</p>
              </div>

              {/* Best For */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-semibold text-surface-200">Best For</h4>
                </div>
                <p className="text-surface-400 text-sm leading-relaxed">{adt.bestFor}</p>
              </div>

              {/* Key Operations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary-400" />
                  <h4 className="text-sm font-semibold text-surface-200">Key Operations</h4>
                </div>
                <div className="space-y-2">
                  {adt.keyOperations.map((op) => (
                    <div
                      key={op.method}
                      className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-primary-400">{op.method}</code>
                        <span className="text-xs font-mono text-surface-500 bg-surface-900 px-2 py-0.5 rounded">
                          {op.complexity}
                        </span>
                      </div>
                      <p className="text-xs text-surface-400 mt-1">{op.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Example */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-surface-200">{exampleLabel}</h4>
                </div>
                <div className="bg-surface-950 border border-surface-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-surface-300 leading-relaxed whitespace-pre">
                    {exampleCode}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/ADTReferencePanel/ADTReferencePanel.jsx
git commit -m "feat: make ADTReferencePanel language-aware"
```

---

### Task 8: Update CodeEditor to accept a language prop

**Files:**
- Modify: `frontend/src/components/CodeEditor/CodeEditor.jsx`

- [ ] **Step 1: Update CodeEditor.jsx**

Replace the full content of `frontend/src/components/CodeEditor/CodeEditor.jsx`:

```jsx
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'java', height = '400px' }) {
  return (
    <div className="rounded-lg overflow-hidden border border-surface-700">
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          tabSize: language === 'python' ? 4 : 4,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
```

Note: Changed `defaultLanguage` to `language` so it updates reactively when switching languages.

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/CodeEditor/CodeEditor.jsx
git commit -m "feat: make CodeEditor language-configurable"
```

---

### Task 9: Update ChallengePanel for dual-language execution

**Files:**
- Modify: `frontend/src/components/ChallengePanel/ChallengePanel.jsx`

- [ ] **Step 1: Update ChallengePanel.jsx**

Replace the full content of `frontend/src/components/ChallengePanel/ChallengePanel.jsx`:

```jsx
import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { executeCode } from '../../utils/api';
import { executePython, isPyodideLoaded, loadPyodide } from '../../services/pyodideService';

export default function ChallengePanel({ challenge, lang = 'java' }) {
  const [code, setCode] = useState(challenge?.starterCode || '');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setResult(null);
    try {
      let res;
      if (lang === 'python') {
        if (!isPyodideLoaded()) {
          setPyodideLoading(true);
          await loadPyodide();
          setPyodideLoading(false);
        }
        res = await executePython(code);
      } else {
        res = await executeCode(code, challenge?.id);
      }
      setResult(res);
    } catch (err) {
      setResult({ success: false, output: '', error: err.message, allTestsPassed: false, executionTimeMs: 0 });
    } finally {
      setRunning(false);
      setPyodideLoading(false);
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
      <CodeEditor
        value={code}
        onChange={(val) => setCode(val || '')}
        language={lang === 'python' ? 'python' : 'java'}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          {running ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {pyodideLoading ? 'Loading Python...' : running ? 'Running...' : 'Run Code'}
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
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/ChallengePanel/ChallengePanel.jsx
git commit -m "feat: add Python execution support to ChallengePanel"
```

---

### Task 10: Update PracticePage to be language-aware

**Files:**
- Modify: `frontend/src/pages/PracticePage.jsx`

- [ ] **Step 1: Update PracticePage.jsx**

Replace the full content of `frontend/src/pages/PracticePage.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Visualizer from '../components/Visualizer/Visualizer';
import ChallengePanel from '../components/ChallengePanel/ChallengePanel';
import ADTReferencePanel from '../components/ADTReferencePanel/ADTReferencePanel';
import { fetchChallenges } from '../utils/api';
import javaAdtData from '../data/javaAdtData';
import pythonAdtData from '../data/pythonAdtData';

const dataByLang = {
  java: javaAdtData,
  python: pythonAdtData,
};

export default function PracticePage() {
  const { adtType, lang } = useParams();
  const [challenges, setChallenges] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referenceOpen, setReferenceOpen] = useState(false);

  const adtData = dataByLang[lang] || javaAdtData;
  const adtInfo = adtData.find((a) => a.type === adtType);

  useEffect(() => {
    if (lang === 'python') {
      // Python track: no backend challenges yet, show free-code editor
      setChallenges([{
        id: `python-${adtType}`,
        title: 'Free Code',
        description: `Write Python code to practice using ${adtInfo?.name || adtType}. Your code runs in the browser via Pyodide.`,
        difficulty: 'EASY',
        starterCode: adtInfo?.pythonExample || '# Write your code here\n',
      }]);
      setActiveIndex(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetchChallenges(adtType)
      .then((data) => {
        setChallenges(data);
        setActiveIndex(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adtType, lang, adtInfo?.name, adtInfo?.pythonExample]);

  const activeChallenge = challenges[activeIndex] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="flex items-center gap-1 text-surface-400 hover:text-surface-200 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h2 className="text-2xl font-bold text-surface-100">
          {adtInfo?.name || adtType}
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-md bg-surface-800 border border-surface-700 text-surface-300">
          {lang === 'python' ? '🐍 Python' : '☕ Java'}
        </span>
        <button
          onClick={() => setReferenceOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-surface-300 bg-surface-800 border border-surface-700 hover:border-primary-500/50 hover:text-primary-400 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Reference
        </button>
      </div>

      {/* Challenge tabs */}
      {challenges.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {challenges.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                i === activeIndex
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </div>
      )}

      {/* Loading / Error states */}
      {loading && (
        <div className="text-center py-12 text-surface-400">Loading challenges...</div>
      )}
      {error && (
        <div className="text-center py-12 text-red-400">Error: {error}</div>
      )}

      {/* Two-column layout */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Visualizer adtType={adtType} />
          <ChallengePanel key={activeChallenge?.id} challenge={activeChallenge} lang={lang} />
        </div>
      )}

      {/* Reference Panel */}
      <ADTReferencePanel
        lang={lang}
        adtType={adtType}
        isOpen={referenceOpen}
        onClose={() => setReferenceOpen(false)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/PracticePage.jsx
git commit -m "feat: make PracticePage language-aware with Python free-code mode"
```

---

### Task 11: Update Navbar to show active language

**Files:**
- Modify: `frontend/src/components/Layout/Navbar.jsx`

- [ ] **Step 1: Update Navbar.jsx**

Replace the full content of `frontend/src/components/Layout/Navbar.jsx`:

```jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, ChevronDown, Menu, X } from 'lucide-react';

const learnLinks = [
  { to: '/learn/oop', label: 'OOP Concepts' },
  { to: '/learn/algorithms', label: 'Algorithms' },
  { to: '/learn/data-structures', label: 'Data Structures' },
  { to: '/learn/complexity', label: 'Complexity Analysis' },
  { to: '/learn/strategies', label: 'Strategies & Trade-offs' },
];

function Dropdown({ label, links, currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const isActive = links.some((l) => currentPath.startsWith(l.to));

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isActive
            ? 'text-primary-400'
            : 'text-surface-300 hover:text-surface-100'
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-surface-800 border border-surface-700 rounded-lg shadow-xl py-1 z-50">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm transition-colors ${
                currentPath === link.to
                  ? 'text-primary-400 bg-surface-700/50'
                  : 'text-surface-300 hover:text-surface-100 hover:bg-surface-700/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function getActiveLang(pathname) {
  const match = pathname.match(/^\/(java|python)\//);
  return match ? match[1] : null;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const activeLang = getActiveLang(currentPath);

  return (
    <nav className="bg-surface-900 border-b border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors"
          >
            <Code2 className="w-6 h-6" />
            <span className="text-lg font-semibold">ADT Practice</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                currentPath === '/'
                  ? 'text-primary-400'
                  : 'text-surface-300 hover:text-surface-100'
              }`}
            >
              Practice
            </Link>
            <Dropdown
              label="Learn"
              links={learnLinks}
              currentPath={currentPath}
            />
            {activeLang && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface-800 border border-surface-700 text-surface-300">
                {activeLang === 'python' ? '🐍 Python' : '☕ Java'}
              </span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 text-surface-300 hover:text-surface-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-surface-700 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                currentPath === '/'
                  ? 'text-primary-400 bg-surface-800'
                  : 'text-surface-300 hover:bg-surface-800'
              }`}
            >
              Practice
            </Link>
            {activeLang && (
              <div className="px-3 py-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface-800 border border-surface-700 text-surface-300">
                  {activeLang === 'python' ? '🐍 Python' : '☕ Java'}
                </span>
              </div>
            )}
            <div className="px-3 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Learn
            </div>
            {learnLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  currentPath === link.to
                    ? 'text-primary-400 bg-surface-800'
                    : 'text-surface-300 hover:bg-surface-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
cd frontend && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Layout/Navbar.jsx
git commit -m "feat: show active language badge in Navbar"
```

---

### Task 12: Final build verification and cleanup

**Files:**
- Verify: all modified and created files

- [ ] **Step 1: Full production build**

```bash
cd /home/jimjamscozz22/Desktop/GitHub/repo/java-adt-wizard/frontend && npm run build
```

Expected: Build succeeds with no errors or warnings about missing imports.

- [ ] **Step 2: Check for stale imports of old adtData path**

```bash
cd /home/jimjamscozz22/Desktop/GitHub/repo/java-adt-wizard
grep -r "from.*adtData'" frontend/src/ --include="*.jsx" --include="*.js"
grep -r "from.*adtData\"" frontend/src/ --include="*.jsx" --include="*.js"
```

Expected: No results. All imports should reference `javaAdtData` or `pythonAdtData`.

- [ ] **Step 3: Check .superpowers is gitignored**

Check if `.superpowers/` is in `.gitignore`. If not, add it:

```bash
grep -q '.superpowers' .gitignore || echo '.superpowers/' >> .gitignore
```

- [ ] **Step 4: Commit any cleanup**

```bash
git add -A
git commit -m "chore: final cleanup for multi-language support"
```
