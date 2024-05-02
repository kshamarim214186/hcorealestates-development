"use client";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import LoadingCustom from '@/app/components/loading-custom';
import Accordion from "react-bootstrap/Accordion";
import styles from "@/app/scss/properties.module.scss";
import PropertiesListing from "@/app/AllPages/PropertiesListing";

export default async function Project() {


   const props = getHomeCompleteData();
   const result = await props;
   const developers= result.developerdata;
   const pageData = result.pagedata;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'properties';
   const projectName = 'Hco Real Estates';

   

   const column = 'project';
   const canonicalUrl = pageData.homeurl+'project';

   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
         <main className={`${styles.container} container-xl`}>
            <title>{pageData.proplistseotitle}</title>
            <meta name="description" content={pageData.proplistseodesc} />
            <link rel="canonical" href={canonicalUrl} />
            <Breadcrumb className={styles.bredcurmb}>
               <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
               <Breadcrumb.Item active>Projects</Breadcrumb.Item>
            </Breadcrumb>
            

            <div className="row">
               <div className="col-lg-12">
                  <div className={styles.overview}>
                     <h1>{pageData.proplisth1}</h1>
                     <p>{pageData.proplistshortdesc}</p>
                     <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                           <Accordion.Body>{pageData.proplistfulldesc}</Accordion.Body>
                           <Accordion.Header as={"div"}></Accordion.Header>
                        </Accordion.Item>
                     </Accordion>
                  </div>
               </div>
            </div>
         </main>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}