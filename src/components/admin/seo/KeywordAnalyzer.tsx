"use client";

import React, { useEffect } from "react";

interface KeywordAnalyzerProps {
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

export default function KeywordAnalyzer({ content, keywords, onScore }: KeywordAnalyzerProps) {
  const cleanContent = normalize(stripHtml(content));

  let usedKeywords = 0;

  const counts = keywords.map((kw) => {
    const kwNorm = normalize(kw);
    let count = 0;

    let index = cleanContent.indexOf(kwNorm);
    while (index !== -1) {
      count++;
      index = cleanContent.indexOf(kwNorm, index + kwNorm.length);
    }

    if (count > 0) usedKeywords++;
    return { keyword: kw, count };
  });

  // امتیازدهی
  let score = 0;
  if (usedKeywords === keywords.length) score = 10;
  else if (usedKeywords >= keywords.length / 2) score = 5;

  useEffect(() => {
    onScore?.(score);
  }, [score]);

  return (
    <div className="p-5 rounded-xl shadow bg-gradient-to-br from-white to-blue-50 border border-blue-200">
      <h3 className="font-bold text-lg mb-3 text-blue-700">🔍 تحلیل کلمات کلیدی</h3>

      <ul className="space-y-1 text-sm text-gray-700">
        {counts.map((c) => (
          <li key={c.keyword}>
            <b>{c.keyword}</b>: {c.count} بار
          </li>
        ))}
      </ul>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-blue-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{ width: `${(score / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="font-bold mt-3 text-blue-700">امتیاز این بخش: {score} از 10</p>
    </div>
  );
}