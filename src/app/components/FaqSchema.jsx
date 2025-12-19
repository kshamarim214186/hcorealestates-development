export default function FaqSchema({ faqList }) {
   const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "").trim();
   };

   const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": stripHtml(faq.answer),
        },
      })),
    };
   return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
   </>
}