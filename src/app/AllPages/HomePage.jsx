"use client";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import "swiper/scss/pagination";
import styles from "../scss/home.module.scss";
import AsyncSearch from "../components/AsyncSearch";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCity, faIndianRupeeSign, faLocationDot, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomButton from "../UI/CustomButton";
import SinglePropSection from "../UI/SinglePropSection";
import AllDevelopers from "../UI/all-developers";
import BlogItems from "../components/BlogItems";
import PopupModal from "../components/popup-modal";
import { useState, useEffect } from "react";
import CommonAds from "../components/ads";


export default function HomePage({ result }) {
   const [popupShow, setPopupShow] = useState(false);
   useEffect(() => {
   const popupShown = sessionStorage.getItem('popupShown');
      if (!popupShown) {
         setPopupShow(true)         
      }
   }, [])

   const closeModal = () => {
      setPopupShow(false);
      sessionStorage.setItem('popupShown', 'true');
   };

   const pageData = result.pagedata;
   const spotlight = result.spotlight;
   const featuredPro = result.featuredproject;
   const developers = result.developerdata;
   const banksData = result.bankdata;
   const blogs = result.blogdata;
   const popularsearch = result.popularsearch;
   const otherproject = result.otherproject;
   const testimonial = result.testimonial;  
   return (
      <>
         <main className="position-relative">
            <title>{pageData.seotitle}</title>
            <meta name="description" content={pageData.seodesc} />
            <link rel="canonical" href={pageData.homeurl} />
            <section className={styles.bannerSection}>
               <div className={styles.banner}>
                  <Image src={pageData.banner} className="img-fluid w-100" sizes="(min-width:768) 768vw, 100vw" alt={pageData.name} width={1500} height={550} quality={100} />
               </div>
               <div className={styles.homeSearch}>
                  <div className="container-xl">
                     <div className="row justify-content-center">
                        <div className="col-sm-8 col-md-7">
                           <h1 className={`${styles.h1}`}>{pageData.name}</h1>
                           <div className={styles.inner}>
                              <div className="customSearches">
                                 <AsyncSearch />
                              </div>
                              <div className={styles.popularSearch}>
                                 <div className={styles.heading}>Popular Searches:</div>
                                 <ul>
                                    {popularsearch.map((item) => (
                                    <li key={item.id}>
                                       <Link href={item.url}>{item.text}</Link>
                                    </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <CommonAds />
            <PopupModal show={popupShow} onHide={() => setPopupShow(false)} onClick={closeModal}>
               {pageData.popupurl && pageData.popupimage && <Link href={pageData.popupurl} target="_blank"><Image src={pageData.popupimage} className='img-fluid w-100 h-100' alt={pageData.name} width={800} quality={100} height={560} /></Link>}
               {pageData.popupurl=='' && pageData.popupimage &&<Image src={pageData.popupimage} className='img-fluid w-100 h-100' alt={pageData.name} width={800} quality={100} height={560} /> }
            </PopupModal>
            
            <section className={styles.topProjectContent}>
               <div className="container-xl">
                  <h2 dangerouslySetInnerHTML={{ __html: pageData.h2 }}></h2>
                  <p className={styles['sub-head']}>{pageData.htwodesc}</p>
                  <Swiper
                     className={styles.swiperCustomControl}
                     modules={[Navigation]}
                     spaceBetween={18}
                     slidesPerView={'auto'}
                     navigation={{ clickable: true }}
                     breakpoints={{
                        768: {
                           slidesPerView: 2,
                           spaceBetween: 32,
                        },
                     }}
                  >
                  {spotlight.map((item) => (
                     <SwiperSlide key={item.id}>
                        <figure className={styles.bigThumb}>
                           <div className={styles.thumb}>
                             <Image src={item.property_image} className="img-fluid w-100" alt={item.name} width={636} height={405} />
                           </div>
                           <figcaption>
                              <div>
                                 <h4>{item.name}</h4>
                                 <ul>
                                    <li><FontAwesomeIcon icon={faLocationDot} /> {item.locationname}</li>
                                    <li><FontAwesomeIcon icon={faRulerCombined} /> {item.propbhk}</li>
                                    <li><FontAwesomeIcon icon={faCity} /> {item.propertysubtypename}</li>
                                 </ul>
                                 <div className="price">
                                    {item.locationname === 'Dubai' ? (
                                       <span>{item.price}</span>
                                    ) : (
                                    <span>
                                       <FontAwesomeIcon icon={faIndianRupeeSign} /> <span>{item.price}</span>
                                    </span>
                                    )}
                                 </div>
                              </div>
                              <Link href={item.url} className={`${styles.viewProjects} stretched-link`}>
                                 <FontAwesomeIcon icon={faChevronRight} />
                              </Link>
                           </figcaption>
                        </figure>
                     </SwiperSlide>
                  ))}
                  </Swiper>
               </div>
            </section>

            <section className={styles.featureProject}>
               <div className="container-xl">
                  <h2 dangerouslySetInnerHTML={{ __html: pageData.fhead }}></h2>
                  <p className={styles['sub-head']}>{pageData.fdesc }</p>
                  <Swiper
                     className={styles.swiperCustomControl}
                     modules={[Navigation]}
                     spaceBetween={18}
                     slidesPerView={'auto'}
                     navigation={{ clickable: true }}
                     breakpoints={{
                       640: { slidesPerView: 2 },
                       1025: { slidesPerView: 3 },
                     }}
                     >
                     {featuredPro.map((item) => (
                        <SwiperSlide key={item.id}>
                           <SinglePropSection itemObj={item} />
                        </SwiperSlide>
                     ))}
                  </Swiper>
              </div>
            </section>

            <section className={styles.featureCollection}>
              <div className="container-xl">
                <h2  dangerouslySetInnerHTML={{ __html: pageData.thirdhead }}></h2>
                <p className={styles['sub-head']}>{pageData.thirddesc}</p>
                <Swiper
                  className={styles.swiperCustomControl}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                  }}
                >
                  {otherproject.map((item) => (
                    <SwiperSlide key={item.id}>
                      <figure className={styles.list}>
                        <Image src={item.property_image} className="img-fluid w-100" alt={item.name} width={636} height={405} />
                        <figcaption>
                          <h5>
                            <Link href={item.url} className="stretched-link">
                              {item.name}
                            </Link>
                          </h5>
                        </figcaption>
                      </figure>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            <section className={styles.developers}>
               <div className="container-xl">
                  <h2 dangerouslySetInnerHTML={{ __html: pageData.devhead }}></h2>
                  <p className={styles['sub-head']}>{pageData.devdesc}</p>
                  <Swiper
                     className={styles.swiperCustomControl}
                     modules={[Navigation]}
                     spaceBetween={18}
                     slidesPerView={"auto"}
                     navigation={{ clickable: true }}
                     breakpoints={{
                       640: { slidesPerView: 3 },
                       768: { slidesPerView: 4 },
                       992: { slidesPerView: 5 },
                       1025: { slidesPerView: 7 },
                     }}
                  >
                     {developers.map((item) => (
                       <SwiperSlide key={item.id}>
                         <AllDevelopers developerObj={item} />
                       </SwiperSlide>
                     ))}
                  </Swiper>
                <CustomButton url={pageData.builderurl} buttonName="Know More" />
               </div>
            </section>

            {/* Home Loan Section */}
            { /*<section className={styles.developers}>
               <div className="container-xl">
                  <h2 dangerouslySetInnerHTML={{ __html: pageData.bankhomehead }}></h2>                  
                  <p className={styles['sub-head']}>
                  {pageData.bankhomedesc}
                  </p>
                  <Swiper
                  className={styles.swiperCustomControl}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                     640: { slidesPerView: 3 },
                     768: { slidesPerView: 4 },
                     992: { slidesPerView: 5 },
                  }}
                  >
                  {banksData.map(bank => (
                     <SwiperSlide key={bank.id}>
                        <AllDevelopers developerObj={bank} />
                     </SwiperSlide>
                  ))}
                  </Swiper>
                  <CustomButton url={pageData.loanurl} buttonName="Know More" />
               </div>
            </section>*/ }

            <section className={styles.news}>
              <div className="container-xl">
                <h3 dangerouslySetInnerHTML={{ __html: pageData.bloghead }}></h3>
                <p className={styles['sub-head']}>{pageData.blogdesc}</p>
                <Swiper
                  className={styles.swiperCustomControl}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                  }}
                >
                  {blogs.map((item) => (
                     <SwiperSlide key={item.id}>
                        {item.shortdesc = ''}
                        <BlogItems newsObject={item} />
                     </SwiperSlide>
                  ))}
                </Swiper>
                <CustomButton url={pageData.posturl} buttonName="Know More" />
              </div>
            </section>

            <section className={styles.testimonials}>
              <div className="container-xl">
                <h2>{pageData.testihead}</h2>
                <p className={styles['sub-head']}>{pageData.testidesc}</p>
                <div className={styles.testimonials__bg}>
                  <div className={styles.leftBg}>
                    <Image src="/images/shape01.svg" className="img-fluid w-100" alt="bg" width={150} height={150} />
                  </div>
                  <div className={styles.rightBg}>
                    <Image src="/images/shape01.svg" className="img-fluid w-100" alt="bg" width={150} height={150} />
                  </div>
                  <Swiper className={styles.swiperCustomControl} modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={24} slidesPerView={1}>
                     {testimonial.map((testimonialdata) => (
                        <SwiperSlide key={testimonialdata.id}>
                           <figure className={styles.items}>
                              <div className={styles.thumbs}>
                                 {testimonialdata.userimage &&<Image src={testimonialdata.userimage} className="img-fluid w-100" alt="Best Countries To Invest" width={150} height={150} />}
                              </div>
                              <div className={styles.right}>
                                 {testimonialdata.name &&<div className="h4">{testimonialdata.name}</div>}
                                 {testimonialdata.location &&<div className={styles.location}>{testimonialdata.location}</div>}
                                 {testimonialdata.shortdesc &&<p>{testimonialdata.shortdesc}</p>}
                              </div>
                           </figure>
                        </SwiperSlide>
                     ))}
                  </Swiper>
                </div>
              </div>
            </section>
            <div className={styles.bg}>
              <Image src="/images/home-bg.svg" className="img-fluid" sizes="(min-width:768) 768vw, 100vw" alt="Home bg" width={700} height={1500} />
            </div>
         </main>
      </>
   );
}