"use client";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/scss/autoplay";
import { Navigation } from "swiper";
import styles from "../scss/blogs.module.scss";
import BlogItems from "@/app/components/BlogItems";
import Subscribe from "@/app/components/subscribe";
import SideAds from "@/app/components/side-ads";
import CustomPagination from "@/app/components/CustomPagination";
import ArrowButton from "@/app/UI/ArrowButton";
import getPostList from "@/app/api/getPostList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/pro-regular-svg-icons';
import BlogAdsSlider from '@/app/components/BlogAdsSlider';

export default async function PostCompleteListing() {

   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";

   const post = getPostList(page);
   const resultpost = await post;
   const postData = resultpost.blogdata;
   const totalrecords = resultpost.totalrecords;
   const perpagerecord = resultpost.perpagerecord;
   const number_of_page = Math.ceil(totalrecords / perpagerecord);  
   const adsData = resultpost.blogads;
   const postDataSlider = resultpost.BlogDataByCon;

   return (
      <>
         
         <section className={styles.slides}>
            <div className="container-xl">
               {postDataSlider.length > 0 &&
                  <Swiper className={styles.swiperCustomControl} modules={[Navigation]} spaceBetween={24} slidesPerView={1} navigation={{ clickable: true }}> 
                     {postDataSlider.map(function(data) {
                        return (                 
                           <SwiperSlide key={data.id}>
                              <figure className={styles.slides__items}>
                                 <div className={styles.slides__thumb}>
                                   <Image src={data.listingimage} className="img-fluid w-100" alt={data.name} width={850} height={515} />
                                 </div>
                                 <figcaption className={styles.slides__info}>
                                    <Link href={data.blogcaturl} className="blogcategory">
                                      {data.blogcatname}
                                    </Link>
                                   <h2>
                                       <Link href={data.url} className=" stretched-link">
                                          {data.name}
                                       </Link>
                                   </h2>
                                   <p>{data.shortdesc}</p>
                                   <ArrowButton buttonName="Read More" />
                                 </figcaption>
                              </figure>
                           </SwiperSlide>
                        ) 
                     })}                  
                  </Swiper>
               }
            </div>
         </section>



         <section className={styles.blogs}>
            <div className="container-xl">
               <div className="row">
                  {postData.length > 0  ?
                     <div className="col-lg-8">                        
                        <div className={styles.blogs__all}>
                           {postData.map((item) => (
                             <BlogItems key={item.id} newsObject={item} />
                           ))}
                        </div>
                        <div className="row">
                           <div className="col-12 mt-4">
                              <div className=" justify-content-center mt-3 mb-lg-0 mb-5">   
                                 <CustomPagination totalrecord={totalrecords} pagename="post" currentpage={currentpage} numberofpage={number_of_page} />
                              </div>                 
                           </div>
                        </div>                        
                     </div> :                     
                     <div className='col-lg-8'>
                        <div className="nodata"><FontAwesomeIcon icon={faWarning} /> Sorry, there are no active post matching your criteria.</div>
                     </div>                     
                  }
                  <div className="col-lg-4">
                     <div className={styles.blogs__right}>
                        <Subscribe />
                        <BlogAdsSlider adsData={adsData} />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}