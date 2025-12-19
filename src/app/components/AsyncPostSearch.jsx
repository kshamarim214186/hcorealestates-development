"use client";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

/* example-start */
const SEARCH_URI = process.env.API_URL+'users/autosuggestofpost/';

const AsyncPostSearch = () => {
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
      <div className="search--modify">
         <AsyncTypeahead
         id="my-async-typeahead"
         labelKey="label"
         minLength={1}
         onSearch={loadOptions}      
         options={options}
         onChange={handleChange}
         placeholder="Enter Post Name..."
         />
      </div>
   </div>
  );
};
export default AsyncPostSearch;


