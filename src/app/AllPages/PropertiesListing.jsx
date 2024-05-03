"use client";
import { Suspense } from 'react'
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
import ProjectByListing from "@/app/components/ProjectByListing";
import Filter from "../components/Filter";
import ListItems from "../UI/ListItems";
import CustomPagination from "@/app/components/CustomPagination";
import LoadingCustom from '@/app/components/loading-custom';


export default function PropertiesListing({ developers, pageName, pageData }) {  
   
   const column = 'properties';
   const canonicalUrl = pageData.homeurl+pageName;
   return (
      <>
         <main className={`${styles.container} container-xl`}>
            <title>{pageData.proplistseotitle}</title>
            <meta name="description" content={pageData.proplistseodesc} />
            <link rel="canonical" href={canonicalUrl} />
            <Breadcrumb className={styles.bredcurmb}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Properties</Breadcrumb.Item>
            </Breadcrumb>
            <Suspense fallback={<LoadingCustom />}>
               <ProjectByListing developers={developers} pageName={pageName} pageData={pageData} />
            </Suspense> 
            <div className="row">
               <div className="col-lg-12">
                  <div className={styles.overview}>
                     <h1>{pageData.proplisth1}</h1>
                     <p>{pageData.proplistshortdesc}</p>
                     <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                           <Accordion.Body>{pageData.proplistfulldesc}</Accordion.Body>
                           <Accordion.Header as={"div"}></Accordion.Header>
                        </Accordion.Item>
                     </Accordion>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}