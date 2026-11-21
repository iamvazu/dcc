"use client";

import React, { useState } from "react";

export function VerifiedCleanBadge() {
  const [copied, setCopied] = useState(false);

  const embedCode = `<a href="https://debrasclassiccleaning.com/" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid #CFC8BA;border-radius:8px;background:#FFFFFF;color:#17201E;font-family:sans-serif;font-size:12px;font-weight:600;text-decoration:none;">
  <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#2F7D4F;"></span>
  <span>Facility Sanitized by <strong>Debra's Classic Cleaning</strong> (42-Point Verified)</span>
</a>`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="border border-rule bg-white p-6 rounded-xl shadow-2xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-pass">
            Client Trust Badge · For Clinics, Daycares &amp; Offices
          </div>
          <h3 className="font-display-wide text-lg text-ink mt-0.5">
            Embed the &ldquo;42-Point Verified Facility&rdquo; Badge on Your Site
          </h3>
        </div>
        <a
          href="https://debrasclassiccleaning.com/"
          className="inline-flex items-center gap-2 px-3.5 py-2 border border-rule rounded-lg bg-paper text-ink text-xs font-semibold no-underline shadow-2xs"
        >
          <span className="h-2 w-2 rounded-full bg-pass inline-block" />
          <span>
            Facility Sanitized by <strong>Debra&apos;s Classic Cleaning</strong> (42-Point Verified)
          </span>
        </a>
      </div>
      <p className="text-xs text-ink/75 leading-relaxed">
        Show patients, parents, and tenants that your facility is professionally maintained by a certified Rocklin WOSB janitorial team. Copy the HTML snippet below onto your clinic or preschool footer:
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <pre className="flex-1 p-3 bg-paper border border-rule rounded-lg text-[11px] font-mono overflow-x-auto text-ink/80">
          {embedCode}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-report btn-ink text-xs px-4 py-2 shrink-0 cursor-pointer"
        >
          {copied ? "✓ Copied HTML" : "Copy Embed Code"}
        </button>
      </div>
    </div>
  );
}
