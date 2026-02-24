'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper';
import Image from 'next/image';
import 'swiper/scss';
import 'swiper/scss/grid';
import 'swiper/scss/navigation';

export default function BankSliders({ banksData, className }) {
  return (
    <>
      <Swiper
        className={className}
        modules={[Navigation, Grid]}
        spaceBetween={16}
        slidesPerView={1}
        grid={{
          rows: 2,
          fill: 'row',
        }}
        navigation
        breakpoints={{
          640: { slidesPerView: 3 },
        }}
      >
        {banksData.map((bank) => (
          <SwiperSlide tag="figure" key={bank.id}>
            <Image src={bank.devphoto} alt={bank.name} width={160} height={70} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
