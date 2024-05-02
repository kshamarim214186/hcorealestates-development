"use client";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";

/* example-start */
const SEARCH_URI = process.env.API_URL+'users/autosuggest/';

const AsyncSearch = ({ onClick }) => {
   const [options, setOptions] = useState([]);
   const router = useRouter()
   const loadOptions = async (query) => { 
      `${SEARCH_URI}?term=${query}`
      const response = await fetch(`${SEARCH_URI}?term=${query}`);
      const data = await response.json();
      setOptions(data.items);
   };

   const handleChange = (selected) => {
      router.push(selected[0].url, '_blank');
   };

   return (
      <div className="search">
         <button type="button" className="btn close-btn" onClick={onClick}>
           <FontAwesomeIcon icon={faArrowLeft} />
         </button>
         <div className="search--modify">
            <AsyncTypeahead
               id="my-async-typeahead"
               labelKey="label"
               minLength={1}
               onSearch={loadOptions}      
               options={options}
               onChange={handleChange}
               placeholder="Enter a Locality, Builder or Project..."
            />            
         </div>
      </div>
   );
};
export default AsyncSearch;


