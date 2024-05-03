"use client";
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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
   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const sort = searchParams.get('sort') ? searchParams.get('sort') : "";
   const getDev = searchParams.get('dev') ? searchParams.get('dev') : "";
   const getBed = searchParams.get('bed') ? searchParams.get('bed') : "";
   const getPType = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";
   const priceMin = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const priceMax = searchParams.get('price_max') ? searchParams.get('price_max') : "";

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