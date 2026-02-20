"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "@/components/admin/ui/table/table";

interface Post {
  id: string | number;
  title: string;
  imageUrl?: string;
  category?: { id: number; title: string };
  tags?: { id: number; title: string }[];
  commentCount: number;
  status?: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function loadPosts(pageNumber = 1, searchText = "") {
    setLoading(true);

    const res = await fetch(
      `/api/admin/posts?page=${pageNumber}&limit=10&search=${searchText}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    setPosts(data.posts);
    setPage(data.page);
    setPages(data.pages);

    setLoading(false);
  }

  useEffect(() => {
    loadPosts(1);
  }, []);

  async function deletePost(id: string | number) {
    if (!confirm("آیا مطمئن هستید؟")) return;

    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadPosts(page, search);
  }

  async function deleteMany(ids: (string | number)[]) {
    if (!confirm("حذف گروهی انجام شود؟")) return;

    await Promise.all(
      ids.map((id) =>
        fetch(`/api/admin/posts/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
      )
    );

    loadPosts(page, search);
  }

  return (
    <div className="text-gray-600 p-4 shadow-lg rounded bg-white ">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-500">لیست پست‌ها</h1>

        <Link
          href="/admin/posts/new"
          className="bg-green-700 text-white px-4 flex items-center rounded"
        >
          پست جدید
        </Link>
      </div>

      {/* جستجو (سمت سرور) */}
      <input
        type="text"
        placeholder="جستجو..."
        className="border-gray-500 border p-2 rounded mb-4 text-gray-800 w-full"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          loadPosts(1, value);
        }}
      />

      <Table<Post>
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
            key: "category",
            label: "دسته",
            render: (row) => row.category?.title || "-",
          },
          {
            key: "tags",
            label: "تگ‌ها",
            render: (row) =>
              row.tags?.length
                ? row.tags.map((t) => t.title).join("، ")
                : "-",
          },
          {
            key: "commentCount",
            label: "کامنت‌ها",
            sortable: true,
            render: (row) => (
              <span className="text-blue-600">{row.commentCount}</span>
            ),
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
              <div className="flex flex-col gap-1 items-center">
                <Link
                  href={`/admin/posts/edit/${row.id}`}
                  className="text-green-700 flex gap-1 items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                  ویرایش
                </Link>

                <button
                  onClick={() => deletePost(row.id)}
                  className="text-red-500 flex gap-1 items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                   حذف
                </button>
              </div>
            ),
          },
        ]}
        data={posts}
        loading={loading}
        searchable={false} // چون جستجو را خودت سمت سرور انجام می‌دهی
        pagination={false} // چون صفحه‌بندی سمت سرور است
        selectable
        exportCsv
        bulkActions={[
          {
            label: "حذف گروهی",
            action: deleteMany,
          },
        ]}
      />

      {/* صفحه‌بندی سمت سرور */}
      <div className="flex justify-center mt-6 gap-4 text-black">
        <button
          disabled={page <= 1}
          onClick={() => loadPosts(page - 1, search)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          قبلی
        </button>

        <span className="px-4 py-2">
          صفحه {page} از {pages}
        </span>

        <button
          disabled={page >= pages}
          onClick={() => loadPosts(page + 1, search)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}