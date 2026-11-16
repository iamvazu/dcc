import React from "react";
import { cities, site } from "@/lib/data";

export function SitewideLocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
    "@id": `${site.website}/#localbusiness`,
    name: site.companyName,
    legalName: site.legalName,
    description:
      "Trusted residential house cleaning, maid service, office cleaning, and commercial janitorial services in Rocklin, Roseville, Granite Bay, Folsom, and Greater Sacramento.",
    url: site.website,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.foundedYear),
    naics: "561720",
    priceRange: "$$",
    image: [
      `${site.website}/images/debras-logo.png`,
      `${site.website}/images/debras-fleet-cx5-real.jpg`,
      `${site.website}/images/commercial-clinic-inspection.png`,
      `${site.website}/images/residential-granite-bay-home.png`,
    ],
    logo: `${site.website}/images/debras-logo.png`,
    hasMap: "https://share.google/yJPkM6b3pJNb2c7ZT",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.nap.streetAddress,
      addressLocality: site.nap.addressLocality,
      addressRegion: site.nap.addressRegion,
      postalCode: site.nap.postalCode,
      addressCountry: site.nap.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.nap.geo.latitude,
      longitude: site.nap.geo.longitude,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.nap.geo.latitude,
        longitude: site.nap.geo.longitude,
      },
      geoRadius: "45000",
    },
    openingHoursSpecification: site.nap.openingHoursSpecification.map((oh) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: oh.dayOfWeek,
      opens: oh.opens,
      closes: oh.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "43",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "House Cleaning",
      "Maid Service",
      "Deep House Cleaning",
      "Move-In Move-Out Cleaning",
      "Recurring House Cleaning",
      "Commercial Cleaning",
      "Office Cleaning Services",
      "Janitorial Services",
      "Medical Office Cleaning",
      "Dental Office Cleaning",
      "Daycare & Preschool Cleaning",
      "Post-Construction Cleaning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential & Commercial Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential House Cleaning & Maid Service",
            url: `${site.website}/house-cleaning/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep House Cleaning & Move-Out Cleaning",
            url: `${site.website}/house-cleaning/deep-cleaning/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Office & Janitorial Cleaning",
            url: `${site.website}/commercial-cleaning/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Medical, Dental & Daycare Facility Sanitization",
            url: `${site.website}/commercial-cleaning/medical-office/`,
          },
        },
      ],
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: `${c.name}, CA`,
    })),
    sameAs: site.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  serviceType,
  description,
  url,
  areaServedName = "Placer, Sacramento, Yolo & Yuba Counties, CA",
  priceRangeText = "$650–$3,500/month (commercial) or $140–$350/visit (residential)",
}: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  areaServedName?: string;
  priceRangeText?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${site.website}${url}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${site.website}/#localbusiness`,
      name: site.legalName,
      telephone: site.phone,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServedName,
    },
    offers: {
      "@type": "Offer",
      description: priceRangeText,
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqPageSchema({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GovernmentOrgSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.website,
    foundingDate: "2016",
    founder: {
      "@type": "Person",
      name: "Debra",
      jobTitle: "Founder & Managing Member",
    },
    naics: "561720",
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "CAGE",
        value: "9Z5E9",
      },
      {
        "@type": "PropertyValue",
        propertyID: "CA DGS Small Business Certification ID",
        value: "2040639",
      },
      {
        "@type": "PropertyValue",
        propertyID: "NAICS",
        value: "561720",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

