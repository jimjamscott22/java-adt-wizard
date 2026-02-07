import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye } from 'lucide-react';

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Stack is empty. Push an item to get started!');
  const [peekIndex, setPeekIndex] = useState(-1);

  const push = () => {
    if (!inputValue.trim()) return;
    setStack((prev) => [...prev, inputValue.trim()]);
    setMessage(`Pushed "${inputValue.trim()}" onto the stack.`);
    setInputValue('');
    setPeekIndex(-1);
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage('Cannot pop — stack is empty!');
      return;
    }
    const removed = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`Popped "${removed}" from the stack.`);
    setPeekIndex(-1);
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage('Cannot peek — stack is empty!');
      return;
    }
    const top = stack[stack.length - 1];
    setPeekIndex(stack.length - 1);
    setMessage(`Top element is "${top}".`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') push();
  };

  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-5">
      <h3 className="text-lg font-semibold text-surface-100 mb-4">Stack Visualizer</h3>

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
          onClick={push}
          className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Push
        </button>
        <button
          onClick={pop}
          className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Minus className="w-4 h-4" /> Pop
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

      {/* Stack visualization */}
      <div className="flex flex-col-reverse items-center gap-1 min-h-[200px]">
        <div className="w-48 h-2 bg-surface-600 rounded-b-lg" />
        <AnimatePresence>
          {stack.map((item, index) => {
            const isTop = index === stack.length - 1;
            const isPeeked = index === peekIndex;
            return (
              <motion.div
                key={`${index}-${item}`}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-48 px-4 py-2 rounded-lg text-center text-sm font-mono font-medium border transition-colors ${
                  isPeeked
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : isTop
                      ? 'bg-primary-500/20 border-primary-500 text-primary-300'
                      : 'bg-surface-700 border-surface-600 text-surface-200'
                }`}
              >
                {item}
                {isTop && (
                  <span className="ml-2 text-xs opacity-60">← top</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {stack.length === 0 && (
          <p className="text-surface-500 text-sm italic">Empty stack</p>
        )}
      </div>
    </div>
  );
}
