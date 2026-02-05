import { Suspense } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/scss/properties.module.scss";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PropertiesListingByCondition from "../../AllPages/PropertiesListingByCondition";
import getHomeCompleteData from "../../api/getHomeCompleteData";
import getLocationType from "../../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import NotFound from "@/app/components/NotFound";

export default async function PropertyLocation({ params: { location } }) {

   const locationData = getSingleLocationDetails(location);
   const locationResult = await locationData
   const finalresult = locationResult.locationdata;

   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const columnname = 'propertype_location_id';
   const pageName = 'propertylocation';
   const projectName = 'Hco Real Estates';
   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} ctoc={finalresult.callnumber} />
      {locationResult.message=='success' ?
         <main className={`${styles.container} container-xl`}>
            <title>{finalresult.seotitle}</title>
            <meta name="description" content={finalresult.seodesc} />
            <link rel="canonical" href={finalresult.url} />
            <Suspense fallback={<LoadingCustom />}>
               <PropertiesListingByCondition itemObj={finalresult} message={locationResult.message} column={columnname} developers={locationResult.allbuilders} />
            </Suspense>
         </main>: 
         <NotFound />
      }
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} ctoc={finalresult.callnumber} whatsApp={finalresult.whatsnumber} />
      </>
   );
}

async function getSingleLocationDetails(location) {
   const formData = new URLSearchParams();

   formData.append('locurl', location);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'propertype-locations/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}