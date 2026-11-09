import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResidentialCalculator } from "@/components/ResidentialCalculator";
import { FaqPageSchema, ServiceSchema } from "@/components/JsonLd";
import {
  cities,
  CityRecord,
  getCityBySlug,
  residentialServices,
  ResidentialServiceRecord,
  ResidentialServiceKey,
} from "@/lib/data";

export function generateStaticParams() {
  const serviceParams = residentialServices.map((s) => ({ slug: s.slug }));
  const cityParams = cities.map((c) => ({ slug: `${c.slug}-ca` }));
  return [...serviceParams, ...cityParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug.endsWith("-ca")) {
    const city = getCityBySlug(slug);
    if (!city) return {};
    return {
      title: `House Cleaning in ${city.name}, CA | Debra's Classic Cleaning`,
      description: `Trusted residential house cleaning and maid service in ${city.name}, CA (${city.zips.join(", ")}). See your instant price online in 60 seconds. Save up to 20%.`,
      alternates: {
        canonical: `/house-cleaning/${city.slug}-ca/`,
      },
    };
  }

  const srv = residentialServices.find((s) => s.slug === slug);
  if (!srv) return {};
  return {
    title: `${srv.name} Rocklin & Roseville | Debra's Classic Cleaning`,
    description: `${srv.shortDescription} Instant online price calculator in 60 seconds.`,
    alternates: {
      canonical: `/house-cleaning/${srv.slug}/`,
    },
  };
}

export default async function HouseCleaningSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug.endsWith("-ca")) {
    const city = getCityBySlug(slug);
    if (!city) notFound();
    return <ResidentialCityTemplate city={city} />;
  }

  const service = residentialServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ResidentialServiceTemplate service={service} />;
}

function ResidentialServiceTemplate({ service }: { service: ResidentialServiceRecord }) {
  return (
    <div className="divide-y divide-rule">
      <ServiceSchema
        name={service.name}
        serviceType="Residential House Cleaning"
        description={service.shortDescription}
        url={`/house-cleaning/${service.slug}/`}
      />
      <FaqPageSchema faqs={service.faqs} />

      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "House Cleaning", href: "/house-cleaning/" },
              { label: service.name, href: `/house-cleaning/${service.slug}/` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-sky">
                Residential Service Specification
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                {service.name}
              </h1>
              <p className="text-base sm:text-lg text-ink/85 leading-relaxed">
                {service.intro}
              </p>
            </div>

            <div className="lg:col-span-5 border border-rule bg-white p-6 rounded-2xl shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-sky">
                What&apos;s Included in This Visit:
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-ink/85">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-bold text-pass">0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <Suspense fallback={<div className="p-8">Loading Calculator...</div>}>
              <ResidentialCalculator
                defaultServiceType={service.calcServiceType as ResidentialServiceKey}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <h2 className="font-display-wide text-2xl text-ink">
            {service.name} FAQs
          </h2>
          <div className="border border-rule bg-white rounded-2xl shadow-2xs divide-y divide-rule/70">
            {service.faqs.map((faq, idx) => (
              <details key={idx} className="p-5" open={idx === 0}>
                <summary className="font-display-wide text-base text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-xs border border-rule rounded-md px-2.5 py-0.5 bg-paper">
                    +
                  </span>
                </summary>
                <p className="text-sm text-ink/80 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ResidentialCityTemplate({ city }: { city: CityRecord }) {
  const siblingCities = city.nearbyCities
    .map((s) => getCityBySlug(s))
    .filter((c): c is CityRecord => Boolean(c));

  return (
    <div className="divide-y divide-rule">
      <ServiceSchema
        name={`House Cleaning in ${city.name}, CA`}
        serviceType="Residential House Cleaning & Maid Service"
        description={`Recurring, deep, and move-out house cleaning in ${city.name}, CA (${city.zips.join(", ")}).`}
        url={`/house-cleaning/${city.slug}-ca/`}
        areaServedName={`${city.name}, ${city.county}, CA`}
      />
      <FaqPageSchema faqs={city.localFaqs} />

      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "House Cleaning", href: "/house-cleaning/" },
              { label: `${city.name}, CA`, href: `/house-cleaning/${city.slug}-ca/` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-sky">
                Home Cleaning · {city.county} · ZIPs: {city.zips.join(", ")}
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                House Cleaning in {city.name}, CA.
              </h1>
              <p className="text-base sm:text-lg text-ink/85 leading-relaxed">
                {city.intro}
              </p>
              <p className="text-xs text-ink/75">
                Need commercial office or clinic cleaning in {city.name} instead?{" "}
                <Link
                  href={`/commercial-cleaning/${city.slug}-ca/`}
                  className="text-brand font-bold underline"
                >
                  Switch to {city.name} Commercial Cleaning →
                </Link>
              </p>
            </div>

            <div className="lg:col-span-5 border border-rule bg-white p-6 rounded-2xl shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-sky">
                {city.name} Home Dispatch Highlights:
              </div>
              <ul className="space-y-2 text-xs text-ink/85">
                <li>
                  <strong>Distance from Rocklin HQ:</strong> {city.distanceFromRocklin}
                </li>
                <li>
                  <strong>Recurring Discounts:</strong> Save 20% Weekly · 15% Biweekly · 10% Monthly
                </li>
                <li>
                  <strong>Guarantee:</strong> 24-Hour Re-Clean Promise + Zero Contracts
                </li>
              </ul>
              <div className="pt-3 border-t border-rule/70">
                <div className="text-xs font-bold text-ink">{city.proof.title}</div>
                <p className="text-xs text-ink/75 mt-1 leading-relaxed">{city.proof.body}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Suspense fallback={<div className="p-8">Loading Calculator...</div>}>
              <ResidentialCalculator defaultZip={city.zips[0]} />
            </Suspense>
          </div>

          <div className="border-t border-rule pt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/75">
              Nearby Communities Served:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {siblingCities.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/house-cleaning/${sib.slug}-ca/`}
                  className="btn-report btn-paper text-xs py-2 px-3.5"
                >
                  House Cleaning in {sib.name}, CA →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

