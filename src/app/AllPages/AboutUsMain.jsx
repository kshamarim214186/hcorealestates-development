"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "@/app/scss/about.module.scss";
import { Breadcrumb, Accordion } from "react-bootstrap";
import TextComponent from "@/app/UI/TextComponent";

export default function AboutUsMain({ itemConndata, itemAwdata, itemTdata, resultOtherPage }) {
  const conndata = itemConndata;
  const awdata = itemAwdata;
  const tdata = itemTdata;
  const otherPageData = resultOtherPage.otherpagedata;
  return (
    <>
      <title>{otherPageData.seotitle}</title>
      <meta name="description" content={otherPageData.seodesc} />
      <link rel="canonical" href={`${otherPageData.homeurl}about-us`} />
      <section className={styles.about__banner}>
         <picture>
            <source media="(max-width: 767px)" srcSet={otherPageData.mobbanner} />
            <source media="(min-width: 768px)" srcSet={otherPageData.banner} />
            <img src={otherPageData.mobbanner} className='img-fluid w-100' alt="About Us" />
         </picture>
      </section>
      <section className={styles.aboutSection}>
        <div className="container-xl">
          <Breadcrumb className={styles.bredcrumb}>
            <Breadcrumb.Item href={otherPageData.homeurl}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>About Us</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row">
            <div className="col-lg-12">
              <div className={styles.aboutLeft}>
                <div className={styles.aboutLeft__heading}>
                  <small>About</small>
                  {otherPageData.name && <h1>{otherPageData.name}</h1>}
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className={styles.aboutRight}>
                {otherPageData.texteditercontent && (
                  <TextComponent className={styles.textComponent} itemObj={otherPageData.texteditercontent} />
                )}
              </div>
            </div>
          </div>
          {conndata.length > 0 &&
            <div className="row">
              <div className="col-12">
                <div className={styles.others}>
                  {conndata.map(function (keydata, index) {
                    return (
                      <div className={styles.othersList} key={index}>
                        <div className={styles.count}>
                          <div className='h1'>{keydata.number}<small>{keydata.name}</small></div>
                          <Image src={keydata.image} alt={keydata.name} width={44} height={44} />
                        </div>
                        <div className={styles['others-text']}>{keydata.description}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      <section className={styles.teamContent}>
        <div className="container-xl">
          {otherPageData.h2 && <div className="h2">{otherPageData.h2}</div>}
          <div className="arrow">
            <Image width={93} height={72} src="/images/about-us/arrow.png" alt="Awards" />
          </div>
          {tdata.length > 0 &&
            <div className="row">
              {tdata.map(function (tdata, index) {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <div className={styles.teams}>
                      <figure>
                        <div className={styles.imgBg}>
                          <Image width={210} height={210} src={tdata.image} className="img-fluid w-100" alt={tdata.name} />
                        </div>
                        <figcaption>
                          <h4>{tdata.name}</h4>
                          <div className="sales">{tdata.description}</div>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </section>

      <section className={styles.award}>
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {otherPageData.h3 && <h2>{otherPageData.h3}</h2>}
              {otherPageData.h3desc && <p>{otherPageData.h3desc}</p>}
            </div>
          </div>
          {awdata.length > 0 &&
            <div className="row">
              {awdata.map(function (awdata, index) {
                return (
                  <div className="col-md-3 col-sm-6" key={index}>
                    <figure className={styles.awards}>
                      <Image className="img-fluid" width={194} height={263} src={awdata.image} alt={awdata.name} />
                      <figcaption>{awdata.name}</figcaption>
                    </figure>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </section>
      <section className={styles.process}>
       {otherPageData.h4 && <h3 className='h1'>{otherPageData.h4}</h3>}
       <div className="container-xl">
         <div className="row">
           <div className="col-md-4">
             <div className={styles.process__sub}>
               {otherPageData.teamheading && <div className={`${styles.h5} h5`}>{otherPageData.teamheading}</div>}
               {otherPageData.teamdesc && <p>{otherPageData.teamdesc}</p>}
             </div>
           </div>
           <div className="col-md-4">
             <div className={styles.process__sub}>
               {otherPageData.mottoheading && <div className={`${styles.h5} h5`}>{otherPageData.mottoheading}</div>}
               {otherPageData.mottodesc && <p>{otherPageData.mottodesc}</p>}
             </div>
           </div>
           <div className="col-md-4">
             <div className={styles.process__sub}>
               {otherPageData.visionheading && <div className={`${styles.h5} h5`}>{otherPageData.visionheading}</div>}
               {otherPageData.visiondesc && <p>{otherPageData.visiondesc}</p>}
             </div>
           </div>
         </div>
       </div>
      </section>
    </>
  );
}