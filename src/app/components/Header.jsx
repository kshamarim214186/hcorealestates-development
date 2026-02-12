"use client";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import getLocationType from "../api/getLocationType";
import HeaderSearch from "./HeaderSearch";
import GoToTop from '@/app/components/GoToTop';
import { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Link from "next/link";
import SocialMedia from "../UI/SocialMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBarsSort } from "@fortawesome/pro-solid-svg-icons";

function HomeSearchHidden() {
  return <div className="mobile-width-zero"></div>
}

export default function Header({ resultHeader, commercialData, residentialData, fixedTop, ctoc }) {
  const builderData = resultHeader.developerdata;
  const pageData = resultHeader.pagedata;
  const [open, setOpen] = useState(false);
  const [menuItem, setMenuItem] = useState(false);
  const clicktocall = ctoc ? ctoc : pageData.callnumber;

  const sortBySpecific = (arr, order) => {
    const orderMap = new Map(order.map((item, index) => [item, index]));
    return arr.slice().sort((a, b) => {
      const indexA = orderMap.get(a.menuname || a.name) ?? Infinity;
      const indexB = orderMap.get(b.menuname || b.name) ?? Infinity;
      return indexA - indexB;
    });
  };

  const specificResidentail = pageData.specificRes;
  const sortedResidential = sortBySpecific(residentialData, specificResidentail);
  const specificDev = pageData.specificDeveloper;
  const sortedDev = sortBySpecific(builderData, specificDev);

  const specificCommercial = pageData.specificComm;
  const sortedCommercial = sortBySpecific(commercialData, specificCommercial);

  return (
    <>
      <GoToTop />
      <Navbar bg="white" expand={false} className={`shadow-sm headderContainer ${fixedTop == 'nottrue' ? '' : 'fixed-top'}`}>
        <div className="container-xl">
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg">
            <span className="menu-icon"><FontAwesomeIcon icon={faBarsSort} /></span>
          </Navbar.Toggle>
          <Navbar.Brand href={pageData.homeurl}>
            <Image src={pageData.logo} alt="Hcorealestates Logo" width={170} height={40} />
          </Navbar.Brand>
          {fixedTop === 'homepage' ? <HomeSearchHidden /> : <HeaderSearch />}
          {clicktocall &&
            <a className="phone" href={`tel:${clicktocall.split(' ').join('')}`}>
              <FontAwesomeIcon icon={faPhone} /> <span>{clicktocall}</span>
            </a>
          }
          <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                {/* <Image src={pageData.logo} alt="Hcorealestates Logo" width={170} height={40} /> */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as={'div'} className="h6">Residential Properties</Accordion.Header>
                  <Accordion.Body>
                    <div className="sub-heading">Top Residentails</div>
                    {sortedResidential.slice(0, 4).map(residence =>
                      <Link href={residence.url} className="items" key={residence.id}>
                        {residence.menuname}
                      </Link>)
                    }
                    {menuItem && <div className="rest">
                      {sortedResidential.slice(4).sort((a, b) => a.menuname.localeCompare(b.menuname)).map(residence =>
                        <Link href={residence.url} className="items" key={residence.id}>
                          {residence.menuname}
                        </Link>)
                      }
                    </div>
                    }
                    <button className="btn btn-link" onClick={() => setMenuItem(set => !set)}>{`${!menuItem ? 'More Residential' : 'Less Residential'}`}</button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as={'div'} className="h6">Dubai Residential</Accordion.Header>
                  <Accordion.Body>
                    <div className="sub-heading">Top Residential</div>
                    {sortedCommercial.slice(0, 4).map(commerce =>
                      <Link href={commerce.url} className="items" key={commerce.id}>
                        {commerce.menuname}
                      </Link>)
                    }
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header as={'div'} className="h6">Developers</Accordion.Header>
                  <Accordion.Body>
                    <div className="sub-heading">Top Developers</div>
                    {sortedDev.slice(0, 4).map(dev =>
                      <Link href={dev.url} className="items" key={dev.id}>{dev.name}</Link>)}
                    <Link href={pageData.builderurl} className="btn btn-link" >All Developers</Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="commons">
                <div className="h6">Explore</div>
                {resultHeader.blogcatdetail.map(blogcat =>
                  <Link href={blogcat.blogcaturl} key={blogcat.id}>
                    {blogcat.blogcatname}
                  </Link>)
                }
              </div>
              <div className="commons">
                <div className="h6">Company</div>
                <Link href={pageData.aboutusurl}>About Us</Link>
                <Link href={pageData.contactusurl}>Contact Us</Link>
                <Link href={pageData.disclaimerurl}>Disclaimer</Link>
                <Link href={pageData.ppolicyurl}>Privacy Policy</Link>
              </div>
              <div className="follow">
                <div className="h6">Follow Us</div>
                <SocialMedia itemObj={pageData} />
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>
    </>
  );
}