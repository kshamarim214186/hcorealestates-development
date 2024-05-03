"use client";
import styles from "../scss/properties.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PropertiesListing from "../AllPages/PropertiesListing";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import Accordion from "react-bootstrap/Accordion";


export default async function Project() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'project';
   const projectName = 'Hco Real Estates';
   const canonicalUrl = result.pagedata.homeurl+pageName;
   return (
      <>
      <Header resultHeader={result} commercialData={commercialData} residentialData={residentialData} />         
         <main className={`${styles.container} container-xl`}>
            <title>{result.pagedata.proplistseotitle}</title>
            <meta name="description" content={result.pagedata.proplistseodesc} />
            <link rel="canonical" href={canonicalUrl} />
            <Breadcrumb className={styles.bredcurmb}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Project</Breadcrumb.Item>
            </Breadcrumb>
            <PropertiesListing developers={result.developerdata} pageName={pageName} pageData={result.pagedata} />
            <div className="row">
               <div className="col-lg-12">
                  <div className={styles.overview}>
                     <h1>{result.pagedata.proplisth1}</h1>
                     <p>{result.pagedata.proplistshortdesc}</p>
                     <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                           <Accordion.Body>{result.pagedata.proplistfulldesc}</Accordion.Body>
                           <Accordion.Header as={"div"}></Accordion.Header>
                        </Accordion.Item>
                     </Accordion>
                  </div>
               </div>
            </div> 
         </main>
         
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}