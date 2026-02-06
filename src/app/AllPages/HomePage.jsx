'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss/pagination';
import CustomButton from '../UI/CustomButton';
import SinglePropSection from '../UI/SinglePropSection';
import AllDevelopers from '../UI/all-developers';
import AsyncSearch from '../components/AsyncSearch';
import BlogItems from '../components/BlogItems';
import PropertyCard from '../components/PropertyCard';
import PopupModal from '../components/popup-modal';
import styles from '../scss/home.module.scss';

export default function HomePage({ result }) {
  const [popupShow, setPopupShow] = useState(false);
  useEffect(() => {
    const popupShown = sessionStorage.getItem('popupShown');
    if (!popupShown) {
      setPopupShow(true);
    }
  }, []);

  const closeModal = () => {
    setPopupShow(false);
    sessionStorage.setItem('popupShown', 'true');
  };

  const pageData = result.pagedata;
  const spotlight = result.spotlight;
  const spotlightdubai = result.spotlightdubai;
  const featuredPro = result.featuredproject;
  const featureddubaiPro = result.featureddubaiproject;
  const developers = result.developerdata;
  const dubaidevelopers = result.dubaideveloperdata;
  const banksData = result.bankdata;
  const blogs = result.blogdata;
  const popularsearch = result.popularsearch;
  const otherproject = result.otherproject;
  const testimonial = result.testimonial;
  return (
    <>
      <main className={styles.root}>
        <title>{pageData.seotitle}</title>
        <meta name="description" content={pageData.seodesc} />
        <link rel="canonical" href={pageData.homeurl} />
        <section className={styles.bannerSection}>
          <div className={styles.banner}>
            <Image
              src={pageData.banner}
              className={`img-fluid w-100 ${styles.bannerImage}`}
              alt={pageData.name}
              width={1500}
              height={550}
              quality={100}
            />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PopupModal show={popupShow} onHide={() => setPopupShow(false)} onClick={closeModal}>
          {pageData.popupurl && pageData.popupimage && (
            <Link href={pageData.popupurl} target="_blank">
              <Image
                src={pageData.popupimage}
                className="img-fluid w-100 h-100"
                alt={pageData.name}
                width={800}
                quality={100}
                height={560}
              />
            </Link>
          )}
          {pageData.popupurl == '' && pageData.popupimage && (
            <Image
              src={pageData.popupimage}
              className="img-fluid w-100 h-100"
              alt={pageData.name}
              width={800}
              quality={100}
              height={560}
            />
          )}
        </PopupModal>

        <section className={`container-xl ${styles.popularSection}`}>
          <div className="row">
            <div className={`col-12 ${styles.heading}`}>
              <div className="h2">{pageData.h2}</div>
              <div className="">{pageData.htwodesc}</div>
            </div>
            <div className="col-lg-6">
              <div className={styles.placeContainer}>
                <div className={styles.iconBox}>
                  <Image src={pageData.indiaicon} className="img-fluid" alt="India" width={96} height={96} />
                </div>
                <div className="text-center mb-3">
                  {pageData.indiafirsthead &&(<div className="h4 mb-0">{pageData.indiafirsthead}</div>)}
                  {pageData.indiafirstdesc &&(<div className="">{pageData.indiafirstdesc}</div>)}
                </div>
                <Swiper
                  className={styles.swiperContainer}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                  }}
                >
                  {featuredPro.map((item) => (
                    <SwiperSlide key={item.id}>
                      <PropertyCard property={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className={styles.placeSeparator}>
                  <CustomButton url={pageData.propertylistingurl} buttonName="India More Properties" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.placeContainer}>
                <div className={styles.iconBox}>
                  <Image src={pageData.dubaicon} className="img-fluid" alt="Dubai" width={96} height={96} />
                </div>
                <div className="text-center mb-3">
                  {pageData.dubaifirsthead &&(<div className="h4 mb-0">{pageData.dubaifirsthead}</div>)}
                  {pageData.dubaifirstdesc &&(<div className="">{pageData.dubaifirstdesc}</div>)}
                </div>
                <Swiper
                  className={styles.swiperContainer}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                  }}
                >
                  {featureddubaiPro.map((item) => (
                    <SwiperSlide key={item.id}>
                      <PropertyCard property={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className={styles.placeSeparator}>
                  <CustomButton url={pageData.dubaiprolistingurl} buttonName="Dubai More Properties" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* India Luxury Properties Section */}
        <section className={styles.featureProject}>
          <div className="container-xl">
            <h2 dangerouslySetInnerHTML={{ __html: pageData.fhead }}></h2>
            <p className={styles['sub-head']}>{pageData.fdesc}</p>
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
              {spotlight.map((item) => (
                <SwiperSlide key={item.id}>
                  <SinglePropSection itemObj={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Dubai High Demand Projects */}
        <section className={`${styles.demandSection} ${styles.featureProject}`}>
          <div className="container-xl">
            {pageData.dubaithirdhead &&(<h2>{pageData.dubaithirdhead}</h2>)}
            {pageData.dubaithirddesc &&(<p className={styles['sub-head']}>{pageData.dubaithirddesc}</p>)}
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
              {spotlightdubai.map((item) => (
                <SwiperSlide key={item.id}>
                  <SinglePropSection itemObj={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Newe Launch, Ready To Move, under construction */}
        <section className={styles.featureCollection}>
          <div className="container-xl">
            <h2 dangerouslySetInnerHTML={{ __html: pageData.thirdhead }}></h2>
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
                    <Image
                      src={item.property_image}
                      className="img-fluid w-100"
                      alt={item.name}
                      width={636}
                      height={405}
                    />
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
        {/* Categories */}
        { /*<section className={styles.categories}>
          <div className="container-xl">
            <div className="row">
              <div className="col-lg-4">
                <div className={styles.categoriesLeft}>
                  <h2>Browse Property Categories</h2>
                  <p>
                    When it comes to buying property in Dubai, aligning yourself with a top-notch real estate developer
                    is very important. In this section, we present a list of the most reputable and esteemed real estate
                    developers in Dubai, ensuring your investment is in capable hands.
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <Swiper
                  className={styles.swiperContainer}
                  modules={[Navigation]}
                  spaceBetween={18}
                  slidesPerView={'auto'}
                  navigation={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                  }}
                >
                  {featuredPro.map((item) => (
                    <SwiperSlide tag="figure" key={item.id} className={styles.card}>
                      <Image
                        src="https://www.images.hcorealestates.com/img/gallery/gallery_tarc-kailasa-gallery-image-15.webp"
                        className={styles.thumbImg}
                        width={390}
                        height={500}
                        alt="Dummy text"
                      />

                      <div className={styles.cardOverlay}>
                        <h4 className="h5">
                          <a href="1" className="stretched-link">
                            Apartments
                          </a>
                        </h4>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className={styles.desc}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus.
                          </div>
                          <span className={styles.arrow}>→</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>*/ }

        {/* India developers */}
        <section className={styles.developers}>
          <div className="container-xl">
            <div className={styles.developerContainer}>
              <div className={styles.developerWrapper}>
                <div className={styles.iconWrapper}>
                  <span className={styles.bgCircle}></span>
                  <Image
                    src={pageData.indiaicon}
                    alt="India Developers"
                    quality={100}
                    width={60}
                    height={60}
                    className={styles.icon}
                  />
                </div>
                <div className="">
                  <h2 dangerouslySetInnerHTML={{ __html: pageData.devhead }} className="mb-0"></h2>
                  <div className={styles['sub-head']}>{pageData.devdesc}</div>
                </div>
              </div>
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
                  1025: { slidesPerView: 7 },
                }}
              >
                {developers.map((item) => (
                  <SwiperSlide key={item.id}>
                    <AllDevelopers developerObj={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <CustomButton url={pageData.builderurl} buttonName="India More Builders" />
          </div>
        </section>

        {/* Dubai Developers */}
        <section className={styles.developers}>
          <div className="container-xl">
            <div className={styles.developerContainer}>
              <div className={styles.developerWrapper}>
                <div className={styles.iconWrapper}>
                  <span className={styles.bgCircle}></span>
                  <Image
                    src={pageData.dubaicon}
                    alt="India Developers"
                    quality={100}
                    width={60}
                    height={60}
                    className={styles.icon}
                  />
                </div>
                <div className="">
                  {pageData.devdubaihead && (<h2 dangerouslySetInnerHTML={{ __html: pageData.devdubaihead }} className="mb-0"></h2> )}
                  {pageData.devdubaidesc && (<div className={styles['sub-head']}>{pageData.devdubaidesc}</div> )}
                </div>
              </div>
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
                  1025: { slidesPerView: 7 },
                }}
              >
                {dubaidevelopers.map((item) => (
                  <SwiperSlide key={item.id}>
                    <AllDevelopers developerObj={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <CustomButton url={pageData.dubaibuilderurl} buttonName="Dubai More Developers" />
          </div>
        </section>

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
                  {(item.shortdesc = '')}
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
              <Swiper
                className={styles.swiperCustomControl}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
              >
                {testimonial.map((testimonialdata) => (
                  <SwiperSlide key={testimonialdata.id}>
                    <figure className={styles.items}>
                      <div className={styles.thumbs}>
                        {testimonialdata.userimage && (
                          <Image
                            src={testimonialdata.userimage}
                            className="img-fluid w-100"
                            alt="Best Countries To Invest"
                            width={150}
                            height={150}
                          />
                        )}
                      </div>
                      <div className={styles.right}>
                        {testimonialdata.name && <div className="h4">{testimonialdata.name}</div>}
                        {testimonialdata.location && <div className={styles.location}>{testimonialdata.location}</div>}
                        {testimonialdata.shortdesc && <p>{testimonialdata.shortdesc}</p>}
                      </div>
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
        {/* <div className={styles.bg}>
          <Image
            src="/images/home-bg.svg"
            className="img-fluid"
            sizes="(min-width:768) 768vw, 100vw"
            alt="Home bg"
            width={700}
            height={1500}
          />
        </div> */}
      </main>
    </>
  );
}
