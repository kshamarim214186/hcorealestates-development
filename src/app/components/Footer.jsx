"use client";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import SocialMedia from "../UI/SocialMedia";
import CustomButton from "../UI/CustomButton";
import { faSquarePhone } from "@fortawesome/pro-solid-svg-icons";
import getLocationType from "../api/getLocationType";
import { useState, useEffect } from "react";
import Button from "../UI/Button";

export default function Footer({ resultFooter, commercialData, residentialData, pageName, projectName, ctoc, whatsApp }) {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);
  const [deskButton, setDeskButton] = useState(false);
  const [aside, setAside] = useState(false);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const [menuItem, setMenuItem] = useState(false);

  useEffect(() => {
    const resposiveTrue = window.matchMedia("(min-width: 992px)").matches;
    window.addEventListener("scroll", () => {
      if (resposiveTrue && window.scrollY > 500) {
        setDeskButton(true);
      } else {
        setDeskButton(false);
      }
      if (!resposiveTrue && window.scrollY > 300) {
        setAside(true);
      } else {
        setAside(false);
      }
    });
  }, []);

  const pageData = resultFooter.pagedata;
  const spotlight = resultFooter.spotlight;
  const featuredPro = resultFooter.featuredproject;
  const builderData = resultFooter.developerdata;
  const otherproject = resultFooter.otherfooterproject;
  const blogcategory = resultFooter.blogcatdetail;
  const buttontext = 'Enquire Now';

  const clicktocall = (pageName != 'undefined' && pageName == 'project' && projectName != 'Hco Real Estates') ? ctoc : pageData.callnumber;
  const whatsapnum = (pageName != 'undefined' && pageName == 'project' && projectName != 'Hco Real Estates') ? whatsApp : pageData.whatsnumber;
  const whatsappUrl = whatsapnum ? "https://api.whatsapp.com/send?phone=" + whatsapnum.replace(" ", "") + "&text=Hi%20I'm%20interested%20in%20" + projectName + "."
    : "";

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

  return (
    <>
      <footer className="footer">
        <div className="footer__top">
          <div className="container-xl">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>Residential</Accordion.Header>
                <Accordion.Body>
                  {sortedResidential.slice(0, 4).map(residence => <Link href={residence.url} key={residence.id}>{residence.menuname}</Link>)}
                  {menuItem && <div className="rest">
                    {sortedResidential.slice(4).sort((a, b) => a.menuname.localeCompare(b.menuname)).map(residence =>
                      <Link href={residence.url} className="items" key={residence.id}>
                        {residence.menuname}
                      </Link>)
                    }
                  </div>
                  }
                  <button className="btn btn-link p-0" onClick={() => setMenuItem(set => !set)}>{`${!menuItem ? 'More Residential' : 'Less Residential'}`}</button>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header as={"div"}>Commercial</Accordion.Header>
                <Accordion.Body>
                  {commercialData.sort((a, b) => a.menuname.localeCompare(b.menuname)).map(commercial => <Link href={commercial.url} key={commercial.id}>{commercial.menuname}</Link>)}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header as={"div"}>Developers</Accordion.Header>
                <Accordion.Body>
                  {sortedDev.slice(0, 4).map(dev => <Link href={dev.url} key={dev.id}>{dev.name}</Link>)}
                  <Link href={pageData.builderurl} className="btn-link" >All Developers</Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        {(spotlight.length > 0 || featuredPro.length > 0 || otherproject.length > 0) &&
        <div className="footer__middle">
          <div className="footer__list">
            <div className="container-xl">
              <Swiper
                className="swiperCustomControl"
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{ clickable: true }}
                breakpoints={{
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 3 },
                }}
              >
                {spotlight.length > 0 &&
                  <SwiperSlide>
                    <h6 className="h5">{pageData.ffheading}</h6>
                    {spotlight.map(function (data, idx) {
                      return (
                        <Link href={data.url} key={idx}>{data.name}</Link>
                      )
                    })}
                  </SwiperSlide>
                }

                {featuredPro.length > 0 &&
                <SwiperSlide>
                  <h6 className="h5">{pageData.fsheading}</h6>
                  {featuredPro.map(function (data, idx) {
                    return (
                      <Link href={data.url} key={idx}>{data.name}</Link>
                    )
                  })}
                </SwiperSlide>
                }
                {otherproject.length > 0 &&
                  <SwiperSlide>
                    <h6 className="h5">{pageData.ftheading}</h6>
                    {otherproject.map(function (data, idx) {
                      return (
                        <Link href={data.url} key={idx}>{data.name}</Link>
                      )
                    })}
                  </SwiperSlide>
                }
              </Swiper>
            </div>
          </div>
        </div>
        }
        <div className="footer__about">
          <div className="container-xl">
            <div className="row">
              <div className="col-md-7">
                <div className="h5">About Us</div>
                <p>{pageData.aboutusshortdesc}</p>
                <CustomButton buttonName="About More" url={pageData.aboutusurl} />
              </div>
              {blogcategory.length > 0 &&
                <div className="col-md-2 offset-md-1 col-sm-6 col-6">
                  <div className="h5">Explore</div>
                  {blogcategory.map(function (blogcat, index) {
                    return (
                      <Link href={blogcat.blogcaturl} key={index}>{blogcat.blogcatname}</Link>
                    )
                  })}
                </div>
              }
              <div className="col-md-2 col-sm-6 col-6">
                <div className="h5">Company</div>
                <Link href={pageData.aboutusurl}>About Us</Link>
                <Link href={pageData.contactusurl}>Contact Us</Link>
                <Link href={pageData.disclaimerurl}>Disclaimer</Link>
                <Link href={pageData.ppolicyurl}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xl">
          <div className="footer__bottom">
            <div className="copyright">Copyright © Honey Money Associates Limited 2011 -{currentYear} | All Right Reserved</div>
            <SocialMedia itemObj={pageData} />
          </div>
        </div>
      </footer>
      <div className="desk-whatsapp">
        {whatsappUrl &&
          <Link href={whatsappUrl}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </Link>
        }
      </div>
      {(deskButton && pageName != 'undefined' && pageName != 'project') && (
        <div className="desk-form">
          <Button itemObj={buttontext} buttonClass={`btn btn-primary rounded-0`} projectName={projectName} />
        </div>
      )}
      {aside && (
        <div className="aside_btn">
          {whatsappUrl &&
            <Link className="whatsapp" target="_blank" href={whatsappUrl}>
              <FontAwesomeIcon icon={faWhatsappSquare} /> <span>Whatsapp Now</span>
            </Link>
          }
          {clicktocall &&
            <a className="phone" href={`tel:${clicktocall.split(' ').join('')}`}>
              <FontAwesomeIcon icon={faSquarePhone} /> <span>Call Now</span>
            </a>
          }
          <div className="d-grid w-100">
            <Button itemObj={buttontext} buttonClass={`btn btn-primary`} projectName={projectName} />
          </div>
        </div>
      )}
    </>
  );
}