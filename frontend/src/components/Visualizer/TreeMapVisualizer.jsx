import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, ChevronsUp, ChevronsDown } from 'lucide-react';

function insertSorted(entries, key, value) {
  const newEntries = entries.filter((e) => e.key !== key);
  const idx = newEntries.findIndex((e) => e.key > key);
  const entry = { key, value };
  if (idx === -1) {
    newEntries.push(entry);
  } else {
    newEntries.splice(idx, 0, entry);
  }
  return newEntries;
}

export default function TreeMapVisualizer() {
  const [entries, setEntries] = useState([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState('TreeMap is empty. Put a key-value pair to get started!');
  const [highlightKey, setHighlightKey] = useState(null);
  const [highlightType, setHighlightType] = useState(null); // 'put', 'found', 'missing', 'first', 'last'

  const clearHighlights = () => {
    setHighlightKey(null);
    setHighlightType(null);
  };

  const put = () => {
    const k = keyInput.trim();
    const v = valueInput.trim();
    if (!k || !v) return;
    const existing = entries.find((e) => e.key === k);
    setEntries((prev) => insertSorted(prev, k, v));
    if (existing) {
      setMessage(`Updated key "${k}": "${existing.value}" → "${v}" (sorted position maintained).`);
    } else {
      setMessage(`put("${k}", "${v}") — inserted in sorted order.`);
    }
    setHighlightKey(k);
    setHighlightType('put');
    setKeyInput('');
    setValueInput('');
  };

  const get = () => {
    const k = keyInput.trim();
    if (!k) return;
    const entry = entries.find((e) => e.key === k);
    setHighlightKey(k);
    if (entry) {
      setMessage(`get("${k}") → "${entry.value}" (O(log n) lookup).`);
      setHighlightType('found');
    } else {
      setMessage(`get("${k}") → null (key not found).`);
      setHighlightType('missing');
    }
  };

  const remove = () => {
    const k = keyInput.trim();
    if (!k) return;
    const entry = entries.find((e) => e.key === k);
    if (!entry) {
      setMessage(`Cannot remove "${k}" — key not found.`);
      setHighlightKey(k);
      setHighlightType('missing');
      return;
    }
    setEntries((prev) => prev.filter((e) => e.key !== k));
    setMessage(`Removed "${k}" → "${entry.value}".`);
    setHighlightKey(null);
    setHighlightType(null);
  };

  const firstKey = () => {
    if (entries.length === 0) {
      setMessage('Cannot get firstKey — TreeMap is empty!');
      return;
    }
    const first = entries[0];
    setMessage(`firstKey() → "${first.key}" (smallest key).`);
    setHighlightKey(first.key);
    setHighlightType('first');
  };

  const lastKey = () => {
    if (entries.length === 0) {
      setMessage('Cannot get lastKey — TreeMap is empty!');
      return;
    }
    const last = entries[entries.length - 1];
    setMessage(`lastKey() → "${last.key}" (largest key).`);
    setHighlightKey(last.key);
    setHighlightType('last');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') put();
  };

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">TreeMap Visualizer</h3>
        <span className="text-xs text-surface-500 font-mono">
          {entries.length} entr{entries.length !== 1 ? 'ies' : 'y'} (sorted)
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => { setKeyInput(e.target.value); clearHighlights(); }}
          onKeyDown={handleKeyDown}
          placeholder="Key"
          className="w-28 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Value"
          className="w-28 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={put}
          className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Put
        </button>
        <button
          onClick={get}
          className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Search className="w-4 h-4" /> Get
        </button>
        <button
          onClick={remove}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4" /> Remove
        </button>
        <button
          onClick={firstKey}
          className="flex items-center gap-1 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <ChevronsUp className="w-4 h-4" /> firstKey
        </button>
        <button
          onClick={lastKey}
          className="flex items-center gap-1 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <ChevronsDown className="w-4 h-4" /> lastKey
        </button>
      </div>

      {/* Status message */}
      <p className="text-sm text-surface-400 mb-4">{message}</p>

      {/* Sorted entries visualization */}
      <div className="min-h-[200px]">
        {entries.length === 0 ? (
          <p className="text-surface-500 text-sm italic text-center py-8">Empty TreeMap</p>
        ) : (
          <div className="space-y-1">
            {/* Sort-order header */}
            <div className="flex items-center gap-2 text-xs text-surface-500 mb-2 px-2">
              <span className="w-8 text-center">#</span>
              <span className="w-28">Key (sorted ↑)</span>
              <span className="flex-1">Value</span>
            </div>

            <AnimatePresence>
              {entries.map((entry, index) => {
                const isFirst = index === 0;
                const isLast = index === entries.length - 1;
                const isHighlighted = highlightKey === entry.key;

                let borderClass = 'bg-surface-700 border-surface-600 text-surface-200';
                if (isHighlighted) {
                  if (highlightType === 'found' || highlightType === 'put') {
                    borderClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                  } else if (highlightType === 'first') {
                    borderClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else if (highlightType === 'last') {
                    borderClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else if (highlightType === 'missing') {
                    borderClass = 'bg-red-500/20 border-red-500 text-red-300';
                  }
                }

                return (
                  <motion.div
                    key={entry.key}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg border font-mono text-sm transition-colors ${borderClass}`}
                  >
                    <span className="w-8 text-center text-xs opacity-50">{index}</span>
                    <span className="w-28 font-semibold truncate">{entry.key}</span>
                    <span className="text-surface-400 mr-1">→</span>
                    <span className="flex-1 truncate">{entry.value}</span>
                    {isFirst && (
                      <span className="text-[10px] text-rose-400 opacity-70 ml-auto flex-shrink-0">min</span>
                    )}
                    {isLast && (
                      <span className="text-[10px] text-rose-400 opacity-70 ml-auto flex-shrink-0">max</span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Visual guide */}
      <div className="flex items-center gap-4 text-xs text-surface-500 mt-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
          <span>Found / inserted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-rose-500/20 border border-rose-500 rounded"></div>
          <span>firstKey / lastKey</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></div>
          <span>Not found</span>
        </div>
      </div>
    </div>
  );
}
