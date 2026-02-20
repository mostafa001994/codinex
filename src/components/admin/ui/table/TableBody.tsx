import { Column } from "./types";

type Props<T extends { id: string | number }> = {
  columns: Column<T>[];
  data: T[];
  selectable: boolean;
  selected: (string | number)[];
  setSelected: (ids: (string | number)[]) => void;
  loading?: boolean;
};

export default function TableBody<T extends { id: string | number }>({
  columns,
  data,
  selectable,
  selected,
  setSelected,
  loading = false,
}: Props<T>) {
  function toggleSelect(id: string | number) {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  if (loading) {
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i}>
            {selectable && (
              <td className="border border-gray-400 p-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className="border border-gray-400 p-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            className="border p-4 text-center text-gray-500"
            colSpan={columns.length + (selectable ? 1 : 0)}
          >
            موردی یافت نشد
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {selectable && (
            <td className="border p-2">
              <input
                type="checkbox"
                checked={selected.includes(row.id)}
                onChange={() => toggleSelect(row.id)}
              />
            </td>
          )}

          {columns.map((col) => (
            <td key={String(col.key)} className="border border-gray-400 p-2">
              {col.render ? col.render(row) : (row as any)[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}