"use client";

import React, { useState } from "react";
import { MediaFile } from "@/types/media";

interface MediaEditorProps {
  file: MediaFile;
  onClose: () => void;
  onSaved: () => void;
}

export default function MediaEditor({ file, onClose, onSaved }: MediaEditorProps) {
  const [alt, setAlt] = useState<string>(file.alt || "");
  const [title, setTitle] = useState<string>(file.title || "");

  const save = async () => {
    await fetch("/api/media/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: file.id, alt, title }),
    });

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h3 className="font-bold mb-4">ویرایش تصویر</h3>

        <label className="block mb-2">ALT</label>
        <input
          className="w-full border p-2 rounded"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />

        <label className="block mt-4 mb-2">Title</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-600">
            لغو
          </button>
          <button
            onClick={save}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}