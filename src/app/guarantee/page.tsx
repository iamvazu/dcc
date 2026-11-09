import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "30-Day Walkaway & 24-Hr Re-Clean Guarantee | Debra's Classic Cleaning",
  description:
    "No 12-month janitorial contract traps. Read our 30-Day Walkaway Guarantee, 24-Hour Re-Clean Promise, and Three-Strike Visit Credit.",
  alternates: {
    canonical: "/guarantee/",
  },
};

export default function GuaranteePage() {
  return (
    <div className="divide-y divide-rule">
      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <Breadcrumbs items={[{ label: "Our Guarantee", href: "/guarantee/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-pass">
                Contractual Performance Terms · Zero Vendor Traps
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Long contracts only protect bad cleaners.
              </h1>
              <p className="text-lg text-ink/85 max-w-2xl leading-relaxed">
                National janitorial franchises lock facility managers into 12-to-36-month auto-renewing agreements with 90-day cancellation windows. We do the opposite: we put three concrete performance remedies in writing on page one of your agreement.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <GuaranteeSeal size="lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {site.guarantees.map((g, i) => (
              <div
                key={g.code}
                className="border border-rule bg-white p-7 rounded-2xl shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-rule/70 pb-2.5 text-xs">
                  <span className="font-bold text-brand">{g.code}</span>
                  <span className="text-pass font-bold">Clause 0{i + 1}</span>
                </div>
                <h2 className="font-display-wide text-2xl text-ink">{g.title}</h2>
                <p className="text-sm text-ink/80 leading-relaxed">{g.summary}</p>
              </div>
            ))}
          </div>

          <div className="p-8 border border-rule bg-ink text-paper rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs text-flag font-bold uppercase tracking-wider">
                Put Us to the Test
              </div>
              <h3 className="font-display-wide text-2xl text-paper">
                Start with a free 20-minute Facility Walkthrough.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/benchmark-audit/" className="btn-report btn-brand btn-on-ink">
                Book Free Walkthrough
              </Link>
              <Link
                href="/pricing/commercial-cleaning-calculator/"
                className="btn-report btn-paper"
              >
                Get Instant Price
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

