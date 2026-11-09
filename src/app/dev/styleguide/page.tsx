import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";
import { LiveScorecard } from "@/components/LiveScorecard";
import { ProtocolExplorer } from "@/components/ProtocolExplorer";
import { CertStrip } from "@/components/CertStrip";
import { PriceReceipt } from "@/components/PriceReceipt";
import { CoverageMap } from "@/components/CoverageMap";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import {
  IconCalculator,
  IconCameraVerify,
  IconCheckSquare,
  IconChildcare,
  IconClipboard,
  IconDownloadPdf,
  IconFlagIssue,
  IconGymBarbell,
  IconHouse,
  IconLocationPin,
  IconMedicalCross,
  IconOfficeBuilding,
  IconPhone,
  IconPropertyKeys,
  IconRetailStore,
  IconSanctuary,
  IconShieldSeal,
  IconSms,
  IconWarehouse,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Design System & Style Guide | Debra's Classic Cleaning",
  description:
    "Interactive design system reference ('The Inspection Report') for Debra's Classic Cleaning LLC.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLOR_TOKENS = [
  { name: "--ink (Granite)", hex: "#17201E", className: "bg-ink text-paper", usage: "Primary text, dark report sections, footer, borders" },
  { name: "--paper", hex: "#F5F3EE", className: "bg-paper text-ink", usage: "Default report paper background" },
  { name: "--paper-2", hex: "#ECE8DF", className: "bg-paper-2 text-ink", usage: "Alternate section bands, table headers" },
  { name: "--rule", hex: "#CFC8BA", className: "bg-rule text-ink", usage: "Hairline rules, table borders, dotted leaders" },
  { name: "--brand (Classic Magenta)", hex: "#B5175E", className: "bg-brand text-white", usage: "Primary commercial CTA, focus rings, key markers" },
  { name: "--sky", hex: "#1B8FC4", className: "bg-sky text-white", usage: "Links, secondary accents, residential house lane" },
  { name: "--pass", hex: "#2F7D4F", className: "bg-pass text-white", usage: "Passed states, checkmarks, guarantee seal" },
  { name: "--flag", hex: "#E8A317", className: "bg-flag text-ink", usage: "Hi-vis audit flags, 'issue found' markers" },
];

