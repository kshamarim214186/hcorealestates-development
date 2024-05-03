"use client";
import { useSearchParams } from 'next/navigation'
import styles from "../scss/properties.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';
import Accordion from "react-bootstrap/Accordion";
import Filter from "@/app/components/Filter";
import SortFilter from "@/app/UI/sort-filter";
import ProjectByListing from "@/app/components/ProjectByListing";


export default async function Project() {
   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const sort = searchParams.get('sort') ? searchParams.get('sort') : "";
   const getDev = searchParams.get('dev') ? searchParams.get('dev') : "";
   const getBed = searchParams.get('bed') ? searchParams.get('bed') : "";
   const getPType = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";
   const priceMin = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const priceMax = searchParams.get('price_max') ? searchParams.get('price_max') : "";

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

   const properties = getProjectListingDetails(page, sort, getDev, getBed, getPType, priceMin, priceMax);
   const resultProperties = await properties;

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

            <div className="row">
               <div className="col-lg-4 sticky-top">
                  <div className={`${styles.container__left}`}>                    
                     <Filter developer={result.developerdata} currentpage={currentpage} devObj={getDev} bedObj={getBed} ptypeObj={getPType} minObj={priceMin} maxObj={priceMax} sortObj={sort} />
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className={styles.container__right}>
                    <div className={styles.listInfo}>
                      <div className="">
                        <div className="h1">{result.pagedata.proplisth2}</div>                        
                      </div>
                      <div className={styles.sort}>
                        <SortFilter sortObj={sort} currentpage={currentpage} />
                      </div>
                    </div>
                    <div className={styles.allList}>
                        <ProjectByListing resultProperties={resultProperties} pageName={pageName} currentpage={currentpage} />
                    </div>
                  </div>
               </div>               
            </div>
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

async function getProjectListingDetails(page, sortObj, devObj, bedObj, ptypeObj, minObj, maxObj) {
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   formData.append('page', page);
   formData.append('sortcon', sortObj);
   formData.append('devurl', devObj);
   formData.append('bed', bedObj);
   formData.append('propertytype', ptypeObj);
   formData.append('pricemin', minObj);
   formData.append('pricemax', maxObj);
   const finalresult = await fetch(process.env.API_URL+'properties/getAllPropertiesData/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}