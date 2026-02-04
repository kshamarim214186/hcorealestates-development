import { cache } from 'react'
export const revalidate = 10
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DubaiPropertiesListing from "../AllPages/DubaiPropertiesListing";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";

export default async function Properties() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'dubai-projects';
   const projectName = 'Hco Real Estates';
   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} ctoc={result.pagedata.dubaicall} />
         <DubaiPropertiesListing developers={result.dubaideveloperdata} pageName={pageName} pageData={result.pagedata} />
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} ctoc={result.pagedata.dubaicall} whatsApp={result.pagedata.dubaiwhatsapp} />
      </>
   );
}