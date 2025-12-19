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
            {children}
         </body>
      </html>
   );
}
