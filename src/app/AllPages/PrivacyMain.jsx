"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import styles from "../scss/others.module.scss";

export default function PrivacyMain() {
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
            formData.append('url', 'privacy-policy');
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
      <link rel="canonical" href={`${otherPageData.homeurl}privacy-policy`} />
      <div className="container-xl">
        <div className={styles.disclaimer}>
          {otherPageData.name && <h1>{otherPageData.name}</h1>}
          {otherPageData.policyp1 && <p>{otherPageData.policyp1}</p>}
          {otherPageData.policyp2 && <p>{otherPageData.policyp2}</p>}
          {otherPageData.policyp3 && <p>{otherPageData.policyp3}</p>}
          {otherPageData.policyp3 && <p>{otherPageData.policyp4}</p>}
        </div>
      </div>
  </>
}