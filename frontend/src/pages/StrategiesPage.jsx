import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CodeBlock from '../components/Learn/CodeBlock';
import { decisionGuide, tradeOffs, empiricalMeasurement } from '../data/strategiesData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function StrategiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-3">
          Strategies & <span className="text-primary-400">Trade-offs</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl leading-relaxed">
          How to choose the right data structure, understand time-space
          trade-offs, and measure real-world performance.
        </p>
      </div>

      {/* Decision Guide */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Choosing the Right Data Structure
        </h2>
        <motion.div
          className="space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {decisionGuide.map((entry, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-surface-800 border border-surface-700 rounded-xl px-5 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-200 mb-1">
                    "{entry.need}"
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-semibold text-emerald-400">
                      {entry.bestChoice}
                    </span>
                    <span className="text-sm text-surface-400">— {entry.why}</span>
                  </div>
                  <p className="text-xs text-surface-500">
                    <span className="text-red-400">Avoid:</span> {entry.avoid}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trade-offs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Key Trade-offs
        </h2>
        <div className="space-y-4">
          {tradeOffs.map((t, i) => (
            <div
              key={i}
              className="bg-surface-800 border border-surface-700 rounded-xl p-5"
            >
              <h3 className="text-base font-semibold text-surface-100 mb-1">
                {t.title}
              </h3>
              <p className="text-xs text-surface-500 mb-3 uppercase tracking-wider">
                {t.dimension}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-surface-900 border border-surface-700 rounded-lg px-4 py-3">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {t.title.split(' vs ')[0]}
                  </span>
                  <ul className="mt-2 space-y-1">
                    {t.arrayPros.map((p, j) => (
                      <li key={j} className="text-sm text-surface-400 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 shrink-0">+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface-900 border border-surface-700 rounded-lg px-4 py-3">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    {t.title.split(' vs ')[1]}
                  </span>
                  <ul className="mt-2 space-y-1">
                    {t.linkedPros.map((p, j) => (
                      <li key={j} className="text-sm text-surface-400 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5 shrink-0">+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-sm text-surface-300 italic">
                {t.verdict}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Empirical Measurement */}
      <section>
        <h2 className="text-xl font-bold text-surface-100 mb-2">
          {empiricalMeasurement.title}
        </h2>
        <p className="text-surface-400 text-sm mb-4">
          {empiricalMeasurement.description}
        </p>
        <div className="space-y-4">
          {empiricalMeasurement.techniques.map((tech, i) => (
            <div
              key={i}
              className="bg-surface-800 border border-surface-700 rounded-xl p-5"
            >
              <h3 className="text-base font-semibold text-surface-100 mb-1">
                {tech.name}
              </h3>
              <p className="text-sm text-surface-400 mb-3">{tech.description}</p>
              <CodeBlock code={tech.javaExample} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
