"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormBuilder, { FieldSchema } from "@/components/admin/ui/form/FormBuilder";
import SeoPanel from "@/components/admin/seo/SeoScore";

export default function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ← دقیقاً مثل پست‌ها
  const router = useRouter();

  const [item, setItem] = useState<any>(null);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);


  function removeImage(id: number) {
  setItem((prev: any) => ({
    ...prev,
    gallery: prev.gallery.filter((img: any) => img.id !== id),
  }));
}




  useEffect(() => {
    async function load() {
      const p = await fetch(`/api/admin/portfolio/${id}`).then((r) => r.json());
      const t = await fetch(`/api/admin/tags`).then((r) => r.json());
      const c = await fetch(`/api/admin/categories`).then((r) => r.json());

      setItem({
        ...p,
        tags: p.tags ?? [], // ← چون API مثل پست‌هاست، tags = string[]
        gallery: Array.isArray(p.gallery) ? p.gallery : [],
      });

      setAllTags(t);
      setAllCategories(c);
    }

    load();
  }, [id]);

  if (!item) return <p>در حال بارگذاری...</p>;

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
      title: item.title,
      slug: item.slug,
      content: item.content,
      imageUrl: item.imageUrl,
      categoryId: item.categoryId,
      tags: item.tags, // ← string[]
      seoDescription: item.seoDescription,
      technologies: item.technologies,
      links: item.links,
      status: item.status,
      date: item.date,
      clientName: item.clientName,
      seoTitle: item.seoTitle,
      gallery: item.gallery,
    };

    await fetch(`/api/admin/portfolio/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(payload),
    });

    router.push("/admin/portfolio");
  }

  return (
    <div className="p-4 text-cyan-900 bg-white">
      <h1 className="text-xl font-bold mb-4">ویرایش نمونه‌کار</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <FormBuilder
            schema={schema.filter((f) => f.section === "main")}
            initialData={item}
            onChange={setItem}
          />

          <SeoPanel
            content={item.content}
            keywords={item.tags}
            siteDomain="yourdomain.com"
            title={item.title}
            description={item.seoDescription}
            slug={item.slug}
          />
        </div>

        <div className="col-span-3">
          <FormBuilder
            schema={schema.filter((f) => f.section === "side")}
            initialData={item}
            onChange={setItem}
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