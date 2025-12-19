"use client";
import { useSearchParams } from 'next/navigation'
import styles from "@/app/scss/blogs.module.scss";
import getPostListByCondition from "@/app/api/getPostListByCondition";
import BlogItems from "../components/BlogItems";
import CustomPagination from "@/app/components/CustomPagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/pro-regular-svg-icons';


export default async function PostByCategory({ itemPost }) { 

   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";


   const post = getPostListByCondition('blog_category_id', itemPost, page);
   const resultpost = await post;
   const postData = resultpost.BlogDataByCon;
   const totalrecords = resultpost.totalrecords;
   const perpagerecord = resultpost.perpagerecord;
   const number_of_page = Math.ceil(totalrecords / perpagerecord);

   return ( 
      <>
         {postData.length > 0  ?
            <div className={styles.blogs__all}> 
               {postData.map((item) => (
                  <BlogItems key={item.id} newsObject={item} />
               ))}
               <div className="row">
                  <div className="col-12 mt-4">
                     <div className=" justify-content-center mt-3 mb-lg-0 mb-5">
                        <CustomPagination totalrecord={totalrecords} pagename="post/category" currentpage={currentpage} numberofpage={number_of_page} />
                     </div>
                  </div>
               </div>
            </div>:                     
            <div className='col-lg-12'>
               <div className="nodata"><FontAwesomeIcon icon={faWarning} /> Sorry, there are no active post matching your criteria.</div>
            </div>                     
         }
         
      </>   
   );
}