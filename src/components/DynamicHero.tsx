"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiveScorecard } from "./LiveScorecard";
import { CertStrip } from "./CertStrip";

interface PsychScene {
  id: string;
  tag: string;
  psychTrigger: string;
  headlinePrefix: string;
  headlineHighlight: string;
  gradientClass: string;
  badgeBgClass: string;
  dotColorClass: string;
  borderAccentClass: string;
  glowColor: string;
  subcopy: string;
  metricValue: string;
  metricLabel: string;
  bgImage: string;
}

const PSYCH_SCENES: PsychScene[] = [
  {
    id: "relief",
    tag: "01 · Morning Relief",
    psychTrigger: "Zero 7:45 AM Inspection Anxiety",
    headlinePrefix: "Clean you can inspect.",
    headlineHighlight: "Walk in every morning knowing all 42 points passed.",
    gradientClass: "from-emerald-300 via-teal-200 to-emerald-400",
    badgeBgClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    dotColorClass: "bg-emerald-400",
    borderAccentClass: "border-emerald-400/60",
    glowColor: "rgba(16, 185, 129, 0.22)",
    subcopy:
      "Stop being the unpaid quality-control inspector in your own building. Our supervisor logs timestamped room photos before our crew ever leaves your parking lot.",
    metricValue: "96/100",
    metricLabel: "Avg. Verified Shift Score",
    bgImage: "/images/commercial-clinic-inspection.png",
  },
  {
    id: "reputation",
    tag: "02 · First-Impression Pride",
    psychTrigger: "Protect Patient & Tenant Confidence",
    headlinePrefix: "Spotless where it matters.",
    headlineHighlight: "Restrooms and lobbies that elevate your reputation.",
    gradientClass: "from-amber-200 via-yellow-300 to-amber-400",
    badgeBgClass: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    dotColorClass: "bg-amber-400",
    borderAccentClass: "border-amber-400/60",
    glowColor: "rgba(245, 158, 11, 0.22)",
    subcopy:
      "Patients, clients, and tenants judge your entire organization within 30 seconds by your entry glass and restroom fixtures. We descale porcelain and prime floor drains weekly.",
    metricValue: "100%",
    metricLabel: "Odor-Free Restroom Standard",
    bgImage: "/images/restroom-fixtures-gleaming.png",
  },
  {
    id: "security",
    tag: "03 · Key & Alarm Trust",
    psychTrigger: "No Strangers With Your Building Keys",
    headlinePrefix: "Your keys stay protected.",
    headlineHighlight: "One vetted W-2 Rocklin crew—never subcontracted.",
    gradientClass: "from-rose-300 via-pink-300 to-rose-400",
    badgeBgClass: "bg-rose-500/20 text-rose-200 border-rose-400/40",
    dotColorClass: "bg-rose-400",
    borderAccentClass: "border-rose-400/60",
    glowColor: "rgba(244, 63, 94, 0.24)",
    subcopy:
      "National janitorial brokers sell your contract to rotating sub-crews. We dispatch background-checked W-2 employees from Rocklin and photograph your armed alarm keypad every night.",
    metricValue: "PT. 41",
    metricLabel: "Photo-Verified Door Lockup",
    bgImage: "/images/debras-fleet-cx5-real.jpg",
  },
  {
    id: "sanctuary",
    tag: "04 · Weekend Freedom",
    psychTrigger: "Breathe Easy in a Spotless Home",
    headlinePrefix: "Reclaim your weekend.",
    headlineHighlight: "Hospital-grade hygiene for your Rocklin or Granite Bay home.",
    gradientClass: "from-sky-300 via-cyan-200 to-sky-400",
    badgeBgClass: "bg-sky-500/20 text-sky-200 border-sky-400/40",
    dotColorClass: "bg-sky-400",
    borderAccentClass: "border-sky-400/60",
    glowColor: "rgba(56, 189, 248, 0.22)",
    subcopy:
      "Color-coded microfiber laundered at 160°F so bathroom cloths never touch your kitchen counters, plus stone-safe, pet-friendly products that leave zero harsh chemical fumes.",
    metricValue: "60 Sec",
    metricLabel: "Instant Online Home Pricing",
    bgImage: "/images/residential-granite-bay-home.png",
  },
];

