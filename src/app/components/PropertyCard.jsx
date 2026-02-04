import { faIndianRupeeSign } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import DirhamIcon from './DirhamIcon/DirhamIcon';
import styles from './PropertyCard.module.scss';

export default function PropertyCard({ property }) {
  return (
    <>
      <figure className={styles.root}>
        <div className={styles.imageWrap}>
          <Image
            src={property.property_image}
            className={styles.imgThumb}
            alt={property.property_image_alt_tag}
            width={360}
            height={280}
          />
        </div>
        <figcaption className={styles.figCaption}>
          <h5 className="h6 mb-4">
            <Link href={property.url} className="stretched-link">
              {property.name}
            </Link>
          </h5>
          {property.propbhk && <div>{property.propbhk}</div>}
          <div className={styles.priceContainer}>
            {property.locationname === 'Dubai' ? (
              <>
                <DirhamIcon className={styles.dirham} /> <span>{property.price}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faIndianRupeeSign} /> <span>{property.price}</span>
                {!isNaN(property.price) && <small>Cr.*</small>}
              </>
            )}
          </div>
        </figcaption>
      </figure>
    </>
  );
}
