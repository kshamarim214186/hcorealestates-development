"use client";
import { Suspense } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/scss/blogs.module.scss";
import { Breadcrumb } from "react-bootstrap";
import AsyncPostSearch from "@/app/components/AsyncPostSearch";
import LoadingCustom from '@/app/components/loading-custom';
import PostCompleteListing from "@/app/components/PostCompleteListing";

export default function PostListing({ pageData }) {
   return (
      <>
      <main>
         <title>{pageData.blogseotitle}</title>
         <meta name="description" content={pageData.blogseodesc} />
         <link rel="canonical" href={`${pageData.homeurl}post`} />
         <section className={styles.bg}>
            <div className="container-xl">
               <div className={styles.bredcrumb}>
                 <Breadcrumb>
                   <Breadcrumb.Item href={pageData.homeurl}>Home</Breadcrumb.Item>
                   <Breadcrumb.Item active>Blogs</Breadcrumb.Item>
                 </Breadcrumb>
               </div>
            </div>
            <div className="">
               <Image src="/images/background-noimage-art.svg" className="w-100 img-fluid" width={500} height={250} alt="backgroun image" />
            </div>
            <div className={styles.bg__content}>
               <div className="container-xl">
                 <div className="row justify-content-center">
                   <div className="col-md-8">
                     <h1 className="mb-4">
                       <small>{pageData.bloghead}</small>{pageData.blogdesc}
                     </h1>
                     <div className={styles.bg__search}>
                       <AsyncPostSearch />
                     </div>
                   </div>
                 </div>
               </div>
            </div>
         </section>

         <Suspense fallback={<LoadingCustom />}>
            <PostCompleteListing />
         </Suspense> 
      </main>
      </>
   );
}