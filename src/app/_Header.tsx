"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-7xl m-auto py-4">
      <div className="flex justify-between gap-5 items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={50}
            priority
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-gray-800">
            <li><Link href={'/website'} className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#web" /></svg>طراحی سایت</Link></li>
            <li><Link href={'/application'} className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#mobile" /></svg>طراحی اپلیکیشن</Link></li>
            <li><a className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#rocket" /></svg>سئو و بهینه سازی</a></li>
            <li><a className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#click" /></svg>تست نفوذ</a></li>
            <li><a className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#virus" /></svg>پاکسازی ویروس</a></li>
            <li><Link href={'/plans'} className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#cup" /></svg>تعرفه و خدمات</Link></li>
            <li><Link href={'/manage-site'} className="flex flex-col items-center gap-1"><svg className="w-5 h-5"><use href="#proccess" /></svg>ادمینی سایت</Link></li>

          </ul>
        </nav>

        <div className="hidden md:flex gap-4">
          <a className="flex gap-2 items-center text-gray-900 border p-2 border-gray-300 rounded-full">
            <svg className="bg-amber-400 rounded-full w-10 h-8 p-1">
              <use href="#call" />
            </svg>
            09388683852
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(true)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      <hr className="my-4" />

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button className="mb-6 text-gray-700" onClick={() => setOpen(false)}>
          ✕
        </button>

        <ul className="flex flex-col gap-6 text-gray-800">
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#web" /></svg>طراحی سایت</a></li>
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#mobile" /></svg>طراحی اپلیکیشن</a></li>
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#rocket" /></svg>سئو و بهینه سازی</a></li>
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#cup" /></svg>تعرفه و خدمات</a></li>
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#click" /></svg>تست نفوذ</a></li>
          <li><a className="flex items-center gap-2"><svg className="w-5 h-5"><use href="#virus" /></svg>پاکسازی ویروس</a></li>
        </ul>

        <div className="mt-8">
          <a className="flex gap-2 items-center text-gray-900 border p-2 border-gray-300 rounded-full">
            <svg className="bg-amber-400 rounded-full w-10 h-8 p-1">
              <use href="#call" />
            </svg>
            09388683852
          </a>
        </div>
      </div>
    </header>
  );
}