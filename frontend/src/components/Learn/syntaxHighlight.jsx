import React from 'react';

const COMMON_KEYWORDS = [
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'do',
  'else',
  'enum',
  'extends',
  'false',
  'finally',
  'for',
  'if',
  'implements',
  'import',
  'in',
  'interface',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'throws',
  'true',
  'try',
  'void',
  'while',
];

const JAVA_KEYWORDS = [
  ...COMMON_KEYWORDS,
  'abstract',
  'boolean',
  'byte',
  'char',
  'double',
  'final',
  'float',
  'int',
  'instanceof',
  'long',
  'record',
  'short',
];

const PYTHON_KEYWORDS = [
  ...COMMON_KEYWORDS,
  'and',
  'as',
  'assert',
  'async',
  'await',
  'def',
  'del',
  'elif',
  'except',
  'from',
  'global',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'with',
  'yield',
];

const PSEUDOCODE_KEYWORDS = [
  'else',
  'for',
  'if',
  'return',
  'then',
  'to',
  'while',
];

const TOKEN_MATCHER =
  /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b|\b[a-zA-Z_][a-zA-Z0-9_]*\b|[^\s])/g;

const LANGUAGE_CONFIG = {
  java: {
    keywords: new Set(JAVA_KEYWORDS),
    isComment: (token) => token.startsWith('//') || token.startsWith('/*'),
  },
  python: {
    keywords: new Set(PYTHON_KEYWORDS),
    isComment: (token) => token.startsWith('#'),
  },
  pseudocode: {
    keywords: new Set(PSEUDOCODE_KEYWORDS),
    isComment: (token) => token.startsWith('//') || token.startsWith('#'),
  },
};

function getTokenClass(token, language) {
  const config = LANGUAGE_CONFIG[language];

  if (!config) {
    return 'text-surface-300';
  }

  if (config.isComment(token)) {
    return 'text-emerald-300/80 italic';
  }

  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    return 'text-amber-300';
  }

  if (/^\d+(?:\.\d+)?$/.test(token)) {
    return 'text-fuchsia-300';
  }

  if (config.keywords.has(token)) {
    return 'text-sky-300 font-medium';
  }

  if (/^[A-Z][A-Za-z0-9_]*$/.test(token)) {
    return 'text-primary-400';
  }

  return 'text-surface-300';
}

function renderLine(line, language, lineIndex) {
  const parts = line.split(TOKEN_MATCHER);

  return (
    <React.Fragment key={`line-${lineIndex}`}>
      {parts.filter(Boolean).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return <React.Fragment key={`ws-${lineIndex}-${partIndex}`}>{part}</React.Fragment>;
        }

        return (
          <span
            key={`tok-${lineIndex}-${partIndex}`}
            className={getTokenClass(part, language)}
          >
            {part}
          </span>
        );
      })}
    </React.Fragment>
  );
}

export function highlightCode(code, language) {
  const lines = code.split('\n');

  return lines.map((line, index) => (
    <React.Fragment key={`hl-${index}`}>
      {renderLine(line, language, index)}
      {index < lines.length - 1 ? '\n' : null}
    </React.Fragment>
  ));
}
