"use client"
import { useEffect } from "react";
import styles from "../scss/four04.module.scss";
import Image from "next/image";
import Four04Img from "/public/images/unknown-bg.webp"

export default function FourZeroFourContent() {
  useEffect(() => {
    const allEl = document.querySelectorAll('.headderContainer,.is404, .container-xl,.footer__top,.footer, main,.row,.col-lg-7,.col-lg-4');
    allEl.forEach(element => {
      element.style.position = 'absolute';
      element.style.width = '1px';
      element.style.height = '1px';
      element.style.padding = '0px';
      element.style.margin = '-1px';
      element.style.overflow = 'hidden';
      element.style.clip = 'rect(0,0,0,0)';
      element.style.whiteSpace = 'nowrap';
      element.style.borderWidth = '0px';
    });
  }, []);
  return <>
    {/* <div className={styles.wrapper}> */}
    <div className={styles.wrapper}>
      <div className="container text-center">
        <Image src={Four04Img} width={500} height={150} quality={100} alt="Not Found" className={styles['img-control']} />
      </div>
    </div>
  </>
}