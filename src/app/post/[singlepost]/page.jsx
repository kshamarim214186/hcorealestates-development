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

   const posts = getPostDetails(decodeURIComponent(params.singlepost));
   const resultPosts = await posts;
   const is404 = resultPosts.singlepost.is404;
   return <>
      <HeaderBlog resultHeader={result.pagedata} />
         <PostPage itemObj={resultPosts} pageData={result.pagedata} />
      <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
   </>
}

async function getPostDetails(url) {
   const formData = new URLSearchParams();
   formData.append('url', url);
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'blogs/getsingleblog/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}