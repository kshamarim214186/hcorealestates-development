import Link from "next/link";
import styles from "./scss/others.module.scss";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className={styles.error}>
      <div className={styles.error__white}>
        <div className={styles.error__inner}>
          <Image src='/images/rocket_404.png' width={101} height={101} alt="Error" class={styles.rocket} />
          <div class={styles.text404}>404</div>
          <Image src='/images/cloud_404.png' width={237} height={144} alt="Error" class={styles.cloud} />
        </div>

      </div>
      <div className={styles.error__info}>
        <h1>Oops! - Page Not Found!</h1>
        <p>The page you are looking for was moved, removed, renamed or might never existed.</p>
        <div className="d-flex gap-2 flex-wrap flex-sm-nowrap justify-content-center">
          <Link href="/" class="btn btn-outline-light">TAKE ME OUT OF HERE</Link><Link href="/contact-us/" class="btn btn-outline-light">CONTACT US</Link>
        </div>
      </div>
    </main>
  );
}
