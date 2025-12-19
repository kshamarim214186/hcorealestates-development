"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/developer.module.scss";
import CustomButton from "@/app/UI/CustomButton";
import ProjectByBuilder from "../components/ProjectByBuilder";
import CustomPagination from "@/app/components/CustomPagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/pro-regular-svg-icons';
import LoadingCustom from '../components/loading-custom';


export default function BuilderCompleteListing() { 
   const searchParams = useSearchParams() 
   const page = searchParams.get('page') ? searchParams.get('page') : "";
   const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
   
   const [builderData, setbuilderData] = useState([]);
   const [message, setMessage] = useState('');
   const [totalrecords, setTotalrecords] = useState('');
   const [perpagerecord, setPerpagerecord] = useState('');
   const [number_of_page, setNumberofpage] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('page', page);
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            const finalresult = await fetch(process.env.API_URL+'builders/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json();
           setbuilderData(result.builderdata);
           setMessage(result.message);
           setTotalrecords(result.totalrecords);
           setPerpagerecord(result.perpagerecord);
           setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
      };
      fetchData();
   }, []);
   return ( 
      <> 
         {loading ? (
           <LoadingCustom />
         ) : (<div>
         {message=='success' &&  
            <div className="row">
               <div className="col-12">
                  {builderData.map((dev) => (
                     <div key={dev.id} className={styles.builder}>
                        <div className={styles.builder__info}>
                           <Link href={dev.url} className={styles.logo}>
                              <Image src={dev.devphoto} alt={dev.name} className="img-fluid d-block" width={100} height={45} />
                           </Link>
                           <h2 className="mt-3 h4">{dev.name}</h2>
                            <div dangerouslySetInnerHTML={{ __html: dev.description.substring(0, 100) + '...' }} />
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
         }</div>)}

         {message=='record not found' &&
            <div className='col-12'>
               <div className="nodata"><FontAwesomeIcon icon={faWarning} /> Sorry, there are no active properties matching your criteria.</div>
            </div>
         }
      </>
   );
}



