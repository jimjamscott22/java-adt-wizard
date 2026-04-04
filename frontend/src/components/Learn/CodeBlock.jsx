import { highlightCode } from './syntaxHighlight';

const LABEL_LANGUAGE_MAP = {
  'java example': 'java',
  'python example': 'python',
  pseudocode: 'pseudocode',
};

function inferLanguage(label, language) {
  if (language) {
    return language;
  }

  if (!label) {
    return 'java';
  }

  return LABEL_LANGUAGE_MAP[label.toLowerCase()] || 'java';
}

export default function CodeBlock({ code, label, language }) {
  const resolvedLanguage = inferLanguage(label, language);

  return (
    <div>
      {label && (
        <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="bg-surface-950 border border-surface-700 rounded-lg p-4 mt-1 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed whitespace-pre">
          <code>{highlightCode(code, resolvedLanguage)}</code>
        </pre>
      </div>
    </div>
  );
}
