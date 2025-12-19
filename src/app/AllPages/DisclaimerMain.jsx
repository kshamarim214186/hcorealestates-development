import styles from "@/app/scss/others.module.scss";

export default function DisclaimerMain({ resultOtherPage }) {
   const otherPageData = resultOtherPage.otherpagedata;
   
   return <>
      <title>{otherPageData.seotitle}</title>
      <meta name="description" content={otherPageData.seodesc} />
      <link rel="canonical" href={`${otherPageData.homeurl}disclaimer`} />
      <meta name="robots" content="noindex,nofollow" />
      <div className="container-xl">
        <div className={styles.disclaimer}>
          {otherPageData.name && <h1>{otherPageData.name}</h1>}
          {otherPageData.disclaimerp1 && <p>{otherPageData.disclaimerp1}</p>}
          {otherPageData.disclaimerp2 && <p>{otherPageData.disclaimerp2}</p>}
          {otherPageData.disclaimerp3 && <p>{otherPageData.disclaimerp3}</p>}
          {otherPageData.disclaimerp4 && <p>{otherPageData.disclaimerp4}</p>}
          {otherPageData.disclaimerp5 && <p>{otherPageData.disclaimerp5}</p>}
          {otherPageData.disclaimerp6 && <p>{otherPageData.disclaimerp6}</p>}
        </div>
      </div>    
   </>
}