"use client";

import React, { useState } from "react";
import ContentAnalyzer from "./ContentAnalyzer";
import KeywordAnalyzer from "./KeywordAnalyzer";
import HeadingAnalyzer from "./HeadingAnalyzer";
import LinksAnalyzer from "./LinksAnalyzer";
import SerpAnalyzer from "./SERPPreview";

interface SeoPanelProps {
  content: string;
  keywords: string[];
  siteDomain: string;
  title: string;
  description: string;
  slug: string;
}

export default function SeoPanel({
  content,
  keywords,
  siteDomain,
  title,
  description,
  slug,
}: SeoPanelProps) {
  const [contentScore, setContentScore] = useState(0);
  const [keywordScore, setKeywordScore] = useState(0);
  const [headingScore, setHeadingScore] = useState(0);
  const [linksScore, setLinksScore] = useState(0);
  const [serpScore, setSerpScore] = useState(0);

  const total = contentScore + keywordScore + headingScore + linksScore + serpScore;
  const percent = Math.round((total / 80) * 100);

  const [activeTab, setActiveTab] = useState("serp");

  const getColor = () => {
    if (percent >= 80) return "bg-green-600";
    if (percent >= 60) return "bg-yellow-500";
    if (percent >= 40) return "bg-orange-500";
    return "bg-red-600";
  };

  const getStatus = () => {
    if (percent >= 80) return "عالی";
    if (percent >= 60) return "خوب";
    if (percent >= 40) return "متوسط";
    return "ضعیف";
  };

  return (
    <div className="space-y-8 mt-8">

      {/* امتیاز کلی */}
      <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 امتیاز کلی سئو</h2>

        <div className="w-full bg-gray-300 rounded-full h-5 mb-3">
          <div
            className={`h-5 rounded-full transition-all ${getColor()}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <p className="text-gray-800 text-lg font-semibold">
          {percent}% — وضعیت: {getStatus()}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          مجموع امتیاز: {total} از 80
        </p>
      </div>

      {/* تب‌ها */}
      <div className="border-b border-gray-300 flex gap-4">
        {[
          { id: "serp", label: "🔎 SERP" },
          { id: "content", label: "📏 خوانایی" },
          { id: "keywords", label: "🔍 کلمات کلیدی" },
          { id: "headings", label: "🏷 هدینگ‌ها" },
          { id: "links", label: "🔗 لینک‌ها" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
            {/* محتوای تب‌ها */}
      <div className="mt-4 space-y-4">
        {/* SERP */}
        <div className={activeTab === "serp" ? "block" : "hidden"}>
          <SerpAnalyzer
            title={title}
            description={description}
            slug={slug}
            keywords={keywords}
            onScore={setSerpScore}
          />
        </div>

        {/* 📏 خوانایی */}
        <div className={activeTab === "content" ? "block" : "hidden"}>
          <ContentAnalyzer
            content={content}
            keywords={keywords}
            onScore={setContentScore}
          />
        </div>

        {/* 🔍 کلمات کلیدی */}
        <div className={activeTab === "keywords" ? "block" : "hidden"}>
          <KeywordAnalyzer
            content={content}
            keywords={keywords}
            onScore={setKeywordScore}
          />
        </div>

        {/* 🏷 هدینگ‌ها */}
        <div className={activeTab === "headings" ? "block" : "hidden"}>
          <HeadingAnalyzer
            content={content}
            onScore={setHeadingScore}
          />
        </div>

        {/* 🔗 لینک‌ها */}
        <div className={activeTab === "links" ? "block" : "hidden"}>
          <LinksAnalyzer
            content={content}
            siteDomain={siteDomain}
            onScore={setLinksScore}
          />
        </div>
      </div>
    </div>
  );
}