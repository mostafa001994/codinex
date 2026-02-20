"use client";

import React, { useState, useEffect } from "react";

interface FolderSidebarProps {
  onSelectFolder: (folder: string | null) => void;
}

export default function FolderSidebar({ onSelectFolder }: FolderSidebarProps) {
  const [folders, setFolders] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [newFolder, setNewFolder] = useState("");

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    const res = await fetch("/api/media/folders");
    const data = await res.json();
    setFolders(data);
  };

  const createFolder = async () => {
    if (!newFolder.trim()) return;
    await fetch("/api/media/folders", {
      method: "POST",
      body: JSON.stringify({ name: newFolder }),
    });
    setNewFolder("");
    loadFolders();
  };

  const selectFolder = (folder: string | null) => {
    setActive(folder);
    onSelectFolder(folder);
  };

  return (
    <div className="w-48 border-r pr-4">
      <h3 className="font-bold mb-3">📂 پوشه‌ها</h3>

      <ul className="space-y-2">
        <li>
          <button
            onClick={() => selectFolder(null)}
            className={`block w-full text-left px-2 py-1 rounded ${
              active === null ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
            }`}
          >
            همه فایل‌ها
          </button>
        </li>
        {folders.map((f) => (
          <li key={f}>
            <button
              onClick={() => selectFolder(f)}
              className={`block w-full text-left px-2 py-1 rounded ${
                active === f ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          placeholder="پوشه جدید..."
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={createFolder}
          className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm"
        >
          ساخت پوشه
        </button>
      </div>
    </div>
  );
}