import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, MessageSquare } from 'lucide-react';
import Visualizer from '../components/Visualizer/Visualizer';
import ChallengePanel from '../components/ChallengePanel/ChallengePanel';
import ADTReferencePanel from '../components/ADTReferencePanel/ADTReferencePanel';
import ChatPanel from '../components/ChatPanel/ChatPanel';
import { fetchChallenges } from '../utils/api';
import javaAdtData from '../data/javaAdtData';
import pythonAdtData from '../data/pythonAdtData';

const dataByLang = {
  java: javaAdtData,
  python: pythonAdtData,
};

export default function PracticePage() {
  const { adtType, lang } = useParams();
  const [challenges, setChallenges] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const adtData = dataByLang[lang] || javaAdtData;
  const adtInfo = adtData.find((a) => a.type === adtType);

  useEffect(() => {
    if (lang === 'python') {
      // Python track: no backend challenges yet, show free-code editor
      setChallenges([{
        id: `python-${adtType}`,
        title: 'Free Code',
        description: `Write Python code to practice using ${adtInfo?.name || adtType}. Your code runs in the browser via Pyodide.`,
        difficulty: 'EASY',
        starterCode: adtInfo?.pythonExample || '# Write your code here\n',
      }]);
      setActiveIndex(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetchChallenges(adtType)
      .then((data) => {
        setChallenges(data);
        setActiveIndex(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adtType, lang, adtInfo?.name, adtInfo?.pythonExample]);

  const activeChallenge = challenges[activeIndex] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="flex items-center gap-1 text-surface-400 hover:text-surface-200 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h2 className="text-2xl font-bold text-surface-100">
          {adtInfo?.name || adtType}
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-md bg-surface-800 border border-surface-700 text-surface-300">
          {lang === 'python' ? '🐍 Python' : '☕ Java'}
        </span>
        <button
          onClick={() => setReferenceOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-surface-300 bg-surface-800 border border-surface-700 hover:border-primary-500/50 hover:text-primary-400 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Reference
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-surface-300 bg-surface-800 border border-surface-700 hover:border-primary-500/50 hover:text-primary-400 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </button>
      </div>

      {/* Challenge tabs */}
      {challenges.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {challenges.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                i === activeIndex
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </div>
      )}

      {/* Loading / Error states */}
      {loading && (
        <div className="text-center py-12 text-surface-400">Loading challenges...</div>
      )}
      {error && (
        <div className="text-center py-12 text-red-400">Error: {error}</div>
      )}

      {/* Two-column layout */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Visualizer adtType={adtType} />
          <ChallengePanel key={activeChallenge?.id} challenge={activeChallenge} lang={lang} />
        </div>
      )}

      {/* Reference Panel */}
      <ADTReferencePanel
        lang={lang}
        adtType={adtType}
        isOpen={referenceOpen}
        onClose={() => setReferenceOpen(false)}
      />

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={`Practicing ${adtType} in ${lang?.toUpperCase() ?? 'Java'}`}
      />
    </div>
  );
}
