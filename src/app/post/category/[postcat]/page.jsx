import HeaderBlog from "@/app/components/header-blog";
import PostCatListing from "@/app/AllPages/PostCatListing";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "@/app/api/getHomeCompleteData";
import getLocationType from "@/app/api/getLocationType";

export default async function AllBlogs({ params }) {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'postcategory';
   const projectName = 'Hco Real Estates';
   return (
      <>
         <HeaderBlog resultHeader={result.pagedata} />
            <PostCatListing itemObj={decodeURIComponent(params.postcat)} />
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}
