"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  calculateCommercialPrice,
  CommercialCalcInput,
  CommercialFacilityKey,
  FloorMixKey,
  TimeOfDayKey,
} from "@/lib/data";
import { PriceReceipt, ReceiptLineItem } from "./PriceReceipt";
import {
  IconChildcare,
  IconGymBarbell,
  IconMedicalCross,
  IconOfficeBuilding,
  IconPropertyKeys,
  IconRetailStore,
  IconSanctuary,
  IconWarehouse,
} from "./Icons";
import { trackEvent } from "@/lib/analytics";

const FACILITY_OPTIONS: {
  key: CommercialFacilityKey;
  label: string;
  sub: string;
  Icon: React.ComponentType<{ size?: number }>;
}[] = [
  { key: "office", label: "Office", sub: "Corporate / Professional", Icon: IconOfficeBuilding },
  { key: "medical", label: "Medical / Dental", sub: "Clinic / Operatories", Icon: IconMedicalCross },
  { key: "daycare", label: "Daycare", sub: "Preschool / Title 22", Icon: IconChildcare },
  { key: "retail", label: "Retail / Showroom", sub: "Storefront / Dealer", Icon: IconRetailStore },
  { key: "gym", label: "Gym / Fitness", sub: "Studio / Athletic", Icon: IconGymBarbell },
  { key: "church", label: "Church", sub: "Sanctuary / Campus", Icon: IconSanctuary },
  { key: "warehouse", label: "Warehouse / TI", sub: "Industrial / Post-Const.", Icon: IconWarehouse },
  { key: "commonAreas", label: "Common Areas", sub: "Multi-Tenant Property", Icon: IconPropertyKeys },
];

const SQFT_HELPERS = [
  { label: "Small Suite (~2,500)", sqft: 2500 },
  { label: "Clinic / Office (~4,500)", sqft: 4500 },
  { label: "Mid Building (~6,000)", sqft: 6000 },
  { label: "Large Floor (~15,000)", sqft: 15000 },
];

interface CommercialCalculatorProps {
  defaultFacilityType?: CommercialFacilityKey;
  defaultZip?: string;
  defaultSqft?: number;
  embedded?: boolean;
}

