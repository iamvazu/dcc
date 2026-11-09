import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  ReviewsSection,
  GOOGLE_GBP_URL,
  YELP_URL,
  GoogleLogo,
  YelpLogo,
} from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Verified Google & Yelp Reviews | Debra's Classic Cleaning",
  description:
    "Read verified Google Business Profile and Yelp reviews from commercial facilities and homeowners across Rocklin, Roseville, Granite Bay, and Sacramento.",
  alternates: {
    canonical: "/reviews/",
  },
};

export default function ReviewsPage() {
  return (
    <div className="divide-y divide-rule">
      <section className="bg-paper py-12 sm:py-18">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs items={[{ label: "Client Reviews", href: "/reviews/" }]} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Verified Google Business Profile &amp; Yelp Reviews
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink mt-1">
                Commercial &amp; Residential Reviews
              </h1>
              <p className="text-base text-ink/75 max-w-2xl mt-2">
                Verified feedback from facility managers, dental &amp; medical clinics, preschool directors, and homeowners across Placer and Sacramento counties.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={GOOGLE_GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-report btn-paper text-xs inline-flex items-center gap-2"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Google Business Profile ↗</span>
              </a>
              <a
                href={YELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-report btn-paper text-xs inline-flex items-center gap-2"
              >
                <YelpLogo className="w-4 h-4" />
                <span>Read 43+ Reviews on Yelp ↗</span>
              </a>
            </div>
          </div>

          <ReviewsSection showHeader={false} limit={12} />

          <div className="p-8 border border-rule bg-ink text-paper rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display-wide text-2xl text-paper">
                See what your facility scores before you decide.
              </h2>
              <p className="text-sm text-paper/80 mt-1">
                Book a free 20-minute Benchmark Walkthrough or calculate an instant price online.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/benchmark-audit/" className="btn-report btn-brand btn-on-ink text-sm">
                Book Free Walkthrough
              </Link>
              <Link href="/pricing/" className="btn-report btn-paper text-sm">
                Instant Price Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
