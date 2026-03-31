export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://timsgraphy.com",
    name: "Tim's Graphy",
    description:
      "Award-winning photography studio based in Lagos, Nigeria. Specialising in weddings, portraits, and commercial photography.",
    url: "https://timsgraphy.com",
    telephone: "+2348012345678",
    email: "hello@timsgraphy.com",
    image: "https://timsgraphy.com/og-image.jpg",
    priceRange: "₦₦₦",
    currenciesAccepted: "NGN",
    paymentAccepted: "Cash, Bank Transfer",
    openingHours: "Mo-Sa 09:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Victoria Island",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.4281,
      longitude: 3.4219,
    },
    sameAs: [
      "https://instagram.com/obsidianstudiong",
      "https://facebook.com/obsidianstudiong",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography",
            description: "Full-day wedding coverage with cinematic storytelling.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "450000",
            priceCurrency: "NGN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Portrait & Headshots",
            description: "Studio and outdoor portrait sessions for individuals and executives.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "80000",
            priceCurrency: "NGN",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Photography",
            description: "Brand, product, and campaign photography for businesses.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "200000",
            priceCurrency: "NGN",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
