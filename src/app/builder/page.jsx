"use client";
import React from 'react';
import { Suspense } from 'react'
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BuilderListing from "@/app/AllPages/BuilderListing";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "@/app/scss/developer.module.scss";


export default async function AllDevelopers() {
   const props = getHomeCompleteData();
   const result = await props;
   const pageData = result.pagedata;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'builderlisting';
   const projectName = 'Hco Real Estates';
   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />            
            <main className={styles.main}>
               <title>{pageData.builderseotitle}</title>
               <meta name="description" content={pageData.builderseodesc} />
               <link rel="canonical" href={`${pageData.homeurl}builder`} />
               <div className="container-xl">
                  <Breadcrumb className={styles.bredcrumb}>
                     <Breadcrumb.Item href={pageData.homeurl}>Home</Breadcrumb.Item>
                     <Breadcrumb.Item active>Developers</Breadcrumb.Item>
                  </Breadcrumb>
                  <h1>{pageData.builderlisth1}</h1> 
                  <Suspense fallback={<LoadingCustom />}>
                     <BuilderListing />
                  </Suspense> 
               </div>
            </main >                    
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}