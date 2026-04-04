import { useState } from 'react';
import { motion } from 'framer-motion';
import ADTSelector from '../components/ADTSelector/ADTSelector';
import ADTReferencePanel from '../components/ADTReferencePanel/ADTReferencePanel';

const languages = [
  { key: 'java', label: 'Java', icon: '☕' },
  { key: 'python', label: 'Python', icon: '🐍' },
];

export default function HomePage() {
  const [activeLang, setActiveLang] = useState('java');
  const [referenceType, setReferenceType] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-surface-100 mb-4">
          Master <span className="text-primary-400">Data Structures</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl mx-auto">
          Practice abstract data types with interactive visualizations and coding challenges.
        </p>
      </div>

      {/* Language tab toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-surface-800 border border-surface-700 rounded-xl p-1">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => setActiveLang(lang.key)}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeLang === lang.key
                  ? 'text-white'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              {activeLang === lang.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-600 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span>{lang.icon}</span>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ADTSelector lang={activeLang} onInfoClick={(type) => setReferenceType(type)} />
      <ADTReferencePanel
        lang={activeLang}
        adtType={referenceType}
        isOpen={referenceType !== null}
        onClose={() => setReferenceType(null)}
      />
    </div>
  );
}
