"use client";

import React, { useEffect } from "react";

interface LinksAnalyzerProps {
  content: string;
  siteDomain: string;
  onScore?: (score: number) => void;
}

export default function LinksAnalyzer({ content, siteDomain, onScore }: LinksAnalyzerProps) {
  const links = content.match(/<a[^>]*href="([^"]+)"[^>]*>/gi) || [];

  let internal = 0;
  let external = 0;

  links.forEach((link) => {
    const href = link.match(/href="([^"]+)"/i)?.[1];
    if (!href) return;

    if (href.includes(siteDomain)) internal++;
    else external++;
  });

  let score = 0;
  if (internal > 0) score += 5;
  if (external > 0) score += 5;

  useEffect(() => {
    onScore?.(score);
  }, [score]);

  return (
    <div className="p-5 rounded-xl shadow bg-gradient-to-br from-white to-green-50 border border-green-200">
      <h3 className="font-bold text-lg mb-3 text-green-700">🔗 تحلیل لینک‌ها</h3>

      <p className="text-gray-700">لینک داخلی: <b>{internal}</b></p>
      <p className="text-gray-700">لینک خارجی: <b>{external}</b></p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-green-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-green-600 transition-all"
            style={{ width: `${(score / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="font-bold mt-3 text-green-700">امتیاز این بخش: {score} از 10</p>
    </div>
  );
}