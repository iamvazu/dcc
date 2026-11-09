import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCalculator } from "@/components/CommercialCalculator";
import { FaqPageSchema, ServiceSchema } from "@/components/JsonLd";
import {
  cities,
  CityRecord,
  getCityBySlug,
  getIndustryBySlug,
  getProtocolPointsByIds,
  getTier1Cities,
  getTier1Industries,
  industries,
  IndustryRecord,
  site,
} from "@/lib/data";

export function generateStaticParams() {
  const industryParams = industries.map((ind) => ({ slug: ind.slug }));
  const cityParams = cities.map((c) => ({ slug: `${c.slug}-ca` }));
  return [...industryParams, ...cityParams];
}

function passesCityQualityGate(city: CityRecord): boolean {
  const words = (city.intro || "").trim().split(/\s+/).filter(Boolean).length;
  return (
    words >= 120 &&
    Array.isArray(city.districts) &&
    city.districts.length >= 3 &&
    Boolean(city.distanceFromRocklin) &&
    Boolean(city.responseTime) &&
    Array.isArray(city.nearbyCities) &&
    city.nearbyCities.length >= 2 &&
    Array.isArray(city.localFaqs) &&
    city.localFaqs.length >= 3
  );
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
    const indexable = passesCityQualityGate(city);
    return {
      title: `Commercial Cleaning in ${city.name}, CA | Debra's Classic Cleaning`,
      description: `42-point inspected commercial cleaning in ${city.name}, CA (${city.zips.join(", ")}). Serving offices, clinics & daycares. ${city.responseTime}. Instant price online.`,
      alternates: {
        canonical: `/commercial-cleaning/${city.slug}-ca/`,
      },
      robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    };
  }

  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Cleaning Sacramento & Roseville | Debra's`,
    description: `${industry.shortLine.slice(0, 120)} Inspected to a 42-point protocol. Get an instant price online.`,
    alternates: {
      canonical: `/commercial-cleaning/${industry.slug}/`,
    },
  };
}

export default async function CommercialSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug.endsWith("-ca")) {
    const city = getCityBySlug(slug);
    if (!city) notFound();
    return <CommercialCityTemplate city={city} />;
  }

  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  return <CommercialIndustryTemplate industry={industry} />;
}

/* ============================================================================
   INDUSTRY PAGE TEMPLATE (PRD 4.3)
   ============================================================================ */
