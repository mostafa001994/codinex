
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>

        <nav className="flex group flex-col gap-3">
          <Link href="/admin" className="hover:text-blue-400">داشبورد</Link>
          <div  className="flex flex-col">
            <p>
              مطالب
            </p>

            <Link href="/admin/posts/" className="hover:text-blue-400  pr-3">لیست مطالب  </Link>
            <Link href="/admin/categories/" className="hover:text-blue-400 pr-3">دسته بندی ها  </Link>

          </div>

                    <Link href="/admin/portfolio" className="hover:text-blue-400">نمونه کارها</Link>

        </nav>
      

      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}