"use client";
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BuilderListing from "../AllPages/BuilderListing";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';


export default async function AllDevelopers() {
   const searchParams = useSearchParams()
   const page = searchParams.get('page') ? searchParams.get('page') : "1";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   
   const props = getHomeCompleteData();
   const result = await props;

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
         <Suspense fallback={<LoadingCustom />}>
            <BuilderListing pageData={result.pagedata} page={page} currentpage={currentpage} />
         </Suspense>         
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}