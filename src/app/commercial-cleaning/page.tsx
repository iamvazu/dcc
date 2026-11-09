import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProtocolExplorer } from "@/components/ProtocolExplorer";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { CertStrip } from "@/components/CertStrip";
import { FaqPageSchema, ServiceSchema } from "@/components/JsonLd";
import { addOns, cities, industries, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Commercial Cleaning Services Sacramento & Rocklin | Debra's",
  description:
    "42-point inspected commercial cleaning for offices, medical & dental clinics, daycares, and multi-tenant buildings in Placer and Sacramento counties. WOSB certified.",
  alternates: {
    canonical: "/commercial-cleaning/",
  },
};

export default function CommercialHubPage() {
  return (
    <div className="divide-y divide-rule">
      <ServiceSchema
        name="Commercial Cleaning & Janitorial Services"
        serviceType="Commercial Janitorial Service (NAICS 561720)"
        description="Inspected-every-visit commercial cleaning for offices, medical/dental clinics, daycares, and properties across Placer, Sacramento, Yolo, and Yuba counties."
        url="/commercial-cleaning/"
      />
      <FaqPageSchema faqs={site.homeFaqs} />

      {/* Hero Section */}
      <section className="bg-paper report-grid-bg py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs
            items={[{ label: "Commercial Cleaning", href: "/commercial-cleaning/" }]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Commercial Facility Hub · NAICS 561720 · CAGE 9Z5E9
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Commercial Cleaning Services in Placer &amp; Sacramento Counties.
              </h1>
              <p className="text-lg text-ink/85 max-w-2xl leading-relaxed">
                Every commercial building we maintain is cleaned to a 42-point inspection protocol, photo-verified via supervisor tablet before our crew leaves your lot, and backed by a 30-day walkaway guarantee.
              </p>
              <div className="flex flex-wrap gap-3.5 pt-2">
                <Link
                  href="/benchmark-audit/"
                  className="btn-report btn-brand text-base px-6 py-3.5"
                >
                  Book a Free Benchmark Audit
                </Link>
                <Link
                  href="/pricing/commercial-cleaning-calculator/"
                  className="btn-report btn-paper text-base px-6 py-3.5"
                >
                  Get Instant Price Online
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 border border-rule bg-white p-3 rounded-2xl shadow-sm">
              <Image
                src="/images/commercial-clinic-inspection.png"
                alt="Debra's Classic Cleaning supervisor verifying 42-point digital inspection checklist inside a clinical corridor"
                width={560}
                height={380}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-ink/75">
                <span className="font-medium">Supervisor Tablet Verification</span>
                <span className="text-pass font-bold">42 Checkpoints Logged</span>
              </div>
            </div>
          </div>

          <CertStrip />
        </div>
      </section>

      {/* Tier Comparison Table: Essential / Classic Standard / Inspection-Ready */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Commercial Service Tiers
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              What&apos;s included by commercial program tier.
            </h2>
            <p className="text-base text-ink/80 max-w-2xl mt-1">
              We match your program to your foot traffic, regulatory inspection exposure, and weekly cadence.
            </p>
          </div>

          <div className="border border-rule bg-white rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-ink text-paper text-xs uppercase tracking-wider">
                  <th className="p-4 border-r border-paper/20 w-4/12">
                    Protocol Scope &amp; Deliverable
                  </th>
                  <th className="p-4 border-r border-paper/20 w-8/36">
                    <div>Essential</div>
                    <div className="text-[11px] text-paper/70 font-normal mt-0.5 normal-case">
                      1x–2x/wk · Low-Traffic Suites (&lt;3,500 sq ft)
                    </div>
                  </th>
                  <th className="p-4 border-r border-paper/20 w-8/36 bg-brand text-white">
                    <div>Classic Standard</div>
                    <div className="text-[11px] text-white/85 font-normal mt-0.5 normal-case">
                      2x–5x/wk · Corporate Offices &amp; Multi-Tenant
                    </div>
                  </th>
                  <th className="p-4 w-8/36">
                    <div>Inspection-Ready</div>
                    <div className="text-[11px] text-flag font-normal mt-0.5 normal-case">
                      3x–7x/wk · Medical, Dental &amp; Title 22 Daycares
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/70 text-xs sm:text-sm">
                {[
                  {
                    feature: "Entry glass, reception counter & lobby mats (PT. 01–07)",
                    essential: "Every visit",
                    standard: "Every visit + mullion detail",
                    inspection: "Every visit + EPA List N kiosk dwell",
                  },
                  {
                    feature: "Restroom descaling, fixtures & restock log (PT. 08–16)",
                    essential: "Every visit",
                    standard: "Every visit + weekly drain prime",
                    inspection: "Hospital-grade virucidal + 4-color isolation",
                  },
                  {
                    feature: "Breakroom sinks, counters, microwave interior (PT. 17–22)",
                    essential: "Every visit",
                    standard: "Every visit + appliance degrease",
                    inspection: "Food-safe sanitizer + daily liner swap",
                  },
                  {
                    feature: "Workspaces, exam rooms or toddler zones (PT. 23–29)",
                    essential: "Cleared desks & trash pull",
                    standard: "Desks, conference glass & high-dusting",
                    inspection: "Operatory chair bases / 0–48\" child-safe DfE",
                  },
                  {
                    feature: "CRI HEPA vacuuming & microfiber flat-mopping (PT. 30–35)",
                    essential: "Traffic lanes + full monthly",
                    standard: "Wall-to-wall every visit + spot care",
                    inspection: "Single-zone mop pad swap per room",
                  },
                  {
                    feature: "Alarm lockup check & photo scorecard (PT. 41–42)",
                    essential: "Every visit",
                    standard: "Every visit + monthly supervisor audit",
                    inspection: "Every visit + biweekly audit + SDS binder log",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-paper/60" : "bg-white"}>
                    <td className="p-4 font-semibold text-ink border-r border-rule/70">
                      {row.feature}
                    </td>
                    <td className="p-4 text-xs text-ink/80 border-r border-rule/70">
                      {row.essential}
                    </td>
                    <td className="p-4 text-xs font-semibold text-ink bg-brand/5 border-r border-rule/70">
                      {row.standard}
                    </td>
                    <td className="p-4 text-xs font-semibold text-pass">
                      {row.inspection}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 42-Point Protocol Section */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-brand">
            The 42-Point Standard
          </div>
          <h2 className="font-display-wide text-fluid-h2 text-ink">
            Inspect every point before you hire us.
          </h2>
          <ProtocolExplorer />
        </div>
      </section>

      {/* 11 Industries Served */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Industries We Serve
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Select your facility type for specialized protocols &amp; pricing.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/commercial-cleaning/${ind.slug}/`}
                className="group border border-rule bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-brand/50 transition-all duration-300 flex flex-col justify-between no-underline"
              >
                <div>
                  <div className="relative h-36 w-full overflow-hidden bg-ink">
                    <Image
                      src={ind.heroImage}
                      alt={ind.pluralName}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-ink/80 text-white backdrop-blur-xs border border-white/15">
                      {ind.keyProtocolPoints.length} Key Checkpoints
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-display-wide text-base font-bold text-ink group-hover:text-brand transition-colors leading-snug">
                      {ind.pluralName}
                    </h3>
                    <p className="text-xs text-ink/75 leading-relaxed line-clamp-3">
                      {ind.shortLine}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-rule/60 bg-paper/50 flex items-center justify-between text-xs font-semibold text-brand">
                  <span>View {ind.name} Protocol</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Add-Ons */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Periodic &amp; Specialty Add-Ons
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Bundle floor care, windows, carpet, or day porters onto one invoice.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <Link
                key={addon.slug}
                href={`/add-ons/${addon.slug}/`}
                className="border border-rule bg-white p-6 rounded-xl shadow-2xs hover:border-brand transition-colors flex flex-col justify-between gap-4 no-underline group"
              >
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-pass">
                    {addon.priceSummary}
                  </div>
                  <h3 className="font-display-wide text-xl text-ink group-hover:text-brand">
                    {addon.name}
                  </h3>
                  <p className="text-xs text-ink/75 leading-relaxed">
                    {addon.shortDescription}
                  </p>
                </div>
                <div className="text-xs font-semibold text-brand pt-2 border-t border-rule/70">
                  View Service Details →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Service Cities */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="border-2 border-ink bg-paper p-8 rounded-[4px] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <GuaranteeSeal size="md" />
              <div className="space-y-2">
                <div className="font-mono text-xs font-bold text-pass uppercase">
                  CONTRACTUAL ACCOUNTABILITY
                </div>
                <h3 className="font-display-wide text-2xl text-ink">
                  30-Day Walkaway · 24-Hour Re-Clean · Three-Strike Visit Credit
                </h3>
                <p className="text-sm text-ink/80 max-w-xl">
                  We never trap commercial clients in 12-to-36-month auto-renewing contracts. If we ever miss an item on your 42-point scorecard, we re-clean within 24 hours.
                </p>
              </div>
            </div>
            <Link href="/benchmark-audit/" className="btn-report btn-brand shrink-0">
              Schedule 20-Min Audit →
            </Link>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75">
              COMMERCIAL SERVICE CITIES (PLACER · SACRAMENTO · YOLO)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/commercial-cleaning/${c.slug}-ca/`}
                  className="p-3 border border-ink bg-paper hover:bg-ink hover:text-paper font-mono text-xs rounded-[2px] no-underline"
                >
                  <div className="font-bold">{c.name}, CA</div>
                  <div className="text-[10px] opacity-70">{c.zips[0]}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

