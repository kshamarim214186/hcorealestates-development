'use client';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
export default function LoanForm() {

  const  projectName = 'Loan Form';
  const router = useRouter()
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState("noreply@gmail.com");
   const [country, setCountry] = useState("2");
  const [mobileNo, setPhone] = useState('');
  const formSubmit = async (e) => {
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
    <>
      <form action="" onSubmit={formSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="tel"
            className="form-control"
            placeholder="Enter Phone Number"
            value={mobileNo}
            onChange={e => setPhone(e.target.value)}
          />
          <button disabled={isSubmitting} type="submit" className="btn btn-primary">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </div>
      </form>
    </>
  );
}
