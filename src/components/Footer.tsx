import React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { CertStrip } from "./CertStrip";
import { GoogleLogo, YelpLogo, GOOGLE_GBP_URL, YELP_URL } from "./ReviewsSection";
import { addOns, cities, costGuides, industries, residentialServices, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink text-paper border-t-2 border-ink pb-20 lg:pb-0 no-print">
      {/* Top Certification Strip inside Footer */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 pb-8 border-b border-paper/15">
        <div className="font-mono text-xs uppercase tracking-widest text-paper/70 mb-3">
          VERIFIED CREDENTIALS & COMPLIANCE IDENTIFIERS
        </div>
        <CertStrip theme="dark" />
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 border-b border-paper/15">
        {/* Col 1: NAP Block identical to Google Business Profile (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <BrandLogo lane="commercial" theme="dark" />
          <p className="text-sm text-paper/80 leading-relaxed max-w-sm">
            Inspected-every-visit commercial janitorial and residential house cleaning across Placer, Sacramento, Yolo, and Yuba counties. Certified WOSB/EDWOSB and California Small Business (Micro).
          </p>

          {/* Exact GBP NAP Block */}
          <div className="border border-paper/25 bg-paper/5 p-4 rounded-[2px] font-mono text-xs space-y-1.5">
            <div className="text-flag font-bold uppercase tracking-wider">
              OFFICIAL BUSINESS RECORD (NAP)
            </div>
            <div className="font-bold text-paper">{site.nap.name}</div>
            <div className="text-paper/80">{site.nap.streetAddress}</div>
            <div className="text-paper/80">
              {site.nap.addressLocality}, {site.nap.addressRegion} {site.nap.postalCode}
            </div>
            <div className="pt-1">
              PHONE:{" "}
              <a href={`tel:${site.phoneRaw}`} className="text-white font-bold underline">
                {site.phone}
              </a>
            </div>
            <div>
              EMAIL:{" "}
              <a href={`mailto:${site.email}`} className="text-paper/90 underline">
                {site.email}
              </a>
            </div>
            <div className="text-paper/75 pt-1">HOURS: {site.nap.hoursDisplay}</div>
            <div className="text-paper/80 font-semibold">
              CA SB CERT ID: 2040639 · CAGE: 9Z5E9 · NAICS: 561720
            </div>
          </div>

          {/* Direct Google Business Profile & Yelp Backlinks */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={GOOGLE_GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors no-underline"
            >
              <GoogleLogo className="w-4 h-4" />
              <span>Google Business Profile ↗</span>
            </a>
            <a
              href={YELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors no-underline"
            >
              <YelpLogo className="w-4 h-4" />
              <span>Yelp (43+ Reviews) ↗</span>
            </a>
          </div>
        </div>

        {/* Col 2: Commercial Industries & Add-ons (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand bg-paper px-2 py-1 inline-block">
            COMMERCIAL INDUSTRIES
          </div>
          <ul className="space-y-1.5 text-xs font-mono">
            <li>
              <Link href="/commercial-cleaning/" className="text-paper hover:text-flag underline">
                Commercial Cleaning Hub
              </Link>
            </li>
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/commercial-cleaning/${ind.slug}/`}
                  className="text-paper/80 hover:text-white"
                >
                  {ind.pluralName}
                </Link>
              </li>
            ))}
          </ul>

          <div className="font-mono text-xs font-bold uppercase tracking-wider text-paper/70 pt-3">
            FACILITY ADD-ONS
          </div>
          <ul className="space-y-1 text-xs font-mono">
            {addOns.map((addon) => (
              <li key={addon.slug}>
                <Link
                  href={`/add-ons/${addon.slug}/`}
                  className="text-paper/75 hover:text-white"
                >
                  {addon.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Service Area Cities — Commercial & Residential Columns (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-paper/85">
            COMMERCIAL SERVICE CITIES
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-mono">
            {cities.map((c) => (
              <Link
                key={`comm-${c.slug}`}
                href={`/commercial-cleaning/${c.slug}-ca/`}
                className="text-paper/75 hover:text-white truncate"
              >
                {c.name}, CA
              </Link>
            ))}
          </div>

          <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky pt-3">
            HOUSE CLEANING CITIES
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-mono">
            {cities.slice(0, 10).map((c) => (
              <Link
                key={`res-${c.slug}`}
                href={`/house-cleaning/${c.slug}-ca/`}
                className="text-paper/75 hover:text-sky truncate"
              >
                {c.name} Home
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Calculators, Cost Guides & Company (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-paper/85">
            PRICING & PROTOCOL
          </div>
          <ul className="space-y-1.5 text-xs font-mono">
            <li>
              <Link href="/pricing/commercial-cleaning-calculator/" className="text-flag font-bold hover:underline">
                Commercial Calculator
              </Link>
            </li>
            <li>
              <Link href="/pricing/house-cleaning-calculator/" className="text-sky font-bold hover:underline">
                House Price Calculator
              </Link>
            </li>
            <li>
              <Link href="/benchmark-audit/" className="text-paper hover:underline">
                Free Benchmark Audit
              </Link>
            </li>
            <li>
              <Link href="/protocol/" className="text-paper/80 hover:text-white">
                42-Point Protocol
              </Link>
            </li>
            <li>
              <Link href="/guarantee/" className="text-paper/80 hover:text-white">
                30-Day Guarantee
              </Link>
            </li>
            <li>
              <Link href="/government-contracting/" className="text-paper/80 hover:text-white">
                Government Capability
              </Link>
            </li>
            {costGuides.slice(0, 4).map((cg) => (
              <li key={cg.slug}>
                <Link href={`/pricing/${cg.slug}/`} className="text-paper/70 hover:text-white">
                  {cg.topic} Cost ({cg.city})
                </Link>
              </li>
            ))}
          </ul>

          <div className="font-mono text-xs font-bold uppercase tracking-wider text-paper/85 pt-2">
            COMPANY
          </div>
          <ul className="space-y-1 text-xs font-mono">
            {residentialServices.slice(0, 3).map((s) => (
              <li key={s.slug}>
                <Link href={`/house-cleaning/${s.slug}/`} className="text-paper/75 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about/" className="text-paper/75 hover:text-white">
                About Debra
              </Link>
            </li>
            <li>
              <Link href="/reviews/" className="text-paper/75 hover:text-white">
                Verified Reviews
              </Link>
            </li>
            <li>
              <Link href="/resources/" className="text-paper/75 hover:text-white">
                Facility Resources & Checklist
              </Link>
            </li>
            <li>
              <Link href="/careers/" className="text-paper/75 hover:text-white">
                Careers (Now Hiring)
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="text-paper/75 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="text-paper/75 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/dev/styleguide/" className="text-paper/50 hover:text-white">
                Design System (/dev/styleguide)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-paper/65">
        <div>
          © {new Date().getFullYear()} {site.legalName}. Founded {site.foundedYear} in Rocklin, CA. All rights reserved.
        </div>
        <div>
          INSPECTED EVERY VISIT · PHOTO-VERIFIED · 30-DAY WALKAWAY GUARANTEE
        </div>
      </div>
    </footer>
  );
}

