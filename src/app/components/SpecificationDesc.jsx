import styles from "../scss/main.module.scss";
import React, { useState, useEffect } from 'react';
import TextComponent from "@/app/UI/TextComponent";
import LoadingCustom from './loading-custom';

export default function Specification({ itemObj, propId }) {  
   const [propSpecification, setData] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('projectid', propId);
            formData.append('catid', itemObj.specicatid);
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);

            const finalresult = await fetch(process.env.API_URL+'properties/getprojectspecification/', {
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
   }, [propId, itemObj.specicatid]);
   const propertySpeci = propSpecification.specification;
   
   return (
      <> 
         <div>
            {loading ? (
              <LoadingCustom />
            ) : propertySpeci.length > 0 ? (
               <div>
                  {propertySpeci.map((item, index) => (
                     <div className={styles.lines} key={item.specid}>
                       <TextComponent itemObj={item.specname} />
                     </div>
                  ))}
               </div>
            ) : (
              <div>No data available</div>
            )}
         </div>
      </>
   );
}