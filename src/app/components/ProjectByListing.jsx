"use client";
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import ListItems from "../UI/ListItems";
import styles from "../scss/properties.module.scss";
import CustomPagination from "@/app/components/CustomPagination";
import LoadingCustom from './loading-custom';

import SortFilter from "@/app/UI/sort-filter";
import Filter from "../components/Filter";

export default function ProjectByListing({ developers, pageName, pageData, location }) { 
   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   const sortObj = searchParams.get('sort') ? searchParams.get('sort') : "";
   const devObj = searchParams.get('dev') ? searchParams.get('dev') : "";
   const bedObj = searchParams.get('bed') ? searchParams.get('bed') : "";
   const ptypeObj = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";
   const minObj = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const maxObj = searchParams.get('price_max') ? searchParams.get('price_max') : "";

   
   const [properties, setProperties] = useState([]);
   const [message, setMessage] = useState('');
   const [totalrecords, setTotalrecords] = useState('');
   const [perpagerecord, setPerpagerecord] = useState('');
   const [number_of_page, setNumberofpage] = useState('');
   const [loading, setLoading] = useState(true);
   const router = useRouter()
   useEffect(() => {
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
      formData.append('pageName', pageName);
      fetch(process.env.API_URL+'properties/getAllPropertiesData/', {
         method: 'POST',
         cache: 'force-cache',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData,
      })
      .then((res) => res.json())
      .then((result) => {
         if ((!Array.isArray(result.propertydata) || result.propertydata.length === 0) && location == 'dubai') {
            router.push('https://www.hcorealestates.com/dubai-projects');
         }else{
            router.push('https://www.hcorealestates.com/project');
         }
         setProperties(result.propertydata);
         setMessage(result.message);
         setTotalrecords(result.totalrecords);
         setPerpagerecord(result.perpagerecord);
         setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
         setLoading(false)
      })
   }, [router, bedObj, devObj, maxObj, minObj, ptypeObj, page, sortObj]);
   return ( 
      <> 
         <div className="row">
            <div className="col-lg-4">
               <div className={`${styles.container__left} sticky-top`}>        
                  <Filter developer={developers} currentpage={currentpage} devObj={devObj} bedObj={bedObj} ptypeObj={ptypeObj} minObj={minObj} maxObj={maxObj} sortObj={sortObj} {...(location && { proplocation: location })} />
               </div>
            </div>
            <div className="col-lg-8">
               <div className={styles.container__right}>
                 <div className={styles.listInfo}>
                   <div className="">
                     {pageName == 'dubai-projects' ? <h2 className="h1">{pageData.dubaiproplisth2}</h2> : <h2 className="h1">{pageData.proplisth2}</h2> }                                 
                   </div>
                   <div className={styles.sort}>
                     <SortFilter sortObj={sortObj} currentpage={currentpage} />
                   </div>
                 </div>
                 <div className={styles.allList}>
                     {loading ? (<LoadingCustom key={pageName} />) : (<div>
                        <div className={styles.counts}>
                           {Number(totalrecords)} {Number(totalrecords) <= 1 ? "Property" : "Properties"} Found
                        </div>
                        {properties.map(function (property) {
                           return (
                              <ListItems itemObj={property} key={property.id} />
                           );
                        })}
                        {message == 'success' &&
                         <div className="col-12">
                           <div className={styles.paginContainer}>
                             <CustomPagination totalrecord={totalrecords} pagename={pageName} currentpage={currentpage} numberofpage={number_of_page} />
                           </div>
                         </div>
                        }</div>)
                     }
                 </div>
               </div>
            </div>               
         </div>
      </>
   );
}



