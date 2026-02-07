import ADTSelector from '../components/ADTSelector/ADTSelector';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-surface-100 mb-4">
          Master Java <span className="text-primary-400">Data Structures</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl mx-auto">
          Practice abstract data types with interactive visualizations and coding challenges.
          Write real Java code and see it execute in your browser.
        </p>
      </div>
      <ADTSelector />
    </div>
  );
}
