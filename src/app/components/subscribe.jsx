import { useState } from "react"

export default function Subscribe() {

   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [subsemail, setsubsEmail] = useState('');
  
   const handleSubmit = async () => {
      const formData = new URLSearchParams();
      formData.append('token1', process.env.token1);
      formData.append('token2', process.env.token2);
      formData.append('email', subsemail);
      const finalresult = await fetch(process.env.API_URL+'users/subscribe/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData,
      }); 
      const data = await finalresult.json();  
      if(data.error == true){
         setSuccess('');
         setError(data.message);
      }else{
         setError('');
         setSuccess(data.message);
      }
   }


   function subscribeHandle(e) {
      e.preventDefault();
      handleSubmit();
   }
   return (
      <div className="subscribe">
         <div className="h5">Get all the latest posts delivered straight to your inbox.</div>
         {error && <p>{error}</p>}
         {success && <p>{success}</p>}
         <form onSubmit={subscribeHandle}>
            <input type="email" className="form-control" placeholder="Email Address" value={subsemail} onChange={(e) => setsubsEmail(e.target.value)} required />
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary" placeholder="Email Adress">Subscribe</button>
            </div>
         </form>
      </div>
   )
}