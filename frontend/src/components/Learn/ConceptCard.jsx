import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function ConceptCard({ concept }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = concept.icon;

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-surface-750 transition-colors"
      >
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${concept.color} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-surface-100">
            {concept.title}
          </h3>
          <p className="text-surface-400 text-sm mt-1 leading-relaxed">
            {concept.description}
          </p>
          {concept.category && (
            <span className="inline-block mt-2 text-xs font-mono px-2 py-0.5 rounded bg-surface-700 text-surface-300">
              {concept.category}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-surface-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4 border-t border-surface-700 pt-4">
              {/* Complexity badges (for algorithms) */}
              {concept.complexity && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(concept.complexity).map(([key, val]) => (
                    <span
                      key={key}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-900 border border-surface-700 text-surface-300"
                    >
                      <span className="text-surface-500 mr-1">{key}:</span>
                      {val}
                    </span>
                  ))}
                </div>
              )}

              {/* Key points */}
              {concept.keyPoints && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-200 mb-2">
                    Key Points
                  </h4>
                  <ul className="space-y-1">
                    {concept.keyPoints.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm text-surface-400 flex items-start gap-2"
                      >
                        <span className="text-primary-400 mt-1 shrink-0">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pseudocode */}
              {concept.pseudocode && (
                <CodeBlock code={concept.pseudocode} label="Pseudocode" />
              )}

              {/* Java Example */}
              {concept.javaExample && (
                <CodeBlock code={concept.javaExample} label="Java Example" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
