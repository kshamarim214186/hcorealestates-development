"use client";
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/develoer-single.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import CustomButton from "@/app/UI/CustomButton";
import Accordion from "react-bootstrap/Accordion";
import AllDevelopers from "@/app/UI/all-developers";
import ProjectByBuilder from "../components/ProjectByBuilder";
import BuildersProjectByConn from "../components/BuildersProjectByConn";
import NotFound from "@/app/components/NotFound";
import LoadingCustom from '@/app/components/loading-custom';

export default function DeveloperSingle({ itemObj }) {
   const builderData = itemObj.builder
   const relatedFirst = itemObj.builder.relatedOne;
   const relatedSecond = itemObj.builder.relatedTwo;
   const relatedThird = itemObj.builder.relatedThree;
   const developers = itemObj.allbuilders;
   const message = itemObj.message;

   if (message === 'record not found') {
      notFound();
   }

   return (
      <>  
         <main className={styles.main}>
            <title>{builderData.seotitle}</title>
            <meta name="description" content={builderData.seodesc} />
            <link rel="canonical" href={builderData.url} />
            <section className={styles.bg}>
               <Image src="/images/background-noimage-art.svg" className="w-100 img-fluid" width={500} height={250} alt="backgroun image" />
            </section>    
            <div className="container-xl">
               <div className={styles.builder}>
                  <Link href={builderData.url} className={styles.logo}>
                     <Image src={builderData.devphoto} alt={builderData.devName} className="img-fluid d-block" width={100} height={45} />
                  </Link>
                  <h1 className="mt-3">{builderData.devName}</h1>
                  <div dangerouslySetInnerHTML={{ __html: builderData.smalldesc }} />
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: builderData.description }} />
                      </Accordion.Body>
                      <Accordion.Header as={"div"}></Accordion.Header>
                    </Accordion.Item>
                  </Accordion>
               </div>

               {(relatedFirst.length || relatedSecond.length ||  relatedThird.length) &&
                  <div className={styles.allList}>
                     {relatedFirst.length>0 &&
                        <div className={styles.category}>
                           {builderData.h2 && <h2 className={styles.h2}>{builderData.h2}</h2>}
                           <Swiper
                           className={styles.swiperCustomControl}
                           modules={[Navigation]}
                           spaceBetween={24}
                           slidesPerView={'auto'}
                           navigation={{ clickable: true }}
                           breakpoints={{
                              576: { slidesPerView: 2 },
                              768: { slidesPerView: 3 },
                           }}
                           > 
                           {relatedFirst.map((item, index) => {
                              return (
                                 <SwiperSlide key={index}>
                                    <BuildersProjectByConn itemObj={item} />
                                 </SwiperSlide>
                              );
                           })}
                           </Swiper>
                        </div>
                     }

                     {relatedSecond.length>0 &&
                        <div className={styles.category}>
                           {builderData.sectwohead && <h2 className={styles.h2}>{builderData.sectwohead}</h2>}
                           <Swiper
                           className={styles.swiperCustomControl}
                           modules={[Navigation]}
                           spaceBetween={24}
                           slidesPerView={'auto'}
                           navigation={{ clickable: true }}
                           breakpoints={{
                              576: { slidesPerView: 2 },
                              768: { slidesPerView: 3 },
                           }}
                           > 
                           {relatedSecond.map((item, index) => {
                              return (
                                 <SwiperSlide key={index}>
                                    <BuildersProjectByConn itemObj={item} />
                                 </SwiperSlide>
                              );
                           })}
                           </Swiper>
                        </div>
                     }


                     {relatedThird.length > 0 &&
                        <div className={styles.category}>
                        {builderData.secthreehead && <h2 className={styles.h2}>{builderData.secthreehead}</h2>}
                        <Swiper
                           className={styles.swiperCustomControl}
                           modules={[Navigation]}
                           spaceBetween={24}
                           slidesPerView={'auto'}
                           navigation={{ clickable: true }}
                           breakpoints={{
                              576: { slidesPerView: 2 },
                              768: { slidesPerView: 3 },
                           }}
                           > 
                           {relatedThird.map((item, index) => {
                              return (
                                 <SwiperSlide key={index}>
                                    <BuildersProjectByConn itemObj={item} />
                                 </SwiperSlide>
                              );
                           })}
                           </Swiper>
                        </div>
                     }
                  </div>
               }
            </div>
            

            <section className={styles.developers}>
               <div className="container-xl">
                  <h4 className={styles.h2}><small>Featured </small>Developers</h4>
                  <Swiper
                    className={styles.swiperCustomControl}
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={'auto'}
                    navigation={{ clickable: true }}
                    breakpoints={{
                      768: { slidesPerView: 3 },
                      992: { slidesPerView: 7 },
                    }}
                  >
                     {developers.map((item) => (
                        <SwiperSlide key={item.id}>
                           <AllDevelopers developerObj={item} />
                        </SwiperSlide>
                    ))}
                  </Swiper>
                  <CustomButton url={builderData.builderurl} buttonName="Know More" />
               </div>
            </section>
         </main>
      </>
   );
}