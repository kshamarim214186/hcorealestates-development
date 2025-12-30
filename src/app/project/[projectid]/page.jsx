import { headers } from "next/headers";
import Header from "@/app/components/Header";
import ProjectPage from "@/app/AllPages/ProjectPage";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";
import FourZeroFourContent from "@/app/components/four-zero-four";

export default async function Page({ params }) {
    const headerList = headers();
  const country = headerList.get("cloudfront-viewer-country");
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   
   const properties = getProjectDetails(params.projectid);
   const resultProp = await properties;
   const prop = resultProp.prop;
   const pageName = 'project';
   const is404 = prop.is404;
   console.log(country+" Kshama");
   return (
      <>
      {is404 === 'yes' && <FourZeroFourContent />}
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} fixedTop="nottrue" ctoc={prop.propcallnumber} />
         <ProjectPage itemObj={resultProp} />
         <p>{result.userCountry} Kshama</p>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={prop.propname} ctoc={prop.propcallnumber} whatsApp={prop.propwhatsapp} />
      </>
   );
}

async function getProjectDetails(projectid) {
   const formData = new URLSearchParams();
   formData.append('propurl', projectid);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'properties/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}