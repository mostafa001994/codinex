"use client";

import React, { useEffect } from "react";

interface HeadingAnalyzerProps {
  content: string;
  onScore?: (score: number) => void;
}

export default function HeadingAnalyzer({ content, onScore }: HeadingAnalyzerProps) {
  const h1 = content.match(/<h1[^>]*>/gi) || [];
  const h2 = content.match(/<h2[^>]*>/gi) || [];
  const h3 = content.match(/<h3[^>]*>/gi) || [];

  let score = 0;
  if (h1.length === 1) score += 5;
  if (h2.length > 0 || h3.length > 0) score += 5;

  useEffect(() => {
    onScore?.(score);
  }, [score]);

  return (
    <div className="p-5 rounded-xl shadow bg-gradient-to-br from-white to-purple-50 border border-purple-200">
      <h3 className="font-bold text-lg mb-3 text-purple-700">🏷️ تحلیل ساختار هدینگ‌ها</h3>

      <p className="text-gray-700">H1: <b>{h1.length}</b></p>
      <p className="text-gray-700">H2: <b>{h2.length}</b></p>
      <p className="text-gray-700">H3: <b>{h3.length}</b></p>

      {h1.length !== 1 && (
        <p className="text-red-600 mt-2">⚠ باید دقیقاً یک H1 وجود داشته باشد</p>
      )}

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-purple-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-purple-600 transition-all"
            style={{ width: `${(score / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="font-bold mt-3 text-purple-700">امتیاز این بخش: {score} از 10</p>
    </div>
  );
}