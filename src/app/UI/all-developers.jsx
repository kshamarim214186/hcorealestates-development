import Image from "next/image"
import Link from "next/link";

export default function AllDevelopers({ developerObj }) {
  return <figure className="items">
    <Link href={developerObj.url}>
      <Image src={developerObj.devphoto} className="img-fluid" alt={developerObj.name} width={150} height={50} />
    </Link>
  </figure>
}
