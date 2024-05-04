"use client";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/developer.module.scss";
import CustomButton from "@/app/UI/CustomButton";
import ProjectByBuilder from "../components/ProjectByBuilder";
import CustomPagination from "@/app/components/CustomPagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/pro-regular-svg-icons';
import TextComponent from "@/app/UI/TextComponent";


export default function BuilderListing({ resultbuild, currentpage }) {

   
   
   const builderData = resultbuild.builderdata;
   const message = resultbuild.message;
   const totalrecords = resultbuild.totalrecords;
   const perpagerecord = resultbuild.perpagerecord;
   const number_of_page = Math.ceil(resultbuild.totalrecords / resultbuild.perpagerecord);


  return (
    <>  
      {message=='success' &&  
         <div className="row">
            <div className="col-12">
               {builderData.map((dev) => (
                  <div key={dev.id} className={styles.builder}>
                     <div className={styles.builder__info}>
                        <Link href={dev.url} className={styles.logo}>
                           <Image src={dev.devphoto} alt={dev.name} className="img-fluid d-block" width={100} height={45} />
                        </Link>
                        <h4 className="mt-3">{dev.name}</h4>
                         <TextComponent itemObj={dev.description} />
                        <CustomButton buttonName="Read More" url={dev.url} />
                     </div>
                     <div className={styles.builder__projects}>
                        <ProjectByBuilder itemObj={dev} pageType='builderlisting' />
                     </div>
                  </div>
               ))}
               <div className="col-12">
                  <div className={styles.paginationcontent}>
                     <CustomPagination totalrecord={totalrecords} pagename="builder" currentpage={currentpage} numberofpage={number_of_page} />
                  </div>
               </div>
            </div>
         </div>
      }

      {message=='record not found' &&
         <div className='col-12'>
            <div className="nodata"><FontAwesomeIcon icon={faWarning} /> Sorry, there are no active properties matching your criteria.</div>
         </div>
      }
      </>
   );
}