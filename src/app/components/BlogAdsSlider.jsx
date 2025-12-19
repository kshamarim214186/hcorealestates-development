"use client"
import SideAds from "./side-ads";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss/autoplay";
export default function BlogAdsSlider({ adsData }) {
  return <Swiper
    modules={[Autoplay]}
    spaceBetween={24}
    slidesPerView={1}
    loop={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
  >
    {adsData.map(item => <SwiperSlide key={item.id}>
      <SideAds adsObject={item} />
    </SwiperSlide>)}
  </Swiper>
}