"use client";

import React from "react";

interface MediaUploaderProps {
  onUpload: (file: File) => void;
}

export default function MediaUploader({ onUpload }: MediaUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <label className="block border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer hover:bg-gray-50">
      <p className="text-gray-600">برای آپلود کلیک کنید یا فایل را بکشید</p>
      <input type="file" className="hidden" onChange={handleChange} />
    </label>
  );
}