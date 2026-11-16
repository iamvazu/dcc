import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DynamicHero } from "@/components/DynamicHero";
import { ProtocolExplorer } from "@/components/ProtocolExplorer";
import { InstantPriceTeaser } from "@/components/InstantPriceTeaser";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { CoverageMap } from "@/components/CoverageMap";
import { OnboardingJourney } from "@/components/OnboardingJourney";
import {
  ReviewsSection,
  GoogleLogo,
  YelpLogo,
  GOOGLE_GBP_URL,
  YELP_URL,
} from "@/components/ReviewsSection";
import { FaqPageSchema } from "@/components/JsonLd";
import { cities, industries, site } from "@/lib/data";

export const metadata: Metadata = {
  title:
    "House Cleaning & Commercial Cleaning in Rocklin, Roseville & Sacramento | Debra's Classic Cleaning",
  description:
    "Trusted local house cleaning, maid service, office cleaning, and commercial janitorial services across Rocklin, Roseville, Granite Bay & Greater Sacramento. Certified Women-Owned. Get an instant price online in 60 seconds.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="divide-y divide-rule">
      <FaqPageSchema faqs={site.homeFaqs} />

      {/* =====================================================================
          DYNAMIC VIDEO & PSYCHOLOGICAL MULTI-COLOR HERO
         ===================================================================== */}
      <DynamicHero />

      {/* =====================================================================
          PROOF BAR
         ===================================================================== */}
      <section className="bg-paper-2 py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 text-xs font-semibold tracking-wide text-ink/80">
            <span>Serving Greater Sacramento Since 2016</span>
            <span className="text-rule hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2">
              <Image
                src="/images/cert-women-owned.png"
                alt="Certified Women Owned Business"
                width={22}
                height={22}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/images/cert-sba-edwosb.png"
                alt="SBA EDWOSB Certified"
                width={20}
                height={24}
                className="h-5 w-auto object-contain"
              />
              <span>SBA Certified Women-Owned (WOSB / EDWOSB)</span>
            </span>
            <span className="text-rule hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2">
              <Image
                src="/images/cert-ca-small-business.png"
                alt="CA.GOV California Small Business Certified"
                width={26}
                height={22}
                className="h-5 w-auto object-contain bg-white px-0.5 rounded-xs"
              />
              <span>CA Certified Small Business (ID: 2040639)</span>
            </span>
            <span className="text-rule hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2">
              <Image
                src="/images/cert-sam-gov.png"
                alt="SAM.gov Registered Federal Contractor"
                width={24}
                height={22}
                className="h-5 w-auto object-contain bg-white px-0.5 rounded-xs"
              />
              <span>SAM.gov Active (CAGE 9Z5E9)</span>
            </span>
            <span className="text-rule hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2">
              <Image
                src="/images/cert-bonded-insured.png"
                alt="Licensed, Bonded & Insured"
                width={24}
                height={24}
                className="h-5 w-auto object-contain"
              />
              <span>Licensed, Bonded &amp; Insured</span>
            </span>
            <span className="text-rule hidden sm:inline">·</span>
            <div className="inline-flex items-center gap-3">
              <a
                href={YELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand font-bold hover:underline"
              >
                <YelpLogo className="w-4 h-4" />
                <span>43+ Five-Star Yelp Reviews ↗</span>
              </a>
              <span className="text-rule">·</span>
              <a
                href={GOOGLE_GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1a73e8] font-bold hover:underline"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Google Verified ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TWO LANES (Commercial & Residential with Rich Background Photography)
         ===================================================================== */}
      <section className="bg-paper py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Large Commercial Panel (7 cols) with Background Image */}
            <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl shadow-lg min-h-[340px] flex flex-col justify-between p-7 sm:p-9 text-paper border border-ink/20">
              {/* Background Photograph */}
              <Image
                src="/images/industry-property-management.png"
                alt="Class-A commercial office building lobby and clinical facility in Roseville and Rocklin, CA"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Multi-Stop Architectural Dark Gradient Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1715]/95 via-[#141C1A]/85 to-[#141C1A]/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1715]/90 via-transparent to-[#0F1715]/40" />

              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider text-flag font-bold bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    Commercial &amp; Office Cleaning
                  </span>
                  <span className="text-xs text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-medium">
                    1,000 – 50,000 sq ft
                  </span>
                </div>
                <h2 className="font-display-wide text-2xl sm:text-3xl text-white drop-shadow-xs pt-1">
                  Commercial Janitorial &amp; Office Cleaning Services
                </h2>
                <p className="text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
                  Dependable nightly and weekly cleaning for offices, medical &amp; dental clinics, daycares, retail spaces, and multi-tenant buildings across Rocklin, Roseville, and Sacramento.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
                <Link
                  href="/commercial-cleaning/"
                  className="btn-report btn-brand btn-on-ink text-sm"
                >
                  Explore Commercial Cleaning →
                </Link>
                <Link
                  href="/pricing/commercial-cleaning-calculator/"
                  className="btn-report btn-paper text-sm"
                >
                  Instant Office Price Calculator
                </Link>
              </div>
            </div>

            {/* Smaller Residential Panel (5 cols) with Background Image */}
            <div className="lg:col-span-5 group relative overflow-hidden rounded-2xl shadow-lg min-h-[340px] flex flex-col justify-between p-7 sm:p-9 text-white border border-sky/30">
              {/* Background Photograph */}
              <Image
                src="/images/residential-granite-bay-home.png"
                alt="Sunlit luxury residential kitchen and living room in Granite Bay and Rocklin, CA"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Rich Coastal-Sky Gradient Overlay for Warmth & Contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A4663]/95 via-[#0E5E85]/86 to-[#1682B5]/68" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08354B]/90 via-transparent to-transparent" />

              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full font-bold border border-white/25">
                    House Cleaning &amp; Maid Service
                  </span>
                  <span className="text-xs text-white font-semibold bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Save up to 20% recurring
                  </span>
                </div>
                <h2 className="font-display-wide text-2xl sm:text-[26px] text-white drop-shadow-xs pt-1">
                  Residential House Cleaning &amp; Deep Cleans
                </h2>
                <p className="text-sm text-white/95 leading-relaxed">
                  Friendly, background-checked local teams for Rocklin, Roseville, Granite Bay, Loomis, and Folsom homes. Weekly, bi-weekly, deep cleaning, and move-out cleans priced online in 60 seconds.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
                <Link
                  href="/house-cleaning/"
                  className="btn-report btn-ink text-sm"
                >
                  Explore House Cleaning →
                </Link>
                <Link
                  href="/pricing/house-cleaning-calculator/"
                  className="btn-report btn-paper text-sm"
                >
                  Instant Home Price Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE PROBLEM
         ===================================================================== */}
      <section className="bg-paper-2 py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 6-col Left Problem Statement + Restroom Detail Photo */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Why Local Businesses &amp; Homeowners Switch to Debra&apos;s
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink">
              Tired of cleaners who start strong for two weeks—and then start cutting corners?
            </h2>
            <p className="text-base text-ink/80 leading-relaxed">
              Almost every cleaning company does a great job on day one. Then the communication fades, crews start rushing through bathrooms and kitchens, and you end up double-checking their work yourself. We built Debra&apos;s Classic Cleaning so you never have to chase your cleaner again.
            </p>
            <div className="border border-rule bg-white p-3 rounded-xl shadow-xs">
              <Image
                src="/images/restroom-fixtures-gleaming.png"
                alt="Spotless restroom stainless steel faucets and quartz vanity after Debra's Classic Cleaning visit"
                width={640}
                height={380}
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="pt-2.5 px-1 flex items-center justify-between text-xs text-ink/70">
                <span className="font-medium">Restroom &amp; Bathroom Detailing</span>
                <span className="text-pass font-semibold">Sanitized Fixtures &amp; Odor-Free Drains</span>
              </div>
            </div>
          </div>

          {/* 6-col Right Three Numbered Failure Points */}
          <div className="lg:col-span-6 border border-rule bg-white rounded-xl divide-y divide-rule/80 shadow-sm overflow-hidden">
            <div className="bg-ink text-paper px-6 py-3.5 text-xs font-semibold tracking-wide flex justify-between">
              <span>Common Cleaning Frustrations</span>
              <span className="text-flag">How We Solve Them</span>
            </div>

            {[
              {
                num: "01",
                title: "Restrooms, kitchens & floors rushed through",
                symptom:
                  "Empty paper towel dispensers, streaky mirrors, crumbs left on breakroom counters, and corners that only get a quick pass.",
                fix: "Deep-cleaned fixtures, sanitized counters, HEPA-vacuumed floors, and restocked supplies every visit.",
              },
              {
                num: "02",
                title: "Nobody checks the work before leaving",
                symptom:
                  "Crews rush out without wiping glass doors, baseboards, or appliances—leaving you to discover missed spots the next morning.",
                fix: "Our team lead follows a 42-point room-by-room checklist and takes completion photos before clocking out.",
              },
              {
                num: "03",
                title: "A different stranger in your space every month",
                symptom:
                  "Big franchises and brokers subcontract your home or office to rotating crews you don't know and can't reach.",
                fix: "Our own background-checked, local Rocklin employees—plus direct access to Debra whenever you need anything.",
              },
            ].map((item) => (
              <div key={item.num} className="p-6 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand/10 text-brand">
                    {item.num}
                  </span>
                  <h3 className="font-display-wide text-lg text-ink">{item.title}</h3>
                </div>
                <p className="text-sm text-ink/75 leading-relaxed">{item.symptom}</p>
                <div className="text-xs text-pass font-semibold pt-2">
                  Our Promise: {item.fix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 42-POINT PROTOCOL
         ===================================================================== */}
      <section className="bg-paper py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Our Room-by-Room Checklist
              </div>
              <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
                See exactly what we clean on every visit.
              </h2>
              <p className="text-base text-ink/75 max-w-2xl mt-2">
                No vague promises. Click any area below to see the 42 specific tasks our cleaning teams complete and verify.
              </p>
            </div>
            <Link href="/protocol/" className="btn-report btn-paper text-sm shrink-0">
              View Full 42-Point Checklist →
            </Link>
          </div>

          <ProtocolExplorer />
        </div>
      </section>

      {/* =====================================================================
          HOW IT WORKS (Interactive Animated 4-Step Onboarding Journey)
         ===================================================================== */}
      <section className="bg-paper-2 py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Simple, Stress-Free Booking
              </div>
              <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
                How we get your home or workplace spotless in 4 easy steps.
              </h2>
            </div>
            <p className="text-sm text-ink/75 max-w-md">
              From your instant 60-second online estimate to your first sparkling clean, here is what to expect when you work with our Rocklin team.
            </p>
          </div>

          <OnboardingJourney />
        </div>
      </section>

      {/* =====================================================================
          INDUSTRIES
         ===================================================================== */}
      <section className="bg-paper py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Commercial &amp; Janitorial Services
              </div>
              <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
                Custom cleaning plans for 11 workplace types.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm text-ink/75 leading-relaxed">
              A dental office, a daycare center, and a corporate suite each need their own cleaning routine and safe products. Select your workplace below to see what&apos;s included:
            </p>
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
                  <span>View Protocol</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INSTANT PRICE TEASER
         ===================================================================== */}
      <section className="bg-paper-2 py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Online Price Estimator
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              What would it cost for your space?
            </h2>
            <p className="text-base text-ink/75 max-w-2xl mt-1">
              Select your facility type and approximate square footage below for an immediate monthly price range—or open the full calculator.
            </p>
          </div>

          <InstantPriceTeaser />
        </div>
      </section>

      {/* =====================================================================
          GUARANTEE
         ===================================================================== */}
      <section className="bg-paper py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="border border-rule bg-white p-7 sm:p-11 rounded-2xl shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <GuaranteeSeal size="lg" />
              <div className="text-xs font-medium text-ink/65">
                Included in every commercial service agreement
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-pass">
                  No Long-Term Contracts
                </div>
                <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
                  We earn your business every single visit.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {site.guarantees.map((g) => (
                  <div key={g.code} className="border-t border-rule pt-4 space-y-2">
                    <h3 className="font-display-wide text-lg text-ink">{g.title}</h3>
                    <p className="text-sm text-ink/75 leading-relaxed">{g.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          GOOGLE BUSINESS PROFILE & YELP REVIEWS
         ===================================================================== */}
      <section className="bg-paper-2 py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ReviewsSection
            limit={6}
            showHeader={true}
            eyebrow="Verified Google Business Profile & Yelp Reviews"
            heading="Loved by Placer & Sacramento homeowners and businesses."
          />
        </div>
      </section>

      {/* =====================================================================
          MEET DEBRA
         ===================================================================== */}
      <section className="bg-paper py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="border border-rule bg-white p-3 rounded-xl shadow-sm">
              <Image
                src="/images/debra-founder-portrait.png"
                alt="Debra, Founder of Debra's Classic Cleaning LLC, holding an inspection clipboard on site in Roseville, CA"
                width={520}
                height={600}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="pt-2.5 px-1 flex items-center justify-between text-xs text-ink/70">
                <span className="font-medium">Debra · Founder &amp; Owner</span>
                <span>Est. 2016 · Rocklin, CA</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Owner-Led Accountability
            </div>
            <blockquote className="font-display-wide text-2xl sm:text-4xl text-ink leading-tight">
              &ldquo;I started this company in 2016 with one rule: clean it like someone&apos;s going to inspect it. Because someone always does.&rdquo;
            </blockquote>
            <p className="text-base text-ink/80 leading-relaxed max-w-2xl">
              When you hire a national janitorial franchise, your building becomes a contract number traded to the lowest-bidding subcontractor. When you hire Debra&apos;s Classic Cleaning, our crews dispatch from Rocklin, our supervisors inspect your building against a 42-point scorecard, and my name and direct number stand behind the work.
            </p>
            <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <div className="font-display-wide text-xl text-ink">Debra</div>
                  <div className="text-xs text-ink/65">
                    Founder, Debra&apos;s Classic Cleaning LLC · WOSB / EDWOSB · CA Certified Small Business (ID: 2040639)
                  </div>
                </div>
                <div className="inline-flex items-center gap-2.5 bg-white border border-rule rounded-lg px-3 py-1.5 shadow-2xs">
                  <Image
                    src="/images/cert-women-owned.png"
                    alt="Certified Women Owned Business"
                    width={36}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-sba-edwosb.png"
                    alt="SBA EDWOSB Certified"
                    width={32}
                    height={38}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-ca-small-business.png"
                    alt="CA.GOV California Small Business Certified"
                    width={40}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-sam-gov.png"
                    alt="SAM.gov Federal Contractor"
                    width={38}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-bonded-insured.png"
                    alt="Licensed, Bonded & Insured"
                    width={36}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
              <Link href="/about/" className="btn-report btn-paper text-xs">
                Read Debra&apos;s Story &amp; Team Standards →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SERVICE AREA
         ===================================================================== */}
      <section className="bg-paper-2 py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Where We Work
              </div>
              <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
                Based in Rocklin. Serving Placer, Sacramento, Yolo &amp; Yuba counties.
              </h2>
            </div>
            <p className="text-xs text-ink/70 max-w-md">
              Select any city on the map or directory below for local service details, response times from Rocklin, and online pricing.
            </p>
          </div>

          <CoverageMap lane="commercial" />

          {/* City Directory Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/commercial-cleaning/${c.slug}-ca/`}
                className="p-3 border border-rule bg-white hover:border-brand hover:text-brand transition-colors rounded-lg text-xs flex flex-col justify-between no-underline shadow-2xs"
              >
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="text-[11px] text-ink/55">{c.county.replace(" County", "")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ
         ===================================================================== */}
      <section className="bg-paper py-16 sm:py-22">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Common Questions
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink">
              Straight answers on keys, alarms, supplies, and contracts.
            </h2>
            <p className="text-sm text-ink/75 leading-relaxed">
              Have a question about your building or need a same-day Certificate of Insurance? Call or text Debra directly at{" "}
              <a href={`tel:${site.phoneRaw}`} className="font-semibold underline text-brand">
                {site.phone}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-7 border border-rule bg-white rounded-xl divide-y divide-rule/70 shadow-2xs">
            {site.homeFaqs.map((faq, idx) => (
              <details key={idx} className="group p-5" open={idx === 0}>
                <summary className="font-display-wide text-base sm:text-lg text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-sm font-semibold border border-rule rounded-md px-2.5 py-0.5 bg-paper group-open:bg-ink group-open:text-paper transition-colors">
                    +
                  </span>
                </summary>
                <p className="text-sm text-ink/75 leading-relaxed mt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FINAL CTA
         ===================================================================== */}
      <section className="bg-ink text-paper py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-flag">
            Get Your Free Cleaning Estimate Today
          </div>
          <h2 className="font-display-expanded text-fluid-h2 text-paper">
            Ready for a spotless home or workplace?
          </h2>
          <p className="text-base sm:text-lg text-paper/80 max-w-xl mx-auto leading-relaxed">
            See your instant price online in 60 seconds with our home or commercial calculator—or book a free 20-minute walkthrough with Debra&apos;s team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing/"
              className="btn-report btn-brand btn-on-ink text-base px-7 py-4"
            >
              Get Instant Online Price →
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="btn-report btn-paper text-base px-6 py-4"
            >
              Call {site.phone}
            </a>
          </div>
          <div className="pt-2">
            <Link
              href="/benchmark-audit/"
              className="text-sm text-paper/85 hover:text-flag underline"
            >
              Managing an office or clinic? Book a free 20-minute walkthrough →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

