"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculateCommercialPrice, CommercialFacilityKey } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

const QUICK_TYPES: { key: CommercialFacilityKey; label: string }[] = [
  { key: "office", label: "Office / Suite" },
  { key: "medical", label: "Medical / Dental Clinic" },
  { key: "daycare", label: "Daycare / Preschool" },
  { key: "commonAreas", label: "Multi-Tenant Common Areas" },
  { key: "warehouse", label: "Warehouse / Industrial Office" },
  { key: "retail", label: "Retail / Showroom" },
];

export function InstantPriceTeaser() {
  const [facilityType, setFacilityType] = useState<CommercialFacilityKey>("office");
  const [sqft, setSqft] = useState<number>(6000);
  const [visitsPerWeek, setVisitsPerWeek] = useState<number>(3);

  const preview = calculateCommercialPrice({
    zip: "95661",
    facilityType,
    sqft,
    restrooms: Math.max(2, Math.round(sqft / 2000)),
    floors: "mixed",
    visitsPerWeek,
    timeOfDay: "afterHours",
    addOns: {
      supplies: false,
      floorCare: false,
      windows: false,
      dayPorterHoursPerWeek: 0,
      carpet: false,
      grounds: false,
    },
  });

  const fullCalcHref = `/pricing/commercial-cleaning-calculator/?type=${facilityType}&sqft=${sqft}&visits=${visitsPerWeek}`;

  return (
    <div className="border border-rule bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-ink text-paper px-6 py-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wide">
          Instant Commercial Cleaning Estimator
        </span>
        <span className="text-xs text-flag font-medium">
          No email required to see pricing
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 cols: Quick Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-ink/70 mb-2.5">
              1. Select Facility Type
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {QUICK_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setFacilityType(t.key)}
                  className={`min-h-[46px] px-3.5 py-2 border rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                    facilityType === t.key
                      ? "border-ink bg-ink text-paper shadow-2xs"
                      : "border-rule bg-paper text-ink hover:bg-paper-2"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="teaser-sqft" className="text-xs font-bold uppercase tracking-wider text-ink/70">
                  2. Approx. Square Feet
                </label>
                <span className="text-sm font-bold text-ink tabular-nums">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="teaser-sqft"
                type="range"
                min={1000}
                max={25000}
                step={500}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-paper-2 rounded-lg accent-brand cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-ink/55 mt-1.5 tabular-nums">
                <span>1,000 sq ft</span>
                <span>12,000 sq ft</span>
                <span>25,000 sq ft</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
                3. Visits Per Week
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVisitsPerWeek(v)}
                    className={`min-h-[44px] border rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      visitsPerWeek === v
                        ? "border-brand bg-brand text-white shadow-2xs"
                        : "border-rule bg-paper text-ink hover:bg-paper-2"
                    }`}
                  >
                    {v}x/wk
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live Receipt Preview */}
        <div
          className="lg:col-span-5 p-6 border border-rule bg-paper rounded-xl space-y-3"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-rule/80 pb-2.5 text-xs">
            <span className="font-semibold text-ink/65">Estimated Monthly Range</span>
            <span className="font-semibold text-pass bg-pass/10 px-2.5 py-0.5 rounded-full">
              {preview.recommendedTier}
            </span>
          </div>

          <div className="pt-1">
            <div className="font-display-expanded text-3xl sm:text-4xl text-ink tabular-nums">
              ${preview.lowMonthly.toLocaleString()}–${preview.highMonthly.toLocaleString()}
              <span className="text-base font-normal text-ink/60"> / mo</span>
            </div>
            <div className="text-xs text-ink/70 mt-1.5 tabular-nums">
              Approx. ${preview.perVisitLow}–${preview.perVisitHigh} per visit ({preview.hoursPerVisit} hrs/visit)
            </div>
          </div>

          <Link
            href={fullCalcHref}
            onClick={() =>
              trackEvent("calc_start", {
                calculator_type: "commercial",
                facility_type: facilityType,
                sqft_band: String(sqft),
                page_type: "home_teaser",
              })
            }
            className="btn-report btn-brand w-full text-sm mt-2"
          >
            Customize Restrooms, Floors &amp; Add-Ons →
          </Link>
        </div>
      </div>
    </div>
  );
}

