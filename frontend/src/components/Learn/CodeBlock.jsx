export default function CodeBlock({ code, label }) {
  return (
    <div>
      {label && (
        <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="bg-surface-950 border border-surface-700 rounded-lg p-4 mt-1 overflow-x-auto">
        <pre className="text-sm font-mono text-surface-300 leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}
