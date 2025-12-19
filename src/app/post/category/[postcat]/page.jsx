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
   const postcats = getPostDetails(decodeURIComponent(params.postcat));
   const resultPostCats = await postcats;
   return (
      <>
         <HeaderBlog resultHeader={result.pagedata} />
            <PostCatListing  resultpostCat={resultPostCats} />
         <Footer resultFooter={result} commercialData={commercialData} residentialData={residentialData} pageName={pageName} projectName={projectName} />
      </>
   );
}
async function getPostDetails(caturl) {
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   formData.append('caturl', caturl);
   const finalresult = await fetch(process.env.API_URL+'blogs/getblogbycat/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}
