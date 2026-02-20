"use client";

import { useState } from "react";

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      onUpload(data.url);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p className="text-gray-500 mt-2">در حال آپلود...</p>}
    </div>
  );
}