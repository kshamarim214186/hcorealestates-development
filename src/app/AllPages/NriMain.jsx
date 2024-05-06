"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import styles from "../scss/others.module.scss";
import TextComponent from "../UI/TextComponent";

export default function NriMain() {
   const router = useRouter()  
   const [otherPageData, setotherpageData] = useState('');
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
         try {
            const formData = new URLSearchParams();
            formData.append('token1', process.env.token1);
            formData.append('token2', process.env.token2);
            formData.append('url', 'nri-real-estate-investment');
            const finalresult = await fetch(process.env.API_URL+'other-pages/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formData,
            });   
           const result = await finalresult.json();
           setotherpageData(result.otherpagedata);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
           setLoading(false);
         }
      };
      fetchData();
   }, [router]);
   return <>
      <title>{otherPageData.seotitle}</title>
      <meta name="description" content={otherPageData.seodesc} />
      <link rel="canonical" href={`${otherPageData.homeurl}nri-real-estate-investment`} />
      <div className="container-xl">
        <div className={styles.disclaimer}>
          {otherPageData.name && <h1>{otherPageData.name}</h1>}
          {otherPageData.nridesc && <TextComponent itemObj={otherPageData.nridesc} />}
        </div>
      </div>    
   </>
}