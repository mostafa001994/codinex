"use client";

import { useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "color" | "select";
  options?: { label: string; value: string }[];
}

interface DynamicListFieldProps {
  label: string;
  value: any[];
  onChange: (val: any[]) => void;

  mode: "simple" | "advanced";
  fields?: FieldConfig[];
}

export default function DynamicListField({
  label,
  value,
  onChange,
  mode,
  fields = [],
}: DynamicListFieldProps) {
  const [items, setItems] = useState<any[]>(value || []);

  function updateItems(newItems: any[]) {
    setItems(newItems);
    onChange(newItems);
  }

  function addItem() {
    if (mode === "simple") {
      updateItems([...items, ""]);
    } else {
      const emptyObj: any = {};
      fields.forEach((f) => (emptyObj[f.name] = ""));
      updateItems([...items, emptyObj]);
    }
  }

  function updateItem(index: number, key: string | null, val: any) {
    const updated = [...items];

    if (mode === "simple") {
      updated[index] = val;
    } else {
      updated[index] = { ...updated[index], [key!]: val };
    }

    updateItems(updated);
  }

  function removeItem(index: number) {
    const updated = items.filter((_, i) => i !== index);
    updateItems(updated);
  }

  return (
    <div className="space-y-3">
      <label className="font-medium">{label}</label>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-md bg-gray-50 relative"
          >
            {/* دکمه حذف */}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>

            {mode === "simple" && (
              <input
                className="border p-2 w-full rounded"
                value={item}
                onChange={(e) => updateItem(index, null, e.target.value)}
              />
            )}

            {mode === "advanced" && (
              <div className="grid grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label className="text-sm">{f.label}</label>

                    {f.type === "select" ? (
                      <select
                        className="border p-2 w-full rounded"
                        value={item[f.name] || ""}
                        onChange={(e) =>
                          updateItem(index, f.name, e.target.value)
                        }
                      >
                        <option value="">انتخاب کنید</option>
                        {f.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "color" ? (
                      <input
                        type="color"
                        className="border p-1 w-full rounded h-10"
                        value={item[f.name] || "#000000"}
                        onChange={(e) =>
                          updateItem(index, f.name, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        className="border p-2 w-full rounded"
                        value={item[f.name] || ""}
                        onChange={(e) =>
                          updateItem(index, f.name, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        افزودن
      </button>
    </div>
  );
}