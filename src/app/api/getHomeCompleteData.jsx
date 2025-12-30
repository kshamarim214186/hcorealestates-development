import { headers } from "next/headers";

export default async function getHomeCompleteData() {
  // 1️⃣ Get user country from CloudFront
  const headerList = headers();
  const country = headerList.get("cloudfront-viewer-country");

  // 2️⃣ Call your backend API
  const formData = new URLSearchParams();
  formData.append("token1", process.env.token1);
  formData.append("token2", process.env.token2);

  const finalresult = await fetch(
    process.env.API_URL + "pages/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      cache: "no-store",
    }
  );

  // 3️⃣ Parse JSON
  const apiData = await finalresult.json();

  // 4️⃣ Attach country to API response
  return {
    ...apiData,
    userCountry: country, // 👈 attached here
  };
}
