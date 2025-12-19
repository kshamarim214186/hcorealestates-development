import { useState } from "react";
import ArrowButton from "@/app/UI/ArrowButton";
import CustomOffCanvas from "@/app/components/CustomOffCanvas";
import TextComponent from "@/app/UI/TextComponent";

export default function MoreOverview({ itemObj }) {
   const [show, setShow] = useState(false);
   const handleOverviewClose = () => setShow(false);
   const handleOverviewShow = () => setShow(true);

   return(
      <>
         <ArrowButton onClick={handleOverviewShow} buttonName="Show More" />
         <CustomOffCanvas showModalName={show} handleModalCloseName={handleOverviewClose}>
            <TextComponent itemObj={itemObj} />
         </CustomOffCanvas>
      </>
   ) 
}