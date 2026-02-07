import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, height = '400px' }) {
  return (
    <div className="rounded-lg overflow-hidden border border-surface-700">
      <Editor
        height={height}
        defaultLanguage="java"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          tabSize: 4,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
