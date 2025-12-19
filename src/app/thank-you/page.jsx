"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../scss/others.module.scss"
import { faThumbsUp } from "@fortawesome/pro-regular-svg-icons";
import { usePathname,useRouter } from 'next/navigation'
import NotFound from "@/app/components/NotFound";

import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";

export default async function ThankYou() {
   const routePath = usePathname()
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'thankyou';
   const projectName = 'Hco Real Estates';
   return <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
      { routePath=='/thank-you' ?
         <main className={styles.wrapper}>
            <div className="container-xl">
               <div className="row justify-content-center">
                  <div className="col-lg-8">
                     <div className={styles.thank}>
                        <div className="h1"><FontAwesomeIcon icon={faThumbsUp} /><br />THANK YOU</div>
                        <div className={styles.thank__text}>We at Hcorealestates.com would like to thank you for your interest in our services and contacting us.</div>
                     </div>
                  </div>
               </div>
            </div>
         </main>: <NotFound />
      }
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
   </>
}