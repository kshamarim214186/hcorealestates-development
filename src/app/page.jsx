import { cache } from 'react'
export const revalidate = 10
import { Suspense } from 'react'
import Header from "./components/Header";
import HomePage from "./AllPages/HomePage";
import Footer from "./components/Footer";
import getHomeCompleteData from "./api/getHomeCompleteData";
import getLocationType from "./api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';

export default async function Home() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'homepage';
   const projectName = 'Hco Real Estates';
   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} fixedTop={pageName} />
            <Suspense fallback={<LoadingCustom />}>
               <HomePage result={result} />
            </Suspense>     
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}