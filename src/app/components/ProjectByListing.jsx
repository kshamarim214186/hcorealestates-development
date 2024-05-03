import ListItems from "../UI/ListItems";
import styles from "../scss/developer.module.scss";
import CustomPagination from "@/app/components/CustomPagination";

export default function ProjectByListing({ resultProperties, pageName, currentpage }) { 
   const properties = resultProperties.propertydata;
   const message = resultProperties.message;
   const totalrecords = resultProperties.totalrecords;
   const perpagerecord = resultProperties.perpagerecord;
   const number_of_page = Math.ceil(resultProperties.totalrecords / resultProperties.perpagerecord);
   
   return ( 
      <> 
         <p>cvxv</p>
      </>
   );
}