export default function ComparisonTable({ columns, rows, caption }) {
  return (
    <div className="overflow-x-auto">
      {caption && (
        <h4 className="text-sm font-semibold text-surface-200 mb-3">{caption}</h4>
      )}
      <table className="w-full text-sm border border-surface-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-surface-900">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-surface-300 uppercase tracking-wider border-b border-surface-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? 'bg-surface-800' : 'bg-surface-800/50'
              } hover:bg-surface-750 transition-colors`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-2.5 border-b border-surface-700/50 ${
                    col.mono ? 'font-mono text-primary-400' : 'text-surface-300'
                  } ${col.key === columns[0].key ? 'font-medium text-surface-200' : ''}`}
                >
                  {typeof row[col.key] === 'boolean'
                    ? row[col.key]
                      ? 'Yes'
                      : 'No'
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
