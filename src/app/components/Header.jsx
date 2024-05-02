"use client";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import getLocationType from "../api/getLocationType";
import HeaderSearch from "./HeaderSearch";
import GoToTop from '@/app/components/GoToTop';


export default function Header({ resultHeader, commercialData, residentialData }) {

   const builderData = resultHeader.developerdata;
   const pageData = resultHeader.pagedata;
   return (
   <>
      <GoToTop />
      <Navbar bg="white" expand="lg" className="shadow-sm headderContainer fixed-top">
         <div className="container-xl">
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Brand href={pageData.homeurl}>
               <Image src={pageData.logo} alt="Hcorealestates" width={170} height={40} />
            </Navbar.Brand>
            <HeaderSearch />
            <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="start">
               <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                     <Image src={pageData.logo} alt="Hcorealestates" width={170} height={40} />
                  </Offcanvas.Title>
               </Offcanvas.Header>
               <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                     <NavDropdown title="Residential" id="offcanvasNavbarDropdown-expand-lg">
                        {residentialData.map(function(data,idx) {
                           return (
                              <NavDropdown.Item href={data.url} key={idx}>{data.menuname}</NavDropdown.Item>
                           )
                        })}                        
                     </NavDropdown>
                     <NavDropdown title="Commercial" id="offcanvasNavbarDropdown-expand-lg">
                        {commercialData.map(function(data,idx) {
                           return (
                              <NavDropdown.Item href={data.url} key={idx}>{data.menuname}</NavDropdown.Item>
                           )
                        })} 
                     </NavDropdown>
                     <NavDropdown title="Developers" id="offcanvasNavbarDropdown-expand-lg">
                        {builderData.map(function(data,idx) {
                           if (idx <= 3) {
                              return (
                                 <NavDropdown.Item href={data.url} key={idx}>{data.name}</NavDropdown.Item>
                              )
                           }
                        })}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={pageData.builderurl}>All Developers</NavDropdown.Item>
                     </NavDropdown>
                     <Nav.Link href={pageData.propertylistingurl}>Projects</Nav.Link>
                     <Nav.Link href={pageData.posturl}>Blogs</Nav.Link>
                  </Nav>
               </Offcanvas.Body>
            </Navbar.Offcanvas>
         </div>
      </Navbar>
   </>
   );
}