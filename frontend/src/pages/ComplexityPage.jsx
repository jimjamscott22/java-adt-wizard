import { motion } from 'framer-motion';
import CodeBlock from '../components/Learn/CodeBlock';
import ComparisonTable from '../components/Learn/ComparisonTable';
import {
  complexityClasses,
  caseAnalysis,
  operationsCheatSheet,
} from '../data/complexityData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const cheatSheetColumns = [
  { key: 'structure', label: 'Structure' },
  { key: 'access', label: 'Access', mono: true },
  { key: 'search', label: 'Search', mono: true },
  { key: 'insert', label: 'Insert', mono: true },
  { key: 'delete', label: 'Delete', mono: true },
];

export default function ComplexityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-3">
          Complexity <span className="text-primary-400">Analysis</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl leading-relaxed">
          Big O notation, complexity classes, and how to analyze the efficiency
          of algorithms and data structure operations.
        </p>
      </div>

      {/* Big O Explanation */}
      <section className="mb-10">
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-surface-100 mb-3">
            What is Big O?
          </h2>
          <p className="text-surface-300 leading-relaxed">
            Big O notation describes the <strong className="text-surface-100">upper bound</strong> of
            an algorithm's growth rate as input size increases. It answers:
            "How does the time (or space) scale when we give the algorithm more data?"
            We drop constants and lower-order terms — <span className="font-mono text-primary-400">O(3n + 5)</span> simplifies
            to <span className="font-mono text-primary-400">O(n)</span>.
          </p>
        </div>
      </section>

      {/* Case Analysis */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          {caseAnalysis.title}
        </h2>
        <p className="text-surface-400 text-sm mb-4">{caseAnalysis.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {caseAnalysis.cases.map((c) => (
            <div
              key={c.name}
              className="bg-surface-800 border border-surface-700 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-lg text-primary-400">
                  {c.symbol}
                </span>
                <h3 className="text-sm font-semibold text-surface-100">
                  {c.name}
                </h3>
              </div>
              <p className="text-surface-400 text-sm leading-relaxed mb-2">
                {c.description}
              </p>
              <p className="text-xs text-surface-500 italic">{c.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Complexity Classes */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Complexity Classes
        </h2>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {complexityClasses.map((cls) => {
            const Icon = cls.icon;
            return (
              <motion.div
                key={cls.id}
                variants={item}
                className="bg-surface-800 border border-surface-700 rounded-xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cls.color} flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-bold text-primary-400">
                        {cls.notation}
                      </span>
                      <h3 className="text-lg font-semibold text-surface-100">
                        {cls.name}
                      </h3>
                    </div>
                    <p className="text-surface-400 text-sm mt-1">
                      {cls.description}
                    </p>
                    <p className="text-xs text-surface-500 mt-1 italic">
                      {cls.growthDescription}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-surface-300 uppercase tracking-wider mb-2">
                      Common Examples
                    </h4>
                    <ul className="space-y-1">
                      {cls.examples.map((ex, i) => (
                        <li
                          key={i}
                          className="text-sm text-surface-400 flex items-start gap-2"
                        >
                          <span className="text-primary-400 mt-0.5 shrink-0">•</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CodeBlock code={cls.javaExample} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Operations Cheat Sheet */}
      <section>
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Operations Cheat Sheet
        </h2>
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <ComparisonTable columns={cheatSheetColumns} rows={operationsCheatSheet} />
          <p className="text-xs text-surface-500 mt-3">
            * LinkedList insert/delete are O(1) only when you already have a reference to the node.
            Finding the node is O(n).
          </p>
        </div>
      </section>
    </div>
  );
}
