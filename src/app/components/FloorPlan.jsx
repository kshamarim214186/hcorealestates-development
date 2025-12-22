import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import styles from "../scss/main.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { faIndianRupeeSign } from "@fortawesome/pro-regular-svg-icons";
import Button from "../UI/Button";
import LoadingCustom from './loading-custom';

export default function FloorPlan({ itemObj, propId, projectName }) {
   const buttontext = 'Request Floor Plan';
   const [propFloor, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();

            formData.append('projectid', propId);
            formData.append('catid', itemObj.id);
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            const finalresult = await fetch(process.env.API_URL+'properties/getprojectfloorplan/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json();
           setData(result);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false); // Set loading to false regardless of success or error
         }
      };
      fetchData();
      return () => {

      };
   }, [propId, itemObj.id]);

   const propertyFloor = propFloor.floorplan;
   return (
      <> 
         {loading ? (
           <LoadingCustom />
         ) : propertyFloor.length > 0 ? (
            <Swiper className={styles.swiperCustomControl} modules={[Navigation]} spaceBetween={24} slidesPerView={1} navigation={{ clickable: true }}>
               {propertyFloor.map((propfloorplan, index) => (
                  <SwiperSlide className={styles.figure} key={propfloorplan.id}>
                     <Link data-fancybox="FloorPlan" href={propfloorplan.floorimage}>
                       <Image src={propfloorplan.floorimage} className="img-fluid w-100" alt={propfloorplan.floorimagealt} width={300} height={300} />
                     </Link>
                     <figcaption className={styles.figcaption}>
                        <h6><span>{projectName}</span> {propfloorplan.floorplanname}</h6>
                        <ul>
                           { propfloorplan.totalarea &&
                              <li>
                                 Sizes <span>{propfloorplan.totalarea}</span>
                              </li>
                           }
                           { propfloorplan.price &&
                              <li>
                                 Prices
                                 {propfloorplan.locationname === 'Dubai' ? (
                                    <span>
                                       {propfloorplan.price}
                                    </span>
                                 ) : (
                                    <>
                                       <span>
                                          <FontAwesomeIcon icon={faIndianRupeeSign} /> {propfloorplan.price}
                                       </span>
                                    </>
                                 )}
                              </li>
                           }
                        </ul>
                        <Button itemObj={buttontext} buttonClass={`btn btn-outline-primary btn-sm`} projectName={projectName} />
                     </figcaption>
                  </SwiperSlide>
               ))}
            </Swiper>
         ) : (
           <div>No data available</div>
         )}
      </>
   );
}