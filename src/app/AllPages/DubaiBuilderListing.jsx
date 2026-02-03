"use client";
import { Suspense } from 'react'
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "@/app/scss/developer.module.scss";
import DubaiBuilderCompleteListing from "@/app/components/DubaiBuilderCompleteListing";
import LoadingCustom from '@/app/components/loading-custom';


export default function DubaiBuilderListing({ pageData }) {   
  return (
    <>
      <main className={styles.main}>
         <title>{pageData.dubaibuilderseotitle}</title>
         <meta name="description" content={pageData.dubaibuilderseodesc} />
         <link rel="canonical" href={`${pageData.homeurl}dubai-developers`} />
         <div className="container-xl">
            <Breadcrumb className={styles.bredcrumb}>
               <Breadcrumb.Item href={pageData.homeurl}>Home</Breadcrumb.Item>
               <Breadcrumb.Item active>Dubai Developers</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{pageData.dubaibuilderlisth1}</h1>           
            <Suspense fallback={<LoadingCustom />}>
               <DubaiBuilderCompleteListing />
            </Suspense> 
         </div>
      </main >
      </>
   );
}