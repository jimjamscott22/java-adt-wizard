import { motion } from 'framer-motion';
import ConceptCard from '../components/Learn/ConceptCard';
import ComparisonTable from '../components/Learn/ComparisonTable';
import {
  searchAlgorithms,
  traversalConcepts,
  sortingAlgorithms,
  sortingComparison,
} from '../data/algorithmsData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const sortingColumns = [
  { key: 'name', label: 'Algorithm' },
  { key: 'best', label: 'Best', mono: true },
  { key: 'average', label: 'Average', mono: true },
  { key: 'worst', label: 'Worst', mono: true },
  { key: 'space', label: 'Space', mono: true },
  { key: 'stable', label: 'Stable' },
];

export default function AlgorithmsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-3">
          Algorithms & <span className="text-primary-400">Problem Solving</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl leading-relaxed">
          Searching, sorting, traversal, and divide-and-conquer strategies.
          Each algorithm includes pseudocode and a Java implementation.
        </p>
      </div>

      {/* Traversal & Strategy */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Traversal & Strategy
        </h2>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {traversalConcepts.map((concept) => (
            <motion.div key={concept.id} variants={item}>
              <ConceptCard concept={concept} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Search Algorithms */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Search Algorithms
        </h2>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {searchAlgorithms.map((concept) => (
            <motion.div key={concept.id} variants={item}>
              <ConceptCard concept={concept} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sorting Algorithms */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Sorting Algorithms
        </h2>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sortingAlgorithms.map((concept) => (
            <motion.div key={concept.id} variants={item}>
              <ConceptCard concept={concept} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="text-xl font-bold text-surface-100 mb-4">
          Sorting Comparison
        </h2>
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <ComparisonTable columns={sortingColumns} rows={sortingComparison} />
        </div>
      </section>
    </div>
  );
}
