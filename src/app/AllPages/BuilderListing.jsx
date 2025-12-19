"use client";
import { Suspense } from 'react'
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "@/app/scss/developer.module.scss";
import BuilderCompleteListing from "@/app/components/BuilderCompleteListing";
import LoadingCustom from '@/app/components/loading-custom';


export default function BuilderListing({ pageData }) {   
  return (
    <>
      <main className={styles.main}>
         <title>{pageData.builderseotitle}</title>
         <meta name="description" content={pageData.builderseodesc} />
         <link rel="canonical" href={`${pageData.homeurl}builder`} />
         <div className="container-xl">
            <Breadcrumb className={styles.bredcrumb}>
               <Breadcrumb.Item href={pageData.homeurl}>Home</Breadcrumb.Item>
               <Breadcrumb.Item active>Developers</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{pageData.builderlisth1}</h1>           
            <Suspense fallback={<LoadingCustom />}>
               <BuilderCompleteListing />
            </Suspense> 
         </div>
      </main >
      </>
   );
}