import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Visualizer from '../components/Visualizer/Visualizer';
import ChallengePanel from '../components/ChallengePanel/ChallengePanel';
import { fetchChallenges } from '../utils/api';
import adtData from '../data/adtData';

export default function PracticePage() {
  const { adtType } = useParams();
  const [challenges, setChallenges] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adtInfo = adtData.find((a) => a.type === adtType);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchChallenges(adtType)
      .then((data) => {
        setChallenges(data);
        setActiveIndex(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [adtType]);

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
      </div>

      {/* Challenge tabs */}
      {challenges.length > 0 && (
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
          <ChallengePanel key={activeChallenge?.id} challenge={activeChallenge} />
        </div>
      )}
    </div>
  );
}
