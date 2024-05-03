"use client";
import { Suspense } from 'react'
import styles from "../scss/properties.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import Accordion from "react-bootstrap/Accordion";
import Filter from "@/app/components/Filter";
import SortFilter from "@/app/UI/sort-filter";
import ProjectByListing from "@/app/components/ProjectByListing";


export default async function Project() {

   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'project';
   const projectName = 'Hco Real Estates';
   const canonicalUrl = result.pagedata.homeurl+pageName;

   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />   
         <main className={`${styles.container} container-xl`}>
            
         </main>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}