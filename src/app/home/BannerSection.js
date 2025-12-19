import Image from "next/image";
import HomeSearch from "./HomeSearch";
import styles from "./banner.module.scss";

function BannerSecton() {
  return (
    <div className={styles.banner}>
      <Image src="/images/home-banner.webp" className="img-fluid w-100" sizes="(min-width:768) 768vw, 100vw" alt="static" width={1500} height={550} />
      <HomeSearch />
    </div>
  );
}

export default BannerSecton;
