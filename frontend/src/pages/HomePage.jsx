import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ADTSelector from '../components/ADTSelector/ADTSelector';
import ADTReferencePanel from '../components/ADTReferencePanel/ADTReferencePanel';

const languages = [
  { key: 'java', label: 'Java', icon: '☕' },
  { key: 'python', label: 'Python', icon: '🐍' },
];

const resourcesByLanguage = [
  {
    key: 'java',
    title: 'Java Resources',
    accent: '☕',
    description: 'Core language references and collections-focused guides for practicing Java ADTs.',
    links: [
      {
        label: 'Java 17 API Docs',
        url: 'https://docs.oracle.com/en/java/javase/17/docs/api/',
      },
      {
        label: 'Collections Framework Overview',
        url: 'https://docs.oracle.com/javase/tutorial/collections/intro/index.html',
      },
      {
        label: 'Java Tutorials',
        url: 'https://docs.oracle.com/javase/tutorial/',
      },
      {
        label: 'Data Structures in Java',
        url: 'https://www.geeksforgeeks.org/data-structures-in-java/',
      },
    ],
  },
  {
    key: 'python',
    title: 'Python Resources',
    accent: '🐍',
    description: 'Official Python documentation and practical references for working with built-in data structures.',
    links: [
      {
        label: 'Python Tutorial',
        url: 'https://docs.python.org/3/tutorial/',
      },
      {
        label: 'Data Structures',
        url: 'https://docs.python.org/3/tutorial/datastructures.html',
      },
      {
        label: 'Built-in Types',
        url: 'https://docs.python.org/3/library/stdtypes.html',
      },
      {
        label: 'collections Module',
        url: 'https://docs.python.org/3/library/collections.html',
      },
    ],
  },
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

      <section className="mb-10">
        <div className="flex flex-col gap-2 text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">
            Resources
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-surface-100">
            Learn the APIs behind the practice
          </h2>
          <p className="text-surface-400 max-w-3xl mx-auto">
            Jump to common references for Java and Python, including the built-in collections and
            data structure docs that pair well with the visualizers below.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {resourcesByLanguage.map((resourceGroup) => (
            <div
              key={resourceGroup.key}
              className="rounded-2xl border border-surface-700 bg-surface-800/70 p-6 shadow-lg shadow-surface-950/20"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">
                      {resourceGroup.accent}
                    </span>
                    <h3 className="text-xl font-semibold text-surface-100">
                      {resourceGroup.title}
                    </h3>
                  </div>
                  <p className="text-sm text-surface-400">{resourceGroup.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {resourceGroup.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-surface-700 bg-surface-900/60 px-4 py-3 text-left transition-colors hover:border-primary-500/60 hover:bg-surface-900"
                  >
                    <span className="text-sm font-medium text-surface-200 group-hover:text-white">
                      {link.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-surface-500 transition-colors group-hover:text-primary-400" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
