import Image from "next/image"
import Link from "next/link"
import ArrowButton from "../UI/ArrowButton"

export default function BlogItems({ newsObject }) {
   return(
      <figure className="news__item">
         <Image src={newsObject.listingimage} className="img-fluid" alt={newsObject.name} width={355} height={215} />
         <figcaption>
         <h4>
            <Link href={newsObject.url} className="stretched-link">
               {newsObject.name}
            </Link>
         </h4>
         <Link href={newsObject.blogcaturl} className="blogcategory">
            {newsObject.blogcatname}
         </Link>
         {newsObject.shortdesc && <p>{newsObject.shortdesc.substring(0, 97) + '...'}</p>}
         <ArrowButton buttonName="Read More" />
         </figcaption>
      </figure>
   )
}