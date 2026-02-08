import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye } from 'lucide-react';

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Queue is empty. Enqueue an item to get started!');
  const [peekIndex, setPeekIndex] = useState(-1);

  const enqueue = () => {
    if (!inputValue.trim()) return;
    setQueue((prev) => [...prev, inputValue.trim()]);
    setMessage(`Enqueued "${inputValue.trim()}" to the queue.`);
    setInputValue('');
    setPeekIndex(-1);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Cannot dequeue — queue is empty!');
      return;
    }
    const removed = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`Dequeued "${removed}" from the queue.`);
    setPeekIndex(-1);
  };

  const peek = () => {
    if (queue.length === 0) {
      setMessage('Cannot peek — queue is empty!');
      return;
    }
    const front = queue[0];
    setPeekIndex(0);
    setMessage(`Front element is "${front}".`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') enqueue();
  };

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <h3 className="text-lg font-semibold text-surface-100 mb-4">Queue Visualizer</h3>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter value..."
          className="flex-1 px-3 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-100 text-sm placeholder-surface-500 focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={enqueue}
          className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Enqueue
        </button>
        <button
          onClick={dequeue}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4" /> Dequeue
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

      {/* Queue visualization - horizontal FIFO layout */}
      <div className="flex flex-col items-start gap-4 min-h-[200px]">
        {/* Labels */}
        <div className="flex gap-2 text-xs text-surface-500 w-full">
          <div className="w-24 text-center">← Front</div>
          <div className="flex-1 text-center">Queue</div>
          <div className="w-24 text-center">Rear →</div>
        </div>

        {/* Queue items */}
        <div className="flex items-center gap-2 w-full overflow-x-auto pb-2">
          <AnimatePresence mode="popLayout">
            {queue.map((item, index) => {
              const isFront = index === 0;
              const isRear = index === queue.length - 1;
              const isPeeked = index === peekIndex;
              return (
                <motion.div
                  key={`${index}-${item}`}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`min-w-[120px] px-4 py-3 rounded-lg text-center text-sm font-mono font-medium border transition-colors ${
                    isPeeked
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : isFront
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : isRear
                          ? 'bg-primary-500/20 border-primary-500 text-primary-300'
                          : 'bg-surface-700 border-surface-600 text-surface-200'
                  }`}
                >
                  <div>{item}</div>
                  {isFront && (
                    <div className="text-xs opacity-60 mt-1">front</div>
                  )}
                  {isRear && (
                    <div className="text-xs opacity-60 mt-1">rear</div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {queue.length === 0 && (
            <p className="text-surface-500 text-sm italic mx-auto">Empty queue</p>
          )}
        </div>

        {/* Visual guide */}
        <div className="flex items-center gap-2 text-xs text-surface-500 w-full">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
            <span>Front (dequeue here)</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <div className="w-3 h-3 bg-primary-500/20 border border-primary-500 rounded"></div>
            <span>Rear (enqueue here)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
