"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CertStrip } from "@/components/CertStrip";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { protocol, site } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export default function BenchmarkAuditLandingPage() {
  const [form, setForm] = useState({
    name: "",
    companyAndCity: "",
    phone: "",
    preferredWindow: "Tomorrow Morning (9:00 AM – 11:30 AM)",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "benchmark_audit_booking",
          name: form.name,
          company: form.companyAndCity,
          phone: form.phone,
          preferredTime: form.preferredWindow,
        }),
      });
      const data = await res.json();
      setBookedId(data.submissionId || "AUD-2026-42");
      trackEvent("audit_booked", {
        calculator_type: "commercial",
        city: form.companyAndCity,
        page_type: "benchmark_audit_landing",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="divide-y-2 divide-ink">
      {/* Above the fold: Headline + Sample Audit Report + 4-Field Inline Booking */}
      <section className="bg-paper report-grid-bg py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Pitch + Sample Audit Report Photo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-white px-3.5 py-1.5 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-brand inline-block" />
                <span className="text-xs font-semibold tracking-wide text-ink/85">
                  Free 20-Minute Facility Walkthrough · Placer &amp; Sacramento Counties
                </span>
              </div>

              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Find out what your facility actually scores.
              </h1>

              <p className="text-lg text-ink/80 leading-relaxed max-w-2xl">
                Before you switch janitorial vendors—or renew with your current one—let our supervisor walk your building for 20 minutes. We evaluate all 6 zones against our 42-point checklist and hand you the written scorecard.{" "}
                <strong>It&apos;s yours to keep either way.</strong>
              </p>

              {/* 3 Bullet Promises */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    code: "20 Minutes",
                    title: "Fast & Non-Disruptive",
                    desc: "We check entry glass, restrooms, breakrooms, floors, and janitor closet organization.",
                  },
                  {
                    code: "42 Checkpoints",
                    title: "Objective 0–100 Score",
                    desc: "Spots restroom buildup, dry floor drains, missed high-dusting, and sanitization gaps.",
                  },
                  {
                    code: "Yours to Keep",
                    title: "Written Report Included",
                    desc: "Share it with your current cleaner or let us provide an itemized proposal within 48 hours.",
                  },
                ].map((b) => (
                  <div
                    key={b.code}
                    className="p-4 border border-rule bg-white rounded-xl shadow-2xs space-y-1"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-brand">{b.code}</div>
                    <div className="font-display-wide text-base text-ink">{b.title}</div>
                    <p className="text-xs text-ink/75 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

              {/* Sample Audit Report Photo */}
              <div className="border border-rule bg-white p-3 rounded-xl shadow-xs">
                <div className="relative">
                  <Image
                    src="/images/benchmark-audit-sample.png"
                    alt="Sample Facility Benchmark Audit 42-Point Scorecard clipboard report"
                    width={720}
                    height={440}
                    className="w-full h-64 sm:h-72 object-cover rounded-lg"
                  />
                </div>
                <div className="pt-2.5 px-1 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/75">
                  <span className="font-medium">Sample 42-Point Facility Assessment</span>
                  <span className="text-pass font-semibold">Includes 48-Hour Written Proposal</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Inline 4-Field Max Booking Card (PRD 4.6) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 border-2 border-ink bg-paper rounded-[4px] shadow-[5px_5px_0px_#17201E] overflow-hidden">
              <div className="bg-ink text-paper px-5 py-4 border-b-2 border-ink">
                <div className="font-mono text-xs uppercase text-flag font-bold">
                  BOOK YOUR FREE BENCHMARK AUDIT
                </div>
                <div className="font-display-wide text-xl text-paper mt-0.5">
                  Reserve a 20-Minute Walkthrough Window
                </div>
              </div>

              <div className="p-6">
                {bookedId ? (
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-pass bg-pass/10 font-mono text-xs text-pass font-bold">
                      ✓ AUDIT #{bookedId} CONFIRMED
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/debra-founder-portrait.png"
                        alt="Debra"
                        width={56}
                        height={56}
                        className="rounded-full border-2 border-ink object-cover h-14 w-14"
                      />
                      <div>
                        <h3 className="font-display-wide text-lg text-ink">
                          Debra has your audit request for {form.companyAndCity}.
                        </h3>
                        <p className="text-xs text-ink/75">
                          We just sent an SMS confirmation to {form.phone} and will call within 5 minutes during business hours to confirm your exact address.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/pricing/commercial-cleaning-calculator/"
                      className="btn-report btn-paper w-full text-xs"
                    >
                      Want to see a ballpark price right now? Open Calculator →
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Field 1 */}
                    <div>
                      <label
                        htmlFor="audit-name"
                        className="block font-mono text-xs font-bold uppercase text-ink mb-1"
                      >
                        01 · Your Name &amp; Role *
                      </label>
                      <input
                        id="audit-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Greg Evans, Property Manager"
                        className="w-full min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 text-sm rounded-[4px]"
                      />
                    </div>

                    {/* Field 2 */}
                    <div>
                      <label
                        htmlFor="audit-company"
                        className="block font-mono text-xs font-bold uppercase text-ink mb-1"
                      >
                        02 · Company / Facility Name &amp; City *
                      </label>
                      <input
                        id="audit-company"
                        type="text"
                        required
                        value={form.companyAndCity}
                        onChange={(e) => setForm({ ...form, companyAndCity: e.target.value })}
                        placeholder="e.g. Lonetree Dental · Rocklin, CA"
                        className="w-full min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 text-sm rounded-[4px]"
                      />
                    </div>

                    {/* Field 3 */}
                    <div>
                      <label
                        htmlFor="audit-phone"
                        className="block font-mono text-xs font-bold uppercase text-ink mb-1"
                      >
                        03 · Direct Mobile or Office Phone *
                      </label>
                      <input
                        id="audit-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="916-555-0188"
                        className="w-full min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 text-sm rounded-[4px]"
                      />
                    </div>

                    {/* Field 4 */}
                    <div>
                      <label
                        htmlFor="audit-window"
                        className="block font-mono text-xs font-bold uppercase text-ink mb-1"
                      >
                        04 · Preferred 20-Minute Walkthrough Window *
                      </label>
                      <select
                        id="audit-window"
                        value={form.preferredWindow}
                        onChange={(e) => setForm({ ...form, preferredWindow: e.target.value })}
                        className="w-full min-h-[48px] px-3.5 border-2 border-ink bg-paper-2 text-sm rounded-[4px]"
                      >
                        <option>Tomorrow Morning (9:00 AM – 11:30 AM)</option>
                        <option>Tomorrow Afternoon (1:30 PM – 4:30 PM)</option>
                        <option>This Week — Morning Window</option>
                        <option>This Week — Afternoon Window</option>
                        <option>After Hours Walkthrough (5:00 PM – 7:00 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-report btn-brand w-full text-base py-3.5"
                    >
                      {submitting
                        ? "Booking Walkthrough..."
                        : "Book My Free 20-Minute Audit →"}
                    </button>

                    <div className="pt-2 border-t border-rule text-center font-mono text-xs text-ink/70">
                      Zero obligation. Or see a ballpark range first in our{" "}
                      <Link
                        href="/pricing/commercial-cleaning-calculator/"
                        className="text-brand font-bold underline"
                      >
                        60-Second Price Calculator
                      </Link>
                      .
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* What We Check in 20 Minutes */}
          <div className="border-t-2 border-ink pt-10 space-y-6">
            <div className="font-mono text-xs font-bold uppercase text-brand">
              WHAT WE INSPECT DURING YOUR 20-MINUTE WALKTHROUGH
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {protocol.zones.map((z) => (
                <div
                  key={z.id}
                  className="p-4 border-2 border-ink bg-paper rounded-[4px] space-y-1.5"
                >
                  <div className="font-mono text-xs font-bold text-brand">
                    {z.code} · {z.pointRange}
                  </div>
                  <div className="font-display-wide text-base text-ink">{z.label}</div>
                  <p className="text-xs text-ink/75">{z.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <CertStrip />
          </div>

          <div className="p-6 border-2 border-ink bg-paper-2 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <GuaranteeSeal size="md" />
              <div>
                <h2 className="font-display-wide text-xl text-ink">
                  Backed by our 30-Day Walkaway &amp; 24-Hour Re-Clean Guarantee
                </h2>
                <p className="text-xs text-ink/80 mt-1">
                  Questions before booking? Call Debra directly at{" "}
                  <a href={`tel:${site.phoneRaw}`} className="font-mono font-bold underline">
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
            <Link href="/" className="font-mono text-xs underline text-ink/75">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

