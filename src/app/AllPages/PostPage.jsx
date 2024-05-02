"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Footer from "@/app/components/Footer"
import HeaderBlog from "@/app/components/header-blog"
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide, Autoplay } from "swiper/react";
import { Navigation } from "swiper";
import styles from "../scss/blogs.module.scss";
import { Breadcrumb } from "react-bootstrap";
import BlogItems from "@/app/components/BlogItems";
import Subscribe from "@/app/components/subscribe";
import SideAds from "@/app/components/side-ads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedin, faPinterest, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import TableOfContentPost from "@/app/components/TableOfContentPost";
import NotFound from "@/app/components/NotFound";
import TextComponent from "../UI/TextComponent";
import LoadingCustom from '@/app/components/loading-custom';


export default function PostPage({ itemObj, pageData }) { 
   const router = useRouter()  
   const date = new Date(' 2023-10-27');
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   const postDate = date.getDay() <= 9 ? '0' + date.getDay() : date.getDay();
   
   const [postData, setpostData] = useState('');
   const [message, setMessage] = useState('');
   const [singlepostData, setsinglepostData] = useState('');
   const [postDescription, setpostDescription] = useState('');
   const [postFaq, setpostFaq] = useState('');
   const [adsData, setadsData] = useState('');
   const [blogUrl, setblogUrl] = useState('');
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            formData.append('url', itemObj);
            const finalresult = await fetch(process.env.API_URL+'blogs/getsingleblog/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json();
           
           setpostData(result.allpost);
           setMessage(result.message);
           setsinglepostData(result.singlepost);
           setpostDescription(result.singlepostdesc);
           setpostFaq(result.postfaq);
           setadsData(result.blogads);
           setblogUrl(result.blogurl);
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
            {message=='success' ?
               <main className='pt-3'>
                  <title>{singlepostData.seotitle}</title>
                  <meta name="description" content={singlepostData.seodesc} />
                  <link rel="canonical" href={singlepostData.url} />
                  <div className="container-xl">
                    <Breadcrumb className={styles.breadcrumb}>
                      <Breadcrumb.Item href={singlepostData.homeurl}>Home</Breadcrumb.Item>
                      <Breadcrumb.Item href={blogUrl}>Blogs</Breadcrumb.Item>
                      <Breadcrumb.Item className={styles.active}>{singlepostData.name}</Breadcrumb.Item>
                    </Breadcrumb>

                  </div>
                  <section className={`${styles.banner} ${styles.banner__inner}`}>
                     <Image src={singlepostData.bannerimage} className="img-fluid" alt={singlepostData.name} width={1120} height={305} />
                     <h1>{singlepostData.name}</h1>
                     <ul className={styles.tags}>
                        <li>By Admin</li>
                        <li>{singlepostData.updateddate}</li>
                        <li><Link href={singlepostData.blogcaturl}>{singlepostData.blogcatname}</Link></li>
                     </ul>
                     <ul className={`${styles.social} social`}>
                        <li><Link href={pageData.facebook}><FontAwesomeIcon icon={faFacebookF} /></Link></li>
                        <li><Link href={pageData.twitter}><FontAwesomeIcon icon={faXTwitter} /></Link></li>
                        <li><Link href={pageData.linkedin}><FontAwesomeIcon icon={faLinkedin} /></Link></li>
                        <li><Link href={pageData.pintrest}><FontAwesomeIcon icon={faPinterest} /></Link></li>
                     </ul>
                  </section>
                  <section className={styles.blogs}>
                     <div className="container-xl">
                        <div className="row">
                           <div className="col-lg-8">
                              <div className={styles.blogs__post}>
                                 <p>{singlepostData.shortdesc}</p>
                                 <TextComponent itemObj={singlepostData.fulldesc} />
                                 <TableOfContentPost itemObj={postDescription} />      
                              </div>

                              {postFaq.length>0 &&
                                 <div className={styles.faq} itemScope="" itemType="http://schema.org/FAQPage">
                                    <h3>Frequently asked questions</h3>
                                    {postFaq.map(function(data,idx) {
                                       return (
                                          <div className={styles.faq__list} key={data.id} itemScope="" itemProp="mainEntity" itemType="http://schema.org/Question">
                                             <div itemProp="name" className={styles.question}> {data.question}</div>
                                             <div className={styles.answer} itemProp="acceptedAnswer" itemScope="" itemType="http://schema.org/Answer">
                                                <div itemProp="text">
                                                   <TextComponent itemObj={data.answer} />
                                                </div>
                                             </div>
                                          </div>
                                       )
                                    })}
                                 </div>
                              }
                           </div>

                           <div className="col-lg-4">
                              <div className={styles.blogs__right}>
                                 <Subscribe />
                                 <Swiper
                                 spaceBetween={30}
                                 centeredSlides={true}
                                 autoplay={{
                                   delay: 2500,
                                   disableOnInteraction: false,
                                 }}
                                 pagination={{
                                   clickable: true,
                                 }}
                                 >
                                    {adsData.map(item => <SwiperSlide key={item.id}>
                                      <SideAds adsObject={item} />
                                    </SwiperSlide>)}
                               </Swiper>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
                  {postData.length>0 &&
                     <section className={`container-xl ${styles.similar}`}>
                        <h3>Related More Blogs</h3>
                        <Swiper
                         className={styles.swiperCustomControl}
                         modules={[Navigation]}
                         spaceBetween={24}
                         slidesPerView={1}
                         navigation={{ clickable: true }}
                         breakpoints={{
                           1025: { slidesPerView: 2 },
                         }}
                        >
                           {postData.map((item) =>
                              <SwiperSlide key={item.id}>
                                 <BlogItems newsObject={item} />
                              </SwiperSlide>
                           )}
                        </Swiper>
                     </section>
                  }
               </main>
            : <NotFound />
            }
         </div>)}
      </>
   );
}