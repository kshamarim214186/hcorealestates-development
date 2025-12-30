import { useState } from "react";
import ArrowButton from "@/app/UI/ArrowButton";
import CustomOffCanvas from "@/app/components/CustomOffCanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoreAmenities({ children }) {
   const [ameniShow, setameniShow] = useState(false);
   const handleAmenitiesClose = () => setameniShow(false);
   const handleAmenitieshow = () => setameniShow(true);

   return(
      <>
         <ArrowButton onClick={handleAmenitieshow} buttonName="Show All Amenities" />
         <CustomOffCanvas showModalName={ameniShow} handleModalCloseName={handleAmenitiesClose}>
         {children}
         </CustomOffCanvas>
      </>
   ) 
}