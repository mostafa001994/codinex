"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [category, setCategory] = useState<any>(null);
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const c = await fetch(`/api/admin/categories/${id}`).then((r) => r.json());
      const all = await fetch(`/api/admin/categories`).then((r) => r.json());

      setCategory(c);
      setAllCategories(all);
    }
    load();
  }, []);

  const schema: FieldSchema[] = [
    // ستون اصلی
    { type: "text", name: "name", label: "عنوان", section: "main" },
    { type: "slug", name: "slug", label: "اسلاگ", from: "name", section: "main" },
    {
      type: "editor",
      name: "description",
      label: "توضیحات",
      section: "main",
    },

    // ستون کناری
    { type: "image", name: "imageUrl", label: "تصویر", section: "side" },

    {
      type: "select",
      name: "parentId",
      label: "دسته والد",
      options: allCategories,
      section: "side",
    },
  ];

  async function saveCategory(data: any) {
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
    });

    router.push("/admin/categories");
  }

  if (!category) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ویرایش دسته‌بندی</h1>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-9">
          <FormBuilder
            schema={schema.filter((f) => f.section === "main")}
            initialData={category}
            onChange={setCategory}
          />
        </div>

        <div className="col-span-3">
          <FormBuilder
            schema={schema.filter((f) => f.section === "side")}
            initialData={category}
            onChange={setCategory}
          />
        </div>

      </div>

      <button
        onClick={() => saveCategory(category)}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        ذخیره
      </button>
    </div>
  );
}