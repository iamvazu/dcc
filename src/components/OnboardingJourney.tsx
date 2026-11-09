"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface OnboardingStep {
  id: number;
  stepLabel: string;
  timeStamp: string;
  hourMarker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  deliverableLabel: string;
  metrics: string[];
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 0,
    stepLabel: "Step 1",
    timeStamp: "20 Minutes",
    hourMarker: "DAY 1 · WALKTHROUGH",
    title: "Free Facility Walkthrough",
    body: "We walk your space, evaluate all 6 zones against our 42-point checklist, and share a written assessment—yours to keep whether you hire us or not.",
    image: "/images/industry-office-property.png",
    imageAlt: "Modern commercial office and conference room in Rocklin evaluated during 20-minute walkthrough",
    deliverableLabel: "6-Zone Baseline Assessment",
    metrics: ["ZN-01 Entry & Glass", "ZN-02 Restroom Fixtures", "ZN-04 Workspaces & Clinics"],
  },
  {
    id: 1,
    stepLabel: "Step 2",
    timeStamp: "Within 48 Hours",
    hourMarker: "DAY 2 · PROPOSAL",
    title: "Clear, Itemized Proposal",
    body: "You receive a straightforward proposal showing Essential, Classic Standard, and Inspection-Ready options with exact visit frequencies and zero hidden fees.",
    image: "/images/benchmark-audit-sample.png",
    imageAlt: "Written benchmark audit and itemized three-tier commercial cleaning proposal on desk",
    deliverableLabel: "3-Tier Written Options",
    metrics: ["Essential Tier", "Classic Standard ★", "Inspection-Ready"],
  },
  {
    id: 2,
    stepLabel: "Step 3",
    timeStamp: "48-Hour Launch",
    hourMarker: "DAY 3 · ONBOARDING",
    title: "COI, Keys & Team Assignment",
    body: "We furnish your Certificate of Insurance, tag keys with blind security codes, map alarm zones, and introduce your dedicated W-2 team lead.",
    image: "/images/industry-bank-credit-union.png",
    imageAlt: "Secured commercial branch interior with mapped alarm zones and blind key security protocol",
    deliverableLabel: "COI + Blind Key Tag #042",
    metrics: ["Same-Day COI Issued", "Blind Key Tag #042", "Alarm Zones Mapped"],
  },
  {
    id: 3,
    stepLabel: "Step 4",
    timeStamp: "Every Visit",
    hourMarker: "DAY 4 · FIRST CLEAN",
    title: "Photo Scorecard After Every Shift",
    body: "Receive timestamped completion photos after every visit plus monthly supervisor walkthroughs so quality never slips in month three.",
    image: "/images/industry-medical-dental.png",
    imageAlt: "Gleaming dental and medical operatory suite after photo-verified night shift",
    deliverableLabel: "Live Tablet Photo Report",
    metrics: ["96/100 Audit Score", "8 Timestamped Photos", "Door Lockup Verified"],
  },
];

const SCAN_ZONES = [
  "Scanning ZN-01: Entry Glass & Mats...",
  "Scanning ZN-02: Restroom Fixtures & Drains...",
  "Scanning ZN-03: Breakroom & Appliances...",
  "Scanning ZN-04: Exam & Desk Surfaces...",
  "Scanning ZN-05: HEPA Vacuum & Hard Floors...",
  "Scanning ZN-06: Alarm & Door Lockup...",
];

