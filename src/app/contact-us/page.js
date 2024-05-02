import Header from "@/app/components/Header";
import ContactUsMain from "../AllPages/ContactUsMain";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";

export default async function ContactUs() {

   const propsHome = getHomeCompleteData();
   const resultHome = await propsHome;
   const pageData = resultHome.pagedata;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'contactus';
   const projectName = 'Hco Real Estates';
   return ( 
      <>
         <Header resultHeader={resultHome} commercialData={commercialData} residentialData={residentialData} />
         <main>
            <ContactUsMain itempageData={pageData} />
         </main>
         <Footer resultFooter={resultHome} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}