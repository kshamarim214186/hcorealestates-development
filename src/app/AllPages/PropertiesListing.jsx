import { useSearchParams } from 'next/navigation'
import { NextSeo } from "next-seo";
import Image from "next/image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "../scss/properties.module.scss";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterList } from "@fortawesome/pro-regular-svg-icons";
import CustomButton from "@/app/UI/CustomButton";
import Accordion from "react-bootstrap/Accordion";
import SortFilter from "@/app/UI/sort-filter";
import ProjectByListing from "@/app/components/ProjectByListing";
import Filter from "../components/Filter";
import ListItems from "../UI/ListItems";
import CustomPagination from "@/app/components/CustomPagination";


export default function PropertiesListing({ develop, pageName, pageData }) {

   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const sort = searchParams.get('sort') ? searchParams.get('sort') : "";
   const getDev = searchParams.get('dev') ? searchParams.get('dev') : "";
   const getBed = searchParams.get('bed') ? searchParams.get('bed') : "";
   const getPType = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";
   const priceMin = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const priceMax = searchParams.get('price_max') ? searchParams.get('price_max') : "";
   return (
      <>
         <div className="row">
            <div className="col-lg-4 sticky-top">
               <div className={`${styles.container__left}`}>                    
                  <Filter developer={develop} currentpage={currentpage} devObj={getDev} bedObj={getBed} ptypeObj={getPType} minObj={priceMin} maxObj={priceMax} sortObj={sort} />
               </div>
            </div>
            <div className="col-lg-8">
               <div className={styles.container__right}>
                 <div className={styles.listInfo}>
                   <div className="">
                     <div className="h1">{pageData.proplisth2}</div>                        
                   </div>
                   <div className={styles.sort}>
                     <SortFilter sortObj={sort} currentpage={currentpage} />
                   </div>
                 </div>
                 <div className={styles.allList}>
                     <ProjectByListing page={page} pageName={pageName} currentpage={currentpage} sortObj={sort} devObj={getDev} bedObj={getBed} ptypeObj={getPType}  minObj={priceMin} maxObj={priceMax} />
                  
                 </div>
               </div>
            </div>               
         </div>
      </>
   );
}