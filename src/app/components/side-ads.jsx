import Image from "next/image";
import Link from "next/link";

export default function SideAds({ adsObject }) {
  return <figure className="ads">
    <Link href={adsObject.url}>
      <Image src={adsObject.img} width={300} height={450} alt={adsObject.title} />
    </Link>
  </figure>
}