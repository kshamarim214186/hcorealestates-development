import HeaderBlog from "@/app/components/header-blog";
import PostPage from "../../AllPages/PostPage";
import Footer from "@/app/components/Footer";
import getHomeCompleteData from "../../api/getHomeCompleteData";
import getLocationType from "../../api/getLocationType";

export default async function BlogSingle({ params }) {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'singlepost';
   const projectName = 'Hco Real Estates';
   return <>
      <HeaderBlog resultHeader={result.pagedata} />
         <PostPage itemObj={decodeURIComponent(params.singlepost)} pageData={result.pagedata} />
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
   </>
}