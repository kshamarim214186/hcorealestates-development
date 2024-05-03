import { useEffect } from "react";
import { usePathname,useRouter } from 'next/navigation'
 
export default function GoToTop() {
   const routePath = usePathname()
   const router = useRouter()
   const onTop = () => {
      window.scrollTo(0, 0);
   }
   useEffect(() => {
      onTop()
   }, [routePath]); 
   return null;
}