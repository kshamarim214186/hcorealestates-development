"use client";
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import React, { useEffect, useState } from 'react';
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
   const router = useRouter()  
   const [builderData, setbuilderData] = useState('');
   const [relatedSecond, setrelatedTwoData] = useState([]);
   const [relatedThird, setrelatedThreeData] = useState([]);
   const [developers, setallbuilderData] = useState([]);
   const [message, setmessage] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            formData.append('devurl', itemObj);
            const finalresult = await fetch(process.env.API_URL+'builders/getsingledeveloper/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json(); 
           setbuilderData(result.builder);
           setallbuilderData(result.allbuilders)
           setrelatedTwoData(result.builder.relatedTwo)
           setrelatedThreeData(result.builder.relatedThree)
           setmessage(result.message)
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
      };
      fetchData();
   }, [router]);

   return (
      <>
         {loading ? (
            <LoadingCustom />
         ) : (<div>  
         { message=='success' ?
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

               <div className={styles.allList}>
                  {builderData.h2 &&
                     <div className={styles.category}>
                        {builderData.h2 && <h2>{builderData.h2}</h2>}                    
                       <ProjectByBuilder itemObj={builderData} pageType='singlebuilder' />
                     </div>
                  }

                  {relatedSecond.length>0 &&
                     <div className={styles.category}>
                        {builderData.sectwohead &&<h2>{builderData.sectwohead}</h2>}
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
                       {builderData.secthreehead && <h2>{builderData.secthreehead}</h2>}
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
            </div>

            <section className={styles.developers}>
               <div className="container-xl">
                  <h3><small>Featured </small>Developers</h3>
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
         : <NotFound />
         }
         </div>)}
      </>
   );
}