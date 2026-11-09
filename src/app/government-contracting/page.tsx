"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertStrip } from "@/components/CertStrip";
import { GovernmentOrgSchema } from "@/components/JsonLd";
import { IconDownloadPdf } from "@/components/Icons";
import { cities, site } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export default function GovernmentContractingPage() {
  const handlePrintCapability = () => {
    trackEvent("quote_pdf_download", {
      page_type: "government_capability_statement",
    });
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="divide-y-2 divide-ink">
      <GovernmentOrgSchema />

      <section className="bg-paper py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="no-print">
            <Breadcrumbs
              items={[
                { label: "Government Contracting", href: "/government-contracting/" },
              ]}
            />
          </div>

          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-ink pb-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                FEDERAL, STATE &amp; MUNICIPAL PROCUREMENT · NAICS 561720
              </div>
              <h1 className="font-display-expanded text-fluid-h2 text-ink mt-1">
                Capability Statement — Debra&apos;s Classic Cleaning LLC
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 no-print">
              <button
                type="button"
                onClick={handlePrintCapability}
                className="btn-report btn-brand text-xs"
              >
                <IconDownloadPdf size={18} />
                Download / Print Capability Statement (PDF)
              </button>
              <a
                href={`mailto:${site.email}?subject=RFP%20/%20RFQ%20Solicitation%20-%20NAICS%20561720`}
                className="btn-report btn-paper text-xs"
              >
                Send RFP / RFQ to Contracting Desk
              </a>
            </div>
          </div>

          {/* One-Page Federal Capability Statement Sheet (Scannable in 30 Seconds) */}
          <div className="border-2 border-ink bg-paper rounded-[4px] shadow-[5px_5px_0px_#17201E] overflow-hidden">
            {/* Document Masthead */}
            <div className="bg-ink text-paper p-6 border-b-2 border-ink grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-white border-2 border-paper/40 rounded-[3px] px-3 py-2 shrink-0 inline-flex items-center gap-3 self-start">
                  <Image
                    src="/images/debras-logo.png"
                    alt="Debra's Classic Cleaning LLC official logo"
                    width={138}
                    height={46}
                    className="h-11 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-sba-edwosb.png"
                    alt="SBA EDWOSB Certified"
                    width={46}
                    height={56}
                    className="h-11 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-women-owned.png"
                    alt="Certified Women Owned Business"
                    width={48}
                    height={48}
                    className="h-11 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-ca-small-business.png"
                    alt="California Small Business Certified (CA.GOV)"
                    width={54}
                    height={48}
                    className="h-11 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-sam-gov.png"
                    alt="SAM.gov Registered Federal Contractor"
                    width={50}
                    height={48}
                    className="h-11 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-bonded-insured.png"
                    alt="Licensed, Bonded & Insured"
                    width={48}
                    height={48}
                    className="h-11 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-xs text-flag font-bold uppercase tracking-widest">
                    CAPABILITY STATEMENT · JANITORIAL &amp; FACILITY SUPPORT SERVICES
                  </div>
                  <div className="font-display-expanded text-2xl sm:text-3xl text-paper">
                    DEBRA&apos;S CLASSIC CLEANING LLC
                  </div>
                  <div className="font-mono text-xs text-paper/80">
                    Headquarters: 2718 Wyatt Ct, Rocklin, CA 95765 · Serving Placer, Sacramento, Yolo &amp; Yuba Counties (incl. Beale AFB / McClellan / State Facilities)
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 font-mono text-xs bg-paper/10 p-4 border border-paper/25">
                <div>
                  <span className="text-paper/65 block text-[10px]">CAGE CODE</span>
                  <span className="font-bold text-flag text-sm">9Z5E9</span>
                </div>
                <div>
                  <span className="text-paper/65 block text-[10px]">PRIMARY NAICS</span>
                  <span className="font-bold text-white text-sm">561720 (Janitorial)</span>
                </div>
                <div>
                  <span className="text-paper/65 block text-[10px]">CA DGS / CAL EPROCURE ID</span>
                  <span className="font-bold text-flag text-sm">2040639</span>
                </div>
                <div>
                  <span className="text-paper/65 block text-[10px]">CAL EPROCURE DESK</span>
                  <span className="font-bold text-white truncate block">caleprocure@debrasclassiccleaning.com</span>
                </div>
              </div>
            </div>

            {/* Body Grid of the Capability Statement */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
              {/* Left 7 Columns: Core Competencies, Differentiators & Past Performance */}
              <div className="lg:col-span-7 p-6 space-y-6">
                {/* Core Competencies */}
                <div className="space-y-3">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 inline-block">
                    01 · CORE COMPETENCIES
                  </h2>
                  <p className="text-sm text-ink/85 leading-relaxed">
                    Founded in 2016, Debra&apos;s Classic Cleaning LLC provides inspected-every-visit commercial, medical, municipal, and post-construction janitorial services across Northern California Region 3 (Placer, Sacramento, Yolo, and Yuba counties).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                    {[
                      "Daily & Weekly Administrative Facility Janitorial",
                      "Outpatient Medical & Dental Clinic Disinfection (EPA List N)",
                      "Childcare & Educational Facility Sanitation (Title 22)",
                      "3-Phase Post-Construction & TI Final Cleaning (CSI 01 74 23)",
                      "Day Porter & Restroom Consumables Management",
                      "Hard-Floor Stripping/Waxing, Carpet Extraction & Glass Care",
                    ].map((c) => (
                      <div
                        key={c}
                        className="p-2.5 border border-ink bg-paper-2 flex items-start gap-2"
                      >
                        <span className="text-pass font-bold">■</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Differentiators */}
                <div className="space-y-3 pt-2 border-t border-rule">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 inline-block">
                    02 · KEY DIFFERENTIATORS
                  </h2>
                  <ul className="space-y-2.5 text-sm text-ink/85">
                    <li>
                      <strong>42-Point Tablet Photo Verification (PT. 42):</strong> Every completed shift generates a timestamped photo scorecard before our crew leaves the facility—giving Contracting Officers&apos; Representatives (CORs) and facility managers auditable proof of performance.
                    </li>
                    <li>
                      <strong>Zero Subcontracting / W-2 Background-Checked Teams:</strong> All work is executed by directly supervised, uniformed employees dispatched from our Rocklin, CA headquarters (20–40 min response to Sacramento, Roseville, Lincoln, and Beale AFB corridor).
                    </li>
                    <li>
                      <strong>Set-Aside &amp; Subcontracting Goal Credit:</strong> Certified SBA WOSB, SBA EDWOSB, and California DGS Small Business (Micro)—eligible for sole-source, set-aside, and SB/DVBE Option procurements under Government Code §14838.5.
                    </li>
                  </ul>
                </div>

                {/* Past Performance */}
                <div className="space-y-3 pt-2 border-t border-rule">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 inline-block">
                    03 · PAST PERFORMANCE &amp; CONTRACT EXPERIENCE
                  </h2>
                  <div className="border border-rule rounded-xl bg-white divide-y divide-rule/70 text-xs overflow-hidden">
                    <div className="p-3.5">
                      <div className="font-bold text-ink">
                        Outpatient Medical &amp; Dental Facility Janitorial (Roseville &amp; Rocklin, CA)
                      </div>
                      <div className="text-ink/75 mt-0.5">
                        Scope: Recurring after-hours EPA List N clinical disinfection, operatory floor care, and 42-point tablet photo verification · 2016–Present · POC &amp; Contract Value Available Upon Request
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="font-bold text-ink">
                        Multi-Tenant Commercial &amp; Post-Construction Final Clean Turnover (Placer &amp; Sacramento Counties)
                      </div>
                      <div className="text-ink/75 mt-0.5">
                        Scope: Common area maintenance, restroom floor-drain priming, and CSI 01 74 23 3-phase final construction clean · 100% On-Time Inspection Pass Rate
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="font-bold text-ink">
                        High-Compliance Childcare, Military Family &amp; Municipal Support (Placer, Sacramento &amp; Beale AFB Corridor)
                      </div>
                      <div className="text-ink/75 mt-0.5">
                        Scope: Recurring Title 22 child-safe sanitization, move-out turnovers, and facility support across Placer, Sacramento, Yolo, and Yuba counties
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Codes, Certifications, Socio-Economic Status & POC */}
              <div className="lg:col-span-5 p-6 bg-paper-2/60 space-y-6">
                {/* Socio-Economic Certifications */}
                <div className="space-y-3">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-brand text-white px-3 py-1.5 inline-block">
                    04 · SOCIO-ECONOMIC CERTIFICATIONS
                  </h2>
                  <div className="space-y-2 font-mono text-xs">
                    {site.certifications.map((cert) => {
                      const badgeImg =
                        "badgeImage" in cert
                          ? (cert as { badgeImage?: string }).badgeImage
                          : undefined;
                      return (
                        <div
                          key={cert.code}
                          className="p-3 border border-ink bg-paper flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {badgeImg && (
                              <Image
                                src={badgeImg}
                                alt={cert.label}
                                width={40}
                                height={40}
                                className="h-9 w-auto object-contain shrink-0 bg-white p-0.5 rounded-xs"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="font-bold text-ink">{cert.code}</div>
                              <div className="text-[11px] text-ink/75">{cert.label}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-pass shrink-0">
                            {cert.idNumber}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* NAICS, PSC & UNSPSC Codes */}
                <div className="space-y-3 pt-2 border-t border-rule">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 inline-block">
                    05 · NAICS, PSC &amp; UNSPSC CODES
                  </h2>
                  <div className="border border-ink bg-paper p-3.5 font-mono text-xs space-y-2">
                    <div>
                      <span className="font-bold text-brand">561720 (Primary):</span> Janitorial Services
                    </div>
                    <div>
                      <span className="font-bold text-ink">561790:</span> Other Services to Buildings and Dwellings
                    </div>
                    <div>
                      <span className="font-bold text-ink">561740:</span> Carpet and Upholstery Cleaning Services
                    </div>
                    <div>
                      <span className="font-bold text-ink">561210:</span> Facilities Support Services
                    </div>
                    <div>
                      <span className="font-bold text-ink">PSC S201:</span> Housekeeping — Custodial Janitorial
                    </div>
                    <div>
                      <span className="font-bold text-ink">UNSPSC 76111500:</span> General building and office cleaning
                    </div>
                  </div>
                </div>

                {/* Geographic Coverage */}
                <div className="space-y-2 pt-2 border-t border-rule">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider bg-ink text-paper px-3 py-1.5 inline-block">
                    06 · SERVICE AREA (CA COUNTIES)
                  </h2>
                  <p className="font-mono text-xs text-ink/85">
                    Placer, Sacramento, Yolo, and Yuba Counties: {cities.map((c) => c.name).join(", ")}, plus Beale AFB / Marysville / Wheatland.
                  </p>
                </div>

                {/* Contracting Officer Point of Contact */}
                <div className="border-2 border-ink bg-ink text-paper p-5 rounded-[4px] space-y-2 font-mono text-xs">
                  <div className="text-flag font-bold uppercase">
                    07 · GOVERNMENT POINT OF CONTACT
                  </div>
                  <div className="font-bold text-sm text-white">
                    Debra · Founder &amp; Managing Member
                  </div>
                  <div>Entity: {site.legalName}</div>
                  <div>CA DGS Certification ID: 2040639 (CAGE: 9Z5E9)</div>
                  <div>
                    Address: {site.nap.streetAddress}, {site.nap.addressLocality}, {site.nap.addressRegion} {site.nap.postalCode}
                  </div>
                  <div>
                    Phone:{" "}
                    <a href={`tel:${site.phoneRaw}`} className="underline text-white font-bold">
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    Cal eProcure Email:{" "}
                    <a href="mailto:caleprocure@debrasclassiccleaning.com" className="underline text-flag font-bold">
                      caleprocure@debrasclassiccleaning.com
                    </a>
                  </div>
                  <div>
                    Direct Email:{" "}
                    <a href={`mailto:${site.email}`} className="underline text-white">
                      {site.email}
                    </a>
                  </div>
                  <div className="pt-2 text-[11px] text-paper/75">
                    Accepts Government Purchase Cards (GPC / CAL-Card), EFT/ACH, and WAWF / Wide Area Workflow invoicing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="no-print pt-4">
            <CertStrip />
          </div>
        </div>
      </section>
    </div>
  );
}

