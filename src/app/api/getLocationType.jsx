export default async function getLocationType(type) {
    const formData = new URLSearchParams();
   formData.append('token1', 'test');
   formData.append('token2', 'test1');
   formData.append('type', type);
   const finalresult = await fetch(process.env.API_URL+'properties/getLocationType/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();

}