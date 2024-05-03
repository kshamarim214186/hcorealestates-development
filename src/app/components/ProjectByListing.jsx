import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import ListItems from "../UI/ListItems";
import styles from "../scss/developer.module.scss";
import CustomPagination from "@/app/components/CustomPagination";
import LoadingCustom from './loading-custom';

export default function ProjectByListing({ resultProperties, pageName, currentpage }) { 
   const router = useRouter()  
   const properties = resultProperties.propertydata;
   const message = resultProperties.message;
   const totalrecords = resultProperties.totalrecords;
   const perpagerecord = resultProperties.perpagerecord;
   const number_of_page = Math.ceil(resultProperties.totalrecords / resultProperties.perpagerecord);
   
   return ( 
      <> 
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
         }
      </>
   );
}