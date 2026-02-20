"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";

export default function CreatePostPage() {
  const router = useRouter();

  const [post, setPost] = useState<any>({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    categoryId: "",
    tags: [],
    gallery: [],
  });

  const [allTags, setAllTags] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const t = await fetch(`/api/admin/tags`).then((r) => r.json());
      const c = await fetch(`/api/admin/categories`).then((r) => r.json());

      setAllTags(t);
      setAllCategories(c);
    }

    load();
  }, []);

  const schema: FieldSchema[] = [
    // ستون اصلی
    { type: "text", name: "title", label: "عنوان", section: "main" },
    { type: "slug", name: "slug", label: "اسلاگ", from: "title", section: "main" },

    {
      type: "editor",
      name: "content",
      label: "محتوا",
      section: "main",
      onImageUpload: async (file: File) => {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });

        const data = await res.json();
        return data.url as string;
      },
    },

    // ستون کناری
    { type: "image", name: "imageUrl", label: "تصویر اصلی", section: "side" },

    {
      type: "select",
      name: "categoryId",
      label: "دسته‌بندی",
      options: allCategories,
      section: "side",
    },

    {
      type: "tags",
      name: "tags",
      label: "تگ‌ها",
      options: allTags,
      section: "side",
    },

    { type: "gallery", name: "gallery", label: "گالری تصاویر", section: "side" },
  ];

  async function savePost(data: any) {
    await fetch(`/api/admin/posts`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    });

    router.push("/admin/posts");
  }

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ایجاد پست جدید</h1>

      <div className="grid grid-cols-12 gap-6">

        {/* ستون اصلی */}
        <div className="col-span-9">
          <FormBuilder
            schema={schema.filter((f) => f.section === "main")}
            initialData={post}
            onChange={setPost}
          />
        </div>

        {/* ستون کناری */}
        <div className="col-span-3">
          <FormBuilder
            schema={schema.filter((f) => f.section === "side")}
            initialData={post}
            onChange={setPost}
          />
        </div>

      </div>

      <button
        onClick={() => savePost(post)}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        ذخیره
      </button>
    </div>
  );
}