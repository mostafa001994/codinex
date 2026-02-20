// src/components/admin/AdminProtectedLayout.tsx
"use client";

import Link from "next/link";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">پنل مدیریت</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/dashboard">داشبورد</Link>
          <Link href="/admin/blog">بلاگ</Link>
          <Link href="/admin/products">محصولات</Link>
          <Link href="/admin/users">کاربران</Link>
          <Link href="/admin/orders">سفارشات</Link>
          <Link href="/admin/settings">تنظیمات</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}