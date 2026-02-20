"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";
import SeoPanel from "@/components/admin/seo/SeoScore";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const p = await fetch(`/api/admin/posts/${id}`).then((r) => r.json());
      const t = await fetch(`/api/admin/tags`).then((r) => r.json());
      const c = await fetch(`/api/admin/categories`).then((r) => r.json());

      setPost(p);
      setAllTags(t);
      setAllCategories(c);
    }

    load();
  }, []);

  const schema: FieldSchema[] = [
    { type: "text", name: "title", label: "عنوان", section: "main" },
    { type: "slug", name: "slug", label: "اسلاگ", from: "title", section: "main" },
    {
      type: "editor",
      name: "content",
      label: "محتوا",
      section: "main",
    },
    {
      type: "wordbox",
      name: "seoDescription",
      label: "توضیحات کوتاه",
      section: "main",
    },
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

  async function savePost() {
    const payload = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      imageUrl: post.imageUrl,
      categoryId: post.categoryId,
      tags: post.tags,
      seoDescription: post.seoDescription,
      gallery: post.gallery,
    };

    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(payload),
    });

    router.push("/admin/posts");
  }

  if (!post) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ویرایش پست</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <FormBuilder
            schema={schema.filter((f) => f.section === "main")}
            initialData={post}
            onChange={setPost}
          />

          <SeoPanel
            content={post.content}
            keywords={post.tags}
            siteDomain="yourdomain.com"
            title={post.title}
            description={post.seoDescription}
            slug={post.slug}
          />
        </div>

        <div className="col-span-3">
          <FormBuilder
            schema={schema.filter((f) => f.section === "side")}
            initialData={post}
            onChange={setPost}
          />
        </div>
      </div>

      <button
        onClick={savePost}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        ذخیره
      </button>
    </div>
  );
}