function CommercialIndustryTemplate({ industry }: { industry: IndustryRecord }) {
  const priorityPoints = getProtocolPointsByIds(industry.keyProtocolPoints);
  const tier1Cities = getTier1Cities();

  return (
    <div className="divide-y divide-rule">
      <ServiceSchema
        name={`${industry.name} Cleaning Services`}
        serviceType={`${industry.name} Janitorial & Disinfection`}
        description={industry.shortLine}
        url={`/commercial-cleaning/${industry.slug}/`}
      />
      <FaqPageSchema faqs={industry.faqs} />

      {/* 1. Hero & Facility-Specific Risk */}
      <section className="bg-paper report-grid-bg py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "Commercial Cleaning", href: "/commercial-cleaning/" },
              {
                label: `${industry.name} Cleaning`,
                href: `/commercial-cleaning/${industry.slug}/`,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Industry Protocol · {industry.inspectionContext}
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                {industry.name} Cleaning in Rocklin, Roseville &amp; Sacramento
              </h1>
              <p className="text-lg text-ink/85 leading-relaxed">
                {industry.shortLine}
              </p>
              <div className="flex flex-wrap gap-3.5 pt-1">
                <a
                  href="#industry-calculator"
                  className="btn-report btn-brand text-base px-6 py-3.5"
                >
                  Price Your {industry.name} Space
                </a>
                <Link
                  href="/benchmark-audit/"
                  className="btn-report btn-paper text-base px-6 py-3.5"
                >
                  Book Free 20-Min Walkthrough
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 border border-rule bg-white p-3 rounded-2xl shadow-sm">
              <Image
                src={industry.heroImage}
                alt={`${industry.name} cleaning in Roseville, Rocklin and Sacramento by Debra's Classic Cleaning`}
                width={560}
                height={380}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="pt-2.5 px-1 flex items-center justify-between text-xs text-ink/75">
                <span className="font-semibold">{industry.pluralName}</span>
                <span className="text-pass font-bold">42-Point Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Specific Risk & Common Failure Points */}
      <section className="bg-paper-2 py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Why Specialized Care Matters
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink">
              {industry.riskHeading}
            </h2>
            <p className="text-base text-ink/80 leading-relaxed">
              {industry.riskBody}
            </p>
            <div className="p-5 border border-rule bg-white rounded-xl space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-pass">
                Products &amp; Equipment Used
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{industry.methodsAndProducts}</p>
            </div>
          </div>

          <div className="lg:col-span-6 border border-rule bg-white rounded-xl divide-y divide-rule/80 shadow-xs overflow-hidden">
            <div className="bg-ink text-paper px-5 py-3.5 text-xs font-semibold tracking-wide">
              Common Oversights in {industry.pluralName}
            </div>
            {industry.failurePoints.map((fp, i) => (
              <div key={i} className="p-5 flex items-start gap-3.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-brand/10 text-brand shrink-0">
                  0{i + 1}
                </span>
                <p className="text-sm text-ink font-medium leading-relaxed">{fp}</p>
              </div>
            ))}
            <div className="p-5 bg-paper/70 space-y-1">
              <p className="text-xs text-ink/80 italic">{industry.proof.quote}</p>
              <div className="text-[11px] font-medium text-ink/65">{industry.proof.attribution}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Protocol Points That Matter Most for This Industry */}
      <section className="bg-paper py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              42-Point Checklist Highlights
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              The {priorityPoints.length} checkpoints we prioritize in your {industry.name.toLowerCase()}.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {priorityPoints.map((pt) => (
              <div
                key={pt.id}
                className="border border-rule bg-white p-5 rounded-xl shadow-2xs flex flex-col justify-between gap-2"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-paper border border-rule text-ink/80">
                      {pt.number}
                    </span>
                    {pt.photoVerified && (
                      <span className="text-[11px] font-semibold text-pass bg-pass/10 px-2.5 py-0.5 rounded-full">
                        Photo Verified
                      </span>
                    )}
                  </div>
                  <h3 className="font-display-wide text-base text-ink pt-1">{pt.title}</h3>
                  <p className="text-xs text-ink/75 leading-relaxed">{pt.standard}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Preset Calculator for this Facility Type */}
      <section id="industry-calculator" className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Instant Online Estimator
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              See your {industry.name.toLowerCase()} cleaning price in 60 seconds.
            </h2>
          </div>

          <Suspense fallback={<div className="p-8">Loading Calculator...</div>}>
            <CommercialCalculator
              defaultFacilityType={industry.calcKey as "office" | "medical" | "daycare" | "retail" | "gym" | "church" | "warehouse" | "commonAreas"}
              embedded
            />
          </Suspense>
        </div>
      </section>

      {/* 5. Industry FAQs & Links to Industry-by-City Combo Pages */}
      <section className="bg-paper py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Frequently Asked Questions
              </div>
              <h2 className="font-display-wide text-3xl text-ink">
                Questions {industry.name.toLowerCase()} managers ask before switching.
              </h2>
            </div>
            <div className="lg:col-span-7 border border-rule bg-white rounded-xl divide-y divide-rule/70 shadow-2xs">
              {industry.faqs.map((faq, idx) => (
                <details key={idx} className="p-5 group" open={idx === 0}>
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

          {/* Links to Industry-by-City Combo Pages or City Pages */}
          <div className="border-t border-rule pt-8 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-ink/75">
              Local {industry.name} Cleaning Routes by City:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {tier1Cities.map((c) => {
                const href = industry.isTier1Combo
                  ? `/commercial-cleaning/${industry.slug}/${c.slug}-ca/`
                  : `/commercial-cleaning/${c.slug}-ca/`;
                return (
                  <Link
                    key={c.slug}
                    href={href}
                    className="p-3.5 border border-rule bg-white hover:border-brand hover:text-brand text-xs rounded-xl shadow-2xs transition-colors no-underline"
                  >
                    <div className="font-bold text-ink">
                      {industry.name} Cleaning in {c.name}
                    </div>
                    <div className="text-[11px] text-ink/65 mt-1">{c.responseTime} →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   COMMERCIAL CITY PAGE TEMPLATE (PRD 4.4)
   ============================================================================ */
function CommercialCityTemplate({ city }: { city: CityRecord }) {
  const tier1Industries = getTier1Industries();
  const siblingCities = city.nearbyCities
    .map((s) => getCityBySlug(s))
    .filter((c): c is CityRecord => Boolean(c));

  return (
    <div className="divide-y divide-rule">
      <ServiceSchema
        name={`Commercial Cleaning in ${city.name}, CA`}
        serviceType="Commercial Janitorial & Facility Cleaning"
        description={city.intro}
        url={`/commercial-cleaning/${city.slug}-ca/`}
        areaServedName={`${city.name}, ${city.county}, CA`}
      />
      <FaqPageSchema faqs={city.localFaqs} />

      {/* City Hero */}
      <section className="bg-paper report-grid-bg py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "Commercial Cleaning", href: "/commercial-cleaning/" },
              {
                label: `${city.name}, CA`,
                href: `/commercial-cleaning/${city.slug}-ca/`,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 border border-rule bg-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand shadow-2xs">
                <span>
                  {city.county} · ZIPs: {city.zips.join(", ")}
                </span>
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Commercial Cleaning in {city.name}, CA.
              </h1>
              <p className="text-base sm:text-lg text-ink/85 leading-relaxed">
                {city.intro}
              </p>

              <div className="flex flex-wrap gap-3.5 pt-1">
                <Link
                  href={`/pricing/commercial-cleaning-calculator/?zip=${city.zips[0]}`}
                  className="btn-report btn-brand text-base px-6 py-3.5"
                >
                  Get {city.name} Instant Price
                </Link>
                <Link
                  href="/benchmark-audit/"
                  className="btn-report btn-paper text-base px-6 py-3.5"
                >
                  Book Free {city.name} Walkthrough
                </Link>
              </div>
            </div>

            {/* Right 5-Col Local Dispatch & Corridors Card */}
            <div className="lg:col-span-5 border border-rule bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-ink text-paper px-5 py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Dispatch Log · {city.name}, CA</span>
                <span className="text-emerald-300 font-bold">Primary Route</span>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 border-b border-rule/70 pb-4 text-xs">
                  <div>
                    <div className="text-ink/60">Distance from Rocklin HQ</div>
                    <div className="font-bold text-ink mt-0.5">{city.distanceFromRocklin}</div>
                  </div>
                  <div>
                    <div className="text-ink/60">Supervisor Response</div>
                    <div className="font-bold text-pass mt-0.5">{city.responseTime}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand mb-2">
                    Commercial Corridors &amp; Districts Served:
                  </div>
                  <ul className="space-y-2 text-xs text-ink/85">
                    {city.districts.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-pass">0{i + 1}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-paper border border-rule rounded-xl space-y-1">
                  <div className="text-xs font-bold text-ink">
                    {city.proof.title}
                  </div>
                  <p className="text-xs text-ink/75 leading-relaxed">{city.proof.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Industry Programs in this City */}
      <section className="bg-paper-2 py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
              FACILITY TYPES SERVED IN {city.name.toUpperCase()}
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              {city.name} Commercial Cleaning by Facility Type
            </h2>
          </div>

          {city.tier === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {tier1Industries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/commercial-cleaning/${ind.slug}/${city.slug}-ca/`}
                  className="border-2 border-ink bg-paper p-5 rounded-[4px] hover:bg-ink hover:text-paper transition-colors flex flex-col justify-between gap-3 no-underline"
                >
                  <div>
                    <div className="font-mono text-[11px] font-bold text-brand uppercase">
                      {city.name} SPECIALTY
                    </div>
                    <h3 className="font-display-wide text-lg mt-1">
                      {ind.name} Cleaning in {city.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs underline">
                    Inspect {city.name} {ind.name} Protocol →
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="border-t-2 border-b-2 border-ink bg-paper divide-y divide-rule">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={
                  city.tier === 1 && ind.isTier1Combo
                    ? `/commercial-cleaning/${ind.slug}/${city.slug}-ca/`
                    : `/commercial-cleaning/${ind.slug}/`
                }
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-paper-2 no-underline"
              >
                <span className="font-display-wide text-base text-ink">
                  {ind.pluralName} in {city.name}, CA
                </span>
                <span className="text-xs text-ink/75 sm:w-6/12">{ind.shortLine}</span>
                <span className="font-mono text-xs font-bold text-brand">
                  Protocol &amp; Pricing →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Calculator Pre-Set to City ZIP */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
              INSTANT ESTIMATE · PRE-SET TO {city.name.toUpperCase()} ({city.zips[0]})
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              How much does commercial cleaning cost in {city.name}?
            </h2>
          </div>

          <Suspense fallback={<div className="p-8 font-mono">Loading Calculator...</div>}>
            <CommercialCalculator defaultZip={city.zips[0]} embedded />
          </Suspense>
        </div>
      </section>

      {/* City-Specific FAQs & Nearby Cities */}
      <section className="bg-paper-2 py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <div className="font-mono text-xs font-bold uppercase text-brand">
                LOCAL FAQ · {city.name.toUpperCase()}, CA
              </div>
              <h2 className="font-display-wide text-3xl text-ink">
                Frequently Asked Questions for {city.name} Facilities
              </h2>
              <p className="text-xs text-ink/80">
                Also looking for residential service in {city.name}?{" "}
                <Link
                  href={`/house-cleaning/${city.slug}-ca/`}
                  className="text-sky font-bold underline"
                >
                  Visit {city.name} House Cleaning →
                </Link>
              </p>
            </div>

            <div className="lg:col-span-7 border-2 border-ink bg-paper rounded-[4px] divide-y divide-rule">
              {city.localFaqs.map((faq, idx) => (
                <details key={idx} className="p-5" open={idx === 0}>
                  <summary className="font-display-wide text-base text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.q}</span>
                    <span className="font-mono text-xs border border-ink px-2 py-0.5 bg-paper-2">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-ink/85 mt-3 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Nearby Cities Internal Links */}
          <div className="border-t-2 border-ink pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold uppercase text-ink/75">
              NEARBY SERVICE AREAS AROUND {city.name.toUpperCase()}:
            </span>
            <div className="flex flex-wrap gap-3">
              {siblingCities.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/commercial-cleaning/${sib.slug}-ca/`}
                  className="btn-report btn-paper text-xs py-2 px-3.5"
                >
                  Commercial Cleaning in {sib.name}, CA →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

