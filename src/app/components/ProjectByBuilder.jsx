import React, { useEffect, useState } from 'react';
import SinglePropSection from "../UI/SinglePropSection";
import styles from "../scss/developer.module.scss";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingCustom from './loading-custom';

export default function ProjectByBuilder({ itemObj, pageType }) { 
   const [properties, setProperties] = useState([]);
   const [message, setMessage] = useState('');
   const [totalrecords, setTotalrecords] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('builder_id', itemObj.id);            
            formData.append('pagetype', pageType);
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            const finalresult = await fetch(process.env.API_URL+'builders/getprojectbybuilder/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json();
           setProperties(result.projectbybuilder);
           setTotalrecords(result.totalproject);
           setMessage(result.message);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
      };
      fetchData();
   }, [pageType, itemObj.id]);

   return ( 
      <>
         <div> 
            {loading ? (
              <LoadingCustom />
            ) : (<div> 
               {(pageType=='builderlisting' && Number(totalrecords)>0) &&     
                  <div className={styles['num-of-properties']}>
                     {`${itemObj.name} (${Number(totalrecords)})`}                     
                  </div>
               }               
               {Number(totalrecords)>0 &&
                  <Swiper
                     className={styles.swiperCustomControl}
                     modules={[Navigation]}
                     spaceBetween={24}
                      slidesPerView={'auto'}
                     navigation={{ clickable: true }}
                     breakpoints={{
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                     }}
                  > 
                     {properties.map(function(property) {
                        return (
                           <SwiperSlide key={property.propId}>
                              <SinglePropSection itemObj={property} />
                           </SwiperSlide>
                        );
                     })}
                  </Swiper>
               }
           </div>)}
         </div> 
      </>
  );
}