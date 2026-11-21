import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { costGuides, site } from "@/lib/data";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { ServiceSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "House & Commercial Cleaning Prices (2026) | Debra's",
  description:
    "See commercial and residential cleaning prices in under 60 seconds without entering an email. Interactive calculators and 2026 Sacramento & Placer County cost guides.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function PricingHubPage() {
  return (
    <div className="divide-y-2 divide-ink">
      <ServiceSchema
        name="Commercial & Residential House Cleaning Pricing (2026)"
        serviceType="House Cleaning & Commercial Janitorial Services"
        description="Transparent 2026 residential house cleaning ($140–$340/visit) and commercial janitorial pricing ($650–$3,500/month or $0.11–$0.28/sq ft) across Rocklin, Roseville & Sacramento."
        url="/pricing/"
        priceRangeText="$140–$340/visit (Home) · $650–$3,500/mo (Commercial)"
      />
      <section className="bg-paper py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumbs items={[{ label: "Pricing & Calculators", href: "/pricing/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Transparent Online Pricing · No Email Required
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Price your building or home in 60 seconds.
              </h1>
              <p className="text-lg text-ink/80 max-w-2xl leading-relaxed">
                Most cleaning companies hide their rates behind a form and a sales callback. Choose your calculator below to see an itemized estimate immediately—contact details are only needed if you want to lock your quote or schedule a walkthrough.
              </p>
            </div>
            <div className="lg:col-span-4 text-xs border border-rule bg-white p-5 rounded-xl shadow-2xs space-y-2">
              <div className="font-bold text-ink text-sm">How Our Pricing Works</div>
              <p className="text-ink/75">
                1. See your live price range immediately online.
              </p>
              <p className="text-ink/75">
                2. Share or print your itemized estimate link anytime.
              </p>
              <p className="text-ink/75">
                3. Lock your exact rate in writing after a 20-minute walkthrough.
              </p>
            </div>
          </div>

          {/* Two Calculator Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Commercial Calculator Panel */}
            <div className="bg-ink text-paper p-7 sm:p-8 rounded-xl shadow-md flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-flag font-semibold uppercase tracking-wider">
                    Commercial Cleaning Calculator
                  </span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-paper/80">
                    1,000 – 50,000 sq ft
                  </span>
                </div>
                <h2 className="font-display-wide text-2xl sm:text-3xl text-paper">
                  Offices, Clinics, Daycares, Common Areas &amp; Post-Construction
                </h2>
                <p className="text-sm text-paper/80 leading-relaxed">
                  Calculates monthly and per-visit pricing based on your facility type, square footage, restroom count, floor surfaces, and weekly schedule.
                </p>
                <div className="text-xs text-emerald-300 font-medium pt-1">
                  Typical range: $650 – $3,500/month (custom quotes above 25,000 sq ft)
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pricing/commercial-cleaning-calculator/"
                  className="btn-report btn-brand btn-on-ink text-sm"
                >
                  Open Commercial Calculator →
                </Link>
                <Link
                  href="/benchmark-audit/"
                  className="btn-report btn-paper text-sm"
                >
                  Book Free Walkthrough
                </Link>
              </div>
            </div>

            {/* Residential Calculator Panel */}
            <div className="border border-rule bg-white text-ink p-7 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sky font-bold uppercase tracking-wider">
                    Residential House Cleaning Calculator
                  </span>
                  <span className="border border-rule px-2.5 py-0.5 rounded-full bg-paper text-ink/75">
                    1 – 6+ Bedrooms
                  </span>
                </div>
                <h2 className="font-display-wide text-2xl sm:text-3xl text-ink">
                  Standard, Deep, Move-In/Out &amp; Vacation Rental Turnovers
                </h2>
                <p className="text-sm text-ink/75 leading-relaxed">
                  Prices your home by bedrooms, bathrooms, square footage, condition, pets, and optional add-ons (inside oven, fridge, interior windows, baseboards). Applies up to 20% recurring discounts automatically.
                </p>
                <div className="text-xs text-pass font-semibold pt-1">
                  Typical range: $140 – $340/visit (Save 20% weekly · 15% biweekly)
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pricing/house-cleaning-calculator/"
                  className="btn-report btn-sky text-sm"
                >
                  Open House Cleaning Calculator →
                </Link>
                <Link
                  href="/house-cleaning/"
                  className="btn-report btn-paper text-sm"
                >
                  Explore Home Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSR Plain-Text 2026 Rate Tables for AI Search & Buyers (seo-roast Point 5) */}
      <section className="bg-paper py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              2026 Published Rate Tables · Rocklin, Roseville &amp; Sacramento
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Standard House Cleaning &amp; Commercial Janitorial Rates at a Glance
            </h2>
            <p className="text-sm text-ink/75 max-w-2xl mt-1">
              Whether you need{" "}
              <Link href="/house-cleaning/" className="text-sky font-semibold underline">
                recurring residential house cleaning and maid service
              </Link>{" "}
              or{" "}
              <Link href="/commercial-cleaning/" className="text-brand font-semibold underline">
                nightly commercial office and clinic cleaning
              </Link>{" "}
              (or{" "}
              <Link href="/government-contracting/" className="text-ink font-semibold underline">
                WOSB / CA Small Business #2040639 government facility bids
              </Link>
              ), here are our published 2026 baseline ranges before custom add-ons:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Residential SSR Table */}
            <div className="border border-rule bg-white rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-ink text-paper px-5 py-3.5 text-xs font-bold uppercase tracking-wider flex justify-between">
                <span>Residential House Cleaning (Per Visit)</span>
                <span className="text-sky-300">Save 20% Weekly · 15% Biweekly</span>
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-rule bg-paper text-xs font-semibold text-ink/75">
                    <th className="p-3.5">Home Size</th>
                    <th className="p-3.5">Biweekly Standard</th>
                    <th className="p-3.5">One-Time Deep Clean</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule/70">
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">2 Bed / 2 Bath (&lt;1,500 sq ft)</td>
                    <td className="p-3.5 font-bold text-sky">$140 – $175</td>
                    <td className="p-3.5 text-ink/80">$250 – $310</td>
                  </tr>
                  <tr className="bg-paper/50">
                    <td className="p-3.5 font-semibold text-ink">3 Bed / 2.5 Bath (1,800–2,500 sq ft)</td>
                    <td className="p-3.5 font-bold text-sky">$170 – $220</td>
                    <td className="p-3.5 text-ink/80">$310 – $395</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">4 Bed / 3 Bath (2,500–3,500 sq ft)</td>
                    <td className="p-3.5 font-bold text-sky">$215 – $275</td>
                    <td className="p-3.5 text-ink/80">$385 – $485</td>
                  </tr>
                  <tr className="bg-paper/50">
                    <td className="p-3.5 font-semibold text-ink">5+ Bed Estate (3,500+ sq ft)</td>
                    <td className="p-3.5 font-bold text-sky">$245 – $340</td>
                    <td className="p-3.5 text-ink/80">$475 – $640</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Commercial SSR Table */}
            <div className="border border-rule bg-white rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-ink text-paper px-5 py-3.5 text-xs font-bold uppercase tracking-wider flex justify-between">
                <span>Commercial Janitorial (Monthly Flat Rate)</span>
                <span className="text-flag">$0.11 – $0.28 / sq ft · $45–$58/hr</span>
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-rule bg-paper text-xs font-semibold text-ink/75">
                    <th className="p-3.5">Facility Type &amp; Size</th>
                    <th className="p-3.5">Schedule</th>
                    <th className="p-3.5">Monthly Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule/70">
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Small Office (2,000–3,500 sq ft)</td>
                    <td className="p-3.5 text-ink/80">1x–2x / week</td>
                    <td className="p-3.5 font-bold text-brand">$650 – $1,150 / mo</td>
                  </tr>
                  <tr className="bg-paper/50">
                    <td className="p-3.5 font-semibold text-ink">Corporate Office (5,000–8,000 sq ft)</td>
                    <td className="p-3.5 text-ink/80">3x / week</td>
                    <td className="p-3.5 font-bold text-brand">$1,550 – $2,350 / mo</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Medical / Dental (3,000–6,000 sq ft)</td>
                    <td className="p-3.5 text-ink/80">3x–5x / week</td>
                    <td className="p-3.5 font-bold text-brand">$1,450 – $3,100 / mo</td>
                  </tr>
                  <tr className="bg-paper/50">
                    <td className="p-3.5 font-semibold text-ink">Daycare / Preschool (4,000–7,500 sq ft)</td>
                    <td className="p-3.5 text-ink/80">5x / week</td>
                    <td className="p-3.5 font-bold text-brand">$2,100 – $3,600 / mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Regional Cost Guides */}
      <section className="bg-paper-2 py-14 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
              2026 SACRAMENTO &amp; PLACER COUNTY RATE TABLES
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Local Cleaning Cost Guides
            </h2>
            <p className="text-sm text-ink/80 max-w-2xl mt-1">
              Detailed square-foot, per-visit, and hourly rate benchmarks for Rocklin, Roseville, and Sacramento facilities and homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/pricing/${guide.slug}/`}
                className="border border-rule bg-white p-6 rounded-2xl shadow-2xs hover:shadow-md hover:border-brand/50 transition-all flex flex-col justify-between gap-4 no-underline group"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-brand uppercase tracking-wider">
                    {guide.city}, CA · Cost Guide
                  </div>
                  <h3 className="font-display-wide text-xl text-ink group-hover:text-brand transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-ink/75 line-clamp-3 leading-relaxed">
                    {guide.directAnswer}
                  </p>
                </div>
                <div className="text-xs font-semibold text-brand pt-3 border-t border-rule/70">
                  Read Rate Breakdown &amp; Tables →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="bg-paper py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <GuaranteeSeal size="md" />
            <div className="space-y-1 max-w-xl">
              <div className="font-mono text-xs font-bold text-pass uppercase">
                NO SURPRISE INVOICES
              </div>
              <h3 className="font-display-wide text-2xl text-ink">
                Every commercial price is locked in writing after a 20-minute walkthrough.
              </h3>
              <p className="text-sm text-ink/80">
                Need a custom bid for a multi-building portfolio or public-works solicitation? Call{" "}
                <a href={`tel:${site.phoneRaw}`} className="font-mono font-bold underline">
                  {site.phone}
                </a>
                .
              </p>
            </div>
          </div>
          <Link href="/benchmark-audit/" className="btn-report btn-brand shrink-0">
            Book Free Benchmark Audit →
          </Link>
        </div>
      </section>
    </div>
  );
}

