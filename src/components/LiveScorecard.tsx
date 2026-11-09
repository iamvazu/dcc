"use client";

import React, { useEffect, useRef, useState } from "react";

interface FixItem {
  point: string;
  zone: string;
  issue: string;
  resolution: string;
  delta: string;
}

const SAMPLE_FIXES: FixItem[] = [
  {
    point: "PT. 08 & 15",
    zone: "ZN-02 RESTROOMS",
    issue: "Urinal base scale & dry P-trap odor",
    resolution: "Descaled porcelain flange + primed floor drain trap",
    delta: "+10 PTS",
  },
  {
    point: "PT. 04 & 24",
    zone: "ZN-04 CLINICAL / WORKSPACES",
    issue: "Skipped dwell time on high-touch surfaces",
    resolution: "EPA List N wet-contact verified + microfiber isolation",
    delta: "+9 PTS",
  },
  {
    point: "PT. 41 & 42",
    zone: "ZN-06 SECURITY CLOSEOUT",
    issue: "Unverified lockup & no visit proof",
    resolution: "Deadbolts pull-tested + 8 timestamped photos logged",
    delta: "+6 PTS",
  },
];

export function LiveScorecard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState<number>(71);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);

  const runSequence = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setScore(96);
      setCheckedCount(3);
      return;
    }

    setScore(71);
    setCheckedCount(0);

    const start = 71;
    const end = 96;
    const duration = 1250;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(start + (end - start) * eased);
      setScore(currentScore);

      if (progress >= 0.25 && progress < 0.58) {
        setCheckedCount(1);
      } else if (progress >= 0.58 && progress < 0.88) {
        setCheckedCount(2);
      } else if (progress >= 0.88) {
        setCheckedCount(3);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasRun) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setScore(96);
      setCheckedCount(3);
      setHasRun(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun) {
          setHasRun(true);
          runSequence();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasRun]);

  const isPassed = score >= 90;

  return (
    <div
      ref={containerRef}
      className="border border-rule bg-white rounded-xl shadow-[0_12px_36px_-8px_rgba(20,28,26,0.10)] overflow-hidden"
      aria-label="Sample Facility Inspection Scorecard"
    >
      {/* Top Clipboard Header Bar */}
      <div className="bg-ink text-paper px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 bg-emerald-400 rounded-full" />
          <span className="text-xs font-semibold tracking-wide">
            Post-Visit Quality Scorecard
          </span>
        </div>
        <span className="text-xs text-paper/75">
          Roseville Medical Suite · 6,200 sq ft
        </span>
      </div>

      {/* Score Readout Band */}
      <div className="p-5 bg-paper border-b border-rule/80 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Facility Audit Score
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span
              className="font-display-expanded text-4xl sm:text-5xl text-ink tabular-nums"
              aria-live="polite"
            >
              {score}
            </span>
            <span className="text-lg font-medium text-ink/50">/ 100</span>
          </div>
          <div className="text-xs mt-1 text-ink/70">
            Prior vendor baseline: <span className="line-through text-ink/50">71/100</span>{" "}
            <span className="font-semibold text-pass ml-1">+25 pt improvement</span>
          </div>
        </div>

        {/* Dynamic Status Stamp */}
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 ${
              isPassed
                ? "bg-pass/10 text-pass border border-pass/25"
                : "bg-flag/15 text-ink border border-flag/30"
            }`}
          >
            {isPassed ? "Inspection Passed" : "3 Items Flagged"}
          </div>
          <button
            type="button"
            onClick={runSequence}
            className="text-xs text-ink/60 hover:text-brand underline cursor-pointer"
          >
            Replay inspection check
          </button>
        </div>
      </div>

      {/* 3 Fixes Checklist */}
      <div className="divide-y divide-rule/70 bg-white">
        {SAMPLE_FIXES.map((fix, idx) => {
          const isChecked = idx < checkedCount;
          return (
            <div key={fix.point} className="p-4 sm:px-5 flex items-start gap-3.5">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
                  isChecked
                    ? "border-pass bg-pass text-white"
                    : "border-rule bg-paper text-transparent"
                }`}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5L9.5 17L19 7.5" className="animate-check-draw" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-brand">
                    {fix.point} · {fix.zone}
                  </span>
                  <span className="text-xs font-semibold text-pass tabular-nums">
                    {isChecked ? fix.delta : "Checking..."}
                  </span>
                </div>
                <p className="text-xs text-ink/65 mt-0.5">
                  <span className="font-medium text-ink/80">Prior issue: </span>
                  {fix.issue}
                </p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {fix.resolution}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Verification Footer */}
      <div className="px-5 py-3 bg-paper border-t border-rule/80 flex items-center justify-between text-xs text-ink/70">
        <span>Supervisor Tablet Sign-Off</span>
        <span className="text-pass font-semibold">8 Verification Photos Attached</span>
      </div>
    </div>
  );
}

