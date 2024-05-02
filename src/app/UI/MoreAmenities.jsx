import { useState } from "react";
import ArrowButton from "@/app/UI/ArrowButton";
import CustomOffCanvas from "@/app/components/CustomOffCanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoreAmenities({ itemObj }) {
   const [ameniShow, setameniShow] = useState(false);
   const handleAmenitiesClose = () => setameniShow(false);
   const handleAmenitieshow = () => setameniShow(true);

   return(
      <>
         <ArrowButton onClick={handleAmenitieshow} buttonName="Show All Amenities" />
         <CustomOffCanvas showModalName={ameniShow} handleModalCloseName={handleAmenitiesClose}>
           <h3>Amenties</h3>
           <ul>
               {itemObj.map(function(data) {
                  return (
                     <li key={data.id}>
                        <FontAwesomeIcon icon={`fa-regular ${data.iconid}`} /> {data.name}
                     </li>
                  )
               })} 
           </ul>
         </CustomOffCanvas>
      </>
   ) 
}