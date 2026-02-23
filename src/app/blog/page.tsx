import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/ui/Slider";

import { blogs, portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";
import { db } from "@/db";

export default async function Home() {


  const posts = await db.select().from(blogs).orderBy(desc(blogs.id)).limit(5);
  const works = await db.select().from(portfolio).orderBy(desc(portfolio.id)).limit(10);



  return (

    <div className="flex min-h-screen items-center justify-center font-sans //dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-between py-10 bg-white ">


        <section className="w-full">
         <h2 className="text-gray-800">
           جدیدترین مطالب وبلاگ
         </h2>

         <Slider items={posts} type="post" />
        </section>
      </main>
    </div>
  );
}