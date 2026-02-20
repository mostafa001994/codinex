"use client";

import { useMemo, useState } from "react";
import { TableProps } from "./types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";
import TableBulkActions from "./TableBulkActions";
import { exportToCsv } from "./exportToCsv";
import { exportToExcel } from "./exportToExcel";

export function Table<T extends { id: string | number }>({
  columns,
  data,
  searchable = true,
  pagination = true,
  pageSize = 8,
  selectable = false,
  bulkActions = [],
  loading = false,
  exportCsv = false,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  // 👈 این خط کل بازی رو عوض می‌کنه
  const baseData = data ?? [];

  const filtered = useMemo(() => {
    if (!search) return baseData;
    return baseData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, baseData]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const x = (a as any)[sortKey];
      const y = (b as any)[sortKey];

      if (x < y) return sortDir === "asc" ? -1 : 1;
      if (x > y) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const paginated = useMemo(() => {
    if (!pagination) return sorted;
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize, pagination]);

  const totalPages = Math.ceil(sorted.length / pageSize);

  return (
    <div className="w-full">
      {searchable && <TableSearch search={search} setSearch={setSearch} />}

      {exportCsv && (
        <button
          onClick={() => exportToCsv(columns, baseData)}
          className="mb-3 bg-gray-700 text-white px-3 py-1 rounded"
        >
          خروجی CSV
        </button>
      )}

      {exportCsv && (
        <button
          onClick={() => exportToExcel(columns, baseData)}
          className="mb-3 bg-green-700 text-white px-3 py-1 rounded"
        >
          خروجی Excel
        </button>
      )}

      {selectable && bulkActions.length > 0 && (
        <TableBulkActions selected={selected} actions={bulkActions} />
      )}

      <table className="w-full border-collapse border">
        <TableHeader
          columns={columns}
          selectable={selectable}
          sortKey={sortKey}
          sortDir={sortDir}
          setSortKey={setSortKey}
          setSortDir={setSortDir}
          data={paginated}
          selected={selected}
          setSelected={setSelected}
        />

        <TableBody
          columns={columns}
          data={paginated}
          selectable={selectable}
          selected={selected}
          setSelected={setSelected}
          loading={loading}
        />
      </table>

      {pagination && (
        <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}