"use client";

import { useState, useMemo } from "react";

interface TagsFieldProps {
  label: string;
  options: { name: string }[];
  value: string[];
  onChange: (val: string[]) => void;
}

export default function TagsField({
  label,
  options,
  value,
  onChange,
}: TagsFieldProps) {
  const [input, setInput] = useState("");

  const suggestions = useMemo(
    () =>
      input.trim()
        ? options
            .map((t) => t.name)
            .filter(
              (t) =>
                t.toLowerCase().includes(input.toLowerCase()) &&
                !value.includes(t)
            )
        : [],
    [input, options, value]
  );

  function addTag(tag: string) {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <label className="block mb-1">{label}</label>

      <input
        className="border p-2 w-full"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && input.trim()) {
            e.preventDefault();
            addTag(input.trim());
          }
        }}
        placeholder="تگ را بنویسید و Enter بزنید"
      />

      {suggestions.length > 0 && (
        <div className="border p-2 bg-white shadow mt-1 rounded">
          {suggestions.map((s: string) => (
            <div
              key={s}
              className="p-1 cursor-pointer hover:bg-gray-100"
              onClick={() => addTag(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap mt-2">
        {value.map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}