import { Poppins } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "swiper/scss";
import "swiper/scss/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "./scss/global.scss";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={poppins.className}>
            <GoogleAnalytics gaId="GTM-WD35W8" />
            <meta name="google-site-verification" content="rWtL9hQf-gpxyoIE1v-geqw2l62Omf1MzTl4gCqNqGg" />
            {children}
         </body>
      </html>
   );
}
