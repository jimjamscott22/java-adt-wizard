import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import adtData from '../../data/adtData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ADTSelector({ onInfoClick }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {adtData.map((adt) => {
        const Icon = adt.icon;
        return (
          <motion.div key={adt.type} variants={item}>
            <Link
              to={`/practice/${adt.type}`}
              className="block group"
            >
              <div className="bg-surface-800 border border-surface-700 rounded-xl p-6 hover:border-primary-500/50 hover:bg-surface-800/80 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${adt.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {onInfoClick && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onInfoClick(adt.type);
                      }}
                      className="p-1.5 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-surface-700 transition-colors"
                      title={`${adt.name} reference`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-surface-100 group-hover:text-primary-400 transition-colors">
                  {adt.name}
                </h3>
                <p className="text-surface-400 text-sm mt-2 leading-relaxed">
                  {adt.description}
                </p>
                <span className="inline-block mt-3 text-xs font-mono px-2 py-1 rounded bg-surface-700 text-surface-300">
                  {adt.timeComplexity}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
