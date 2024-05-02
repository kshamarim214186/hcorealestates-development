"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/contact.module.scss";
import { Breadcrumb, Tab, Nav } from "react-bootstrap";
import SocialMedia from "@/app/UI/SocialMedia";
import MainForm from "@/app/components/MainForm";
import Head from "next/head";
import LoadingCustom from '@/app/components/loading-custom';

export default function ContactUsMain({itempageData}) {
   const router = useRouter()
   const pageData = itempageData;
   const [otherPageData, setotherpageData] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            formData.append('url', 'contact-us');
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
         {loading ? (
            <LoadingCustom />
         ) : (<div>
            <title>{otherPageData.seotitle}</title>
            <meta name="description" content={otherPageData.seodesc} />
            <link rel="canonical" href={`${otherPageData.homeurl}contact-us`} />
            <section className={styles.bg}>
               <div className="container-xl">
                  <Breadcrumb className={styles.bredcrumb}>
                     <Breadcrumb.Item href={otherPageData.homeurl}>Home</Breadcrumb.Item>
                     <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className={styles.info}>
                     <h1>{otherPageData.name}</h1>
                     <p className={styles.para}>{otherPageData.overview}</p>
                  </div>
               </div>
            </section>
            <section className={styles.contact}>
               <div className="container-xl">
                  <div className="row">
                     <div className="col-lg-7">
                        <div className={styles.contact__left}>
                           <div className="h5">We would love to hear from you!</div>
                           <div className={styles.contact__info}>
                              <Link href={`tel:${otherPageData.telephonenumber.replace(" ","")}`}><span>t.</span>{otherPageData.telephonenumber} (30 Lines)</Link>
                              <Link href={`tel:${otherPageData.callnumber.replace(" ","")}`}><span>m.</span>{otherPageData.callnumber}</Link>
                              <Link href="mailto:enquiry@hcorealestates.com"><span>e.</span>enquiry@hcorealestates.com</Link>
                              <Link href={otherPageData.currentwebsite}><span>w.</span>{otherPageData.currentwebsite.replace(["https://"], "")}</Link>
                           </div>
                           <div className={styles.follow}>
                              <div className="h5">Follow Us</div>
                              <SocialMedia itemObj={pageData} />
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-5">
                        <div className={styles.contact__right}>
                           <div className="h3 text-center mb-3">Get in touch with us!</div>
                           <MainForm />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className={styles.tabs}>
               <div className="container-xl">
                  <div className="row">
                     <div className="col-12">
                        <div className="h2 mb-4">Our Offices in Delhi/NCR</div>
                        <div className={styles.tabs__area}>
                           <Tab.Container id="left-tabs-example" defaultActiveKey="office1">
                              <Nav variant="pills" className={styles.tabs__left}>
                                 <Nav.Item>
                                    <Nav.Link eventKey="office1"><div className="office_heading">Corporate Office :</div>
                                    <span dangerouslySetInnerHTML={{ __html: otherPageData.coffice }} ></span></Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link eventKey="office2"><div className="office_heading">Gurgaon Office :</div>
                                    <span dangerouslySetInnerHTML={{ __html: otherPageData.goffice }}></span></Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link eventKey="office3">
                                       <div className="office_heading">New Gurgaon Office :</div>
                                       <span dangerouslySetInnerHTML={{ __html: otherPageData.ngoffice }}></span>
                                    </Nav.Link>
                                 </Nav.Item>
                              </Nav>
                              <Tab.Content className={styles.tabs__right}>
                                 <Tab.Pane eventKey="office1">
                                    <iframe src={otherPageData.cofficeiframe} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                 </Tab.Pane>
                                 <Tab.Pane eventKey="office2">
                                    <iframe src={otherPageData.gofficeiframe} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                 </Tab.Pane>
                                 <Tab.Pane eventKey="office3">
                                    <iframe src={otherPageData.ngofficeiframe} width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                 </Tab.Pane>
                              </Tab.Content>
                           </Tab.Container>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>)}
      </>
   );
}