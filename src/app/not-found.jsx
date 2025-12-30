import Link from "next/link";
import styles from "./scss/others.module.scss";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";

export default async function NotFound() {
   const props = getHomeCompleteData();
   const result = await props;
   const pageData = result.pagedata;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;

   const pageName = 'Not Found';
   const projectName = 'Not Found';
   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />
       <main className={styles.error}>
         <title>Not Found</title>
         <meta name="description" content="Not Found" />
         <div className={styles.error__white}>
           <div className={styles.error__inner}>
             <Image src='/images/rocket_404.png' width={101} height={101} alt="Error" className={styles.rocket} />
             <div className={styles.text404}>404</div>
             <Image src='/images/cloud_404.png' width={237} height={144} alt="Error" className={styles.cloud} />
           </div>

         </div>
         <div className={styles.error__info}>
           <h1>Oops! - Page Not Found!</h1>
           <p>The page you are looking for was moved, removed, renamed or might never existed.</p>
           <div className="d-flex gap-2 flex-wrap flex-sm-nowrap justify-content-center">
             <Link href="/" className="btn btn-outline-light">TAKE ME OUT OF HERE</Link><Link href="/contact-us/" className="btn btn-outline-light">CONTACT US</Link>
           </div>
         </div>
       </main>
       <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}
