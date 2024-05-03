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

export default async function AboutUs() {
const routePath = usePathname()
   const props = getHomeCompleteData();
   const result = await props;

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
   return (
    <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
      { routePath=='/about-us' ?
         <main>       
            <AboutUsMain itemConndata={conndata} itemAwdata={awdata} itemTdata={tdata} />
            <AboutFaq fqdata={fqdata} />
         </main>: <NotFound />
      }
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
    </>
  );
}