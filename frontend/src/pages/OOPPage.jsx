import { motion } from 'framer-motion';
import ConceptCard from '../components/Learn/ConceptCard';
import oopData from '../data/oopData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function OOPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-3">
          Object-Oriented <span className="text-primary-400">Design</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl leading-relaxed">
          Core OOP principles for modeling problems with objects, classes, and
          hierarchies. Click any card to explore the concept with Java examples.
        </p>
      </div>

      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {oopData.map((concept) => (
          <motion.div key={concept.id} variants={item}>
            <ConceptCard concept={concept} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
