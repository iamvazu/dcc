import type { MetadataRoute } from "next";
import {
  addOns,
  cities,
  costGuides,
  getTier1Cities,
  getTier1Industries,
  industries,
  residentialServices,
  site,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.website;
  const now = new Date();

  const coreRoutes = [
    "",
    "/commercial-cleaning/",
    "/house-cleaning/",
    "/pricing/",
    "/pricing/commercial-cleaning-calculator/",
    "/pricing/house-cleaning-calculator/",
    "/benchmark-audit/",
    "/protocol/",
    "/guarantee/",
    "/government-contracting/",
    "/about/",
    "/reviews/",
    "/careers/",
    "/contact/",
    "/resources/",
    "/privacy/",
  ].map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  const industryRoutes = industries.map((ind) => ({
    url: `${baseUrl}/commercial-cleaning/${ind.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const commercialCityRoutes = cities.map((c) => ({
    url: `${baseUrl}/commercial-cleaning/${c.slug}-ca/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: c.tier === 1 ? 0.85 : 0.75,
  }));

  const comboRoutes = getTier1Industries().flatMap((ind) =>
    getTier1Cities().map((c) => ({
      url: `${baseUrl}/commercial-cleaning/${ind.slug}/${c.slug}-ca/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const residentialServiceRoutes = residentialServices.map((s) => ({
    url: `${baseUrl}/house-cleaning/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const residentialCityRoutes = cities.map((c) => ({
    url: `${baseUrl}/house-cleaning/${c.slug}-ca/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const costGuideRoutes = costGuides.map((g) => ({
    url: `${baseUrl}/pricing/${g.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const addOnRoutes = addOns.map((a) => ({
    url: `${baseUrl}/add-ons/${a.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...industryRoutes,
    ...commercialCityRoutes,
    ...comboRoutes,
    ...residentialServiceRoutes,
    ...residentialCityRoutes,
    ...costGuideRoutes,
    ...addOnRoutes,
  ];
}

