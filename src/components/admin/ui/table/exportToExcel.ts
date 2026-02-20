export function exportToExcel(columns: any[], data: any[]) {
  const header = columns.map((c) => c.label).join(",");
  const rows = data.map((row) =>
    columns.map((c) => JSON.stringify(row[c.key] ?? "")).join(",")
  );

  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "export.xls"; // ← Excel-compatible
  a.click();
}