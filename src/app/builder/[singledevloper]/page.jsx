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

   const builders = getBuilderDetails(singledevloper);
   const resultBuilders = await builders;
   return (
      <>
         <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
            <DeveloperSingle itemObj={resultBuilders} />
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}
async function getBuilderDetails(url) {
   const formData = new URLSearchParams();
   formData.append('devurl', url);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'builders/getsingledeveloper/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}