export function CommercialCalculator({
  defaultFacilityType = "office",
  defaultZip = "95661",
  defaultSqft = 6000,
  embedded = false,
}: CommercialCalculatorProps) {
  const [input, setInput] = useState<CommercialCalcInput>({
    zip: defaultZip,
    facilityType: defaultFacilityType,
    sqft: defaultSqft,
    restrooms: 3,
    floors: "mixed",
    visitsPerWeek: 3,
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

  const [leadModalMode, setLeadModalMode] = useState<"none" | "audit" | "email">("none");
  const [leadForm, setLeadForm] = useState({
    company: "",
    name: "",
    role: "Facility / Office Manager",
    phone: "",
    email: "",
    preferredTime: "Morning (8am – 12pm)",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    submissionId: string;
    leadSmsPreview: string;
  } | null>(null);
  const [outOfAreaEmail, setOutOfAreaEmail] = useState("");
  const [outOfAreaSaved, setOutOfAreaSaved] = useState(false);

  // Hydrate from URL query params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const qZip = params.get("zip");
    const qType = params.get("type") as CommercialFacilityKey | null;
    const qSqft = params.get("sqft");
    const qRestrooms = params.get("restrooms");
    const qFloors = params.get("floors") as FloorMixKey | null;
    const qVisits = params.get("visits");
    const qTime = params.get("time") as TimeOfDayKey | null;

    setInput((prev) => ({
      ...prev,
      zip: qZip || prev.zip,
      facilityType:
        qType && FACILITY_OPTIONS.some((f) => f.key === qType) ? qType : prev.facilityType,
      sqft: qSqft ? Math.min(50000, Math.max(1000, Number(qSqft))) : prev.sqft,
      restrooms: qRestrooms ? Math.min(25, Math.max(1, Number(qRestrooms))) : prev.restrooms,
      floors: qFloors && ["carpet", "mixed", "hard"].includes(qFloors) ? qFloors : prev.floors,
      visitsPerWeek: qVisits ? Number(qVisits) : prev.visitsPerWeek,
      timeOfDay:
        qTime && ["afterHours", "earlyMorning", "businessHours"].includes(qTime)
          ? qTime
          : prev.timeOfDay,
    }));

    trackEvent("calc_start", {
      calculator_type: "commercial",
      facility_type: qType || defaultFacilityType,
    });
  }, [defaultFacilityType]);

  // Persist calculator state to URL query parameters without scrolling
  useEffect(() => {
    if (typeof window === "undefined" || embedded) return;
    const params = new URLSearchParams();
    if (input.zip) params.set("zip", input.zip);
    params.set("type", input.facilityType);
    params.set("sqft", String(input.sqft));
    params.set("restrooms", String(input.restrooms));
    params.set("floors", input.floors);
    params.set("visits", String(input.visitsPerWeek));
    params.set("time", input.timeOfDay);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [input, embedded]);

  const result = calculateCommercialPrice(input);

  const facilityLabel =
    FACILITY_OPTIONS.find((f) => f.key === input.facilityType)?.label || "Facility";

  const receiptLines: ReceiptLineItem[] = [
    {
      label: `Cleanable area (${input.sqft.toLocaleString()} sq ft · ${input.floors})`,
      value: `${result.hoursPerVisit} hrs/visit`,
    },
    {
      label: `Restrooms sanitized (${input.restrooms} fixtures · PT. 08-16)`,
      value: "Included",
    },
    {
      label: `Cadence (${input.visitsPerWeek}x/week · ${
        input.timeOfDay === "afterHours"
          ? "After Hours"
          : input.timeOfDay === "earlyMorning"
          ? "Early Morning"
          : "Business Hours"
      })`,
      value: `$${result.baseMonthly.toLocaleString()}/mo`,
    },
    ...result.addOnLineItems.map((item) => ({
      label: `+ ${item.label}`,
      value: `$${item.amount.toLocaleString()}/mo`,
    })),
    {
      label: "42-Point Tablet Photo Scorecard (PT. 42)",
      value: "Included",
      highlight: true,
    },
    {
      label: "30-Day Walkaway Guarantee (No lock-in)",
      value: "Included",
      highlight: true,
    },
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: leadModalMode === "audit" ? "commercial_audit_lock" : "commercial_quote_email",
          ...leadForm,
          zip: input.zip,
          calculatorInputs: input,
          estimateRange: result.isCustomProgram
            ? "Custom Program (>25k sq ft / >5x wk)"
            : `$${result.lowMonthly.toLocaleString()}–$${result.highMonthly.toLocaleString()}/mo`,
          recommendedTier: result.recommendedTier,
        }),
      });
      const data = await res.json();
      setSubmittedData({
        submissionId: data.submissionId || "DCC-EST-2026",
        leadSmsPreview: data.speedToLead?.leadSmsPreview || "",
      });
      trackEvent("calc_lead_submit", {
        calculator_type: "commercial",
        facility_type: input.facilityType,
        sqft_band: String(input.sqft),
        city: result.cityMatched || input.zip,
        estimate_low: result.lowMonthly,
        estimate_high: result.highMonthly,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Columns: Interactive Inputs */}
      <div className="lg:col-span-7 space-y-6">
        {/* Step 1: ZIP Code Check */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="comm-zip"
              className="font-mono text-xs font-bold uppercase tracking-wider text-brand"
            >
              STEP 01 · FACILITY ZIP CODE (PLACER / SACRAMENTO / YOLO / YUBA)
            </label>
            {result.cityMatched && (
              <span className="font-mono text-xs font-bold text-pass">
                ✓ SERVING {result.cityMatched.toUpperCase()}, CA
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              id="comm-zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={input.zip}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                setInput({ ...input, zip: val });
                trackEvent("calc_step_1", { calculator_type: "commercial", city: val });
              }}
              placeholder="e.g. 95661"
              className="w-36 min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 font-mono text-lg font-bold rounded-[4px]"
            />
            <span className="text-xs text-ink/75">
              Try <button type="button" onClick={() => setInput({ ...input, zip: "95765" })} className="font-mono underline cursor-pointer">95765 (Rocklin)</button>,{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95661" })} className="font-mono underline cursor-pointer">95661 (Roseville)</button>,{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95814" })} className="font-mono underline cursor-pointer">95814 (Sacramento)</button>,{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95630" })} className="font-mono underline cursor-pointer">95630 (Folsom)</button>
            </span>
          </div>

          {!result.zipServed && input.zip.length === 5 && (
            <div className="p-4 border-2 border-flag bg-flag/15 rounded-[4px] space-y-2 mt-2">
              <div className="font-display-wide text-sm text-ink">
                We don&apos;t serve {input.zip} on our standard nightly routes yet—leave your email and we&apos;ll tell you when we do (or if we can accommodate a multi-site contract).
              </div>
              {outOfAreaSaved ? (
                <div className="font-mono text-xs font-bold text-pass">
                  ✓ Logged {outOfAreaEmail} for ZIP {input.zip} expansion alerts.
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={outOfAreaEmail}
                    onChange={(e) => setOutOfAreaEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email for out-of-area notification"
                    className="flex-1 min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (outOfAreaEmail) setOutOfAreaSaved(true);
                    }}
                    className="btn-report btn-ink text-xs py-2"
                  >
                    Notify Me
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Facility Type Icon Grid */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
            STEP 02 · FACILITY TYPE (SETS PRODUCTION RATE & PROTOCOL TIER)
          </div>
          <div
            role="radiogroup"
            aria-label="Facility Type"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          >
            {FACILITY_OPTIONS.map(({ key, label, sub, Icon }) => {
              const selected = input.facilityType === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setInput({ ...input, facilityType: key });
                    trackEvent("calc_step_2", {
                      calculator_type: "commercial",
                      facility_type: key,
                    });
                  }}
                  className={`p-3 min-h-[84px] border-2 rounded-[4px] text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selected
                      ? "border-ink bg-ink text-paper shadow-[3px_3px_0px_#B5175E]"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  <Icon size={22} />
                  <div className="mt-2">
                    <div className="font-display-wide text-sm leading-tight">{label}</div>
                    <div
                      className={`font-mono text-[10px] mt-0.5 ${
                        selected ? "text-paper/75" : "text-ink/65"
                      }`}
                    >
                      {sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Cleanable Square Footage Slider + Typed Input + Helpers */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="comm-sqft-input"
              className="font-mono text-xs font-bold uppercase tracking-wider text-brand"
            >
              STEP 03 · CLEANABLE SQUARE FOOTAGE (1,000 – 50,000 SQ FT)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="comm-sqft-input"
                type="number"
                min={1000}
                max={50000}
                step={250}
                value={input.sqft}
                onChange={(e) =>
                  setInput({
                    ...input,
                    sqft: Math.min(50000, Math.max(1000, Number(e.target.value) || 1000)),
                  })
                }
                className="w-28 min-h-[44px] px-3 border-2 border-ink bg-paper-2 font-mono text-base font-bold text-right rounded-[4px]"
              />
              <span className="font-mono text-xs font-bold">SQ FT</span>
            </div>
          </div>

          <input
            type="range"
            aria-label="Cleanable Square Footage Slider"
            min={1000}
            max={50000}
            step={500}
            value={input.sqft}
            onChange={(e) => {
              const val = Number(e.target.value);
              setInput({ ...input, sqft: val });
              trackEvent("calc_step_3", {
                calculator_type: "commercial",
                sqft_band: String(val),
              });
            }}
            className="w-full h-3 bg-paper-2 border border-ink rounded-[2px] accent-brand cursor-pointer"
          />

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] text-ink/70 uppercase">
              Not sure? Pick a typical facility size:
            </span>
            <div className="flex flex-wrap gap-2">
              {SQFT_HELPERS.map((h) => (
                <button
                  key={h.sqft}
                  type="button"
                  onClick={() => setInput({ ...input, sqft: h.sqft })}
                  className={`px-3 py-1.5 min-h-[40px] border border-ink rounded-[2px] font-mono text-xs cursor-pointer ${
                    input.sqft === h.sqft
                      ? "bg-ink text-paper font-bold"
                      : "bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 & 5: Restroom Stepper + Floor Surface Mix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              STEP 04 · RESTROOMS ({input.restrooms})
            </div>
            <p className="text-xs text-ink/75">
              Each restroom adds 15 mins of dedicated descaling & drain care (PT. 08–16).
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                aria-label="Decrease restrooms"
                onClick={() =>
                  setInput({ ...input, restrooms: Math.max(1, input.restrooms - 1) })
                }
                className="btn-report btn-paper w-12 h-12 font-mono text-xl font-bold"
              >
                −
              </button>
              <span className="font-mono text-2xl font-bold w-12 text-center">
                {input.restrooms}
              </span>
              <button
                type="button"
                aria-label="Increase restrooms"
                onClick={() =>
                  setInput({ ...input, restrooms: Math.min(25, input.restrooms + 1) })
                }
                className="btn-report btn-paper w-12 h-12 font-mono text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              STEP 05 · FLOOR SURFACE MIX
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: "carpet" as FloorMixKey, label: "Mostly Carpet (HEPA Vacuum)" },
                { key: "mixed" as FloorMixKey, label: "Mixed Carpet & Hard Floor" },
                { key: "hard" as FloorMixKey, label: "Mostly Hard Floor (LVT / Tile)" },
              ].map((fl) => (
                <button
                  key={fl.key}
                  type="button"
                  onClick={() => setInput({ ...input, floors: fl.key })}
                  className={`min-h-[48px] px-3 py-2 border-2 rounded-[4px] font-mono text-xs text-left flex items-center justify-between cursor-pointer ${
                    input.floors === fl.key
                      ? "border-ink bg-ink text-paper font-bold"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  <span>{fl.label}</span>
                  {input.floors === fl.key && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 6 & 7: Visits Per Week + Service Window */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              STEP 06 · VISITS PER WEEK
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 5, 7].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setInput({ ...input, visitsPerWeek: v });
                    trackEvent("calc_step_6", {
                      calculator_type: "commercial",
                      visits: String(v),
                    });
                  }}
                  className={`min-h-[48px] border-2 rounded-[4px] font-mono text-sm font-bold cursor-pointer ${
                    input.visitsPerWeek === v
                      ? "border-ink bg-brand text-white shadow-[2px_2px_0px_#17201E]"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  {v}x
                </button>
              ))}
            </div>
            <p className="font-mono text-[11px] text-ink/70">
              {input.visitsPerWeek === 1
                ? "1x/wk (Essential maintenance)"
                : input.visitsPerWeek <= 3
                ? `${input.visitsPerWeek}x/wk (Most popular for offices)`
                : `${input.visitsPerWeek}x/wk (Daily clinical / daycare standard)`}
            </p>
          </div>

          <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              STEP 07 · CLEANING SCHEDULE WINDOW
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: "afterHours" as TimeOfDayKey, label: "After Hours (6pm–2am · Standard 1.0x)" },
                { key: "earlyMorning" as TimeOfDayKey, label: "Early Morning (4am–8am · 1.05x)" },
                { key: "businessHours" as TimeOfDayKey, label: "During Business Hours (1.10x)" },
              ].map((tm) => (
                <button
                  key={tm.key}
                  type="button"
                  onClick={() => setInput({ ...input, timeOfDay: tm.key })}
                  className={`min-h-[48px] px-3 py-2 border-2 rounded-[4px] font-mono text-xs text-left flex items-center justify-between cursor-pointer ${
                    input.timeOfDay === tm.key
                      ? "border-ink bg-ink text-paper font-bold"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  <span>{tm.label}</span>
                  {input.timeOfDay === tm.key && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 8: Commercial Add-ons */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
            STEP 08 · OPTIONAL FACILITY ADD-ONS (TOGGLE TO INCLUDE IN MONTHLY RECEIPT)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                key: "supplies" as const,
                label: "Restroom Supplies Included (paper, soap, liners)",
                price: "+$6/visit",
              },
              {
                key: "floorCare" as const,
                label: "Monthly Hard-Floor Scrub / Wax Maintenance",
                price: "+$250/mo",
              },
              {
                key: "windows" as const,
                label: "Interior & Exterior Windows Quarterly",
                price: "+$90/mo",
              },
              {
                key: "carpet" as const,
                label: "Traffic-Lane Carpet Extraction Quarterly",
                price: "+$120/mo",
              },
              {
                key: "grounds" as const,
                label: "Exterior Entry & Grounds Tidy Patrol",
                price: "+$200/mo",
              },
            ].map((item) => {
              const active = input.addOns[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    setInput({
                      ...input,
                      addOns: { ...input.addOns, [item.key]: !active },
                    })
                  }
                  className={`min-h-[48px] p-3 border-2 rounded-[4px] text-left flex items-center justify-between gap-2 cursor-pointer ${
                    active
                      ? "border-ink bg-pass/15 text-ink font-bold"
                      : "border-ink bg-paper-2 text-ink/85 hover:bg-paper"
                  }`}
                >
                  <span className="text-xs">{item.label}</span>
                  <span className="font-mono text-xs shrink-0 font-bold text-brand">
                    {active ? "✓ ADDED" : item.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Sticky PriceReceipt + Lead Lock Form */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <PriceReceipt
          mode="commercial"
          facilityOrHomeLabel={`${input.sqft.toLocaleString()} sq ft ${facilityLabel}`}
          cityOrZipLabel={
            result.cityMatched ? `${input.zip} · ${result.cityMatched}, CA` : `ZIP ${input.zip}`
          }
          lineItems={receiptLines}
          isCustomProgram={result.isCustomProgram}
          customReason={result.customReason}
          lowPrice={result.lowMonthly}
          highPrice={result.highMonthly}
          cadenceLabel="/ month"
          secondaryRateLabel={`~$${result.perVisitLow}–$${result.perVisitHigh} / visit`}
          recommendedTier={result.recommendedTier}
          footnote="Your estimate is shown upfront—no email required to view it. Final price is set after a 20-minute walkthrough. If we find anything that changes it, you'll see exactly why, in writing."
          primaryCtaLabel="Book a Free Benchmark Audit to Lock This Price"
          onPrimaryCtaClick={() => {
            setLeadModalMode("audit");
            trackEvent("calc_complete", {
              calculator_type: "commercial",
              facility_type: input.facilityType,
              estimate_low: result.lowMonthly,
              estimate_high: result.highMonthly,
            });
          }}
          secondaryCtaLabel="Email Me This Estimate"
          onSecondaryCtaClick={() => {
            setLeadModalMode("email");
            trackEvent("calc_complete", {
              calculator_type: "commercial",
              facility_type: input.facilityType,
            });
          }}
        />

        {/* Inline Lead Lock / Email Form Drawer when clicked */}
        {leadModalMode !== "none" && (
          <div className="border-2 border-ink bg-paper-2 p-5 rounded-[4px] shadow-[4px_4px_0px_#17201E] space-y-4">
            {submittedData ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/debra-founder-portrait.png"
                    alt="Debra — Founder of Debra's Classic Cleaning"
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-ink object-cover h-14 w-14"
                  />
                  <div>
                    <div className="font-mono text-xs font-bold uppercase text-pass">
                      ✓ ESTIMATE #{submittedData.submissionId} LOCKED
                    </div>
                    <h4 className="font-display-wide text-lg text-ink">
                      Got it, {leadForm.name.split(" ")[0] || "friend"}. Debra is on it.
                    </h4>
                  </div>
                </div>

                <div className="p-3.5 border border-ink bg-paper font-mono text-xs space-y-1.5">
                  <div className="text-brand font-bold">
                    SPEED-TO-LEAD AUTO-SMS DISPATCHED (10s):
                  </div>
                  <p className="text-ink/85 italic">&ldquo;{submittedData.leadSmsPreview}&rdquo;</p>
                </div>

                <ul className="text-xs space-y-1.5 text-ink/85 font-mono">
                  <li>01 · HubSpot Deal created in stage &ldquo;Estimate&rdquo; with your {input.sqft.toLocaleString()} sq ft parameters.</li>
                  <li>02 · Branded PDF receipt sent to {leadForm.email}.</li>
                  <li>03 · Debra will call {leadForm.phone} within 5 minutes (Mon–Sat business hours).</li>
                </ul>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-report btn-ink w-full text-xs"
                >
                  Download / Print PDF Quote Now
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs font-bold uppercase text-brand">
                    {leadModalMode === "audit"
                      ? "LOCK PRICE & BOOK 20-MIN BENCHMARK AUDIT"
                      : "EMAIL ITEMIZED PDF ESTIMATE"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLeadModalMode("none")}
                    className="font-mono text-xs text-ink/60 hover:text-ink cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lead-name" className="block font-mono text-[11px] uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Maria Rodriguez"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-company" className="block font-mono text-[11px] uppercase mb-1">
                      Company / Practice *
                    </label>
                    <input
                      id="lead-company"
                      type="text"
                      required
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      placeholder="Sierra Dental Group"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lead-phone" className="block font-mono text-[11px] uppercase mb-1">
                      Mobile Phone (for 10s SMS) *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="916-555-0199"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-email" className="block font-mono text-[11px] uppercase mb-1">
                      Work Email (for PDF Quote) *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="maria@practice.com"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                </div>

                {leadModalMode === "audit" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="lead-role" className="block font-mono text-[11px] uppercase mb-1">
                        Your Role
                      </label>
                      <input
                        id="lead-role"
                        type="text"
                        value={leadForm.role}
                        onChange={(e) => setLeadForm({ ...leadForm, role: e.target.value })}
                        className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-time" className="block font-mono text-[11px] uppercase mb-1">
                        Preferred Walkthrough Window
                      </label>
                      <select
                        id="lead-time"
                        value={leadForm.preferredTime}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, preferredTime: e.target.value })
                        }
                        className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      >
                        <option>Morning (8am – 12pm)</option>
                        <option>Afternoon (12pm – 4pm)</option>
                        <option>Late Afternoon (4pm – 6pm)</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-report btn-brand w-full"
                >
                  {submitting
                    ? "Locking Estimate..."
                    : leadModalMode === "audit"
                    ? "Confirm Audit Request & Send PDF Quote"
                    : "Email My Itemized PDF Quote"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

