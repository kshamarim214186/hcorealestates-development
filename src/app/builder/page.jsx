"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? searchParams.get('page') : "1";
  const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";

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

   const builders = GetBuilderList(page);
   const resultbuild = await builders;

   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
            <Suspense fallback={<LoadingCustom />}>            
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
                     
                        <BuilderListing resultbuild={resultbuild} currentpage={currentpage} />
                     
                  </div>
               </main > 
            </Suspense>                    
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}


async function GetBuilderList(page){
   const formData = new URLSearchParams();
   formData.append('page', page);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'builders/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}