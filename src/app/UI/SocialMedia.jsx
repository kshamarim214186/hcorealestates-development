import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faPinterest, faTelegram, faTwitter, faWhatsapp, faWhatsappSquare, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function SocialMedia({ itemObj }) {
  return (
    <>
      <ul className="social">
        <li>
         {itemObj.facebook &&
            <Link href={itemObj.facebook}>
               <span>Facebook</span>
               <FontAwesomeIcon icon={faFacebook} />
            </Link>
         }
         {itemObj.facebook &&
            <Link href={itemObj.twitter}>
               <span>Twitter</span>
               <FontAwesomeIcon icon={faTwitter} />
            </Link>
         }
         {itemObj.faPinterest &&
            <Link href={itemObj.pintrest}>
               <span>Pinterest</span>
               <FontAwesomeIcon icon={faPinterest} />
            </Link>
         }
         {itemObj.linkedin &&
            <Link href={itemObj.linkedin}>
               <span>Linkedin</span>
               <FontAwesomeIcon icon={faLinkedin} />
             </Link>
         }
         {itemObj.youtube &&
            <Link href={itemObj.youtube}>
               <span>Youtube</span>
               <FontAwesomeIcon icon={faYoutube} />
            </Link>
         }
         {itemObj.insta &&
            <Link href={itemObj.insta}>
               <span>Instagram</span>
               <FontAwesomeIcon icon={faInstagram} />
            </Link>
         }
         {itemObj.whatsapp &&
            <Link href={itemObj.whatsapp}>
               <span>Whatsapp</span>
               <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
         }
         {itemObj.telegram &&
            <Link href={itemObj.telegram}>
               <span>Telegram</span>
               <FontAwesomeIcon icon={faTelegram} />
            </Link>
         }
        </li>
      </ul>
    </>
  )
}
