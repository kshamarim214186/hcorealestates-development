"use client";
import styles from "@/app/scss/others.module.scss";
import TextComponent from "@/app/UI/TextComponent";

export default function NriMain({ resultOtherPage }) {
   const otherPageData = resultOtherPage.otherpagedata;
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