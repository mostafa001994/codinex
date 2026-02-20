"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";

export default function CreateCategoryPage() {
  const router = useRouter();

  const [category, setCategory] = useState<any>({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    parentId: "",
  });

  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const c = await fetch(`/api/admin/categories`).then((r) => r.json());
      setAllCategories(c);
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
    await fetch(`/api/admin/categories`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    });

    router.push("/admin/categories");
  }

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ایجاد دسته‌بندی جدید</h1>

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