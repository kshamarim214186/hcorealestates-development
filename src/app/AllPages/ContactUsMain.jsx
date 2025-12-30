'use client';
import SocialMedia from '@/app/UI/SocialMedia';
import MainForm from '@/app/components/MainForm';
import styles from '@/app/scss/contact.module.scss';
import Link from 'next/link';
import { Breadcrumb, Nav, Tab } from 'react-bootstrap';

export default function ContactUsMain({ itempageData, resultOtherPage }) {
  const pageData = itempageData;
  const otherPageData = resultOtherPage.otherpagedata;

  return (
    <>
      <title>{otherPageData.seotitle}</title>
      <meta name="description" content={otherPageData.seodesc} />
      <link rel="canonical" href={`${otherPageData.homeurl}contact-us`} />
      <section className={styles.bg}>
        <div className="container-xl">
          <Breadcrumb className={styles.bredcrumb}>
            <Breadcrumb.Item href={otherPageData.homeurl}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.info}>
            <h1>{otherPageData.name}</h1>
            <p className={styles.para}>{otherPageData.overview}</p>
          </div>
        </div>
      </section>
      <section className={styles.contact}>
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-8">
              <div className={styles.contact__left}>
                <div className={styles.contact__inner}>
                  <div className="h5">{otherPageData.indiaaddressheading}</div>
                  <ul className={styles.contact__info}>
                    <li>
                      <a href={`tel:${otherPageData.telephonenumber.replace(' ', '')}`}>
                        <span>t.</span>
                        {otherPageData.telephonenumber} (30 Lines)
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${otherPageData.callnumber.replace(' ', '')}`}>
                        <span>m.</span>
                        {otherPageData.callnumber}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${otherPageData.indiaemail}`}>
                        <span>e.</span>{otherPageData.indiaemail}
                      </a>
                    </li>
                    <li>
                      <Link href={otherPageData.currentwebsite}>
                        <span>w.</span>
                        {otherPageData.currentwebsite.replace(['https://'], '')}
                      </Link>
                    </li>
                  </ul>
                  <div className={styles.follow}>
                    <div className="h5">Follow Us</div>
                    <SocialMedia itemObj={pageData} />
                  </div>
                </div>
                <div className={styles.contact__inner}>
                  <div className="h5">{otherPageData.dubaiaddressheading}</div>
                  <ul className={styles.contact__info}>
                    <li>
                      <a href={`tel:${otherPageData.dubaicallnumber.replace(' ', '')}`}>
                        <span>m.</span>
                        {otherPageData.dubaicallnumber}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${otherPageData.dubaiemail}`}>
                        <span>e.</span>{otherPageData.dubaiemail}
                      </a>
                    </li>
                    <li>
                      <Link href={otherPageData.dubaiwebsite}>
                        <span>w.</span>
                        {otherPageData.dubaiwebsite.replace(['https://'], '')}
                      </Link>
                    </li>
                  </ul>
                  <div className={styles.follow}>
                    <div className="h5">Follow Us</div>
                    <SocialMedia itemObj={pageData.dubaisociallink} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles.contact__right}>
                <div className="h3 text-center mb-3">Get in touch with us!</div>
                <MainForm projectName="Hco Real Estates" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.tabs}>
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="h2 mb-4">Our Offices in Delhi/NCR</div>
              <div className={styles.tabs__area}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="office1">
                  <Nav variant="pills" className={styles.tabs__left}>
                    <Nav.Item>
                      <Nav.Link eventKey="office1">
                        <div className="office_heading">Corporate Office :</div>
                        <span dangerouslySetInnerHTML={{ __html: otherPageData.coffice }}></span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="office2">
                        <div className="office_heading">Gurgaon Office :</div>
                        <span dangerouslySetInnerHTML={{ __html: otherPageData.goffice }}></span>
                      </Nav.Link>
                    </Nav.Item>
                    {otherPageData.ngoffice && (
                      <Nav.Item>
                        <Nav.Link eventKey="office3">
                          <div className="office_heading">Dubai Office :</div>
                          <span dangerouslySetInnerHTML={{ __html: otherPageData.dubaioffice }}></span>
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  </Nav>
                  <Tab.Content className={styles.tabs__right}>
                    <Tab.Pane eventKey="office1">
                      <iframe
                        src={otherPageData.cofficeiframe}
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </Tab.Pane>
                    <Tab.Pane eventKey="office2">
                      <iframe
                        src={otherPageData.gofficeiframe}
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </Tab.Pane>
                    {otherPageData.ngofficeiframe && (
                      <Tab.Pane eventKey="office3">
                        <iframe
                          src={otherPageData.dubaiofficeiframe}
                          width="100%"
                          height="450"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </Tab.Pane>
                    )}
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}