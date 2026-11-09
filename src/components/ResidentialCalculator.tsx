"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  calculateResidentialPrice,
  ConditionKey,
  FrequencyKey,
  pricingConfig,
  ResidentialAddOnKey,
  ResidentialCalcInput,
  ResidentialServiceKey,
  SqftBandKey,
} from "@/lib/data";
import { PriceReceipt, ReceiptLineItem } from "./PriceReceipt";
import { trackEvent } from "@/lib/analytics";

interface ResidentialCalculatorProps {
  defaultServiceType?: ResidentialServiceKey;
  defaultZip?: string;
}

export function ResidentialCalculator({
  defaultServiceType = "standard",
  defaultZip = "95765",
}: ResidentialCalculatorProps) {
  const [input, setInput] = useState<ResidentialCalcInput>({
    zip: defaultZip,
    serviceType: defaultServiceType,
    bedrooms: 3,
    bathrooms: 2,
    halfBaths: 1,
    sqftBand: "1500to2500",
    frequency: "biweekly",
    condition: "average",
    pets: true,
    addOns: [],
  });

  const [leadMode, setLeadMode] = useState<"none" | "book" | "email">("none");
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    preferredDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    submissionId: string;
    leadSmsPreview: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const qZip = params.get("zip");
    const qService = params.get("service") as ResidentialServiceKey | null;
    const qBeds = params.get("beds");
    const qBaths = params.get("baths");
    const qFreq = params.get("freq") as FrequencyKey | null;

    setInput((prev) => ({
      ...prev,
      zip: qZip || prev.zip,
      serviceType:
        qService && ["standard", "deep", "moveInOut", "vacationRental"].includes(qService)
          ? qService
          : prev.serviceType,
      bedrooms: qBeds ? Number(qBeds) : prev.bedrooms,
      bathrooms: qBaths ? Number(qBaths) : prev.bathrooms,
      frequency:
        qFreq && ["weekly", "biweekly", "monthly", "oneTime"].includes(qFreq)
          ? qFreq
          : prev.frequency,
    }));

    trackEvent("calc_start", {
      calculator_type: "residential",
      facility_type: qService || defaultServiceType,
    });
  }, [defaultServiceType]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (input.zip) params.set("zip", input.zip);
    params.set("service", input.serviceType);
    params.set("beds", String(input.bedrooms));
    params.set("baths", String(input.bathrooms));
    params.set("freq", input.frequency);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [input]);

  const result = calculateResidentialPrice(input);

  const toggleAddOn = (key: ResidentialAddOnKey) => {
    setInput((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(key)
        ? prev.addOns.filter((k) => k !== key)
        : [...prev.addOns, key],
    }));
  };

  const serviceLabels: Record<ResidentialServiceKey, string> = {
    standard: "Standard Maintenance Clean",
    deep: "Top-to-Bottom Deep Clean",
    moveInOut: "Empty-Home Move-In / Move-Out",
    vacationRental: "Vacation Rental Turnover",
  };

  const receiptLines: ReceiptLineItem[] = [
    {
      label: `${input.bedrooms} Bed / ${input.bathrooms} Full + ${input.halfBaths} Half Bath`,
      value: `$${result.baseRoomTotal}`,
    },
    {
      label: `Service tier (${serviceLabels[input.serviceType]})`,
      value: `×${result.serviceMultiplier}`,
    },
    {
      label: `Home condition (${input.condition})`,
      value: `×${result.conditionMultiplier}`,
    },
    ...(result.frequencyDiscountPct > 0
      ? [
          {
            label: `Recurring discount (${input.frequency} · -${result.frequencyDiscountPct}%)`,
            value: `-$${result.frequencySavingsAmount}`,
            highlight: true,
          },
        ]
      : []),
    ...(input.pets
      ? [{ label: "Pet-hair HEPA filtration treatment", value: `+$${result.petSurcharge}` }]
      : []),
    ...result.addOnLineItems.map((a) => ({
      label: `+ ${a.label}`,
      value: `+$${a.price}`,
    })),
    {
      label: "24-Hour Re-Clean Guarantee",
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
          leadType: leadMode === "book" ? "residential_booking_request" : "residential_quote_email",
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          company: leadForm.address,
          preferredTime: leadForm.preferredDate,
          zip: input.zip,
          calculatorInputs: input,
          estimateRange: `$${result.lowVisitPrice}–$${result.highVisitPrice}/visit`,
        }),
      });
      const data = await res.json();
      setSubmitted({
        submissionId: data.submissionId || "DCC-HOME-2026",
        leadSmsPreview: data.speedToLead?.leadSmsPreview || "",
      });
      trackEvent("calc_lead_submit", {
        calculator_type: "residential",
        facility_type: input.serviceType,
        city: result.cityMatched || input.zip,
        estimate_low: result.lowVisitPrice,
        estimate_high: result.highVisitPrice,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addOnEntries = Object.entries(pricingConfig.residential.addOns) as [
    ResidentialAddOnKey,
    { label: string; price: number }
  ][];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Columns: Steps 1 - 7 */}
      <div className="lg:col-span-7 space-y-6">
        {/* Step 1: ZIP Code */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="res-zip"
              className="font-mono text-xs font-bold uppercase tracking-wider text-sky"
            >
              STEP 01 · HOME ZIP CODE
            </label>
            {result.cityMatched && (
              <span className="font-mono text-xs font-bold text-pass">
                ✓ SERVING {result.cityMatched.toUpperCase()}, CA
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              id="res-zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={input.zip}
              onChange={(e) =>
                setInput({ ...input, zip: e.target.value.replace(/\D/g, "").slice(0, 5) })
              }
              className="w-36 min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 font-mono text-lg font-bold rounded-[4px]"
            />
            <span className="text-xs text-ink/75">
              Popular:{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95765" })} className="font-mono underline cursor-pointer">95765 (Rocklin)</button>,{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95746" })} className="font-mono underline cursor-pointer">95746 (Granite Bay)</button>,{" "}
              <button type="button" onClick={() => setInput({ ...input, zip: "95661" })} className="font-mono underline cursor-pointer">95661 (Roseville)</button>
            </span>
          </div>
        </div>

        {/* Step 2: Service Type */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
            STEP 02 · CLEANING TYPE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { key: "standard" as ResidentialServiceKey, label: "Standard", sub: "1.0x Base" },
              { key: "deep" as ResidentialServiceKey, label: "Deep Clean", sub: "Hand-wiped detail" },
              { key: "moveInOut" as ResidentialServiceKey, label: "Move-In/Out", sub: "Empty cabinets" },
              { key: "vacationRental" as ResidentialServiceKey, label: "Vacation Rental", sub: "11am–3pm turn" },
            ].map((srv) => (
              <button
                key={srv.key}
                type="button"
                onClick={() => setInput({ ...input, serviceType: srv.key })}
                className={`min-h-[64px] p-3 border-2 rounded-[4px] text-left cursor-pointer ${
                  input.serviceType === srv.key
                    ? "border-ink bg-sky text-white font-bold shadow-[3px_3px_0px_#17201E]"
                    : "border-ink bg-paper-2 text-ink hover:bg-paper"
                }`}
              >
                <div className="font-display-wide text-sm">{srv.label}</div>
                <div
                  className={`font-mono text-[10px] mt-0.5 ${
                    input.serviceType === srv.key ? "text-white/85" : "text-ink/65"
                  }`}
                >
                  {srv.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Home Size (Bedrooms, Bathrooms, Half Baths, Sq Ft Band) */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
            STEP 03 · HOME SIZE & ROOM COUNT
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Bedrooms */}
            <div className="p-3 border border-ink bg-paper-2 rounded-[4px]">
              <div className="font-mono text-xs uppercase text-ink/75">Bedrooms</div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  aria-label="Decrease bedrooms"
                  onClick={() =>
                    setInput({ ...input, bedrooms: Math.max(0, input.bedrooms - 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  −
                </button>
                <span className="font-mono text-xl font-bold">{input.bedrooms}</span>
                <button
                  type="button"
                  aria-label="Increase bedrooms"
                  onClick={() =>
                    setInput({ ...input, bedrooms: Math.min(7, input.bedrooms + 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Full Bathrooms */}
            <div className="p-3 border border-ink bg-paper-2 rounded-[4px]">
              <div className="font-mono text-xs uppercase text-ink/75">Full Bathrooms</div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  aria-label="Decrease full bathrooms"
                  onClick={() =>
                    setInput({ ...input, bathrooms: Math.max(1, input.bathrooms - 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  −
                </button>
                <span className="font-mono text-xl font-bold">{input.bathrooms}</span>
                <button
                  type="button"
                  aria-label="Increase full bathrooms"
                  onClick={() =>
                    setInput({ ...input, bathrooms: Math.min(6, input.bathrooms + 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Half Baths */}
            <div className="p-3 border border-ink bg-paper-2 rounded-[4px]">
              <div className="font-mono text-xs uppercase text-ink/75">Half Baths</div>
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  aria-label="Decrease half bathrooms"
                  onClick={() =>
                    setInput({ ...input, halfBaths: Math.max(0, input.halfBaths - 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  −
                </button>
                <span className="font-mono text-xl font-bold">{input.halfBaths}</span>
                <button
                  type="button"
                  aria-label="Increase half bathrooms"
                  onClick={() =>
                    setInput({ ...input, halfBaths: Math.min(4, input.halfBaths + 1) })
                  }
                  className="btn-report btn-paper w-11 h-11 font-mono text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Square Footage Range Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { key: "under1500" as SqftBandKey, label: "Under 1,500 sq ft" },
              { key: "1500to2500" as SqftBandKey, label: "1,500 – 2,500 sq ft" },
              { key: "2500to3500" as SqftBandKey, label: "2,500 – 3,500 sq ft" },
              { key: "over3500" as SqftBandKey, label: "3,500+ sq ft" },
            ].map((band) => (
              <button
                key={band.key}
                type="button"
                onClick={() => setInput({ ...input, sqftBand: band.key })}
                className={`min-h-[48px] px-3 py-2 border-2 rounded-[4px] font-mono text-xs cursor-pointer ${
                  input.sqftBand === band.key
                    ? "border-ink bg-ink text-paper font-bold"
                    : "border-ink bg-paper-2 text-ink hover:bg-paper"
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Frequency with Savings */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
            STEP 04 · VISIT FREQUENCY (RECURRING DISCOUNTS APPLIED AUTOMATICALLY)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { key: "weekly" as FrequencyKey, label: "Weekly", badge: "SAVE 20%" },
              { key: "biweekly" as FrequencyKey, label: "Every 2 Weeks", badge: "SAVE 15% · POPULAR" },
              { key: "monthly" as FrequencyKey, label: "Monthly", badge: "SAVE 10%" },
              { key: "oneTime" as FrequencyKey, label: "One-Time", badge: "STANDARD RATE" },
            ].map((fr) => (
              <button
                key={fr.key}
                type="button"
                onClick={() => setInput({ ...input, frequency: fr.key })}
                className={`min-h-[68px] p-3 border-2 rounded-[4px] text-left flex flex-col justify-between cursor-pointer ${
                  input.frequency === fr.key
                    ? "border-ink bg-ink text-paper shadow-[3px_3px_0px_#1B8FC4]"
                    : "border-ink bg-paper-2 text-ink hover:bg-paper"
                }`}
              >
                <span className="font-display-wide text-sm">{fr.label}</span>
                <span
                  className={`font-mono text-[10px] font-bold ${
                    input.frequency === fr.key ? "text-flag" : "text-pass"
                  }`}
                >
                  {fr.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5 & 6: Condition + Pets */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
              STEP 05 · CURRENT HOME CONDITION
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  key: "wellKept" as ConditionKey,
                  label: "Well Kept",
                  desc: "Cleaned recently · 1.0x",
                  svg: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true">
                      <path d="M3 11L12 3L21 11V20H3V11Z" />
                      <path d="M8.5 14L11 16.5L16 11.5" />
                    </svg>
                  ),
                },
                {
                  key: "average" as ConditionKey,
                  label: "Average",
                  desc: "Normal family dust · 1.1x",
                  svg: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true">
                      <path d="M3 11L12 3L21 11V20H3V11Z" />
                      <path d="M8 13H16M8 16.5H13" />
                    </svg>
                  ),
                },
                {
                  key: "extraLove" as ConditionKey,
                  label: "Needs Extra Love",
                  desc: "Heavy buildup · 1.3x",
                  svg: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true">
                      <path d="M3 11L12 3L21 11V20H3V11Z" />
                      <path d="M12 9V14M12 17H12.01" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setInput({ ...input, condition: c.key })}
                  className={`min-h-[88px] p-3 border-2 rounded-[4px] text-left flex flex-col justify-between cursor-pointer ${
                    input.condition === c.key
                      ? "border-ink bg-ink text-paper font-bold shadow-[2px_2px_0px_#1B8FC4]"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  <div className={input.condition === c.key ? "text-sky" : "text-ink/80"}>
                    {c.svg}
                  </div>
                  <div className="mt-2">
                    <div className="font-display-wide text-xs sm:text-sm">{c.label}</div>
                    <div
                      className={`font-mono text-[10px] mt-0.5 ${
                        input.condition === c.key ? "text-paper/75" : "text-ink/65"
                      }`}
                    >
                      {c.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-4 p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
              STEP 06 · PETS IN HOME?
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: true, label: "Yes (+$15)" },
                { val: false, label: "No Pets" },
              ].map((p) => (
                <button
                  key={String(p.val)}
                  type="button"
                  onClick={() => setInput({ ...input, pets: p.val })}
                  className={`min-h-[68px] border-2 rounded-[4px] font-mono text-xs font-bold cursor-pointer ${
                    input.pets === p.val
                      ? "border-ink bg-sky text-white"
                      : "border-ink bg-paper-2 text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 7: Detail Add-On Chips */}
        <div className="p-5 border-2 border-ink bg-paper rounded-[4px] space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-sky">
            STEP 07 · A LA CARTE DETAIL ADD-ONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {addOnEntries.map(([key, item]) => {
              const active = input.addOns.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAddOn(key)}
                  className={`min-h-[48px] p-3 border-2 rounded-[4px] text-left flex items-center justify-between gap-2 cursor-pointer ${
                    active
                      ? "border-ink bg-pass/15 text-ink font-bold"
                      : "border-ink bg-paper-2 text-ink hover:bg-paper"
                  }`}
                >
                  <span className="text-xs">{item.label}</span>
                  <span className="font-mono text-xs font-bold text-sky shrink-0">
                    {active ? "✓ ADDED" : `+$${item.price}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Sticky PriceReceipt */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <PriceReceipt
          mode="residential"
          receiptNumber="HOME-2026-19"
          facilityOrHomeLabel={`${input.bedrooms}BD/${input.bathrooms}BA · ${serviceLabels[input.serviceType]}`}
          cityOrZipLabel={
            result.cityMatched ? `${input.zip} · ${result.cityMatched}, CA` : `ZIP ${input.zip}`
          }
          lineItems={receiptLines}
          lowPrice={result.lowVisitPrice}
          highPrice={result.highVisitPrice}
          cadenceLabel="/ visit"
          secondaryRateLabel={
            result.frequencyDiscountPct > 0
              ? `Includes ${result.frequencyDiscountPct}% recurring savings`
              : "One-time visit rate"
          }
          footnote="First-visit note: If your home hasn't been professionally cleaned in 45+ days, we recommend starting with a Deep Clean or adding hand-wiped baseboards so we can bring your home up to our maintenance standard."
          primaryCtaLabel="Request This Date Online"
          onPrimaryCtaClick={() => {
            setLeadMode("book");
            trackEvent("calc_complete", {
              calculator_type: "residential",
              facility_type: input.serviceType,
              estimate_low: result.lowVisitPrice,
              estimate_high: result.highVisitPrice,
            });
          }}
          secondaryCtaLabel="Email Me This Quote"
          onSecondaryCtaClick={() => setLeadMode("email")}
        />

        {leadMode !== "none" && (
          <div className="border-2 border-ink bg-paper-2 p-5 rounded-[4px] shadow-[4px_4px_0px_#17201E] space-y-4">
            {submitted ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/debra-founder-portrait.png"
                    alt="Debra — Founder"
                    width={52}
                    height={52}
                    className="rounded-full border-2 border-ink object-cover h-13 w-13"
                  />
                  <div>
                    <div className="font-mono text-xs font-bold text-pass">
                      ✓ REQUEST #{submitted.submissionId} RECEIVED
                    </div>
                    <h4 className="font-display-wide text-lg text-ink">
                      We&apos;ve texted your phone to confirm your arrival window!
                    </h4>
                  </div>
                </div>
                <p className="font-mono text-xs bg-paper p-3 border border-ink italic">
                  &ldquo;{submitted.leadSmsPreview}&rdquo;
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs font-bold uppercase text-sky">
                    {leadMode === "book" ? "REQUEST CLEANING DATE" : "EMAIL HOME QUOTE"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLeadMode("none")}
                    className="font-mono text-xs text-ink/60 hover:text-ink cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="res-name" className="block font-mono text-[11px] uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Jen Miller"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="block font-mono text-[11px] uppercase mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="916-555-0144"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="res-email" className="block font-mono text-[11px] uppercase mb-1">
                      Email *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="jen@gmail.com"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                  {leadMode === "book" && (
                    <div>
                      <label htmlFor="res-date" className="block font-mono text-[11px] uppercase mb-1">
                        Preferred Date *
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        required
                        value={leadForm.preferredDate}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, preferredDate: e.target.value })
                        }
                        className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                  )}
                </div>

                {leadMode === "book" && (
                  <div>
                    <label htmlFor="res-addr" className="block font-mono text-[11px] uppercase mb-1">
                      Street Address & City
                    </label>
                    <input
                      id="res-addr"
                      type="text"
                      value={leadForm.address}
                      onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                      placeholder="Rocklin / Roseville / Granite Bay street address"
                      className="w-full min-h-[44px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-report btn-sky w-full">
                  {submitting
                    ? "Submitting..."
                    : leadMode === "book"
                    ? "Submit Date Request"
                    : "Email My Quote"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

