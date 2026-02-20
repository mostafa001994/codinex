"use client";

import { useState, useEffect } from "react";
import RichEditor from "@/components/RichEditor";
import TagsField from "./TagsField";
import DynamicListField from "./DynamicListField";
import { slugify } from "@/lib/utils";
import MediaManager from "@/components/admin/fileManager/MediaManager";

export type FieldSchema =
  | { type: "text"; name: string; label: string; section?: "main" | "side" }
  | { type: "slug"; name: string; label: string; from?: string; section?: "main" }
  | { type: "wordbox"; name: string; label: string; section?: "main" | "side" }
  | {
    type: "editor";
    name: string;
    label: string;
    onImageUpload?: (file: File) => Promise<string>;
    section?: "main" | "side";
  }
  | { type: "image"; name: string; label: string; section?: "side" }
  | {
    type: "gallery";
    name: string;
    label: string;
    section?: "side";
  }
  | {
    type: "select";
    name: string;
    label: string;
    options: { id: number | string; name: string }[];
    section?: "side";
  }
  | {
    type: "tags";
    name: string;
    label: string;
    options: { name: string }[];
    section?: "side" | "main";
  }
  | {
    type: "dynamic-list";
    name: string;
    label: string;
    mode: "simple" | "advanced";
    fields?: {
      name: string;
      label: string;
      type?: "text" | "color" | "select";
      options?: { label: string; value: string }[];
    }[];
    section?: "main" | "side";
  };

interface FormBuilderProps {
  schema: FieldSchema[];
  initialData?: Record<string, any>;
  onChange?: (data: Record<string, any>) => void;
}

export default function FormBuilder({
  schema,
  initialData = {},
  onChange,
}: FormBuilderProps) {
  const [form, setForm] = useState<Record<string, any>>(initialData);

  // Media Manager states
  const [openMedia, setOpenMedia] = useState(false);
  const [mediaTargetField, setMediaTargetField] = useState<string | null>(null);
  const [mediaMultiple, setMediaMultiple] = useState(false);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  function update(name: string, value: any) {
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange?.(updated);
  }

  return (
    <div className="space-y-6">
      {schema.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  className="border p-2 w-full"
                  value={form[field.name] ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              </div>
            );

          case "slug":
            return (
              <div key={field.name} className="flex gap-0 items-center underline">
                <input
                  className="border-0 p-2 w-full focus-visible:outline-0"
                  value={form[field.name] ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                  onBlur={() => {
                    if (field.from && form[field.from]) {
                      update(field.name, slugify(form[field.from]));
                    }
                  }}
                />
              </div>
            );

          case "wordbox":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <textarea
                  className="border p-2 w-full"
                  value={form[field.name] ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              </div>
            );

          case "editor":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <RichEditor
                  value={form[field.name] ?? ""}
                  onChange={(html) => update(field.name, html)}
                  onImageUpload={field.onImageUpload}
                />
              </div>
            );

          case "image":
            return (
              <div key={field.name}>
                <label>{field.label}</label>

                {form[field.name] && (
                  <img
                    src={form[field.name]}
                    className="w-32 h-32 object-cover mt-2 border rounded"
                  />
                )}

                <button
                  type="button"
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setMediaTargetField(field.name);
                    setMediaMultiple(false);
                    setOpenMedia(true);
                  }}
                >
                  انتخاب تصویر
                </button>
              </div>
            );

          case "gallery": {
            const gallery: any[] = Array.isArray(form[field.name])
              ? form[field.name]
              : [];

            return (
              <div key={field.name}>
                <label>{field.label}</label>

                <div className="flex gap-2 mt-2 flex-wrap">
                  {gallery.map((img: any) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.url}
                        className="w-24 h-24 object-cover rounded border"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (!onChange) return; // ← مهم: onChange ممکنه undefined باشه

                          const nextGallery = gallery.filter(
                            (i: any) => i.id !== img.id
                          );

                          onChange({
                            ...form,
                            [field.name]: nextGallery,
                          });
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setMediaTargetField(field.name);
                    setMediaMultiple(true);
                    setOpenMedia(true);
                  }}
                >
                  افزودن به گالری
                </button>
              </div>
            );
          }

          case "select":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <select
                  className="border p-2 w-full"
                  value={form[field.name] ?? ""}
                  onChange={(e) => update(field.name, e.target.value)}
                >
                  <option value="">انتخاب کنید</option>
                  {field.options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            );

case "tags":
  return (
    <TagsField
      key={field.name}
      label={field.label}
      options={field.options.map((t: any) => ({ name: t.name }))} // ← مهم
      value={(form[field.name] as string[]) ?? []}
      onChange={(val) => update(field.name, val)}
    />
  );



          case "dynamic-list":
            return (
              <DynamicListField
                key={field.name}
                label={field.label}
                value={form[field.name] ?? []}
                onChange={(val) => update(field.name, val)}
                mode={field.mode}
                fields={field.fields}
              />
            );

          default:
            return null;
        }
      })}

      {/* Media Manager */}
      <MediaManager
        isOpen={openMedia}
        multiple={mediaMultiple}
        onClose={() => setOpenMedia(false)}
        onSelect={(fileOrFiles) => {
          if (!mediaTargetField) return;

          // اگر چندتایی باشد → همیشه آرایه ذخیره می‌کنیم
          if (mediaMultiple) {
            const files = Array.isArray(fileOrFiles)
              ? fileOrFiles
              : [fileOrFiles];

            update(mediaTargetField, [
              ...(form[mediaTargetField] ?? []),
              ...files,
            ]);
          }

          // اگر تکی باشد → فقط یک url ذخیره می‌کنیم
          else {
            if (!Array.isArray(fileOrFiles)) {
              update(mediaTargetField, fileOrFiles.url);
            }
          }

          setOpenMedia(false);
        }}
      />
    </div>
  );
}