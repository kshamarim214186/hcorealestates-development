import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faIndianRupeeSign } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import styles from "./home-top.module.scss";

export default function HomeTopThumbs({ TopProjectListobj }) {
  return <figure className={styles.bigThumb}>
    <div className={styles.thumb}>
      <Image src={TopProjectListobj.image} className="img-fluid w-100" alt={TopProjectListobj.title} width={636} height={405} />
      {TopProjectListobj.isOffer && <div className={styles.offers}>Offers</div>}
    </div>
    <figcaption>
      <div>
        <h4>{TopProjectListobj.title}</h4>
        <ul>
          <li>
            {TopProjectListobj.sublocation}, {TopProjectListobj.location}
          </li>
          <li>{TopProjectListobj.propertyType}</li>
          <li>{TopProjectListobj.propertySubtype}</li>
        </ul>
        <div className="price">
          <FontAwesomeIcon icon={faIndianRupeeSign} /> <span>{TopProjectListobj.price}</span> {!isNaN(TopProjectListobj.price) && <small>Cr.*</small>}
        </div>
      </div>
      <Link href={TopProjectListobj.url} className={`${styles.viewProjects} stretched-link`}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </figcaption>
  </figure>
}
