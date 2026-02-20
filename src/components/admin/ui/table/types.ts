export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T extends { id: string | number }> = {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  bulkActions?: {
    label: string;
    action: (selectedIds: (string | number)[]) => void;
  }[];
  loading?: boolean;
  exportCsv?: boolean;
};