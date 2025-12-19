"use client";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/pro-regular-svg-icons";
import GoToTop from '@/app/components/GoToTop';

export default function HeaderBlog( {resultHeader}) {
   const [device, setDevice] = useState(true);
   useEffect(() => {
      const resposiveTrue = window.matchMedia("(min-width:992px)").matches;
      if (!resposiveTrue) {
         setDevice(false);
      }
   }, []);
  
  return (
      <>
         <GoToTop />
         <Navbar className="bg-body-tertiary fixed-top">
            <Container fluid="xl">
               <Navbar.Brand href="/">
                  <Image src={resultHeader.logo} alt="Hcorealestates" width={170} height={40} />
               </Navbar.Brand>
               <Navbar.Toggle />
               {device && (
                  <Navbar.Collapse className="justify-content-lg-end">
                  <Navbar.Text className="d-lg-block d-none">
                    <a className="phone" href={`tel:${resultHeader.callnumber.replace(" ","")}`}>
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{`${resultHeader.callnumber}`}</span>
                    </a>
                  </Navbar.Text>
                  </Navbar.Collapse>
               )}
            </Container>
         </Navbar>
      </>
  );
}
