type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export default function TablePagination({ page, setPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        قبلی
      </button>

      <span>
        صفحه {page} از {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  );
}