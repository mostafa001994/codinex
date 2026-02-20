"use client";

import React, { useState, useEffect } from "react";
import MediaUploader from "./MediaUploader";
import MediaItem from "./MediaItem";
import MediaEditor from "./MediaEditor";
import FolderSidebar from "./FolderSidebar";
import { MediaFile } from "@/types/media";

interface MediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: MediaFile | MediaFile[]) => void;
  multiple?: boolean;
}

export default function MediaManager({
  isOpen,
  onClose,
  onSelect,
  multiple = false,
}: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [selected, setSelected] = useState<MediaFile[]>([]);
  const [editing, setEditing] = useState<MediaFile | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "upload" | "search">("all");
  const [folder, setFolder] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) loadFiles();
  }, [isOpen, folder]);

  const loadFiles = async () => {
    const res = await fetch("/api/media/list?folder=" + (folder || ""));
    const data = await res.json();
    setFiles(data);
  };

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    await fetch("/api/media/upload", {
      method: "POST",
      body: form,
    });

    loadFiles();
  };

  const toggleSelect = (file: MediaFile) => {
    if (!multiple) return onSelect(file);

    setSelected((prev) =>
      prev.some((f) => f.id === file.id)
        ? prev.filter((f) => f.id !== file.id)
        : [...prev, file]
    );
  };

  return (
    <div className={`${isOpen ? "fixed inset-0 bg-black/40 z-50" : "hidden"}`}>
      <div className="bg-white w-[95%] max-w-6xl mx-auto mt-10 rounded-xl shadow-xl p-6 flex gap-4">

        {/* Sidebar */}
        <FolderSidebar onSelectFolder={setFolder} />

        {/* Main */}
        <div className="flex-1">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📁 مدیریت رسانه</h2>
            <button onClick={onClose} className="text-gray-600">✖</button>
          </div>

          {/* Tabs */}
          <div className="border-b flex gap-4 mb-4">
            {[
              { id: "all", label: "📁 همه فایل‌ها" },
              { id: "upload", label: "⬆️ آپلود" },
              { id: "search", label: "🔍 جستجو" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "upload" && <MediaUploader onUpload={handleUpload} />}

          {activeTab === "all" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file) => (
                <MediaItem
                  key={file.id}
                  file={file}
                  selected={selected.some((f) => f.id === file.id)}
                  onSelect={() => toggleSelect(file)}
                  onEdit={() => setEditing(file)}
                />
              ))}
            </div>
          )}

          {editing && (
            <MediaEditor
              file={editing}
              onClose={() => setEditing(null)}
              onSaved={loadFiles}
            />
          )}

          {/* Select button for multiple */}
          {multiple && selected.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onSelect(selected)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                انتخاب {selected.length} فایل
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}