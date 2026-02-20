"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function GallerySlider({ images }: { images: any[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      {/* اسلایدر اصلی */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className="rounded-lg overflow-hidden shadow-lg px-14! py-0!"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.url}
              alt={img.alt || ""}
              className="w-full h-80 object-contain cursor-pointer"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* لایت‌باکس */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-4xl  flex items-center" onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Navigation, Pagination, Zoom, Keyboard]}
              initialSlide={index}
              navigation
              pagination={{ clickable: true }}
              zoom
              keyboard
              className="rounded-lg overflow-hidden"
            >
              {images.map((img) => (
                <SwiperSlide key={img.id}>
                  <div className="swiper-zoom-container">
                    <img
                      src={img.url}
                      alt={img.alt || ""}
                      className="w-full max-h-[20vh] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}