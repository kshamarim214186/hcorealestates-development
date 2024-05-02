import Header from "@/app/components/Header";
import DisclaimerMain from "../AllPages/DisclaimerMain";
import Footer from "@/app/components/Footer";
import styles from "@/app/scss/others.module.scss";
import getLocationType from "@/app/api/getLocationType";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";

export default async function Disclaimer() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'disclaimer';
   const projectName = 'Hco Real Estates';
   return <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
      <main className={styles.wrapper}>
         <DisclaimerMain />
      </main>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
   </>
}