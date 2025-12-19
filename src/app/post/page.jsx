import { cache } from 'react'
export const revalidate = 10
import HeaderBlog from "../components/header-blog";
import PostListing from "../AllPages/PostListing";
import Footer from "../components/Footer";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";

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
         <PostListing pageData={result.pagedata} />
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
    </>
  );
}
