import Link from "next/link";
import Image from "next/image";
function CustomButton({ url, buttonName }) {
  return <Link href={url} className='btn-custom'>{buttonName}
    <span><Image className="arrowColor" src='/images/arrow.svg' width={63} height={20} alt="Arrow" /></span></Link>
}
export default CustomButton;