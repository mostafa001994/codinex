"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "@/components/admin/ui/table/table";

interface Portfolio {
  id: number;
  title: string;
  imageUrl?: string;
  categoryId?: number;
  status?: string;
}

export default function PortfolioListPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function loadItems(pageNumber = 1, searchText = "") {
    setLoading(true);

    const res = await fetch(
      `/api/admin/portfolio?page=${pageNumber}&limit=10&search=${searchText}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    setItems(data.items);
    setPage(data.page);
    setPages(data.pages);

    setLoading(false);
  }

  useEffect(() => {
    loadItems(1);
  }, []);

  async function deleteItem(id: number) {
    if (!confirm("آیا مطمئن هستید؟")) return;

    await fetch(`/api/admin/portfolio/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadItems(page, search);
  }
async function deleteMany(ids: (string | number)[]) {
  if (!confirm("حذف گروهی انجام شود؟")) return;

  const numericIds = ids.map((id) => Number(id));

  await Promise.all(
    numericIds.map((id) =>
      fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
    )
  );

  loadItems(page, search);
}

  return (
    <div className="text-gray-600 p-4 shadow-lg rounded bg-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-500">لیست نمونه‌کارها</h1>

        <Link
          href="/admin/portfolio/create"
          className="bg-blue-700 text-white px-4 flex items-center rounded"
        >
          نمونه‌کار جدید
        </Link>
      </div>

      {/* جستجو */}
      <input
        type="text"
        placeholder="جستجو..."
        className="border-gray-500 border p-2 rounded mb-4 text-gray-800 w-full"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          loadItems(1, value);
        }}
      />

      <Table<Portfolio>
        columns={[
          {
            key: "imageUrl",
            label: "تصویر",
            render: (row) => (
              <img
                src={row.imageUrl || "/no-image.png"}
                className="w-16 h-16 object-cover rounded border"
              />
            ),
          },
          { key: "title", label: "عنوان", sortable: true },
          {
            key: "categoryId",
            label: "دسته",
            render: (row) => row.categoryId || "-",
          },
          {
            key: "status",
            label: "وضعیت",
            render: (row) =>
              row.status === "draft" ? (
                <span className="text-orange-600">پیش‌نویس</span>
              ) : (
                <span className="text-green-600">منتشر شده</span>
              ),
          },
          {
            key: "actions",
            label: "عملیات",
            render: (row) => (
              <div className="flex flex-col gap-1 items-center text-sm">
                <Link
                  href={`/admin/portfolio/edit/${row.id}`}
                  className="text-green-700 flex gap-1 items-center"
                >
                  <svg className="w-5 h-5">
                    <use href="#edit" />
                  </svg>
                  ویرایش
                </Link>

                <button
                  onClick={() => deleteItem(row.id)}
                  className="text-red-500 flex gap-1 items-center"
                >
                                    <svg className="w-5 h-5">
                    <use href="#delete" />
                  </svg>
                   حذف
                </button>
              </div>
            ),
          },
        ]}
        data={items}
        loading={loading}
        searchable={false}
        pagination={false} // صفحه‌بندی سمت سرور
        selectable
        exportCsv
        bulkActions={[
          {
            label: "حذف گروهی",
            action: deleteMany,
          },
        ]}
      />

      {/* صفحه‌بندی */}
      <div className="flex justify-center mt-6 gap-4 text-black">
        <button
          disabled={page <= 1}
          onClick={() => loadItems(page - 1, search)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          قبلی
        </button>

        <span className="px-4 py-2">
          صفحه {page} از {pages}
        </span>

        <button
          disabled={page >= pages}
          onClick={() => loadItems(page + 1, search)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}