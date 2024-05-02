"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "../scss/about.module.scss";
import { Breadcrumb, Accordion } from "react-bootstrap";
import LoadingCustom from '../components/loading-custom';

export default function AboutUsMain({ itemConndata, itemAwdata, itemTdata  }) {
   const router = useRouter()  
   const conndata = itemConndata;
   const awdata = itemAwdata;
   const tdata = itemTdata;

   const [otherPageData, setotherpageData] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            formData.append('url', 'about-us');
            const finalresult = await fetch(process.env.API_URL+'other-pages/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json(); 
           setotherpageData(result.otherpagedata);
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
        <title>{otherPageData.seotitle}</title>
        <meta name="description" content={otherPageData.seodesc} />
        <link rel="canonical" href={`${otherPageData.homeurl}about-us`} />
         <section className={styles.about__banner}>
            {otherPageData.banner && <Image src={otherPageData.banner} className="img-fluid w-100" alt="Dynamic required" width={1500} height={550} />}
         </section>
         <section className={styles.aboutSection}>
            <div className="container-xl">
               <Breadcrumb className={styles.bredcrumb}>
                 <Breadcrumb.Item href={otherPageData.homeurl}>Home</Breadcrumb.Item>
                 <Breadcrumb.Item active>About Us</Breadcrumb.Item>
               </Breadcrumb>
               <div className="row">
                 <div className="col-lg-5">
                   <div className={styles.aboutLeft}>
                     <div className={styles.aboutLeft__heading}>
                       <small>About</small>
                       {otherPageData.name &&<h1>{otherPageData.name}</h1>}
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-7">
                   <div className={styles.aboutRight}>
                   {otherPageData.aboutp1 && <p>{otherPageData.aboutp1}</p>}
                   {otherPageData.aboutp2 && <p>{otherPageData.aboutp2}</p>}
                   {otherPageData.aboutp3 && <p>{otherPageData.aboutp3}</p>}
                   </div>
                 </div>
               </div>
               {conndata.length > 0 && 
                  <div className="row">
                     <div className="col-12">
                        <div className={styles.others}>                              
                              {conndata.map(function(keydata, index) {
                                 return (
                                    <div className={styles.othersList} key={index}>
                                       <div className={styles.count}>
                                          <div className={styles.h1}>{keydata.number}</div>
                                          <small>{keydata.name}</small>
                                       </div>
                                       <div className="icons">
                                          <Image src={keydata.image} alt={keydata.name} width={50} height={30} />
                                       </div>
                                      <div className="others-text">{keydata.description}</div>
                                    </div>
                                 )
                              })}                               
                        </div>
                     </div>
                  </div>
               }
            </div>
         </section>
         <section className={styles.teamContent}>
            <div className="container-xl">
               {otherPageData.h2 &&<div className="h2">{otherPageData.h2}</div>}
               <div className="arrow">
                  <Image width={93} height={72} src="/images/about-us/arrow.png" alt="Awards" />
               </div>
               {tdata.length > 0 && 
                  <div className="row">                        
                     {tdata.map(function(tdata, index) {
                        return (
                           <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                              <div className={styles.teams}>
                                 <figure>
                                    <div className={styles.imgBg}>
                                       <Image width={210} height={210} src={tdata.image} className="img-fluid" alt={tdata.name} />
                                    </div>
                                    <figcaption>
                                       <h4>{tdata.name}</h4>
                                       <div className="sales">{tdata.description}</div>
                                    </figcaption>
                                 </figure>
                              </div>
                           </div>
                        )
                     })} 
                  </div>
               }
            </div>
         </section>

         <section className={styles.award}>
            <div className={styles.leaves}>
               <Image width={83} height={173} src="/images/about-us/tree-leave.svg" alt="Tree Leaves" />
            </div>
            <div className="container-xl">
               <div className="row justify-content-center">
                 <div className="col-lg-10">
                 {otherPageData.h3 &&<h2>{otherPageData.h3}</h2>}
                 {otherPageData.h3desc &&<p>{otherPageData.h3desc}</p>}
                 </div>
               </div>
               {awdata.length > 0 && 
                  <div className="row">
                     {awdata.map(function(awdata, index) {
                        return (
                          <div className="col-md-3 col-sm-6" key={index}>
                            <figure className={styles.awards}>
                              <Image className="img-fluid" width={94} height={163} src={awdata.image} alt={awdata.name} />
                              <figcaption>{awdata.name}</figcaption>
                            </figure>
                          </div>                       
                        )
                     })} 
                  </div>
               }
            </div>
         </section>
         {loading ? (
            <LoadingCustom />
         ) : (<div>
            <section className={styles.process}>
               {otherPageData.h4 &&<h2>{otherPageData.h4}</h2>}
               <div className="container-xl">
                  <div className="row">
                     <div className="col-md-4">
                        <div className={styles.process__sub}>
                           {otherPageData.teamheading &&<div className="h3">{otherPageData.teamheading}</div>}
                           {otherPageData.teamdesc &&<p>{otherPageData.teamdesc}</p>}
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className={styles.process__sub}>
                           {otherPageData.mottoheading &&<div className="h3">{otherPageData.mottoheading}</div>}
                           {otherPageData.mottodesc &&<p>{otherPageData.mottodesc}</p>}
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className={styles.process__sub}>
                           {otherPageData.visionheading &&<div className="h3">{otherPageData.visionheading}</div>}
                           {otherPageData.visiondesc &&<p>{otherPageData.visiondesc}</p>}
                        </div>
                     </div>
                  </div>
               </div>
           </section>
         </div>)}
      </>
   );
}