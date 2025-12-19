import { Suspense } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/scss/properties.module.scss";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PropertiesListingByCondition from "@/app/AllPages/PropertiesListingByCondition";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import NotFound from "@/app/components/NotFound";

export default async function PropertyStatus({ params: { statusurl } }) {

   const statusData = getSingleStatusDetails(statusurl);
   const statusResult = await statusData
   const finalresult = statusResult.statusdata;
   

   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const columnname = 'property_status_id';
   const pageName = 'statusurl';
   const projectName = 'Hco Real Estates';
   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
            {statusResult.message=='success' ?
               <main className={`${styles.container} container-xl`}>
                  <title>{finalresult.seotitle}</title>
                  <meta name="description" content={finalresult.seodesc} />
                  <link rel="canonical" href={finalresult.url} />
                  <Suspense fallback={<LoadingCustom />}>
                     <PropertiesListingByCondition itemObj={finalresult} message={statusResult.message} column={columnname} developers={result.developerdata} />
                  </Suspense>
               </main>: 
               <NotFound />
            }
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}

async function getSingleStatusDetails(statusurl) {
   const formData = new URLSearchParams();

   formData.append('statusurl', statusurl);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'property-status/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}