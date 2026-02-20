// components/ImageSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

const images = [
    "/hero-1-img-min-min-2.png",
    "/hero-2-min.png",
    "/hero-4-min.png",
    "/hero-5-min.png",
    "/hero-1-img-min.png",

];

export default function ImageSlider() {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
        //   speed={0.5}

        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={src}
                        alt={`slide-${index}`}
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}