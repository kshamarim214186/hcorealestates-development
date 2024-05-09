"use client";
import Header from "@/app/components/Header";
import AboutUsMain from "../AllPages/AboutUsMain";
import Footer from "@/app/components/Footer";
import AboutFaq from "@/app/components/AboutFaq";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";
import getTeamDetails from "@/app/api/getTeamDetails";
import { usePathname,useRouter } from 'next/navigation'
import NotFound from "@/app/components/NotFound";
import PrivacyMain from "@/app/AllPages/PrivacyMain";
import styles from "@/app/scss/others.module.scss"
import ContactUsMain from "@/app/AllPages/ContactUsMain";
import DisclaimerMain from "@/app/AllPages/DisclaimerMain";
import NriMain from "@/app/AllPages/NriMain";
import PropertiesListing from "@/app/AllPages/PropertiesListing";

export default async function AboutUs() {
const routePath = usePathname()
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
   const pageName = 'About Us';
   const projectName = 'Hco Real Estates';
   console.log("dfsdf");
   return (
    <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
      { routePath=='/about-us' ?
         <main>       
            <AboutUsMain itemConndata={conndata} itemAwdata={awdata} itemTdata={tdata} />
            <AboutFaq fqdata={fqdata} />
         </main>:

         routePath=='/privacy-policy' ?
         <main className={styles.wrapper}>
            <PrivacyMain />
         </main>: 

         routePath=='/contact-us' ?
         <main>
            <ContactUsMain itempageData={pageData} />
         </main>: 

         routePath=='/disclaimer' ?
         <main>
            <DisclaimerMain />
         </main>:

         routePath=='/nri-real-estate-investment' ?
         <main className={styles.wrapper}>
            <NriMain />
         </main>:

         routePath=='/project' ?
            <PropertiesListing developers={result.developerdata} pageName='project' pageData={result.pagedata} />
         :

         <NotFound />
      }
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
    </>
  );
}