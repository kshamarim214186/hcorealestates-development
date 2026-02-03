import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faPinterest, faTelegram, faTwitter, faWhatsapp, faWhatsappSquare, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function SocialMedia({ itemObj }) {
  return (
    <>
      <ul className="social">
        <li>
         {itemObj.facebook && (
            <Link href={itemObj.facebook}>
               <span>Facebook</span>
               <FontAwesomeIcon icon={faFacebook} target="_blank" />
            </Link>
         )}
         {itemObj.facebook && (
            <Link href={itemObj.twitter}>
               <span>Twitter</span>
               <FontAwesomeIcon icon={faTwitter} target="_blank" />
            </Link>
         )}
         {itemObj.faPinterest && (
            <Link href={itemObj.pintrest}>
               <span>Pinterest</span>
               <FontAwesomeIcon icon={faPinterest} target="_blank" />
            </Link>
         )}
         {itemObj.linkedin && (
            <Link href={itemObj.linkedin}>
               <span>Linkedin</span>
               <FontAwesomeIcon icon={faLinkedin} target="_blank" />
             </Link>
         )}
         {itemObj.youtube && (
            <Link href={itemObj.youtube}>
               <span>Youtube</span>
               <FontAwesomeIcon icon={faYoutube} target="_blank" />
            </Link>
         )}
         {itemObj.insta && (
            <Link href={itemObj.insta}>
               <span>Instagram</span>
               <FontAwesomeIcon icon={faInstagram} target="_blank" />
            </Link>
         )}
         {itemObj.whatsapp && (
            <Link href={itemObj.whatsapp}>
               <span>Whatsapp</span>
               <FontAwesomeIcon icon={faWhatsapp} target="_blank" />
            </Link>
         )}
         {itemObj.telegram && (
            <Link href={itemObj.telegram}>
               <span>Telegram</span>
               <FontAwesomeIcon icon={faTelegram} target="_blank" />
            </Link>
         )}
        </li>
      </ul>
    </>
  )
}
