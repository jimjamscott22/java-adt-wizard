import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, Lightbulb } from 'lucide-react';
import adtData from '../../data/adtData';

export default function ADTReferencePanel({ adtType, isOpen, onClose }) {
  const adt = adtData.find((a) => a.type === adtType);

  if (!adt) return null;

  const Icon = adt.icon;

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

              {/* Java Example */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-surface-200">Java Example</h4>
                </div>
                <div className="bg-surface-950 border border-surface-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-surface-300 leading-relaxed whitespace-pre">
                    {adt.javaExample}
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