export function OnboardingJourney() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);

  // Auto-advance every 4.4s unless paused or reduced-motion is enabled
  useEffect(() => {
    if (isPaused) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTick((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % ONBOARDING_STEPS.length);
          return 0;
        }
        return prev + 2.5;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    setTick(0);
  };

  const overallProgress =
    ((activeStep + tick / 100) / ONBOARDING_STEPS.length) * 100;

  const activeScanZoneIndex = Math.min(
    SCAN_ZONES.length - 1,
    Math.floor((tick / 100) * SCAN_ZONES.length)
  );

  return (
    <div
      className="space-y-7"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Interactive 4-Day Launch Conduit Bar */}
      <div className="bg-white border border-rule rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              Live 4-Day Launch Simulation ·{" "}
              <span className="text-brand">
                {ONBOARDING_STEPS[activeStep].stepLabel}: {ONBOARDING_STEPS[activeStep].title}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-ink/55 hidden sm:inline">
              Click any step card to inspect · Hover to pause
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="text-xs font-semibold px-3 py-1 rounded-full border border-rule bg-paper hover:bg-paper-2 text-ink transition-colors cursor-pointer"
              aria-label={isPaused ? "Resume timeline animation" : "Pause timeline animation"}
            >
              {isPaused ? "▶ Play Animation" : "❚❚ Pause"}
            </button>
          </div>
        </div>

        {/* Animated Progress Conduit with 4 Milestone Nodes */}
        <div className="relative pt-1">
          <div className="h-2.5 w-full bg-paper-2 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand via-sky to-pass transition-all duration-150 ease-linear rounded-full relative overflow-hidden"
              style={{ width: `${Math.min(100, Math.max(5, overallProgress))}%` }}
            >
              <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-flow-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3.5">
            {ONBOARDING_STEPS.map((s, idx) => {
              const isCurrent = idx === activeStep;
              const isCompleted = idx < activeStep;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className={`text-left p-2 rounded-lg transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-brand/6 border border-brand/25"
                      : "hover:bg-paper border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-5 w-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                        isCurrent
                          ? "bg-brand text-white ring-4 ring-brand/20 scale-110"
                          : isCompleted
                          ? "bg-pass text-white"
                          : "bg-paper-2 text-ink/70"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink/70 tabular-nums">
                      {s.hourMarker}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold mt-1 truncate ${
                      isCurrent ? "text-brand" : "text-ink/85"
                    }`}
                  >
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Animated Step Cards with Photography + Bespoke Animated HUD Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {ONBOARDING_STEPS.map((s, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <div
              key={s.id}
              onClick={() => handleSelectStep(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectStep(idx);
                }
              }}
              className={`group relative rounded-2xl bg-white border transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer ${
                isActive
                  ? "border-brand shadow-[0_22px_48px_-12px_rgba(181,23,94,0.24)] -translate-y-2 ring-2 ring-brand/75"
                  : "border-rule/90 shadow-xs hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Top Visual Photography Stage (210px) */}
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-ink">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={420}
                    height={260}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                    }`}
                  />
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101715]/95 via-[#141C1A]/40 to-[#141C1A]/25" />

                  {/* Step 1 Laser Scan Line Effect when Active */}
                  {idx === 0 && isActive && (
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scan-line pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  {/* Top Step & Time Pills over Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-md transition-colors ${
                        isActive
                          ? "bg-brand text-white shadow-sm"
                          : isCompleted
                          ? "bg-pass text-white"
                          : "bg-ink/80 text-white"
                      }`}
                    >
                      {s.stepLabel}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/95 text-ink backdrop-blur-md shadow-2xs">
                      {s.timeStamp}
                    </span>
                  </div>

                  {/* Unique Animated Micro-HUD Overlay at Bottom of Each Card's Image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    {idx === 0 && (
                      <div className="bg-ink/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-white">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
                          <span className="truncate">
                            {isActive ? SCAN_ZONES[activeScanZoneIndex] : "6-Zone Checklist Audit"}
                          </span>
                          <span className="tabular-nums shrink-0 ml-1">42 Pts</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-200"
                            style={{ width: isActive ? `${Math.max(18, tick)}%` : "100%" }}
                          />
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="bg-ink/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-white">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                          <span>3-Tier Rate Comparison</span>
                          <span>$0 Hidden Fees</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 mt-1.5 text-[10px] text-center">
                          <span
                            className={`rounded py-0.5 transition-colors ${
                              isActive && tick < 33
                                ? "bg-sky text-white font-bold"
                                : "bg-white/10 text-white/80"
                            }`}
                          >
                            Essential
                          </span>
                          <span
                            className={`rounded py-0.5 font-bold transition-colors ${
                              !isActive || (tick >= 33 && tick < 75)
                                ? "bg-brand text-white"
                                : "bg-white/15 text-white"
                            }`}
                          >
                            Classic ★
                          </span>
                          <span
                            className={`rounded py-0.5 transition-colors ${
                              isActive && tick >= 75
                                ? "bg-pass text-white font-bold"
                                : "bg-white/10 text-white/80"
                            }`}
                          >
                            Clinical
                          </span>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      <div className="bg-ink/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-white flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                            Blind Key Protocol
                          </div>
                          <div className="text-xs font-bold mt-0.5">
                            TAG #042 · COI VERIFIED
                          </div>
                        </div>
                        <span
                          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                            isActive
                              ? "bg-pass text-white scale-110 ring-4 ring-pass/30"
                              : "bg-white/15 text-white"
                          }`}
                        >
                          ✓
                        </span>
                      </div>
                    )}

                    {idx === 3 && (
                      <div className="bg-ink/85 backdrop-blur-md border border-white/15 rounded-xl p-2.5 text-white flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
                            Post-Shift Photo Report
                          </div>
                          <div className="text-xs font-bold mt-0.5">
                            8 Photos · Alarm Armed
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-pass text-white text-xs font-bold tabular-nums shadow-xs">
                          {isActive ? `${Math.min(96, 75 + Math.round(tick * 0.25))}/100` : "96/100"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Copy Body */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand">
                    {s.deliverableLabel}
                  </div>
                  <h3 className="font-display-wide text-lg sm:text-xl text-ink leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{s.body}</p>
                </div>
              </div>

              {/* Card Footer Checklist Pills + Live Progress Indicator */}
              <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3">
                <div className="pt-3 border-t border-rule/70 space-y-1.5">
                  {s.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center gap-2 text-xs font-medium text-ink/80"
                    >
                      <span
                        className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                          isActive
                            ? "bg-brand text-white"
                            : "bg-pass/15 text-pass"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                {/* Active Step Bottom Timer Bar */}
                <div className="h-1.5 w-full bg-paper-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 rounded-full ${
                      isActive ? "bg-brand" : isCompleted ? "bg-pass w-full" : "w-0"
                    }`}
                    style={isActive ? { width: `${tick}%` } : undefined}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
