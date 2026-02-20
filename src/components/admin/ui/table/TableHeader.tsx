import { Column } from "./types";

type Props<T extends { id: string | number }> = {
  columns: Column<T>[];
  selectable: boolean;
  sortKey: string | null;
  sortDir: "asc" | "desc";
  setSortKey: (key: string | null) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  data: T[];
  selected: (string | number)[];
  setSelected: (ids: (string | number)[]) => void;
};

export default function TableHeader<T extends { id: string | number }>({
  columns,
  selectable,
  sortKey,
  sortDir,
  setSortKey,
  setSortDir,
  data,
  selected,
  setSelected,
}: Props<T>) {
  function toggleSort(col: Column<T>) {
    if (!col.sortable || typeof col.key !== "string") return;

    if (sortKey === col.key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  }

  function toggleSelectAll() {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((d) => d.id));
    }
  }

  return (
    <thead className="bg-gray-100">
      <tr>
        {selectable && (
          <th className="border p-2">
            <input
              type="checkbox"
              checked={selected.length === data.length && data.length > 0}
              onChange={toggleSelectAll}
            />
          </th>
        )}

        {columns.map((col) => (
          <th
            key={String(col.key)}
            className="border p-2 bg-gray-100 cursor-pointer select-none"
            onClick={() => toggleSort(col)}
          >
            {col.label}
            {col.sortable && sortKey === col.key && (
              <span className="ml-1">{sortDir === "asc" ? "▲" : "▼"}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}