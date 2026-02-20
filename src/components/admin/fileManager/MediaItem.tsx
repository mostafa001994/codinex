"use client";

import React from "react";
import { MediaFile } from "@/types/media";

interface MediaItemProps {
  file: MediaFile;
  selected?: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function MediaItem({
  file,
  selected = false,
  onSelect,
  onEdit,
}: MediaItemProps) {
  return (
    <div
      className={`border rounded-lg p-2 hover:shadow cursor-pointer relative ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {file.url ? (
        <img
          src={file.url}
          alt={file.alt || ""}
          className="w-full h-32 object-cover rounded"
          onClick={onSelect}
        />
      ) : (
        <div
          className="w-full h-32 flex items-center justify-center bg-gray-100 text-gray-500 rounded"
          onClick={onSelect}
        >
          بدون تصویر
        </div>
      )}

      {selected && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          انتخاب شده
        </div>
      )}

      <div className="flex justify-between mt-2 text-sm">
        <button onClick={onEdit} className="text-blue-600">
          ویرایش
        </button>
        <button onClick={onSelect} className="text-green-600">
          انتخاب
        </button>
      </div>
    </div>
  );
}