import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCalculator } from "@/components/CommercialCalculator";
import { FaqPageSchema, ServiceSchema } from "@/components/JsonLd";
import {
  getCityBySlug,
  getIndustryBySlug,
  getProtocolPointsByIds,
  getTier1Cities,
  getTier1Industries,
} from "@/lib/data";

export function generateStaticParams() {
  const tier1Industries = getTier1Industries();
  const tier1Cities = getTier1Cities();

  const params: { slug: string; citySlug: string }[] = [];
  for (const ind of tier1Industries) {
    for (const city of tier1Cities) {
      params.push({
        slug: ind.slug,
        citySlug: `${city.slug}-ca`,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; citySlug: string }>;
}): Promise<Metadata> {
  const { slug, citySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!industry || !city) return {};

  return {
    title: `${industry.name} Cleaning in ${city.name}, CA | Debra's`,
    description: `42-point inspected ${industry.name.toLowerCase()} cleaning in ${city.name}, CA (${city.zips.join(", ")}). ${city.responseTime}. Certified WOSB. Instant price online.`,
    alternates: {
      canonical: `/commercial-cleaning/${industry.slug}/${city.slug}-ca/`,
    },
  };
}

export default async function IndustryByCityComboPage({
  params,
}: {
  params: Promise<{ slug: string; citySlug: string }>;
}) {
  const { slug, citySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const city = getCityBySlug(citySlug);

  if (!industry || !city) notFound();

  const priorityPoints = getProtocolPointsByIds(industry.keyProtocolPoints);
  const tier1Cities = getTier1Cities();
  const tier1Industries = getTier1Industries();
  const combinedFaqs = [...industry.faqs.slice(0, 3), ...city.localFaqs.slice(0, 2)];

  return (
    <div className="divide-y-2 divide-ink">
      <ServiceSchema
        name={`${industry.name} Cleaning in ${city.name}, CA`}
        serviceType={`${industry.name} Janitorial Service`}
        description={`${industry.shortLine} Serving ${city.name}, CA (${city.zips.join(", ")}).`}
        url={`/commercial-cleaning/${industry.slug}/${city.slug}-ca/`}
        areaServedName={`${city.name}, ${city.county}, CA`}
      />
      <FaqPageSchema faqs={combinedFaqs} />

      {/* Hero Section */}
      <section className="bg-paper report-grid-bg py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[
              { label: "Commercial Cleaning", href: "/commercial-cleaning/" },
              {
                label: `${industry.name} Cleaning`,
                href: `/commercial-cleaning/${industry.slug}/`,
              },
              {
                label: `${city.name}, CA`,
                href: `/commercial-cleaning/${industry.slug}/${city.slug}-ca/`,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                {city.name.toUpperCase()}, CA · {industry.inspectionContext}
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                {industry.name} Cleaning in {city.name}, CA.
              </h1>
              <p className="text-base sm:text-lg text-ink/85 leading-relaxed">
                {industry.shortLine} Dispatched from our Rocklin depot ({city.distanceFromRocklin} ·{" "}
                {city.responseTime}) across {city.name} ZIP codes {city.zips.join(", ")}.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-1">
                <a
                  href="#combo-calculator"
                  className="btn-report btn-brand text-base px-6 py-3.5"
                >
                  Price Your {city.name} {industry.name}
                </a>
                <Link
                  href="/benchmark-audit/"
                  className="btn-report btn-paper text-base px-6 py-3.5"
                >
                  Book Free {city.name} Audit
                </Link>
              </div>
            </div>

            {/* Right 5-Col Inspection & Local Corridors Card */}
            <div className="lg:col-span-5 border-2 border-ink bg-paper rounded-[4px] shadow-[4px_4px_0px_#17201E] overflow-hidden">
              <Image
                src={industry.heroImage}
                alt={`${industry.name} cleaning in ${city.name}, CA`}
                width={540}
                height={320}
                className="w-full h-48 object-cover border-b-2 border-ink"
              />
              <div className="p-5 space-y-3">
                <div className="font-mono text-xs font-bold uppercase text-brand">
                  {city.name.toUpperCase()} CORRIDORS SERVED FOR {industry.pluralName.toUpperCase()}:
                </div>
                <ul className="space-y-1.5 text-xs text-ink/85">
                  {city.districts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-pass">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-rule font-mono text-xs flex justify-between">
                  <span>RESPONSE: {city.responseTime}</span>
                  <span className="text-pass font-bold">30-DAY WALKAWAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Risk + Local City Context */}
      <section className="bg-paper-2 py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-xs font-bold uppercase text-brand">
              WHY {city.name.toUpperCase()} {industry.pluralName.toUpperCase()} SWITCH TO DEBRA&apos;S
            </div>
            <h2 className="font-display-wide text-2xl sm:text-3xl text-ink">
              {industry.riskHeading}
            </h2>
            <p className="text-sm sm:text-base text-ink/85 leading-relaxed">
              {industry.riskBody}
            </p>
            <p className="text-sm text-ink/80 leading-relaxed">{city.intro}</p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="border-2 border-ink bg-paper p-5 rounded-[4px] space-y-3">
              <div className="font-mono text-xs font-bold uppercase text-pass">
                PRODUCTS &amp; METHODS FOR {city.name.toUpperCase()} {industry.pluralName.toUpperCase()}
              </div>
              <p className="text-sm text-ink/85">{industry.methodsAndProducts}</p>
            </div>

            <div className="border-2 border-ink bg-paper p-5 rounded-[4px] space-y-2.5">
              <div className="font-mono text-xs font-bold uppercase text-ink">
                COMMON FAILURE POINTS WE ELIMINATE:
              </div>
              {industry.failurePoints.map((fp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/85">
                  <span className="font-mono text-xs font-bold bg-flag px-1.5 py-0.5 border border-ink">
                    0{idx + 1}
                  </span>
                  <span>{fp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Protocol Checkpoints */}
      <section className="bg-paper py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="font-mono text-xs font-bold uppercase text-brand">
            42-POINT PROTOCOL SUBSET · {industry.name.toUpperCase()} IN {city.name.toUpperCase()}
          </div>
          <h2 className="font-display-wide text-fluid-h2 text-ink">
            The {priorityPoints.length} checkpoints verified on every {city.name} visit.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {priorityPoints.map((pt) => (
              <div
                key={pt.id}
                className="border-2 border-ink bg-paper-2 p-4 rounded-[4px] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink text-paper">
                    {pt.number}
                  </span>
                  {pt.photoVerified && (
                    <span className="font-mono text-[10px] font-bold text-pass">
                      [CAM] PHOTO-VERIFIED
                    </span>
                  )}
                </div>
                <h3 className="font-display-wide text-base text-ink">{pt.title}</h3>
                <p className="text-xs text-ink/80">{pt.standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preset Calculator */}
      <section id="combo-calculator" className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-brand">
              INSTANT ESTIMATE · PRE-SET TO {city.name.toUpperCase()} ({city.zips[0]}) &amp; {industry.name.toUpperCase()}
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Calculate your {city.name} {industry.name.toLowerCase()} cleaning rate.
            </h2>
          </div>

          <Suspense fallback={<div className="p-8 font-mono">Loading Calculator...</div>}>
            <CommercialCalculator
              defaultFacilityType={industry.calcKey as "office" | "medical" | "daycare" | "retail" | "gym" | "church" | "warehouse" | "commonAreas"}
              defaultZip={city.zips[0]}
              embedded
            />
          </Suspense>
        </div>
      </section>

      {/* FAQs & Sibling Internal Links */}
      <section className="bg-paper py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="border-2 border-ink bg-paper rounded-[4px] divide-y divide-rule">
            {combinedFaqs.map((faq, idx) => (
              <details key={idx} className="p-5" open={idx === 0}>
                <summary className="font-display-wide text-base text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="font-mono text-xs border border-ink px-2 py-0.5 bg-paper-2">
                    +
                  </span>
                </summary>
                <p className="text-sm text-ink/85 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* Sibling Links Up & Across */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-ink">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-ink/70 mb-2">
                {industry.name.toUpperCase()} CLEANING IN NEARBY CITIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {tier1Cities
                  .filter((c) => c.slug !== city.slug)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/commercial-cleaning/${industry.slug}/${c.slug}-ca/`}
                      className="btn-report btn-paper text-xs py-1.5 px-3"
                    >
                      {industry.name} in {c.name} →
                    </Link>
                  ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase text-ink/70 mb-2">
                OTHER FACILITY TYPES IN {city.name.toUpperCase()}, CA:
              </div>
              <div className="flex flex-wrap gap-2">
                {tier1Industries
                  .filter((i) => i.slug !== industry.slug)
                  .map((i) => (
                    <Link
                      key={i.slug}
                      href={`/commercial-cleaning/${i.slug}/${city.slug}-ca/`}
                      className="btn-report btn-paper text-xs py-1.5 px-3"
                    >
                      {i.name} in {city.name} →
                    </Link>
                  ))}
                <Link
                  href={`/commercial-cleaning/${city.slug}-ca/`}
                  className="btn-report btn-ink text-xs py-1.5 px-3"
                >
                  All {city.name} Commercial Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

