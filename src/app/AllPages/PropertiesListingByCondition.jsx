"use client";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "../scss/properties.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterList } from "@fortawesome/pro-regular-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import SortFilter from "@/app/UI/sort-filter";
import ProjectByCondition from "../components/ProjectByCondition";
import Filter from "../components/Filter";
import Header from "@/app/components/Header";
import NotFound from "@/app/components/NotFound";


export default async function PropertiesListingByCondition({ itemObj,message, column, developers }) {
   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const sort = searchParams.get('sort') ? searchParams.get('sort') : "";
   const getDev = searchParams.get('dev') ? searchParams.get('dev') : "";  
   const getBed = searchParams.get('bed') ? searchParams.get('bed') : ""; 
   const getPType = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";    
   const priceMin = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const priceMax = searchParams.get('price_max') ? searchParams.get('price_max') : "";
   const resData = itemObj; 

   return (
      <>      
         <Breadcrumb className={styles.bredcurmb}>
             <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
             <Breadcrumb.Item active>{resData.name}</Breadcrumb.Item>
         </Breadcrumb>
         <div className="row">
            <div className="col-lg-4">
               <div className={`${styles.container__left} sticky-top`}>                     
                  <Filter developer={developers} currentpage={currentpage} devObj={getDev} bedObj={getBed} ptypeObj={getPType} minObj={priceMin} maxObj={priceMax} sortObj={sort} />
               </div>
            </div>
            <div className="col-lg-8">
               <div className={styles.container__right}>
                 <div className={styles.listInfo}>
                   <div className="">
                     <h1>{resData.name}</h1>                        
                   </div>
                   <div className={styles.sort}>
                     <SortFilter sortObj={sort} currentpage={currentpage} />
                   </div>
                 </div>
                 <div className={styles.allList}>
                     <ProjectByCondition itemObj={resData} page={page} currentpage={currentpage} columnname={column} sortObj={sort} devObj={getDev} bedObj={getBed} ptypeObj={getPType}  minObj={priceMin} maxObj={priceMax} />
                 </div>
               </div>
            </div>               
         </div>
         <div className="row">
            <div className="col-lg-12">
               <div className={styles.overview}>
                  <h2>{resData.h2}</h2>
                  <p>{resData.shortdesc}</p>
                  <Accordion defaultActiveKey="0">
                     <Accordion.Item eventKey="1">
                        <Accordion.Body dangerouslySetInnerHTML={{ __html: resData.fulldesc }}></Accordion.Body>
                        <Accordion.Header as={"div"}></Accordion.Header>
                     </Accordion.Item>
                 </Accordion>
               </div>
            </div>
         </div> 
      </>
   );
}