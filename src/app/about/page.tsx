import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertStrip } from "@/components/CertStrip";
import { GovernmentOrgSchema } from "@/components/JsonLd";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Debra's Classic Cleaning LLC | Rocklin, CA (Est. 2016)",
  description:
    "Founded in 2016 in Rocklin, CA. Certified Women-Owned (WOSB/EDWOSB) and California Small Business (Micro) commercial and residential cleaning company.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="divide-y divide-rule">
      <GovernmentOrgSchema />

      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <Breadcrumbs items={[{ label: "About Debra", href: "/about/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Est. 2016 in Rocklin, CA · Operator-Owned &amp; Led
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Clean it like someone&apos;s going to inspect it.
              </h1>
              <p className="text-lg text-ink/85 leading-relaxed">
                Debra founded Debra&apos;s Classic Cleaning LLC in 2016 in Rocklin, California with a simple observation: most janitorial companies don&apos;t fail because they don&apos;t know how to mop a floor—they fail because nobody inspects the work after 9:00 PM.
              </p>
              <p className="text-base text-ink/80 leading-relaxed">
                Today, Debra&apos;s Classic Cleaning LLC is a federally certified Women-Owned Small Business (WOSB / EDWOSB, CAGE 9Z5E9) and California DGS Certified Small Business (Certification ID: 2040639) serving offices, medical and dental clinics, licensed daycares, multi-tenant properties, and homeowners across Placer, Sacramento, Yolo, and Yuba counties.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="border border-rule bg-white px-4 py-2.5 rounded-xl flex flex-wrap items-center gap-4 shadow-xs">
                  <Image
                    src="/images/debras-logo.png"
                    alt="Debra's Classic Cleaning Official Logo"
                    width={156}
                    height={52}
                    className="h-12 w-auto object-contain"
                  />
                  <span className="h-8 w-px bg-rule" />
                  <Image
                    src="/images/cert-sba-edwosb.png"
                    alt="SBA U.S. Small Business Administration EDWOSB Certified"
                    width={46}
                    height={56}
                    className="h-12 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-women-owned.png"
                    alt="Certified Women Owned Business Seal"
                    width={50}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-ca-small-business.png"
                    alt="CA.GOV California Small Business Certified"
                    width={56}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-sam-gov.png"
                    alt="SAM.gov Registered Federal Contractor"
                    width={52}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                  <Image
                    src="/images/cert-bonded-insured.png"
                    alt="Licensed, Bonded & Insured"
                    width={50}
                    height={50}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-4 border border-rule bg-white rounded-xl shadow-2xs">
                  <div className="text-2xl font-bold text-ink">2016</div>
                  <div className="text-xs text-ink/65">Founded in Rocklin</div>
                </div>
                <div className="p-4 border border-rule bg-white rounded-xl shadow-2xs">
                  <div className="text-2xl font-bold text-brand">42-Pt</div>
                  <div className="text-xs text-ink/65">Inspection Protocol</div>
                </div>
                <div className="p-4 border border-rule bg-white rounded-xl shadow-2xs">
                  <div className="text-2xl font-bold text-pass">4</div>
                  <div className="text-xs text-ink/65">Counties Served</div>
                </div>
                <div className="p-4 border border-rule bg-white rounded-xl shadow-2xs">
                  <div className="text-2xl font-bold text-ink">2040639</div>
                  <div className="text-xs text-ink/65">CA Small Business ID</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="border border-rule bg-white p-3 rounded-2xl shadow-sm">
                <Image
                  src="/images/debra-founder-portrait.png"
                  alt="Debra, Founder of Debra's Classic Cleaning LLC"
                  width={520}
                  height={580}
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="pt-2.5 px-1 text-xs flex justify-between text-ink/75">
                  <span className="font-semibold">Debra · Founder &amp; Owner</span>
                  <span>Rocklin HQ</span>
                </div>
              </div>

              <div className="border border-rule bg-white p-3 rounded-2xl shadow-xs">
                <Image
                  src="/images/debras-fleet-cx5-real.jpg"
                  alt="Debra's Classic Cleaning branded Mazda CX-5 in Rocklin, CA"
                  width={520}
                  height={380}
                  className="w-full h-60 object-cover object-center rounded-xl"
                />
                <div className="pt-2 px-1 text-xs flex justify-between text-ink/75">
                  <span className="font-semibold">Company Fleet Vehicle</span>
                  <span>Placer &amp; Sacramento Routes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-rule">
            <CertStrip />
          </div>

          {/* Values & Hiring Standards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              {
                num: "Standard 01",
                title: "Background-Checked Employees, Never Brokered Subcontractors",
                body: "We never sell your building contract or hand your alarm code to third-party sub-crews. Every technician passes a criminal background check, wears a company badge, and trains on our 42-point protocol.",
              },
              {
                num: "Standard 02",
                title: "Hospital & Child-Safe Chemistry Isolation",
                body: "Restroom cloths (Red/Yellow) never enter breakrooms (Green) or exam/desk zones (Blue). All microfiber is laundered at 160°F between shifts, and vacuums use certified HEPA filtration.",
              },
              {
                num: "Standard 03",
                title: "Turnkey Insurance & Same-Day COI",
                body: "Debra's Classic Cleaning LLC carries full commercial general liability, janitorial fidelity bond, and workers' compensation insurance. We furnish additional-insured COIs within 24 hours.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="border border-rule bg-white p-6 rounded-2xl shadow-2xs space-y-2.5"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-brand">{item.num}</div>
                <h2 className="font-display-wide text-xl text-ink">{item.title}</h2>
                <p className="text-sm text-ink/80 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-7 border border-rule bg-ink text-paper rounded-2xl">
            <div>
              <h3 className="font-display-wide text-xl text-paper">
                Want to walk your facility with Debra or get an instant estimate?
              </h3>
              <p className="text-xs text-paper/75 mt-1">
                Direct phone: {site.phone} · Email: {site.email}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/benchmark-audit/" className="btn-report btn-brand btn-on-ink text-xs">
                Book Free Walkthrough
              </Link>
              <Link href="/pricing/commercial-cleaning-calculator/" className="btn-report btn-paper text-xs">
                Get Instant Price
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

