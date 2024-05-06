"use client";
import { Suspense } from 'react'
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide, Autoplay } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/scss/autoplay";
import { Navigation } from "swiper";
import styles from "@/app/scss/blogs.module.scss";
import { Breadcrumb } from "react-bootstrap";
import AsyncPostCatSearch from "@/app/components/AsyncPostCatSearch";
import PostByCategory from "@/app/components/PostByCategory";
import Subscribe from "@/app/components/subscribe";
import SideAds from "@/app/components/side-ads";
import NotFound from "@/app/components/NotFound";
import getPostByCat from "@/app/api/getPostByCat";
import LoadingCustom from '@/app/components/loading-custom';

export default async function PostCatListing({ itemObj }) {

   const postCat = getPostByCat(itemObj);
   const resultpostCat = await postCat;
   const postCatData = resultpostCat.blogcatdata;
   const message = resultpostCat.message;
   const adsData = resultpostCat.blogads;
   const blogUrl = resultpostCat.blogurl;
   return (
      <>
      {message=='success' ?
         <main>
            <title>{postCatData.seotitle}</title>
         </main>
         : <NotFound />
      }
      </>
   );
}