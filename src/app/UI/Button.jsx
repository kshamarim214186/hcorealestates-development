"use client";
import { useState } from "react";
import ModalForm from "@/app/components/ModalForm";
export default function Button({ itemObj, buttonClass, projectName }) {   
   const [showModal, setShowModal] = useState(false);
   const handleModalShow = () => setShowModal(true);   
   const handleModalClose = () => setShowModal(false);
   return(
      <>
         <button className={buttonClass} onClick={handleModalShow}>{itemObj}</button>
         <ModalForm showModalName={showModal} handleModalCloseName={handleModalClose} modalHeading="EXPRESS YOUR INTEREST!" projectName={projectName} />
      </>
   ) 
}