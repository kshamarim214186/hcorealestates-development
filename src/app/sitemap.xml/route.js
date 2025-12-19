export const dynamic = 'force-dynamic';

export async function GET() {
  const xmldata = await getXmlForProject();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmldata
  .map(
    (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

async function getXmlForProject() {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);

  const url = `${process.env.API_URL}properties/xmldata/?_t=${Date.now()}`; // bust cache

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    body: formData,
  });

  if (!response.ok) {
    console.error('Failed to fetch XML data:', await response.text());
    throw new Error('Failed to fetch XML data');
  }

  return response.json();
}
