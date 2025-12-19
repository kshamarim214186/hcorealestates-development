import { useRouter } from 'next/navigation'
import { useState } from "react";
import CountryDropDown from "./CountryDropDown";

export default function MainForm({ projectName }) {

   const router = useRouter()
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [country, setCountry] = useState("2");
   const [mobileNo, setMobileNo] = useState("");
   
   const formSubmitHandle = async (e) => {
      e.preventDefault(); 
      setIsSubmitting(true);     
      const formData = new URLSearchParams();
      formData.append('token1', process.env.token1);
      formData.append('token2', process.env.token2);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('country', country);
      formData.append('mobileNo', mobileNo);
      formData.append('projectName', projectName);
      const finalresult = await fetch(process.env.API_URL+'users/submitQueryForm/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData,
      }); 
      const data = await finalresult.json();  
      
      if(data.error == true){
         setIsSubmitting(false);
         setError(data.message);
      }else{
         setIsSubmitting(true);
         router.push('thank-you');
      }

   };
   return (
      <form onSubmit={formSubmitHandle}>
         {error && <p className="text-danger">{error}</p>}
         <div className="form-floating mb-3">
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="floatName" placeholder="Enter Your Name" required />
            <label htmlFor="floatName">Enter Your Name</label>
         </div>
         <div className="form-floating mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="floatEmail" placeholder="Email address" />
            <label htmlFor="floatEmail">Email address</label>
         </div>

         <div className="form-floating mb-3">
            <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)} id="floatCountry" required>
            <option value="2">India</option>
               <CountryDropDown />
            </select>
            <label htmlFor="floatCountry">Select Your Country</label>
         </div>
         <div className="form-floating mb-3">
            <input type="tel" className="form-control" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} id="floatPhoneNumber" placeholder="Mobile No." required />
            <label htmlFor="floatPhoneNumber">Mobile No.</label>
         </div>

         <div className="d-grid">
            <button disabled={isSubmitting} type="submit" className="btn btn-primary">{isSubmitting ? "Submitting..." : "Get Callback"}</button>
         </div>
      </form>
   )
}