import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye } from 'lucide-react';

function heapInsert(heap, value) {
  const newHeap = [...heap, value];
  let i = newHeap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (newHeap[i] < newHeap[parent]) {
      [newHeap[i], newHeap[parent]] = [newHeap[parent], newHeap[i]];
      i = parent;
    } else {
      break;
    }
  }
  return newHeap;
}

function heapPoll(heap) {
  if (heap.length === 0) return [[], undefined];
  if (heap.length === 1) return [[], heap[0]];
  const min = heap[0];
  const newHeap = [...heap];
  newHeap[0] = newHeap.pop();
  let i = 0;
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;
    if (left < newHeap.length && newHeap[left] < newHeap[smallest]) smallest = left;
    if (right < newHeap.length && newHeap[right] < newHeap[smallest]) smallest = right;
    if (smallest !== i) {
      [newHeap[i], newHeap[smallest]] = [newHeap[smallest], newHeap[i]];
      i = smallest;
    } else {
      break;
    }
  }
  return [newHeap, min];
}

let nodeKey = 0;

export default function PriorityQueueVisualizer() {
  const [heap, setHeap] = useState([]);
  const [keys, setKeys] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('PriorityQueue is empty. Add an element to get started!');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [highlightType, setHighlightType] = useState(null); // 'peek', 'add'

  const add = () => {
    const raw = inputValue.trim();
    if (!raw) return;
    const num = Number(raw);
    if (isNaN(num)) {
      setMessage(`"${raw}" is not a number. PriorityQueue compares by natural order.`);
      return;
    }
    setHeap((prev) => {
      const next = heapInsert(prev, num);
      return next;
    });
    setKeys((prev) => [...prev, ++nodeKey]);
    setMessage(`add(${num}) — inserted and bubbled up to maintain heap order.`);
    setHighlightIndex(0);
    setHighlightType('add');
    setInputValue('');
  };

  const poll = () => {
    if (heap.length === 0) {
      setMessage('Cannot poll — PriorityQueue is empty!');
      return;
    }
    const [newHeap, min] = heapPoll(heap);
    setHeap(newHeap);
    setKeys((prev) => prev.slice(1));
    setMessage(`poll() → ${min} (removed minimum, heap rebalanced).`);
    setHighlightIndex(-1);
    setHighlightType(null);
  };

  const peek = () => {
    if (heap.length === 0) {
      setMessage('Cannot peek — PriorityQueue is empty!');
      return;
    }
    setMessage(`peek() → ${heap[0]} (minimum element, O(1)).`);
    setHighlightIndex(0);
    setHighlightType('peek');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') add();
  };

  // Build tree layout: each node at (depth, position)
  const getDepth = (i) => Math.floor(Math.log2(i + 1));
  const maxDepth = heap.length > 0 ? getDepth(heap.length - 1) : 0;

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">PriorityQueue Visualizer</h3>
        <span className="text-xs text-surface-500 font-mono">
          {heap.length} element{heap.length !== 1 ? 's' : ''} (min-heap)
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter number..."
          className="w-36 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={add}
          className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
        <button
          onClick={poll}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4" /> Poll
        </button>
        <button
          onClick={peek}
          className="flex items-center gap-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" /> Peek
        </button>
      </div>

      {/* Status message */}
      <p className="text-sm text-surface-400 mb-4">{message}</p>

      {/* Heap tree visualization */}
      <div className="min-h-[220px] overflow-x-auto pb-2">
        {heap.length === 0 ? (
          <p className="text-surface-500 text-sm italic text-center py-8">Empty PriorityQueue</p>
        ) : (
          <div className="flex flex-col items-center gap-1">
            {Array.from({ length: maxDepth + 1 }, (_, depth) => {
              const startIdx = Math.pow(2, depth) - 1;
              const endIdx = Math.min(Math.pow(2, depth + 1) - 1, heap.length);
              const nodesAtDepth = [];
              for (let i = startIdx; i < endIdx; i++) {
                nodesAtDepth.push(i);
              }

              return (
                <div key={depth} className="flex items-center justify-center w-full" style={{ gap: `${Math.max(8, 80 >> depth)}px` }}>
                  {nodesAtDepth.map((i) => {
                    const isRoot = i === 0;
                    const isHighlighted = i === highlightIndex;
                    const parentIdx = Math.floor((i - 1) / 2);
                    const leftChild = 2 * i + 1 < heap.length ? heap[2 * i + 1] : null;
                    const rightChild = 2 * i + 2 < heap.length ? heap[2 * i + 2] : null;

                    return (
                      <motion.div
                        key={keys[i] ?? i}
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="flex flex-col items-center"
                      >
                        {/* Connection lines hint */}
                        {!isRoot && (
                          <div className="w-px h-2 bg-surface-600 mb-0.5" />
                        )}
                        <div
                          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 font-mono text-sm font-semibold transition-colors ${
                            isHighlighted
                              ? highlightType === 'peek'
                                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                : 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                              : isRoot
                                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                                : 'bg-surface-700 border-surface-600 text-surface-200'
                          }`}
                        >
                          <span>{heap[i]}</span>
                          {isRoot && (
                            <span className="text-[9px] opacity-50">min</span>
                          )}
                        </div>
                        {/* Child connectors */}
                        {(leftChild !== null || rightChild !== null) && (
                          <div className="w-px h-2 bg-surface-600 mt-0.5" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Array representation */}
      {heap.length > 0 && (
        <div className="mt-3 pt-3 border-t border-surface-700">
          <p className="text-xs text-surface-500 mb-2">Underlying array (heap order):</p>
          <div className="flex gap-1 overflow-x-auto pb-1">
            <AnimatePresence>
              {heap.map((val, i) => (
                <motion.div
                  key={keys[i] ?? i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`min-w-[40px] px-2 py-1 rounded text-center text-xs font-mono border transition-colors ${
                    i === highlightIndex
                      ? highlightType === 'peek'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : i === 0
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                        : 'bg-surface-700 border-surface-600 text-surface-300'
                  }`}
                >
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Visual guide */}
      <div className="flex items-center gap-4 text-xs text-surface-500 mt-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-cyan-500/20 border border-cyan-500 rounded-full"></div>
          <span>Min (root)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-amber-500/20 border border-amber-500 rounded-full"></div>
          <span>Peek</span>
        </div>
      </div>
    </div>
  );
}
