export default async function getPostListByCondition(column='',value='',page='') {
   
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   formData.append('page', page);
   formData.append('column', column);
   formData.append('value', value);
   const finalresult = await fetch(process.env.API_URL+'blogs/getPostByCondition/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();

}