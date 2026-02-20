"use client";

import React, { useEffect } from "react";

interface SerpAnalyzerProps {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  onScore?: (score: number) => void;
}

export default function SerpAnalyzer({
  title,
  description,
  slug,
  keywords,
  onScore,
}: SerpAnalyzerProps) {
  const titleLength = title?.length || 0;
  const descLength = description?.length || 0;
  const slugLength = slug?.length || 0;

  const normalized = (t?: string) =>
    (t || "").toLowerCase().replace(/\u200c/g, " ").trim();

  // امتیاز عنوان
  let titleScore = 0;
  if (titleLength >= 50 && titleLength <= 60) titleScore = 10;
  else if (titleLength >= 40 && titleLength <= 70) titleScore = 7;
  else if (titleLength > 0) titleScore = 3;

  // امتیاز توضیحات
  let descScore = 0;
  if (descLength >= 120 && descLength <= 160) descScore = 10;
  else if (descLength >= 100 && descLength <= 180) descScore = 7;
  else if (descLength > 0) descScore = 3;

  // امتیاز URL
  let urlScore = 0;
  if (slugLength < 60) urlScore = 5;
  else if (slugLength < 90) urlScore = 3;
  else urlScore = 1;

  // امتیاز وجود کلمات کلیدی
  const hasKeywordInTitle = keywords.some((kw) =>
    normalized(title).includes(normalized(kw))
  );

  const hasKeywordInDescription = keywords.some((kw) =>
    normalized(description).includes(normalized(kw))
  );

  let keywordScore = 0;
  if (hasKeywordInTitle) keywordScore += 2;   // ← امتیاز جدید
  if (hasKeywordInDescription) keywordScore += 3; // ← امتیاز جدید

  const totalScore = titleScore + descScore + urlScore + keywordScore; // از 30

  useEffect(() => {
    onScore?.(totalScore);
  }, [totalScore]);

  return (
    <div className="p-5 rounded-xl shadow bg-gradient-to-br from-white to-yellow-50 border border-yellow-200">
      <h3 className="font-bold text-lg mb-3 text-yellow-700">🔎 پیش‌نمایش و تحلیل SERP</h3>

      <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm mb-4">
        <p className="text-blue-700 text-xl font-semibold">{title || "عنوان وارد نشده"}</p>
        <p className="text-green-700 text-sm">{`https://example.com/${slug}`}</p>
        <p className="text-gray-700 mt-1">{description || "توضیحات متا وارد نشده"}</p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>طول عنوان: {titleLength} کاراکتر — امتیاز: {titleScore}/10</p>
        <p>طول توضیحات: {descLength} کاراکتر — امتیاز: {descScore}/10</p>
        <p>طول URL: {slugLength} — امتیاز: {urlScore}/5</p>
        <p>کلمات کلیدی در عنوان: {hasKeywordInTitle ? "✔" : "✘"} — امتیاز: {hasKeywordInTitle ? 2 : 0}/2</p>
        <p>کلمات کلیدی در توضیحات: {hasKeywordInDescription ? "✔" : "✘"} — امتیاز: {hasKeywordInDescription ? 3 : 0}/3</p>
      </div>

      <div className="mt-4">
        <div className="w-full bg-yellow-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-yellow-600 transition-all"
            style={{ width: `${(totalScore / 30) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="font-bold mt-3 text-yellow-700">امتیاز SERP: {totalScore} از 30</p>
    </div>
  );
}