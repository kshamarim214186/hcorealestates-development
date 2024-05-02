"use client";
import { Suspense } from 'react'
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import Accordion from "react-bootstrap/Accordion";
import styles from "@/app/scss/properties.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import PropertiesListing from "../AllPages/PropertiesListing";

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
            
         </main>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}