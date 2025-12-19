import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { useState, useEffect } from "react";
import AsyncSearch from "./AsyncSearch";

export default function HeaderSearch() {
  const [btnClick, setBtnClick] = useState(false);
  useEffect(() => {
    const resposiveTrue = window.matchMedia("(min-width: 992px)").matches;
    if (resposiveTrue) {
      setBtnClick(true);
    } else {
      setBtnClick(false);
    }
  }, []);
  function clickHandle() {
    setBtnClick(!btnClick);
  }

   return (
      <div className="search-control">
         <div className="search-control__btn">
           <button type="button" className="btn btn-outline-secondary" onClick={() => clickHandle(!btnClick)}>
             <FontAwesomeIcon icon={faMagnifyingGlass} />
           </button>
         </div>
         {btnClick && <AsyncSearch onClick={() => clickHandle(btnClick)} />}
      </div>
   );
}
