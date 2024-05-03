"use client";
import { Suspense } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/blogs.module.scss";
import { Breadcrumb } from "react-bootstrap";
import AsyncPostSearch from "../components/AsyncPostSearch";
import HeaderBlog from "../components/header-blog";
import PostListing from "../AllPages/PostListing";
import Footer from "../components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";
import LoadingCustom from '@/app/components/loading-custom';

export default async function AllBlogs() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'postlisting';
   const projectName = 'Hco Real Estates';
   return (
    <>
      <HeaderBlog resultHeader={result.pagedata} />
         <main>
            <title>{result.pagedata.blogseotitle}</title>
            <meta name="description" content={result.pagedata.blogseodesc} />
            <link rel="canonical" href={`${result.pagedata.homeurl}post`} />                  
            <section className={styles.bg}>
               <div className="container-xl">
                  <div className={styles.bredcrumb}>
                    <Breadcrumb>
                      <Breadcrumb.Item href={result.pagedata.homeurl}>Home</Breadcrumb.Item>
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
                          <small>{result.pagedata.bloghead}</small>{result.pagedata.blogdesc}
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
               <PostListing />
            </Suspense> 
         </main>
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
    </>
  );
}
