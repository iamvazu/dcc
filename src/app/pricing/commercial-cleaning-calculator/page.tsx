import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommercialCalculator } from "@/components/CommercialCalculator";
import { CertStrip } from "@/components/CertStrip";

export const metadata: Metadata = {
  title: "Commercial Cleaning Cost Calculator | Debra's Classic Cleaning",
  description:
    "Instant commercial cleaning price calculator for offices, medical/dental clinics, daycares, and buildings in Rocklin, Roseville & Sacramento. See your monthly range in 60 seconds.",
  alternates: {
    canonical: "/pricing/commercial-cleaning-calculator/",
  },
};

export default function CommercialCalculatorPage() {
  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-8 sm:py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumbs
            items={[
              { label: "Pricing", href: "/pricing/" },
              {
                label: "Commercial Cleaning Calculator",
                href: "/pricing/commercial-cleaning-calculator/",
              },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                COMMERCIAL ESTIMATOR · LIVE RECEIPT READOUT
              </div>
              <h1 className="font-display-expanded text-fluid-h2 text-ink mt-1">
                Commercial Cleaning Price Calculator
              </h1>
              <p className="text-base text-ink/80 max-w-2xl mt-2">
                See your estimated monthly range and per-visit equivalent immediately—no email required to view pricing. Adjust your square footage, restroom count, floor mix, and visit cadence below.
              </p>
            </div>
            <Link
              href="/pricing/house-cleaning-calculator/"
              className="font-mono text-xs text-sky underline shrink-0"
            >
              Looking for residential house cleaning prices? Switch to Home Calculator →
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="p-12 border-2 border-ink bg-paper-2 font-mono text-sm">
                Loading Commercial Rate Engine...
              </div>
            }
          >
            <CommercialCalculator />
          </Suspense>

          <div className="pt-8 border-t border-rule">
            <CertStrip />
          </div>
        </div>
      </section>
    </div>
  );
}

