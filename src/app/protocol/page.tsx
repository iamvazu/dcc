import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProtocolExplorer } from "@/components/ProtocolExplorer";
import { protocol } from "@/lib/data";

export const metadata: Metadata = {
  title: "The 42-Point Facility Inspection Protocol | Debra's Classic Cleaning",
  description:
    "Inspect all 42 checkpoints across 6 facility zones (Entry, Restrooms, Breakroom, Workspaces, Floors, Touchpoints) verified on every commercial cleaning visit.",
  alternates: {
    canonical: "/protocol/",
  },
};

export default function ProtocolPage() {
  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs items={[{ label: "Our 42-Point Protocol", href: "/protocol/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Our 42-Point Cleaning Standard
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                42 checkpoints. Every visit. Photo-verified.
              </h1>
              <p className="text-lg text-ink/80 max-w-2xl leading-relaxed">
                Vague promises like &ldquo;we clean thoroughly&rdquo; are worthless when an inspector or patient walks into your restroom. Here is the exact 42-point checklist our crews complete and our supervisors verify on site.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <Link href="/benchmark-audit/" className="btn-report btn-brand text-sm">
                Book Free 42-Point Facility Walkthrough
              </Link>
              <Link
                href="/resources/"
                className="btn-report btn-paper text-xs"
              >
                Download Printable Checklist PDF →
              </Link>
            </div>
          </div>

          <ProtocolExplorer />
        </div>
      </section>

      {/* Full All-Zones Master Print Table */}
      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand">
              Complete Checklist (All 6 Zones)
            </div>
            <h2 className="font-display-wide text-fluid-h2 text-ink mt-1">
              Full 42-Point Master Inspection Sheet
            </h2>
          </div>

          <div className="space-y-8">
            {protocol.zones.map((zone) => (
              <div
                key={zone.id}
                className="border border-rule bg-white rounded-xl shadow-2xs overflow-hidden"
              >
                <div className="bg-ink text-paper px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display-wide text-lg text-paper">
                    {zone.label}
                  </span>
                  <span className="text-xs text-flag font-medium">
                    {zone.pointRange}
                  </span>
                </div>
                <div className="divide-y divide-rule/70">
                  {zone.points.map((pt) => (
                    <div
                      key={pt.id}
                      className="p-4 sm:px-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline"
                    >
                      <div className="md:col-span-5 flex items-baseline gap-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md border border-rule bg-paper shrink-0 tabular-nums">
                          {pt.number}
                        </span>
                        <span className="font-display-wide text-sm sm:text-base text-ink">
                          {pt.title}
                        </span>
                      </div>
                      <div className="md:col-span-5 text-xs sm:text-sm text-ink/75 leading-relaxed">
                        {pt.standard}
                      </div>
                      <div className="md:col-span-2 md:text-right text-[11px]">
                        {pt.photoVerified ? (
                          <span className="text-pass font-semibold bg-pass/10 px-2.5 py-0.5 rounded-full">
                            Photo Verified
                          </span>
                        ) : (
                          <span className="text-ink/55">Visual Check</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

