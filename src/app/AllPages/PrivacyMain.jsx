import styles from "@/app/scss/others.module.scss";

export default function PrivacyMain({ resultOtherPage }) {
   const otherPageData = resultOtherPage.otherpagedata;
   
  return <>    
      <title>{otherPageData.seotitle}</title>
      <meta name="description" content={otherPageData.seodesc} />
      <link rel="canonical" href={`${otherPageData.homeurl}privacy-policy`} />
      <meta name="robots" content="noindex,nofollow" />
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