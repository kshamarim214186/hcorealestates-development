import styles from '../scss/ads.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/pro-regular-svg-icons";
import Image from 'next/image'
import Link from 'next/link';
export default function CommonAds({ }) {
  return <>
    <section className={styles.section}>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <figure className={styles.ads}>
              <Image src='/images/dubai-housing.svg' width={120} height={60} className={`img-fluid`} alt='Dubai Housing Logo' />
              <div className={styles.ads__right}>
                <h2><small>Invest In</small>Dubai Properties</h2>
                <ul>
                  <li>Golden Visa</li>
                  <li>8-12% ROI Tax Free</li>
                  <li>100% Property Ownership</li>
                  <li>Investment From AED 1M*</li>
                </ul>
                <Link href='https://www.dubaihousing-ae.com/' target='_blank' className={`btn btn-sm btn-primary ${styles.btn} stretched-link`}>View Dubai Properties <FontAwesomeIcon icon={faArrowRightLong} /></Link>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </>
}