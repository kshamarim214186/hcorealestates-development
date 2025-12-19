"use client";
import { Suspense } from 'react'
import { notFound } from 'next/navigation';
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
import LoadingCustom from '@/app/components/loading-custom';

export default function PostCatListing({ resultpostCat }) { 
   if (resultpostCat.message != 'success') {
      notFound();
   }
   const postCatData = resultpostCat.blogcatdata;
   const message = resultpostCat.message;
   const adsData = resultpostCat.blogads;
   const blogUrl = resultpostCat.blogurl;
   return (
      <>
         <main>
            <title>{postCatData.seotitle}</title>
            <meta name="description" content={postCatData.seodesc} />
            <link rel="canonical" href={postCatData.url} />
            <section className={styles.bg}>
               <div className="container-xl">
                  <div className={styles.bredcrumb}>
                    <Breadcrumb>
                      <Breadcrumb.Item href={postCatData.homeurl}>Home</Breadcrumb.Item>
                      <Breadcrumb.Item href={blogUrl}>Blogs</Breadcrumb.Item>
                      <Breadcrumb.Item active>Blog Category</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
               </div>
               <div className="">
                  <Image src="/images/background-noimage-art.svg" className="w-100 img-fluid" width={500} height={250} alt="backgroun image" />
               </div>
               <div className={styles.bg__content}>
                  <div className="container-xl">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <h1 className="mb-4">
                          {postCatData.h1}
                        </h1>
                        <div className={styles.bg__search}>
                          <AsyncPostCatSearch catId={postCatData.id} />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </section>

            <section className={styles.slides}>
               <div className="container-xl">
               </div>
            </section>

            <section className={styles.blogs}>
               <div className="container-xl">
                  <div className="row">
                     <div className="col-lg-8">
                        <Suspense fallback={<LoadingCustom />}>
                           <PostByCategory itemPost={postCatData.id} />
                        </Suspense>
                     </div>
                     <div className="col-lg-4">
                        <div className={styles.blogs__right}>
                           <Subscribe />
                           <Swiper
                             slidesPerView={1}
                             autoplay={{
                               delay: 100,
                               disableOnInteraction: true,
                             }}
                             speed={500}
                             loop={true}
                           >
                              {adsData.map((item) => (
                               <SwiperSlide key={item.id}>
                                 <SideAds adsObject={item} />
                               </SwiperSlide>
                              ))}
                           </Swiper>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </>
   );
}