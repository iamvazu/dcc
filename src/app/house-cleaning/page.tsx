import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResidentialCalculator } from "@/components/ResidentialCalculator";
import { CoverageMap } from "@/components/CoverageMap";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqPageSchema, ServiceSchema } from "@/components/JsonLd";
import { cities, residentialServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning Rocklin, Roseville & Granite Bay | Debra's",
  description:
    "Trusted house cleaning in Rocklin, Roseville, Granite Bay, and Folsom. See your instant price online in 60 seconds. Save up to 20% on recurring visits.",
  alternates: {
    canonical: "/house-cleaning/",
  },
};

const RESIDENTIAL_FAQS = [
  {
    q: "How do you handle pets during a house cleaning visit?",
    a: "We love dogs and cats! We record your pets' names and any gate/door instructions on your house profile. Our commercial-grade HEPA vacuums trap 99.97% of pet dander and hair, and we use non-toxic, pet-safe cleaning solutions.",
  },
  {
    q: "Do I need to provide cleaning supplies or a vacuum?",
    a: "No—we bring everything: CRI-approved HEPA vacuums, freshly laundered (160°F) color-coded microfiber cloths so bathroom rags never touch your kitchen counters, and pH-neutral cleaners safe for marble, quartz, and hardwood.",
  },
  {
    q: "What if I need to reschedule or skip a recurring visit?",
    a: "Just text or call us at 916-668-8080 with 48 hours' notice to shift or skip a visit with zero cancellation fees. There are never any long-term contracts.",
  },
  {
    q: "Will the same cleaner come to my home on recurring service?",
    a: "Yes. We assign a consistent, background-checked team lead to your recurring weekly or biweekly route so you never have to re-explain your home's layout or preferences.",
  },
  {
    q: "What if something is missed during my house cleaning?",
    a: "Every visit is backed by our 24-Hour Re-Clean Guarantee. Let us know within 24 hours and we will return promptly to make it right at no charge.",
  },
];

export default function ResidentialHubPage() {
  return (
    <div className="divide-y-2 divide-ink">
      <ServiceSchema
        name="Residential House Cleaning Services"
        serviceType="House Cleaning & Maid Service"
        description="Standard, deep, move-in/move-out, and recurring house cleaning in Rocklin, Roseville, Granite Bay, and Folsom."
        url="/house-cleaning/"
        priceRangeText="$140–$350 per visit"
      />
      <FaqPageSchema faqs={RESIDENTIAL_FAQS} />

      {/* Hero + Calculator Above the Fold */}
      <section className="bg-paper report-grid-bg py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs items={[{ label: "House Cleaning", href: "/house-cleaning/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-white px-3.5 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-brand inline-block" />
                <span className="text-xs font-semibold tracking-wide text-ink/85">
                  Residential House Cleaning · 43+ Five-Star Local Reviews
                </span>
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                House Cleaning in Rocklin, Roseville &amp; Granite Bay.
              </h1>
              <p className="text-lg text-ink/80 max-w-2xl leading-relaxed">
                See your exact per-visit price range below in under 60 seconds—no email required to view pricing. Background-checked, bonded teams bringing hospital-grade microfiber hygiene to your home.
              </p>
            </div>

            <div className="lg:col-span-5 border border-rule bg-white p-3 rounded-xl shadow-xs">
              <Image
                src="/images/residential-granite-bay-home.png"
                alt="Spotless sunlit residential kitchen and living room in Granite Bay, CA after Debra's Classic Cleaning visit"
                width={560}
                height={340}
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="pt-2.5 px-1 flex items-center justify-between text-xs text-ink/70">
                <span className="font-medium">Granite Bay &amp; Rocklin Home Standard</span>
                <span className="text-pass font-semibold">Stone &amp; Hardwood Safe</span>
              </div>
            </div>
          </div>

          {/* Residential Calculator Above the Fold */}
          <div className="pt-4">
            <Suspense fallback={<div className="p-8 font-mono">Loading Home Calculator...</div>}>
              <ResidentialCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 5 Residential Cleaning Services */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky">
              Home Cleaning Services
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Choose the level of care your home needs.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialServices.map((srv) => (
              <Link
                key={srv.slug}
                href={`/house-cleaning/${srv.slug}/`}
                className="border border-rule bg-white p-6 rounded-xl shadow-2xs hover:border-sky transition-colors flex flex-col justify-between gap-4 no-underline group"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky">
                    Residential Program
                  </div>
                  <h3 className="font-display-wide text-xl text-ink group-hover:text-sky">
                    {srv.name}
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>
                <div className="text-xs font-semibold text-sky pt-3 border-t border-rule/70">
                  See Checklist &amp; Pricing →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Residential Reviews Highlight (Google & Yelp Verified Reviews) */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ReviewsSection
            defaultFilter="yelp"
            limit={6}
            showHeader={true}
            eyebrow="Homeowner & Local Reviews on Yelp & Google"
            heading="Why Placer County families keep our crew year after year."
          />
        </div>
      </section>

      {/* Residential Coverage Map & Communities */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky">
              Communities We Serve
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Local House Cleaning Across Placer &amp; Sacramento Counties
            </h2>
          </div>

          <CoverageMap lane="residential" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/house-cleaning/${c.slug}-ca/`}
                className="p-3 border border-rule bg-white hover:border-sky hover:text-sky text-xs rounded-lg no-underline shadow-2xs"
              >
                <div className="font-bold text-ink">{c.name}</div>
                <div className="text-[11px] text-ink/60">House Cleaning</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Residential FAQ */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky">
              Homeowner FAQ
            </div>
            <h2 className="font-display-wide text-3xl text-ink">
              Pets, supplies, keys, and rescheduling.
            </h2>
          </div>
          <div className="lg:col-span-7 border border-rule bg-white rounded-xl divide-y divide-rule/70 shadow-2xs">
            {RESIDENTIAL_FAQS.map((faq, idx) => (
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

