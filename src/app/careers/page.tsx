"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/data";

export default function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Rocklin / Roseville",
    shiftPreference: "Evening Commercial Route (after 5:30 PM)",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadType: "career_application",
        name: form.name,
        phone: form.phone,
        company: form.city,
        preferredTime: form.shiftPreference,
        notes: form.experience,
      }),
    });
    setSubmitted(true);
  };

  return (
    <div className="divide-y-2 divide-ink">
      <section className="bg-paper py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers/" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand">
                NOW HIRING · W-2 COMMERCIAL &amp; RESIDENTIAL TECHNICIANS
              </div>
              <h1 className="font-display-expanded text-fluid-h1 text-ink">
                Build a career with a team that takes pride in the checklist.
              </h1>
              <p className="text-lg text-ink/85 leading-relaxed">
                Great commercial cleaning starts with respecting and paying the people who do the work. At Debra&apos;s Classic Cleaning LLC, you are a trained, uniformed W-2 employee—never an underpaid 1099 subcontractor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 border-2 border-ink bg-paper-2 rounded-[4px] space-y-1.5">
                  <div className="font-mono text-xs font-bold uppercase text-pass">
                    PAY RANGE &amp; BONUSES
                  </div>
                  <div className="font-mono text-xl font-bold text-ink">
                    $19.00 – $25.00 / hr [CONFIRM]
                  </div>
                  <p className="text-xs text-ink/80">
                    Plus paid drive time between buildings, mileage reimbursement, and monthly 95+ scorecard quality bonuses.
                  </p>
                </div>

                <div className="p-5 border-2 border-ink bg-paper-2 rounded-[4px] space-y-1.5">
                  <div className="font-mono text-xs font-bold uppercase text-brand">
                    REQUIREMENTS
                  </div>
                  <div className="font-display-wide text-base text-ink">
                    Background Check &amp; Reliable Transport
                  </div>
                  <p className="text-xs text-ink/80">
                    Because we service medical clinics, preschools, and banks, all applicants must pass a criminal background check and hold a valid CA driver&apos;s license.
                  </p>
                </div>
              </div>
            </div>

            {/* 5-Col Short Application Form */}
            <div className="lg:col-span-5 border-2 border-ink bg-paper-2 p-6 rounded-[4px] shadow-[4px_4px_0px_#17201E]">
              {submitted ? (
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold text-pass uppercase">
                    ✓ APPLICATION RECEIVED
                  </div>
                  <h2 className="font-display-wide text-xl text-ink">
                    Thanks, {form.name}. Our hiring supervisor will text or call {form.phone} within 24 hours.
                  </h2>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="font-mono text-xs font-bold uppercase text-brand border-b border-rule pb-2">
                    2-MINUTE EXPRESS APPLICATION
                  </div>

                  <div>
                    <label htmlFor="car-name" className="block font-mono text-xs uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      id="car-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="car-phone" className="block font-mono text-xs uppercase mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        id="car-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="car-city" className="block font-mono text-xs uppercase mb-1">
                        City You Live In *
                      </label>
                      <input
                        id="car-city"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="car-shift" className="block font-mono text-xs uppercase mb-1">
                      Preferred Shift
                    </label>
                    <select
                      id="car-shift"
                      value={form.shiftPreference}
                      onChange={(e) => setForm({ ...form, shiftPreference: e.target.value })}
                      className="w-full min-h-[48px] px-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    >
                      <option>Evening Commercial Route (after 5:30 PM)</option>
                      <option>Daytime Residential Team (8:00 AM – 4:30 PM)</option>
                      <option>Weekend / Post-Construction Crew</option>
                      <option>Route Supervisor / Lead Technician</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="car-exp" className="block font-mono text-xs uppercase mb-1">
                      Brief Cleaning / Work Experience
                    </label>
                    <textarea
                      id="car-exp"
                      rows={3}
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      placeholder="Tell us about any commercial, medical, hotel, or house cleaning experience..."
                      className="w-full p-3 border-2 border-ink bg-paper text-sm rounded-[4px]"
                    />
                  </div>

                  <button type="submit" className="btn-report btn-brand w-full">
                    Submit Application →
                  </button>
                  <p className="font-mono text-[11px] text-ink/70">
                    Equal Opportunity Employer · {site.legalName}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

