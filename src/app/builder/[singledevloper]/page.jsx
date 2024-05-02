import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DeveloperSingle from "../../AllPages/DeveloperSingle";
import getHomeCompleteData from "../../api/getHomeCompleteData";
import getLocationType from "../../api/getLocationType";

export default async function SingleDeveloper({ params: { singledevloper } }) {

   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;

   const pageName = 'singledevloper';
   const projectName = 'Hco Real Estates';
   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
            <DeveloperSingle itemObj={singledevloper} />
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}