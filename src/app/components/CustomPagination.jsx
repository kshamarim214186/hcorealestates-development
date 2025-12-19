import Link from "next/link";
import Pagination from "react-bootstrap/Pagination";
import { useSearchParams } from 'next/navigation'
export default function CustomPagination({ totalrecord, pagename, currentpage, numberofpage }) {
   const numberofrecord = Array.from({ length: numberofpage }, (_, index) => index);
   let start_loop = '';
   let end_loop = '';
   if (parseInt(currentpage) >= parseInt(7)) {
      start_loop = parseInt(currentpage) - parseInt(3);
      if (parseInt(numberofpage) > (parseInt(currentpage) + parseInt(3))){
         end_loop = parseInt(currentpage) + parseInt(3);
      }else if (parseInt(currentpage) <= parseInt(numberofpage) && parseInt(currentpage) > parseInt(numberofpage) - parseInt(6)) {
         start_loop = parseInt(numberofpage) - parseInt(6);
         end_loop = parseInt(numberofpage);
      } else {
         end_loop = parseInt(numberofpage);
      }
   } else {
      start_loop = parseInt(1);
      if (parseInt(numberofpage) > parseInt(7))
      end_loop = parseInt(7);
      else
      end_loop = parseInt(numberofpage);
   }   
   
   const searchParams = useSearchParams() 
   const getDev = searchParams.get('dev') ? searchParams.get('dev') : "";
   const getBed = searchParams.get('bed') ? searchParams.get('bed') : "";
   const getPType = searchParams.get('propertytype') ? searchParams.get('propertytype') : "";
   const priceMin = searchParams.get('price_min') ? searchParams.get('price_min') : "";
   const priceMax = searchParams.get('price_max') ? searchParams.get('price_max') : "";
   const getSort = searchParams.get('sort') ? searchParams.get('sort') : "";

   const nextpageval = parseInt(currentpage)+parseInt(1)
   const prepageval = parseInt(currentpage)-parseInt(1)

   const nextpageUrl = (getDev && getBed && getPType) ? "?page="+nextpageval+"&dev="+getDev+"&bed="+getBed+"&propertytype="+getPType 
   : (getDev && getBed) ? "?page="+nextpageval+"&dev="+getDev+"&bed="+getBed
   : (getBed && getPType) ? "?page="+nextpageval+"&bed="+getBed+"&propertytype="+getPType 
   : (getDev && getBed) ? "?page="+nextpageval+"&dev="+getDev+"&bed="+getBed 
   : (priceMin && priceMax) ? "?page="+nextpageval+"&price_min="+priceMin+"&price_max="+priceMax 
   : priceMin ? "?page="+nextpageval+"&price_min="+priceMin
   : priceMax ? "?page="+nextpageval+"&price_max="+priceMax 
   : getPType ? "?page="+nextpageval+"&propertytype="+getPType 
   : getBed ? "?page="+nextpageval+"&bed="+getBed
   : getDev ? "?page="+nextpageval+"&dev="+getDev
   : getSort ? "?page="+nextpageval+"&sort="+getSort
   : "?page="+nextpageval;


   const prevpageUrl = (getDev && getBed && getPType) ? "?page="+prepageval+"&dev="+getDev+"&bed="+getBed+"&propertytype="+getPType 
   : (getDev && getBed) ? "?page="+prepageval+"&dev="+getDev+"&bed="+getBed
   : (getBed && getPType) ? "?page="+prepageval+"&bed="+getBed+"&propertytype="+getPType 
   : (getDev && getBed) ? "?page="+prepageval+"&dev="+getDev+"&bed="+getBed 
   : (priceMin && priceMax) ? "?page="+prepageval+"&price_min="+priceMin+"&price_max="+priceMax 
   : priceMin ? "?page="+prepageval+"&price_min="+priceMin
   : priceMax ? "?page="+prepageval+"&price_max="+priceMax 
   : getPType ? "?page="+prepageval+"&propertytype="+getPType 
   : getBed ? "?page="+prepageval+"&bed="+getBed
   : getDev ? "?page="+prepageval+"&dev="+getDev
   : getSort ? "?page="+prepageval+"&sort="+getSort
   : "?page="+prepageval;



   let nextButton = null;
   if (parseInt(numberofrecord.length) === parseInt(currentpage)) {
      nextButton = <Pagination.Next disabled />;
   } else {
      nextButton = <Pagination.Next href={nextpageUrl} />;
   }

   let prevButton = null;
   if (parseInt(currentpage) === 1) {
      prevButton = <Pagination.Prev disabled />;
   } else {
      prevButton = <Pagination.Prev href={prevpageUrl} />;
   }
   return (
      <> 
         <Pagination className="justify-content-center">
            {prevButton}
               {numberofrecord.map(function(data,idx) {
                  const pageval = idx+1;                
                  const pageUrl = (getDev && getBed && getPType) ? "?page="+pageval+"&dev="+getDev+"&bed="+getBed+"&propertytype="+getPType 
                                 : (getDev && getBed) ? "?page="+pageval+"&dev="+getDev+"&bed="+getBed
                                 : (getBed && getPType) ? "?page="+pageval+"&bed="+getBed+"&propertytype="+getPType 
                                 : (getDev && getBed) ? "?page="+pageval+"&dev="+getDev+"&bed="+getBed 
                                 : (priceMin && priceMax) ? "?page="+pageval+"&price_min="+priceMin+"&price_max="+priceMax 
                                 : priceMin ? "?page="+pageval+"&price_min="+priceMin
                                 : priceMax ? "?page="+pageval+"&price_max="+priceMax 
                                 : getPType ? "?page="+pageval+"&propertytype="+getPType 
                                 : getBed ? "?page="+pageval+"&bed="+getBed
                                 : getDev ? "?page="+pageval+"&dev="+getDev
                                 : getSort ? "?page="+pageval+"&sort="+getSort
                                 : "?page="+pageval;
                  if (pageval >= start_loop &&  pageval <= end_loop) {                     
                     if (parseInt(currentpage) === parseInt(pageval)) {
                        return ( 
                           <Pagination.Item href={pageUrl === '?page=1' ? pagename : pageUrl } key={idx} active>{pageval}</Pagination.Item>
                        )
                     }else{
                        return ( 
                           <Pagination.Item href={pageUrl === '?page=1' ? pagename : pageUrl } key={idx}>{pageval}</Pagination.Item>
                        )
                     } 
                  }
               })}
            {nextButton}
         </Pagination>
      </>
   );
}