import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResidentialCalculator } from "@/components/ResidentialCalculator";

export const metadata: Metadata = {
  title: "House Cleaning Cost Calculator | Debra's Classic Cleaning",
  description:
    "Instant house cleaning price calculator for Rocklin, Roseville, Granite Bay, and Folsom homes. See standard, deep, and move-out cleaning prices in 60 seconds.",
  alternates: {
    canonical: "/pricing/house-cleaning-calculator/",
  },
};

export default function HouseCleaningCalculatorPage() {
  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-8 sm:py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumbs
            items={[
              { label: "Pricing", href: "/pricing/" },
              {
                label: "House Cleaning Calculator",
                href: "/pricing/house-cleaning-calculator/",
              },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-sky">
                RESIDENTIAL ESTIMATOR · UP TO 20% RECURRING DISCOUNT
              </div>
              <h1 className="font-display-expanded text-fluid-h2 text-ink mt-1">
                House Cleaning Cost Calculator
              </h1>
              <p className="text-base text-ink/80 max-w-2xl mt-2">
                See your per-visit price range immediately before entering any contact information. Select your bedrooms, bathrooms, cleaning type, frequency, and optional add-ons below.
              </p>
            </div>
            <Link
              href="/pricing/commercial-cleaning-calculator/"
              className="font-mono text-xs text-brand underline shrink-0"
            >
              Pricing an office, clinic, or daycare? Switch to Commercial Calculator →
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="p-12 border-2 border-ink bg-paper-2 font-mono text-sm">
                Loading Residential Rate Engine...
              </div>
            }
          >
            <ResidentialCalculator />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

