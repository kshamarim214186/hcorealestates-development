export default async function getPostByCat(caturl) {   
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   formData.append('caturl', caturl);
   const finalresult = await fetch(process.env.API_URL+'blogs/getblogbycat/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();

}