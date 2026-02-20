"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";
import SeoPanel from "@/components/admin/seo/SeoScore";

export default function CreatePortfolioPage() {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    categoryId: "",
    tags: [],
    technologies: [],
    links: [],
    status: "",
    date: "",
    clientName: "",
    seoTitle: "",
    seoDescription: "",
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
    { type: "text", name: "title", label: "عنوان", section: "main" },
    { type: "slug", name: "slug", label: "اسلاگ", from: "title", section: "main" },

    {
      type: "editor",
      name: "content",
      label: "توضیحات",
      section: "main",
    },

    {
      type: "wordbox",
      name: "seoDescription",
      label: "توضیحات کوتاه",
      section: "main",
    },

    {
      type: "dynamic-list",
      name: "technologies",
      label: "تکنولوژی‌ها",
      mode: "simple",
      section: "main",
    },

    {
      type: "dynamic-list",
      name: "links",
      label: "لینک‌ها",
      mode: "advanced",
      fields: [
        { name: "label", label: "عنوان" },
        { name: "url", label: "لینک" },
        {
          name: "icon",
          label: "آیکون",
          type: "select",
          options: [
            { label: "لینک خارجی", value: "external-link" },
            { label: "گیت‌هاب", value: "github" },
            { label: "فیگما", value: "figma" },
          ],
        },
        { name: "color", label: "رنگ", type: "color" },
      ],
      section: "main",
    },

    // SIDE
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

    {
      type: "select",
      name: "status",
      label: "وضعیت",
      options: [
        { id: "completed", name: "تکمیل شده" },
        { id: "in-progress", name: "در حال انجام" },
        { id: "paused", name: "متوقف شده" },
      ],
      section: "side",
    },

    { type: "text", name: "date", label: "تاریخ انجام", section: "side" },
    { type: "text", name: "clientName", label: "نام مشتری", section: "side" },
    { type: "text", name: "seoTitle", label: "SEO Title", section: "side" },

    { type: "gallery", name: "gallery", label: "گالری تصاویر", section: "side" },
  ];

  async function save() {
    const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      imageUrl: form.imageUrl,
      categoryId: form.categoryId,
      tags: form.tags, // string[]
      seoDescription: form.seoDescription,
      technologies: form.technologies,
      links: form.links,
      status: form.status,
      date: form.date,
      clientName: form.clientName,
      seoTitle: form.seoTitle,
      gallery: form.gallery,
    };

    await fetch(`/api/admin/portfolio`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
    });

    router.push("/admin/portfolio");
  }

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ایجاد نمونه‌کار جدید</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <FormBuilder
            schema={schema.filter((f) => f.section === "main")}
            initialData={form}
            onChange={setForm}
          />

          <SeoPanel
            content={form.content}
            keywords={form.tags}
            siteDomain="yourdomain.com"
            title={form.title}
            description={form.seoDescription}
            slug={form.slug}
          />
        </div>

        <div className="col-span-3">
          <FormBuilder
            schema={schema.filter((f) => f.section === "side")}
            initialData={form}
            onChange={setForm}
          />
        </div>
      </div>

      <button
        onClick={save}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        ذخیره
      </button>
    </div>
  );
}