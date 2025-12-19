import Image from "next/image";
export default function ArrowButton({ onClick, buttonName }) {
  return <button className="btn p-0 btn-custom" onClick={onClick}>{buttonName}
    <span><Image className="arrowColor" src='/images/arrow.svg' width={63} height={20} alt="Arrow" /></span></button>
}