import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Search } from 'lucide-react';

let nodeId = 0;

export default function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [indexInput, setIndexInput] = useState('');
  const [message, setMessage] = useState('LinkedList is empty. Add a node to get started!');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [highlightType, setHighlightType] = useState(null); // 'head', 'tail', 'found', 'traverse'

  const addFirst = () => {
    const val = inputValue.trim();
    if (!val) return;
    setList((prev) => [{ id: ++nodeId, value: val }, ...prev]);
    setMessage(`addFirst("${val}") — inserted at head.`);
    setHighlightIndex(0);
    setHighlightType('head');
    setInputValue('');
  };

  const addLast = () => {
    const val = inputValue.trim();
    if (!val) return;
    setList((prev) => [...prev, { id: ++nodeId, value: val }]);
    setMessage(`addLast("${val}") — inserted at tail.`);
    setHighlightIndex(list.length);
    setHighlightType('tail');
    setInputValue('');
  };

  const removeFirst = () => {
    if (list.length === 0) {
      setMessage('Cannot removeFirst — list is empty!');
      return;
    }
    const removed = list[0].value;
    setList((prev) => prev.slice(1));
    setMessage(`removeFirst() → "${removed}" removed from head.`);
    setHighlightIndex(-1);
    setHighlightType(null);
  };

  const getByIndex = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx)) {
      setMessage('Enter a valid index number.');
      return;
    }
    if (idx < 0 || idx >= list.length) {
      setMessage(`get(${idx}) — IndexOutOfBoundsException! Valid range: 0–${list.length - 1}.`);
      setHighlightIndex(-1);
      setHighlightType(null);
      return;
    }
    setMessage(`get(${idx}) → "${list[idx].value}" (traversed ${idx + 1} node${idx > 0 ? 's' : ''}).`);
    setHighlightIndex(idx);
    setHighlightType('found');
    setIndexInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addLast();
  };

  const handleIndexKeyDown = (e) => {
    if (e.key === 'Enter') getByIndex();
  };

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">LinkedList Visualizer</h3>
        <span className="text-xs text-surface-500 font-mono">
          {list.length} node{list.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter value..."
          className="w-36 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={addFirst}
          className="flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> addFirst
        </button>
        <button
          onClick={addLast}
          className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> addLast
        </button>
        <button
          onClick={removeFirst}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4" /> removeFirst
        </button>
      </div>

      {/* Get by index */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          onKeyDown={handleIndexKeyDown}
          placeholder="Index"
          min="0"
          className="w-20 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={getByIndex}
          className="flex items-center gap-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Search className="w-4 h-4" /> get(index)
        </button>
      </div>

      {/* Status message */}
      <p className="text-sm text-surface-400 mb-4">{message}</p>

      {/* LinkedList visualization */}
      <div className="flex items-center gap-0 overflow-x-auto pb-2 min-h-[120px]">
        <AnimatePresence mode="popLayout">
          {list.map((node, index) => {
            const isHead = index === 0;
            const isTail = index === list.length - 1;
            const isHighlighted = index === highlightIndex;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-center"
              >
                {/* Node */}
                <div
                  className={`flex flex-col items-center min-w-[80px] px-3 py-2 rounded-lg border font-mono text-sm transition-colors ${
                    isHighlighted
                      ? highlightType === 'found'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : highlightType === 'head'
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                          : 'bg-primary-500/20 border-primary-500 text-primary-300'
                      : isHead
                        ? 'bg-purple-500/10 border-purple-500/50 text-purple-300'
                        : isTail
                          ? 'bg-primary-500/10 border-primary-500/50 text-primary-300'
                          : 'bg-surface-700 border-surface-600 text-surface-200'
                  }`}
                >
                  <span className="font-medium">{node.value}</span>
                  <span className="text-[10px] opacity-50 mt-0.5">
                    {isHead && isTail ? 'head/tail' : isHead ? 'head' : isTail ? 'tail' : `[${index}]`}
                  </span>
                </div>

                {/* Arrow to next node */}
                {!isTail && (
                  <ArrowRight className="w-5 h-5 text-surface-500 mx-1 flex-shrink-0" />
                )}

                {/* null pointer after tail */}
                {isTail && (
                  <span className="text-surface-600 text-xs font-mono ml-2 flex-shrink-0">→ null</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {list.length === 0 && (
          <p className="text-surface-500 text-sm italic mx-auto">Empty list — head → null</p>
        )}
      </div>

      {/* Visual guide */}
      <div className="flex items-center gap-4 text-xs text-surface-500 mt-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500/20 border border-purple-500 rounded"></div>
          <span>Head</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary-500/20 border border-primary-500 rounded"></div>
          <span>Tail</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-amber-500/20 border border-amber-500 rounded"></div>
          <span>Found (get)</span>
        </div>
      </div>
    </div>
  );
}
