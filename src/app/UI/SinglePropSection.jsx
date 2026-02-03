import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/pro-regular-svg-icons";
export default function SinglePropSection({ itemObj }) {

   return (
      <figure className="list">
         <div className="thumb">
            <Image src={itemObj.property_image} className="img-fluid w-100" alt={itemObj.property_image_alt_tag} width="360" height="280" />
           {itemObj.isOffer && <div className='offers'>Offers</div>}
         </div>
         <figcaption className="list__info">
            <h5><Link href={itemObj.url} className="stretched-link">{itemObj.name}</Link></h5>
            <ul>
               {itemObj.propbhk && <li>{itemObj.propbhk}</li>}
               {(itemObj.locationname && itemObj.propsector && itemObj.locationUrl) && <li><Link href={itemObj.locationUrl}>{itemObj.propsector}, {itemObj.locationname}</Link></li>}
               
            </ul>
            <div className="price">
               {itemObj.locationname === 'Dubai' ? (
                  <span>{itemObj.price}</span>
               ) : (
               <>
                  <FontAwesomeIcon icon={faIndianRupeeSign} /> <span>{itemObj.price}</span>{!isNaN(itemObj.price) && <small>Cr.*</small>}
               </>
               )}
            </div>
         </figcaption>
      </figure>
   )
}