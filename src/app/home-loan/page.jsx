import Image from 'next/image';
import getHomeCompleteData from '../api/getHomeCompleteData';
import getLocationType from '../api/getLocationType';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BsAccordion from '../components/bs-accordion';
import EmiCalculator from '../components/emi-calculator';
import LoanForm from '../components/loan-form';
import styles from '../scss/home-loan.module.scss';

export default async function HomeLoan() {
  const props = getHomeCompleteData();
  const result = await props;
  const banksData = result.bankdata;
  const faqsData = result.loanfaqdata;
  const residential = getLocationType('residential');
  const resData = await residential;
  const residentialData = resData.loctype;

  const commercial = getLocationType('commercial');
  const commData = await commercial;
  const commercialData = commData.loctype;
  const pageName = 'project';
  const projectName = 'Get Home Loan at 7.35%*';
  const ctoc = result.pagedata.loancallnumber;
  const whatsApp = result.pagedata.loanwhatsnumber;
  return (
    <>
      <Header
        resultHeader={result}
        commercialData={commercialData}
        residentialData={residentialData}
         fixedTop="nottrue" 
         ctoc={ctoc}
      />
      <main className="pt-4">
        <title>{result.pagedata.bankseotitle}</title>
        <meta name="description" content={result.pagedata.bankseodesc} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={result.pagedata.loanurl} />
        <section className="container-xl">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <figure>
                  <Image
                    src={result.pagedata.loanbanner}
                    alt={result.pagedata.loanbannerheading}
                    width={600}
                    height={400}
                    className="img-fluid rounded-top"
                  />
                </figure>
                <div className="py-3 px-4">
                  <div className="h4 mb-3">
                    {result.pagedata.loanbannerheading}
                  </div>
                  <LoanForm />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <EmiCalculator />
            </div>
          </div>
        </section>
        <section className="container-xl pt-lg-5 pt-3">
          <div className="row">
            <div className="col-md-7 col-lg-8">
              <h1 dangerouslySetInnerHTML={{ __html: result.pagedata.bankhomehead }} />
              <p>{result.pagedata.bankhomedesc}</p>
              <div className={styles.banks}>
                {banksData.map(bank => (
                  <figure key={bank.id}>
                    <Image
                      src={bank.devphoto}
                      alt={bank.name}
                      className="img-fluid"
                      width={160}
                      height={70}
                    />
                    <figcaption>{bank.name}</figcaption>
                  </figure>
                ))}
              </div>

              <h2>{result.pagedata.banklistinghead}</h2>
              <div dangerouslySetInnerHTML={{ __html: result.pagedata.banklistingdesc }} />              
              <div className="h4 mt-4">Frequently Asked Questions</div>
              <BsAccordion itemData={faqsData} />
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-5">
              <div className={styles.qrContainer}>
                <div className="h4">Scan QR Code</div>
                <Image
                  src={result.pagedata.qrcode}
                  quality={100}
                  alt="qr-code"
                  width={350}
                  height={300}
                  className="img-fluid w-100"
                />
                {/* <small>Point your Smartphone camera at this QR code and click the link.</small> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        resultFooter={result}
        commercialData={commercialData}
        residentialData={residentialData}
        pageName={pageName}
        projectName={projectName}
        ctoc={ctoc} 
        whatsApp={whatsApp}
      />
    </>
  );
}
