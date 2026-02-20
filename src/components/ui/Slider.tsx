"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Link from "next/link";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ items, type }: any) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      breakpoints={{
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="my-6"
    >
      {items.map((item: any) => (
        <SwiperSlide key={item.id} className="pb-6 px-3">
          {type === "post" ? (
            <PostCard post={item} />
          ) : (
            <PortfolioCard item={item} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function PostCard({ post }: any) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white shadow rounded-lg overflow-hidden"
    >
      {post.imageUrl && (
        <img src={post.imageUrl} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-bold text-md text-gray-800">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {post.seoDescription}
        </p>
      </div>
    </Link>
  );
}

function PortfolioCard({ item }: any) {
  return (

    <div>
      <Link
        href={`/portfolio/${item.slug}`}
        className="block bg-white shadow rounded-lg overflow-hidden border hover:shadow-xl hover:border-amber-400 border-gray-300 p-2"
      >
        <div className="flex gap-3 h-4">
          <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
          <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
        </div>
        {item.imageUrl && (
          <img src={item.imageUrl} className="w-full h-48 object-cover" />
        )}
        <div className="p-1 text-right pt-2">
          <h3 className="font-bold text-gray-800 text-md">{item.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 pt-1">
            {item.seoDescription}
          </p>
        </div>
      </Link>
    </div>
  );
}