"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "@/components/admin/ui/table/table";

export default function CategoriesList() {
  const [categories, setCategories] = useState<any[]>([]);

  async function loadCategories() {
    const res = await fetch("/api/admin/categories", { cache: "no-store" });
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function deleteCategory(id: string) {
    if (!confirm("آیا مطمئن هستید؟")) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    loadCategories();
  }

  async function deleteMany(ids: (string | number)[]) {
    if (!confirm("حذف گروهی انجام شود؟")) return;

    await Promise.all(
      ids.map((id) =>
        fetch(`/api/admin/categories/${id}`, {
          method: "DELETE",
        })
      )
    );

    loadCategories();
  }

  return (
    <div className="text-gray-500">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-600">دسته‌بندی‌ها</h1>

        <Link
          href="/admin/categories/new"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          دسته جدید
        </Link>
      </div>

      <Table
        columns={[
          { key: "name", label: "نام", sortable: true },
          { key: "slug", label: "اسلاگ", sortable: true },
          {
            key: "actions",
            label: "عملیات",
            render: (row) => (
              <div className="flex gap-2 justify-center">
                <Link
                  href={`/admin/categories/edit/${row.id}`}
                  className="text-blue-600"
                >
                  ویرایش
                </Link>

                <button
                  onClick={() => deleteCategory(row.id)}
                  className="text-red-500"
                >
                  حذف
                </button>
              </div>
            ),
          },
        ]}
        data={categories}
        searchable
        pagination
        selectable
        bulkActions={[
          {
            label: "حذف گروهی",
            action: deleteMany,
          },
        ]}

        loading={categories.length === 0}
        exportCsv

      />


    </div>
  );
}