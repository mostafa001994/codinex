"use client";

import React, { useEffect } from "react";

interface ContentAnalyzerProps {
  content: string;
  keywords: string[];
  onScore?: (score: number) => void;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ");
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/\u200c/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ContentAnalyzer({ content, keywords, onScore }: ContentAnalyzerProps) {
  const cleanContent = normalize(stripHtml(content));
  const words = cleanContent.split(" ").filter(Boolean);
  const wordCount = words.length;

  // شمارش کلمات کلیدی
  let keywordCount = 0;
  keywords.forEach((kw) => {
    const kwNorm = normalize(kw);
    keywordCount += words.filter((w) => w.includes(kwNorm)).length;
  });

  const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

  // امتیاز طول متن (0 تا 10)
  let lengthScore = 0;
  if (wordCount >= 300 && wordCount <= 2000) lengthScore = 10;
  else if (wordCount >= 150 && wordCount <= 2500) lengthScore = 5;

  // امتیاز تراکم کلمات کلیدی (0 تا 10)
  let densityScore = 0;
  if (density >= 1 && density <= 5) densityScore = 10;
  else if ((density >= 0.5 && density < 1) || (density > 5 && density <= 7)) densityScore = 5;

  const totalScore = lengthScore + densityScore; // از 20

  useEffect(() => {
    onScore?.(totalScore);
  }, [totalScore]);

  return (
    <div className="p-5 rounded-xl shadow bg-gradient-to-br from-white to-gray-50 border border-gray-200">
      <h3 className="font-bold text-lg mb-3 text-gray-800">📏 تحلیل طول و خوانایی محتوا</h3>

      <div className="space-y-2 text-sm">
        <p className="text-gray-700">تعداد کل کلمات: <b>{wordCount}</b></p>
        <p className="text-gray-700">تراکم کلمات کلیدی: <b>{density.toFixed(2)}%</b></p>

        {wordCount < 300 && <p className="text-red-600">⚠ متن خیلی کوتاه است</p>}
        {wordCount > 2000 && <p className="text-red-600">⚠ متن خیلی بلند است</p>}
        {density < 1 && <p className="text-red-600">⚠ تراکم خیلی کم است</p>}
        {density > 5 && <p className="text-red-600">⚠ تراکم خیلی زیاد است</p>}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-green-500 transition-all"
            style={{ width: `${(totalScore / 20) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="font-bold mt-3 text-gray-800">امتیاز این بخش: {totalScore} از 20</p>
    </div>
  );
}