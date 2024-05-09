import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PropertiesListing from "../AllPages/PropertiesListing";
import getHomeCompleteData from "../api/getHomeCompleteData";
import getLocationType from "../api/getLocationType";

export default async function Properties() {
   const props = getHomeCompleteData();
   const result = await props;

   const residential = getLocationType('residential');
   const resData = await residential;
   const residentialData = resData.loctype;


   const commercial = getLocationType('commercial');
   const commData = await commercial;
   const commercialData = commData.loctype;
   const pageName = 'project';
   const projectName = 'Hco Real Estates';
   return (
      <>
      <p>sdsfdf</p>
      </>
   );
}