export function DynamicHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PSYCH_SCENES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const current = PSYCH_SCENES[activeIdx];

  return (
    <section
      className="relative overflow-hidden bg-ink text-white py-12 sm:py-16 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 1. Ambient 1080p Background Video Reel + Synchronized Scene Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/commercial-clinic-inspection.png"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        >
          <source src="/videos/hero-facility-reel.mp4" type="video/mp4" />
        </video>

        {/* Subtle synchronized scene crossfade overlay to reinforce active psychological tab */}
        {PSYCH_SCENES.map((scene, i) => (
          <Image
            key={scene.id}
            src={scene.bgImage}
            alt=""
            width={1600}
            height={900}
            priority={i === 0}
            className={`absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay transition-opacity duration-1000 ${
              i === activeIdx ? "opacity-35 scale-105" : "opacity-0 scale-100"
            }`}
          />
        ))}

        {/* Deep Architectural Multi-Stop Gradient Overlays for 100% Text Readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(13, 19, 18, 0.95) 0%, rgba(18, 26, 24, 0.88) 48%, rgba(18, 26, 24, 0.72) 100%)",
          }}
        />

        {/* Dynamic Psychological Color Aura Glow */}
        <div
          className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full blur-3xl transition-all duration-1000 pointer-events-none"
          style={{ background: current.glowColor }}
        />

        {/* Subtle Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* 2. Foreground Hero Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Columns: Psychological Narrative & Multi-Color Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Live Psychological Trigger Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse inline-block" />
                <span className="text-xs font-semibold tracking-wide text-white/95">
                  Commercial &amp; Residential · Placer &amp; Sacramento Counties
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md transition-colors duration-500 ${current.badgeBgClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${current.dotColorClass}`} />
                <span>{current.psychTrigger}</span>
              </span>
            </div>

            {/* Dynamic Multi-Colored Psychological Headline */}
            <div className="space-y-2 min-h-[150px] sm:min-h-[168px] flex flex-col justify-center">
              <h1 className="font-display-expanded text-fluid-h1 tracking-tight leading-[1.04]">
                <span className="block text-white drop-shadow-sm">
                  {current.headlinePrefix}
                </span>
                <span
                  className={`block mt-1.5 bg-gradient-to-r ${current.gradientClass} bg-clip-text text-transparent transition-all duration-700`}
                >
                  {current.headlineHighlight}
                </span>
              </h1>
            </div>

            {/* Dynamic Psychological Subcopy */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed min-h-[56px]">
              {current.subcopy}
            </p>

            {/* Interactive 4-State Psychological Switcher Bar */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1"
              role="tablist"
              aria-label="Inspect cleaning benefits"
            >
              {PSYCH_SCENES.map((scene, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-left p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                      isActive
                        ? `bg-white/15 ${scene.borderAccentClass} shadow-md scale-[1.02]`
                        : "bg-white/5 border-white/10 hover:bg-white/10 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-white truncate">
                        {scene.tag}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isActive ? scene.dotColorClass : "bg-white/30"
                        }`}
                      />
                    </div>
                    <div className="text-[11px] text-white/70 truncate mt-0.5">
                      {scene.metricValue} · {scene.metricLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dual CTA Cluster + Risk-Reversal Psychological Triggers */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/pricing/"
                  className="btn-report btn-brand btn-on-ink text-base px-7 py-4 shadow-lg"
                >
                  Get an instant price →
                </Link>
                <Link
                  href="/benchmark-audit/"
                  className="btn-report text-base px-6 py-4 bg-white/12 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-colors"
                >
                  Book a free facility walkthrough
                </Link>
              </div>

              {/* Psychological Friction Removers */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>60-second online estimate — no email required</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>30-Day Walkaway Guarantee (zero lock-in)</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-sky-300 font-bold">✓</span>
                  <span>24-Hour Free Re-Clean Promise</span>
                </span>
              </div>
            </div>

            {/* Proof Visual Strip: Branded Fleet + Tablet Inspection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-white/15 bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center gap-3.5">
                <Image
                  src="/images/debras-fleet-cx5-real.jpg"
                  alt="Debra's Classic Cleaning branded Mazda CX-5 fleet vehicle in Rocklin, CA"
                  width={160}
                  height={112}
                  className="rounded-lg object-cover object-center w-28 h-20 shrink-0 border border-white/20"
                />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Local Rocklin Fleet
                  </div>
                  <p className="text-white/80 leading-snug">
                    Background-checked W-2 crews &amp; supervisors—never subcontracted.
                  </p>
                </div>
              </div>

              <div className="border border-white/15 bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center gap-3.5">
                <Image
                  src="/images/commercial-clinic-inspection.png"
                  alt="Debra's Classic Cleaning route supervisor inspecting a medical clinic hallway with a digital tablet checklist"
                  width={160}
                  height={112}
                  className="rounded-lg object-cover object-center w-28 h-20 shrink-0 border border-white/20"
                />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
                    Photo-Verified Shifts
                  </div>
                  <p className="text-white/80 leading-snug">
                    Timestamped photo scorecard sent before our team leaves your lot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Live Scorecard Artifact */}
          <div className="lg:col-span-5 text-ink">
            <LiveScorecard />
          </div>
        </div>

        {/* Certification Strip on Dark Cinema Backdrop */}
        <div className="pt-6 border-t border-white/15">
          <CertStrip theme="dark" />
        </div>
      </div>
    </section>
  );
}

