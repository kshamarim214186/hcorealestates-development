"use client";
import { notFound } from 'next/navigation';
import { NextSeo } from "next-seo";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "@/app/scss/main.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMusic, faBadgePercent, faBank, faCartShopping, faCheck, faIndianRupeeSign, faPhoneVolume, faTimeline, faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Fancybox from "@/app/UI/Fancybox";
import Accordion from "react-bootstrap/Accordion";
import SinglePropSection from "@/app/UI/SinglePropSection";
import TextComponent from "@/app/UI/TextComponent";
import MainForm from "@/app/components/MainForm";
import FloorPlan from "@/app/components/FloorPlan";
import SpecificationDesc from "@/app/components/SpecificationDesc";
import NotFound from "@/app/components/NotFound";
import FaqSchema from '@/app/components/FaqSchema';
import MoreOverview from "@/app/UI/MoreOverview"
import MoreAmenities from "@/app/UI/MoreAmenities"
import Button from "@/app/UI/Button";
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@awesome.me/kit-e7972d293c/icons'
import DirhamIcon from '../components/DirhamIcon';

library.add(far);

export default function ProjectPage({ itemObj }) {
   if (itemObj.message === 'record not found') {
      notFound();
   }
   const message = itemObj.message;
   const propData = itemObj.prop;
   const galleryData = itemObj.gallery;
   const faqData = itemObj.faq;
   const keyplanData = itemObj.keyplan;
   const amenitiesData = itemObj.amenities;
   const floorcategory = itemObj.floorcat;
   const specategory = itemObj.specificationcat;
   const viewedmost = itemObj.mostviewed;
   const otherprop = itemObj.otherprop;
   const neighcat = itemObj.neighcat;
   const buttontext = 'Schedule Now';
   
   const whatsappUrl =  propData.propwhatsapp ? "https://api.whatsapp.com/send?phone="+propData.propwhatsapp.replace(" ","")+"&text=Hi%20I'm%20interested%20in%20"+propData.propname+"." 
                        : "";
   return (
      <>
      {message=='success' ?
         <main className={styles.main}>
            <title>{propData.seotitle}</title>
            <meta name="description" content={propData.seodesc} />
            <link rel="canonical" href={propData.propurl} />
            <section className={styles.bannerSection}>
               <div className={styles.bannerGrid}>
                  <Fancybox
                     className={`${styles.gridImages} test`}
                     options={{
                        Carousel: {
                           infinite: false,
                        },
                     }}
                     >
                     <figure className={`${styles.gridImages__item} ${styles.item1}`}>
                        {propData.mainbannerimage &&<Image src={propData.mainbannerimage} className="img-fluid w-100" alt={propData.propname} width={880} height={465} />}
                        <div className={styles.gallery__info}>
                           <Link className={styles.backBtn} href="/"><FontAwesomeIcon icon={faChevronLeft} /></Link>
                           <div className={styles.btnRight}>
                              <Link className={`${styles.counter} stretched-link`} data-fancybox="gallery" href={propData.mainbannerimage}>
                                 1 / {itemObj.gallerycount}
                              </Link>
                              {propData.videourl &&
                                 <Link className={styles.video} data-fancybox="video" href={propData.videourl}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                 </Link>
                              }
                           </div>
                        </div>
                     </figure>
                     <figure className={`${styles.gridImages__item} ${styles.item2}`}>
                        <Link data-fancybox="gallery" className="gallaryCount" href={propData.topbannerimage}>
                           {propData.topbannerimage &&<Image src={propData.topbannerimage} className="img-fluid w-100" alt={propData.topbanneralt} width={636} height={405} />}
                        </Link>
                     </figure>
                     <figure className={`${styles.gridImages__item} ${styles.item3}`}>
                        <Link data-fancybox="gallery" className="gallaryCount" href={propData.bottombannerimage}>
                           {propData.bottombannerimage &&<Image src={propData.bottombannerimage} className="img-fluid w-100" alt={propData.bottombanneralt} width={636} height={405} />}
                        </Link>
                     </figure>
                     {galleryData.length > 0 &&
                        <div className="d-none">
                           {galleryData.map(function(data) {
                              return (
                                 <Link data-fancybox="gallery" className="gallaryCount" href={data.image}  key={data.id}></Link>
                              )
                           })} 
                        </div>
                     }
                  </Fancybox>

                  <div className={styles.left}>
                     {propData.propname && <h1>{propData.propname}</h1>}
                     <ul className={styles.bhk}>
                        {propData.propbhk && <li>{propData.propbhk} {propData.propertysubtypename && <span>{propData.propertysubtypename}</span>}</li>} 
                        {(propData.propsector && propData.locationUrl) && <li> <Link href={propData.locationUrl}>{propData.propsector}{propData.locationname && <span>{", "+propData.locationname}</span>}</Link></li>}                      
                     </ul>
                  </div>
                  <div className={styles.right}>
                     {propData.logo && <div className={styles.logo}>
                    <Image
                      src={propData.logo}
                      width={130}
                      height={45}
                      className="img-fluid"
                      alt={propData.logo_alt}
                    />
                  </div>}
                     <ul>
                        {propData.price && 
                           <li>
                              Prices
                              <div className="price">
                                 {propData.locationname === 'Dubai' ? (
                                    <span>
                                       <DirhamIcon style={{ height: '13px', marginTop: '-2px' }} /> {!isNaN(propData.price) && AED}
                                       {propData.price}
                                    </span>
                                 ) : (
                                    <>
                                       <FontAwesomeIcon icon={faIndianRupeeSign} /> <span>{propData.price}</span>
                                       {!isNaN(propData.price) && <small>Cr.*</small>}
                                    </>
                                 )}
                              </div>
                           </li>
                        }

                        {propData.propsize && 
                           <li>
                              Sizes (Sq. Ft.) <span>{propData.propsize}</span>
                           </li>
                        }
                        {propData.bookingamount && 
                        <li>
                           Booking Amt.
                           {propData.locationname === 'Dubai' ? (
                              <span>
                                 <DirhamIcon style={{ height: '13px', marginTop: '-2px' }} /> {propData.bookingamount}
                              </span>
                           ) : (
                              <>
                                 <span>
                                    <FontAwesomeIcon icon={faIndianRupeeSign} /> {propData.bookingamount}
                                 </span>
                              </>
                           )}
                        </li>
                        }
                     </ul>
                  </div>
               </div>
            </section>
           
            <section className={styles.mainContent}>
               <div className="container-xl">
                  <div className="row">
                     <div className="col-lg-7">                     
                        <Breadcrumb className={styles.bredcrumb}>
                           <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                           <Breadcrumb.Item href={propData.builderurl}>{propData.buildername}</Breadcrumb.Item>
                           <Breadcrumb.Item href={propData.propertylistingurl}>Projects</Breadcrumb.Item>
                           <Breadcrumb.Item active>{propData.propname}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.highlights}>
                           {propData.h2 && <div className="h2">{propData.h2}</div>}

                           {propData.offer && 
                              <div className={styles.offers}>
                                <FontAwesomeIcon icon={faBadgePercent} />
                                <div className="offersText">{propData.offer}</div>
                              </div>
                           }
                           <div className="h2">Project Highlights:</div>
                           {keyplanData.length > 0 && 
                              <ul className={styles.highlights}>
                                 {keyplanData.map(function(keydata, index) {                                    
                                    return (
                                       <li key={keydata.id}>
                                       <FontAwesomeIcon icon={`fa-regular ${keydata.iconid}`} />                                          
                                          <div dangerouslySetInnerHTML={{ __html: keydata.name }}></div>
                                       </li>
                                    )
                                 })}  
                              </ul>
                           }
                        </div>

                        <div className={styles.propertyInfo}>
                           <div className={`${styles.headings} h2`}>Property Information</div>
                           <ul>
                              {propData.paymentplan &&
                                 <li>
                                    Payment Plan <span>{propData.paymentplan}</span>
                                 </li>
                              }
                              {propData.rera &&
                                 <li>
                                  Rera No. <span>{propData.rera}</span>
                                 </li>
                              }
                              {/*opData.propstatus &&
                                 <li>
                                  Status <span>{propData.propstatus}</span>
                                 </li>
                              */}
                              {propData.propertyarea &&
                                 <li>
                                  Site Area <span>{propData.propertyarea}</span>
                                 </li>
                              }
                              {propData.completion &&
                                 <li>
                                  Completion <span>{propData.completion}</span>
                                 </li>
                              }
                              {propData.propertytypename && 
                                 <li>
                                    Property Type <span><Link href={propData.typelocationUrl}> {propData.propertytypename}</Link></span>
                                 </li>
                              }
                           </ul>
                        </div>
                   
                        {propData.smalldesc &&
                           <div className={styles.description}>
                              <h2 className={styles.headings}>{propData.overviewheading}</h2>
                              <p>{propData.smalldesc}</p>
                              <TextComponent className={styles.description__moreContent} itemObj={propData.overview} />
                              <MoreOverview className={styles.description__modal} itemObj={propData.overview} />
                           </div>
                        }

                        {floorcategory.length > 0 &&
                           <div className={styles.priceFloors}>
                              <h3 className={styles.headings}>
                                <small>Prices & Floor Plan of </small>{propData.propname}
                              </h3>
                              <Tab.Container id="tabPriceAndFloors" defaultActiveKey={"BHK"+itemObj.floorselected}>
                                 <Fancybox
                                  options={{
                                    Carousel: {
                                      infinite: false,
                                    },
                                  }}
                                 >
                                    <Nav variant="pills">
                                       {floorcategory.map(function(catdata) {
                                          return (
                                             <Nav.Item key={catdata.id}>
                                               <Nav.Link eventKey={"BHK"+catdata.id}>{catdata.name}</Nav.Link>
                                             </Nav.Item>
                                          )
                                       })}
                                    </Nav>
                                    <Tab.Content className={styles.planLayout}> 
                                       {floorcategory.map((catdata) => (
                                          <Tab.Pane eventKey={"BHK"+catdata.id} key={catdata.id}>
                                             <FloorPlan itemObj={catdata} propId={propData.propId} projectName={propData.propname} />  
                                          </Tab.Pane>
                                       ))}                     
                                    </Tab.Content>
                                 </Fancybox>
                              </Tab.Container>
                           </div>
                        }

                        {propData.whydesc &&
                           <div className={styles.whyContent}>
                              <div className={styles.whyBox}>
                                <div className={styles.boxBg}>
                                  <Image src="/images/shape01.svg" className="img-fluid" alt="bg" width={560} height={440} />
                                </div>
                                <h4 className={`${styles.h3} h3`}>{propData.whyhead}</h4>
                                <TextComponent itemObj={propData.whydesc} />
                              </div>
                           </div>
                        }

                        {amenitiesData.length > 0 && (
                           <div className={styles.amenities}>
                              <h3 className={styles.headings}>
                                 <small>Amenities of </small>
                                 {propData.propname}
                              </h3>
                              <div className={styles.amenities__list}>
                                 {amenitiesData.map(function (data, idx) {
                                 if (idx <= 5) {
                                    return (
                                       <div className={styles.amenities__item} key={data.id}>
                                       <FontAwesomeIcon icon={`fa-regular ${data.iconid}`} /> {data.name}
                                       </div>
                                    );
                                 }
                                 })}
                              </div>

                              <MoreAmenities>
                                 <h3>Amenties</h3>
                                 {amenitiesData.map(function (data) {
                                 return (
                                    <div className={styles.amenities__restItem} key={data.id}>
                                       <FontAwesomeIcon icon={`fa-regular ${data.iconid}`} /> {data.name}
                                    </div>
                                 );
                                 })}
                              </MoreAmenities>
                           </div>
                        )}

                        {specategory.length > 0 &&
                           <div className={styles.specifications}>
                              <h2 className={styles.headings}>
                                <small>Specifications of </small>{propData.propname}
                              </h2>
                              <Swiper className={styles.swiperCustomControl} modules={[Navigation]} spaceBetween={24} slidesPerView={1} navigation={{ clickable: true }}>                           
                                 {specategory.map((catdata) => (                                 
                                    <SwiperSlide key={catdata.specicatid}>
                                       <div className={styles.specificationsHeading}>{catdata.specicatname}</div>
                                       <div className={styles.specificationsItems}>
                                          <SpecificationDesc itemObj={catdata} propId={propData.propId} /> 
                                       </div>
                                    </SwiperSlide>
                                 ))} 
                              </Swiper>
                           </div>
                        }

                        {neighcat.length > 0 &&
                           <div className={styles.locality}>
                              <h2 className={`${styles.headings} border-bottom-0`}><small>Neighborhood of </small>{propData.propname}
                              </h2>
                              <Tab.Container id="tabLocality" defaultActiveKey={itemObj.neighelected}>
                                 <Nav variant="tabs">
                                    {neighcat.map(function(catdata) {
                                       return (
                                          <Nav.Item key={catdata.neighcatid}>
                                             <Nav.Link eventKey={catdata.neighcatname}>
                                                <FontAwesomeIcon icon={`fa-regular ${catdata.iconid}`} /> 
                                                <span>{catdata.neighcatname}</span>
                                             </Nav.Link>                                      
                                          </Nav.Item>
                                       )
                                    })}
                                 </Nav>
                                 <Tab.Content> 
                                    {neighcat.map((catdata) => (                                
                                       <Tab.Pane className={styles.locality__inner} eventKey={catdata.neighcatname} key={catdata.neighcatid}>                                                                     
                                          <TextComponent itemObj={catdata.description} />                                      
                                       </Tab.Pane>  
                                    ))}                            
                                 </Tab.Content>
                              </Tab.Container>
                           </div>
                        }

                        {faqData.length > 0 &&
                           <div className={styles.faq}>
                              <FaqSchema faqList={faqData} />
                              <h2 className={styles.headings}>Frequently Asked Questions</h2>
                              <Accordion defaultActiveKey={["0"]}>
                                 {faqData.map(function(faqdata) {
                                    return (
                                       <Accordion.Item className={styles.faq__item} eventKey={faqdata.id} key={faqdata.id}>
                                          <Accordion.Header as={"h5"}>{faqdata.question}</Accordion.Header>
                                          <Accordion.Body>{faqdata.answer}</Accordion.Body>
                                       </Accordion.Item>
                                    )
                                 })}
                              </Accordion>
                           </div>
                        }

                        <div className={styles.decision}>
                           <div className={styles.decision__thumbs}>
                             <Image src="/images/project/decision-making-bg.svg" className="img-fluid" width={350} height={400} alt="Decision Corner" />
                           </div>
                           <div className={styles.decision__right}>
                             <div className={`h4 ${styles.h4}`}>Decision Corner</div>
                             <p>Do You Want a deal of Investment? Just let us know!!</p>
                              {propData.propwhatsapp && 
                                 <div className="d-grid">
                                    <a href={whatsappUrl} className="btn btn-primary btn-sm">Ask Anything</a>
                                 </div>
                              }
                              <div className={styles.or}>
                                 <span>OR</span>
                              </div>
                              <div className="d-grid">
                                 <Button itemObj={buttontext} buttonClass={`btn btn-outline-primary btn-sm`} projectName={propData.propname} />                               
                              </div>
                           </div>
                        </div>

                        <div className={styles.mostView}>
                           <h2 className={styles.headings}>Most Viewed Properties </h2>
                           <Swiper className={styles.swiperCustomControl} modules={[Navigation]} spaceBetween={16} slidesPerView={"auto"} navigation={{ clickable: true }}>
                              {viewedmost.map((item) => (
                                 <SwiperSlide key={item.id}>
                                    <SinglePropSection itemObj={item} />
                                 </SwiperSlide>
                              ))}
                           </Swiper>
                        </div>

                        {otherprop.length > 0 &&
                           <div className={styles.mostView}>
                              <h2 className={styles.headings}>Other Projects by {propData.buildername}</h2>
                              <Swiper className={styles.swiperCustomControl} modules={[Navigation]} spaceBetween={16} slidesPerView={"auto"} navigation={{ clickable: true }}>
                                {otherprop.map((item) => (
                                  <SwiperSlide key={item.id}>
                                    <SinglePropSection itemObj={item} />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                           </div>
                        }
                     </div>
                     <div className="col-lg-4 offset-lg-1">
                        <div className={styles.mainContent__right}>
                           <div className={styles.mainForm}>
                              <div className={styles.logo}><Image src={propData.logo} width={130} height={42} className="img-fluid" alt={propData.logo_alt} />
                              </div>
                              <div className={styles.heading}>EXPRESS YOUR INTEREST!</div>
                              <MainForm projectName={propData.propname} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
         : <NotFound />
      } 
      </>
   );
}