export default function StyleGuidePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header Banner */}
      <div className="border-b-2 border-ink pb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-brand font-bold">
          PHASE 01 DELIVERABLE · DESIGN SYSTEM SPECIFICATION
        </div>
        <h1 className="font-display-expanded text-fluid-h1 text-ink mt-2">
          &ldquo;The Inspection Report&rdquo; Style Guide
        </h1>
        <p className="text-lg text-ink/80 max-w-3xl mt-3">
          Live component and token reference for Debra&apos;s Classic Cleaning LLC. Every design element is built to answer one question:{" "}
          <em>would this belong on a well-run facility&apos;s inspection sheet?</em>
        </p>
      </div>

      {/* Section 01: Color Tokens */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-xs font-bold uppercase text-brand">
            SECTION 01 — COLOR TOKENS (WCAG AA / AAA)
          </span>
          <span className="font-mono text-xs text-ink/60">8 TOKENS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLOR_TOKENS.map((t) => (
            <div key={t.name} className="border-2 border-ink rounded-[4px] overflow-hidden bg-paper">
              <div className={`h-24 p-4 flex items-end justify-between font-mono text-xs font-bold ${t.className}`}>
                <span>{t.name}</span>
                <span>{t.hex}</span>
              </div>
              <div className="p-3 text-xs text-ink/80 border-t border-ink">
                {t.usage}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 02: Typography & Dual Brand Registers */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-xs font-bold uppercase text-brand">
            SECTION 02 — TYPOGRAPHY & BRAND LOCKUPS
          </span>
          <span className="font-mono text-xs text-ink/60">
            ARCHIVO VARIABLE · PUBLIC SANS · IBM PLEX MONO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-ink bg-paper-2 rounded-[4px] space-y-4">
            <div className="font-mono text-xs uppercase text-ink/70">
              COMMERCIAL WORDMARK LOCKUP (DEFAULT)
            </div>
            <BrandLogo lane="commercial" />
            <p className="text-xs text-ink/75">
              Archivo Expanded 800 (&ldquo;DEBRA&apos;S&rdquo;) + Archivo Condensed (&ldquo;CLASSIC CLEANING&rdquo;) + Magenta Check-Square Mark.
            </p>
          </div>
          <div className="p-6 border-2 border-ink bg-paper-2 rounded-[4px] space-y-4">
            <div className="font-mono text-xs uppercase text-sky font-bold">
              RESIDENTIAL CREST LOCKUP (/HOUSE-CLEANING/ LANE)
            </div>
            <BrandLogo lane="residential" />
            <p className="text-xs text-ink/75">
              Used exclusively on residential pages alongside the `--sky` accent palette.
            </p>
          </div>
        </div>

        <div className="border-2 border-ink bg-paper p-6 rounded-[4px] space-y-5">
          <div>
            <div className="font-mono text-xs text-ink/60">
              H1 · ARCHIVO EXPANDED (WDTH 120, WT 800) · FLUID CLAMP(40PX → 76PX)
            </div>
            <div className="font-display-expanded text-fluid-h1 text-ink">
              Clean you can inspect.
            </div>
          </div>
          <div className="border-t border-rule pt-4">
            <div className="font-mono text-xs text-ink/60">
              H2 · ARCHIVO WIDE (WDTH 114, WT 700) · FLUID CLAMP(30PX → 52PX)
            </div>
            <div className="font-display-wide text-fluid-h2 text-ink">
              42 points. Every visit. Photo-verified.
            </div>
          </div>
          <div className="border-t border-rule pt-4">
            <div className="font-mono text-xs text-ink/60">
              BODY · PUBLIC SANS (17–18PX, LINE-HEIGHT 1.55)
            </div>
            <p className="max-w-3xl text-base text-ink">
              Most commercial cleaning fails quietly. You find out from a tenant, a patient, or a state licensing inspector. Debra&apos;s Classic Cleaning scores your facility against a 42-point inspection sheet and sends timestamped photo proof before our vehicle leaves your lot.
            </p>
          </div>
          <div className="border-t border-rule pt-4">
            <div className="font-mono text-xs text-ink/60">
              DATA / EYEBROW · IBM PLEX MONO
            </div>
            <div className="font-mono text-sm font-semibold text-brand">
              PT. 08 · ZN-02 RESTROOMS · ESTIMATE: $1,600–$2,050/MO · CAGE 9Z5E9
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Rectangular Buttons & Custom 24px Square-Cap Pictograms */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-xs font-bold uppercase text-brand">
            SECTION 03 — BUTTONS & 24PX SQUARE-CAP PICTOGRAMS
          </span>
          <span className="font-mono text-xs text-ink/60">2PX BORDER · 3PX HARD OFFSET SHADOW</span>
        </div>

        <div className="flex flex-wrap gap-4 p-6 border-2 border-ink bg-paper-2 rounded-[4px]">
          <button type="button" className="btn-report btn-brand">
            Primary Commercial CTA (.btn-brand)
          </button>
          <button type="button" className="btn-report btn-paper">
            Secondary Paper Action (.btn-paper)
          </button>
          <button type="button" className="btn-report btn-ink">
            Granite Ink Action (.btn-ink)
          </button>
          <button type="button" className="btn-report btn-sky">
            Residential Sky Action (.btn-sky)
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-3">
          {[
            { label: "Clipboard", Icon: IconClipboard },
            { label: "Check", Icon: IconCheckSquare },
            { label: "Office", Icon: IconOfficeBuilding },
            { label: "Medical", Icon: IconMedicalCross },
            { label: "Childcare", Icon: IconChildcare },
            { label: "Retail", Icon: IconRetailStore },
            { label: "Gym", Icon: IconGymBarbell },
            { label: "Sanctuary", Icon: IconSanctuary },
            { label: "Warehouse", Icon: IconWarehouse },
            { label: "Property", Icon: IconPropertyKeys },
            { label: "House", Icon: IconHouse },
            { label: "Phone", Icon: IconPhone },
            { label: "SMS", Icon: IconSms },
            { label: "Calculator", Icon: IconCalculator },
            { label: "Camera", Icon: IconCameraVerify },
            { label: "Shield", Icon: IconShieldSeal },
            { label: "Pin", Icon: IconLocationPin },
            { label: "Flag", Icon: IconFlagIssue },
            { label: "PDF", Icon: IconDownloadPdf },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="p-3 border border-ink bg-paper flex flex-col items-center justify-center gap-2 rounded-[2px]"
            >
              <Icon size={24} />
              <span className="font-mono text-[11px] text-ink/75">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04: Signature Components */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-xs font-bold uppercase text-brand">
            SECTION 04 — 7 SIGNATURE COMPONENTS
          </span>
          <span className="font-mono text-xs text-ink/60">PRODUCTION READY</span>
        </div>

        {/* 1. LiveScorecard & 4. PriceReceipt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-2">
            <div className="font-mono text-xs font-bold uppercase">
              01 · LIVE SCORECARD (71 → 96 COUNTER + 3 CHECKLIST TICKS)
            </div>
            <LiveScorecard />
          </div>
          <div className="lg:col-span-6 space-y-2">
            <div className="font-mono text-xs font-bold uppercase">
              04 · PRICE RECEIPT (ITEMIZED DOTTED LEADERS + MONO NUMERALS)
            </div>
            <PriceReceipt
              mode="commercial"
              facilityOrHomeLabel="6,000 sq ft Office · Mixed Floors"
              cityOrZipLabel="95661 · Roseville, CA"
              lineItems={[
                { label: "Base labor (2.90 hrs/visit × 3x/wk)", value: "$1,806/mo" },
                { label: "Restroom sanitation (3 fixtures · PT. 08-16)", value: "Included" },
                { label: "Schedule window (After hours · 1.0x)", value: "$0/mo" },
                { label: "42-Point Tablet Photo Scorecard (PT. 42)", value: "Included", highlight: true },
              ]}
              lowPrice={1600}
              highPrice={2050}
              cadenceLabel="/ month"
              secondaryRateLabel="~$123–$158 / visit"
              recommendedTier="Classic Standard"
              footnote="Sanity check from PRD 5.4: 6,000 sq ft mixed-floor office, 3 restrooms, 3 visits/wk after hours = $1,600–$2,050/mo."
              primaryCtaLabel="Book a Free Benchmark Audit to Lock This Price"
            />
          </div>
        </div>

        {/* 3. CertStrip & 6. GuaranteeSeal */}
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold uppercase">
            03 · CERTIFICATION STRIP & 06 · GUARANTEE SEAL
          </div>
          <CertStrip />
          <div className="p-6 border-2 border-ink bg-paper-2 flex flex-wrap items-center gap-6 rounded-[4px]">
            <GuaranteeSeal />
            <div className="max-w-xl space-y-2">
              <div className="font-display-wide text-2xl text-ink">
                30-Day Walkaway · 24-Hour Re-Clean · Three-Strike Credit
              </div>
              <p className="text-sm text-ink/80">
                Circular inspection stamp paired with contractual performance guarantees. No 12-month lock-in traps.
              </p>
            </div>
          </div>
        </div>

        {/* 2. ProtocolExplorer */}
        <div className="space-y-2">
          <div className="font-mono text-xs font-bold uppercase">
            02 · 42-POINT PROTOCOL EXPLORER (6 ZONES FROM /DATA/PROTOCOL.JSON)
          </div>
          <ProtocolExplorer />
        </div>

        {/* 5. CoverageMap */}
        <div className="space-y-2">
          <div className="font-mono text-xs font-bold uppercase">
            05 · 4-COUNTY COVERAGE MAP (INTERACTIVE SVG)
          </div>
          <CoverageMap />
        </div>
      </section>

      {/* Section 05: Official Brand Marks, Certifications & Documentary Photography */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-xs font-bold uppercase text-brand">
            SECTION 05 — OFFICIAL BRAND MARKS, CERTIFICATIONS & PHOTOGRAPHY
          </span>
          <span className="font-mono text-xs text-ink/60">16 ASSETS IN /PUBLIC/IMAGES/</span>
        </div>

        {/* Official Uploaded Logo & Certification Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-ink bg-white p-6 rounded-[4px] flex flex-col items-center justify-between gap-4">
            <Image
              src="/images/debras-logo.png"
              alt="Official Debra's Classic Cleaning Logo"
              width={240}
              height={80}
              className="h-20 w-auto object-contain"
            />
            <div className="w-full pt-3 border-t border-rule font-mono text-xs text-center text-ink/80">
              /images/debras-logo.png · Official Brand Logo
            </div>
          </div>

          <div className="border-2 border-ink bg-white p-6 rounded-[4px] flex flex-col items-center justify-between gap-4">
            <Image
              src="/images/cert-sba-edwosb.png"
              alt="SBA U.S. Small Business Administration EDWOSB Certified Badge"
              width={110}
              height={136}
              className="h-24 w-auto object-contain"
            />
            <div className="w-full pt-3 border-t border-rule font-mono text-xs text-center text-ink/80">
              /images/cert-sba-edwosb.png · SBA EDWOSB Certified
            </div>
          </div>

          <div className="border-2 border-ink bg-white p-6 rounded-[4px] flex flex-col items-center justify-between gap-4">
            <Image
              src="/images/cert-women-owned.png"
              alt="Certified Women Owned Business Seal"
              width={120}
              height={120}
              className="h-24 w-auto object-contain"
            />
            <div className="w-full pt-3 border-t border-rule font-mono text-xs text-center text-ink/80">
              /images/cert-women-owned.png · Certified Women-Owned Seal
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

