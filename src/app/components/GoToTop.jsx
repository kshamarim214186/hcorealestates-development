import { useEffect } from "react";
import { usePathname,useRouter } from 'next/navigation'
 
export default function GoToTop() {
   const routePath = usePathname()
   const router = useRouter()
   const onTop = () => {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'instant'
      });
   }
   useEffect(() => {
      onTop()
   }, [routePath]); 
   return null;
}