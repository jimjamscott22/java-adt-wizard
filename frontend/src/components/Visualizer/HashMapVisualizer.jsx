import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, CheckCircle } from 'lucide-react';

const NUM_BUCKETS = 8;

function hashCode(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % NUM_BUCKETS;
}

export default function HashMapVisualizer() {
  const [buckets, setBuckets] = useState(() => Array.from({ length: NUM_BUCKETS }, () => []));
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState('HashMap is empty. Put a key-value pair to get started!');
  const [highlightBucket, setHighlightBucket] = useState(-1);
  const [highlightKey, setHighlightKey] = useState(null);
  const [highlightType, setHighlightType] = useState(null); // 'found', 'missing', 'put', 'remove'

  const clearHighlights = () => {
    setHighlightBucket(-1);
    setHighlightKey(null);
    setHighlightType(null);
  };

  const put = () => {
    const k = keyInput.trim();
    const v = valueInput.trim();
    if (!k || !v) return;
    const bucketIndex = hashCode(k);
    setBuckets((prev) => {
      const newBuckets = prev.map((b) => [...b]);
      const existing = newBuckets[bucketIndex].findIndex((e) => e.key === k);
      if (existing !== -1) {
        const oldVal = newBuckets[bucketIndex][existing].value;
        newBuckets[bucketIndex][existing] = { key: k, value: v };
        setMessage(`Updated key "${k}": "${oldVal}" → "${v}" in bucket [${bucketIndex}].`);
      } else {
        newBuckets[bucketIndex].push({ key: k, value: v });
        const chainLen = newBuckets[bucketIndex].length;
        const collision = chainLen > 1 ? ` (collision — chain length: ${chainLen})` : '';
        setMessage(`Put "${k}" → "${v}" into bucket [${bucketIndex}].${collision}`);
      }
      return newBuckets;
    });
    setHighlightBucket(bucketIndex);
    setHighlightKey(k);
    setHighlightType('put');
    setKeyInput('');
    setValueInput('');
  };

  const get = () => {
    const k = keyInput.trim();
    if (!k) return;
    const bucketIndex = hashCode(k);
    const entry = buckets[bucketIndex].find((e) => e.key === k);
    setHighlightBucket(bucketIndex);
    setHighlightKey(k);
    if (entry) {
      setMessage(`get("${k}") → "${entry.value}" (found in bucket [${bucketIndex}]).`);
      setHighlightType('found');
    } else {
      setMessage(`get("${k}") → null (key not found in bucket [${bucketIndex}]).`);
      setHighlightType('missing');
    }
  };

  const remove = () => {
    const k = keyInput.trim();
    if (!k) return;
    const bucketIndex = hashCode(k);
    const entry = buckets[bucketIndex].find((e) => e.key === k);
    if (!entry) {
      setMessage(`Cannot remove "${k}" — key not found.`);
      setHighlightBucket(bucketIndex);
      setHighlightKey(k);
      setHighlightType('missing');
      return;
    }
    setBuckets((prev) => {
      const newBuckets = prev.map((b) => [...b]);
      newBuckets[bucketIndex] = newBuckets[bucketIndex].filter((e) => e.key !== k);
      return newBuckets;
    });
    setMessage(`Removed "${k}" → "${entry.value}" from bucket [${bucketIndex}].`);
    setHighlightBucket(bucketIndex);
    setHighlightKey(null);
    setHighlightType('remove');
  };

  const containsKey = () => {
    const k = keyInput.trim();
    if (!k) return;
    const bucketIndex = hashCode(k);
    const found = buckets[bucketIndex].some((e) => e.key === k);
    setHighlightBucket(bucketIndex);
    setHighlightKey(k);
    if (found) {
      setMessage(`containsKey("${k}") → true (bucket [${bucketIndex}]).`);
      setHighlightType('found');
    } else {
      setMessage(`containsKey("${k}") → false (bucket [${bucketIndex}]).`);
      setHighlightType('missing');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') put();
  };

  const totalEntries = buckets.reduce((sum, b) => sum + b.length, 0);

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">HashMap Visualizer</h3>
        <span className="text-xs text-surface-500 font-mono">
          {totalEntries} entries / {NUM_BUCKETS} buckets
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
          onClick={containsKey}
          className="flex items-center gap-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <CheckCircle className="w-4 h-4" /> Contains
        </button>
      </div>

      {/* Status message */}
      <p className="text-sm text-surface-400 mb-4">{message}</p>

      {/* Bucket diagram */}
      <div className="flex gap-2 overflow-x-auto pb-2 min-h-[200px] items-start">
        {buckets.map((bucket, bIndex) => {
          const isBucketHighlighted = bIndex === highlightBucket;
          return (
            <div key={bIndex} className="flex flex-col items-center gap-1 min-w-[100px]">
              {/* Bucket index header */}
              <div
                className={`w-full text-center text-xs font-mono px-2 py-1 rounded-t-lg border transition-colors ${
                  isBucketHighlighted
                    ? highlightType === 'missing'
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : highlightType === 'remove'
                        ? 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-primary-500/20 border-primary-500 text-primary-300'
                    : 'bg-surface-700 border-surface-600 text-surface-400'
                }`}
              >
                [{bIndex}]
              </div>

              {/* Bucket entries (chain) */}
              <div className="flex flex-col gap-1 w-full">
                <AnimatePresence>
                  {bucket.map((entry) => {
                    const isEntryHighlighted = isBucketHighlighted && highlightKey === entry.key;
                    return (
                      <motion.div
                        key={entry.key}
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`px-2 py-2 rounded-lg text-xs font-mono border transition-colors ${
                          isEntryHighlighted
                            ? highlightType === 'found' || highlightType === 'put'
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-surface-700 border-surface-600 text-surface-200'
                        }`}
                      >
                        <div className="font-semibold truncate">{entry.key}</div>
                        <div className="text-surface-400 truncate">→ {entry.value}</div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {bucket.length === 0 && (
                  <div className="text-surface-600 text-xs text-center italic py-2">
                    empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual guide */}
      <div className="flex items-center gap-4 text-xs text-surface-500 mt-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary-500/20 border border-primary-500 rounded"></div>
          <span>Active bucket</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
          <span>Found / inserted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></div>
          <span>Not found / removed</span>
        </div>
      </div>
    </div>
  );
}
