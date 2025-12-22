import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import SinglePropSection from "../UI/SinglePropSection";
import LoadingCustom from './loading-custom';

export default function BuildersProjectByConn({ itemObj }) { 
   const router = useRouter()  
   const [property, setpropertyData] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('column', 'id');
            formData.append('propId', itemObj);
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            const finalresult = await fetch(process.env.API_URL+'builders/getprojectbyPropId/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json(); 
           setpropertyData(result.propdetail);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
      };
      fetchData();
   }, [router, itemObj]);

   
   return ( 
      <> 
         {loading ? (
            <LoadingCustom />
         ) : (<div>  
            <SinglePropSection itemObj={property} />
         </div>)
         }
      </>
  );
}