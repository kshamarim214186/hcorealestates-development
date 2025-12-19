import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import AboutUsMain from "../AllPages/AboutUsMain";
import Footer from "@/app/components/Footer";
import AboutFaq from "@/app/components/AboutFaq";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";
import getTeamDetails from "@/app/api/getTeamDetails";
import NotFound from "@/app/components/NotFound";
import PrivacyMain from "@/app/AllPages/PrivacyMain";
import styles from "@/app/scss/others.module.scss"
import ContactUsMain from "@/app/AllPages/ContactUsMain";
import DisclaimerMain from "@/app/AllPages/DisclaimerMain";
import NriMain from "@/app/AllPages/NriMain";

export default async function StaticPage({ params }) {
   const validPages = ['about-us', 'privacy-policy','contact-us','disclaimer','nri-real-estate-investment'];
   if (!validPages.includes(params.staticpage)) {
      notFound();
   }
   const props = getHomeCompleteData();
   const result = await props;
   const pageData = result.pagedata;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;


   const teamprops = getTeamDetails();
   const teamresult = await teamprops;
   const conndata = teamresult.connectiondata;
   const fqdata = teamresult.faqdata;
   const awdata = teamresult.awarddata;
   const tdata = teamresult.teamdata;
   const pageName = params.staticpage=='about-us'  ? 'About Us' :
                    params.staticpage=='privacy-policy'  ? 'Privacy Policy' :
                    params.staticpage=='contact-us'  ? 'Contact Us' :
                    params.staticpage=='disclaimer'  ? 'Disclaimer' :
                    params.staticpage=='nri-real-estate-investment'  ? 'Nri Real Estate Investment' : "Not Found";

   const projectName = 'Hco Real Estates';
   
   const otherpages = getOtherPageDetails(params.staticpage);
   const resultOtherPage = await otherpages;

   return (
    <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
      { params.staticpage=='about-us'  ?
         <main>       
            <AboutUsMain itemConndata={conndata} itemAwdata={awdata} itemTdata={tdata} resultOtherPage={resultOtherPage} />
            <AboutFaq fqdata={fqdata} />
         </main>:

         params.staticpage=='privacy-policy' ?
         <main className={styles.wrapper}>
            <PrivacyMain resultOtherPage={resultOtherPage} />
         </main>: 

         params.staticpage=='contact-us' ?
         <main>
            <ContactUsMain itempageData={pageData} resultOtherPage={resultOtherPage} />
         </main>: 

         params.staticpage=='disclaimer' ?
         <main className={styles.wrapper}>
            <DisclaimerMain resultOtherPage={resultOtherPage} />
         </main>:

         params.staticpage=='nri-real-estate-investment' ?
         <main className={styles.wrapper}>
            <NriMain resultOtherPage={resultOtherPage} />
         </main>:

         <NotFound />
      }
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
    </>
  );
}

async function getOtherPageDetails(url) {
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   formData.append('url', url);
   const finalresult = await fetch(process.env.API_URL+'other-pages/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  

   if (finalresult.message === 'record not found') {
      throw new Error("API returned 404");
   }else{
      return finalresult.json();
   }
}