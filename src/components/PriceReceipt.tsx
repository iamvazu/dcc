"use client";

import React from "react";
import { IconDownloadPdf } from "./Icons";
import { trackEvent } from "@/lib/analytics";

export interface ReceiptLineItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface PriceReceiptProps {
  mode: "commercial" | "residential";
  receiptNumber?: string;
  facilityOrHomeLabel: string;
  cityOrZipLabel: string;
  lineItems: ReceiptLineItem[];
  isCustomProgram?: boolean;
  customReason?: string;
  lowPrice: number;
  highPrice: number;
  cadenceLabel: string;
  secondaryRateLabel?: string;
  recommendedTier?: "Essential" | "Classic Standard" | "Inspection-Ready";
  footnote: string;
  primaryCtaLabel: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
  showPrintButton?: boolean;
}

export function PriceReceipt({
  mode,
  receiptNumber = "EST-2026-42",
  facilityOrHomeLabel,
  cityOrZipLabel,
  lineItems,
  isCustomProgram = false,
  customReason,
  lowPrice,
  highPrice,
  cadenceLabel,
  secondaryRateLabel,
  recommendedTier,
  footnote,
  primaryCtaLabel,
  onPrimaryCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
  showPrintButton = true,
}: PriceReceiptProps) {
  const accentColor = mode === "residential" ? "btn-sky" : "btn-brand";

  const handlePrint = () => {
    trackEvent("quote_pdf_download", {
      calculator_type: mode,
      facility_type: facilityOrHomeLabel,
      estimate_low: lowPrice,
      estimate_high: highPrice,
    });
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className="border border-rule bg-white rounded-xl shadow-[0_12px_36px_-8px_rgba(20,28,26,0.10)] overflow-hidden"
      aria-label="Itemized Price Estimate Receipt"
    >
      {/* Top Receipt Header */}
      <div className="bg-ink text-paper px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium text-paper/70">
            Debra&apos;s Classic Cleaning LLC
          </div>
          <div className="font-display-wide text-base text-paper">
            Itemized Price Estimate
          </div>
        </div>
        <span className="text-xs bg-white/10 text-paper/85 px-2.5 py-0.5 rounded-full tabular-nums">
          #{receiptNumber}
        </span>
      </div>

      {/* Meta Strip */}
      <div className="px-5 py-2.5 bg-paper border-b border-rule/80 flex items-center justify-between text-xs text-ink/75 font-medium">
        <span>{facilityOrHomeLabel}</span>
        <span>{cityOrZipLabel}</span>
      </div>

      {/* Itemized Receipt Lines with Dotted Leaders */}
      <div className="p-5 space-y-2.5 text-xs sm:text-sm bg-white tabular-nums">
        {lineItems.map((item, idx) => (
          <div key={idx} className="receipt-row">
            <span className={item.highlight ? "font-semibold text-pass" : "text-ink/80"}>
              {item.label}
            </span>
            <span className="receipt-leader" aria-hidden="true" />
            <span className={`shrink-0 font-semibold ${item.highlight ? "text-pass" : "text-ink"}`}>
              {item.value}
            </span>
          </div>
        ))}

        {recommendedTier && !isCustomProgram && (
          <div className="pt-2.5 mt-2 border-t border-dashed border-rule flex items-center justify-between">
            <span className="text-xs text-ink/65">Recommended Service Tier</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand/10 text-brand">
              {recommendedTier}
            </span>
          </div>
        )}
      </div>

      {/* Live Price Range Box */}
      <div
        className="px-5 py-4 bg-paper border-t border-b border-rule/80"
        aria-live="polite"
        aria-atomic="true"
      >
        {isCustomProgram ? (
          <div>
            <div className="text-xs uppercase tracking-wider text-brand font-bold">
              Custom Facility Program
            </div>
            <div className="font-display-wide text-xl text-ink mt-1">
              We&apos;ll price this in person within 48 hours.
            </div>
            {customReason && (
              <p className="text-xs text-ink/75 mt-1">{customReason}</p>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-semibold text-ink/65">
                Estimated Range ({cadenceLabel})
              </span>
              {secondaryRateLabel && (
                <span className="text-xs text-ink/75 tabular-nums font-medium">
                  {secondaryRateLabel}
                </span>
              )}
            </div>
            <div className="font-display-expanded text-3xl sm:text-4xl text-ink mt-1 tabular-nums">
              ${lowPrice.toLocaleString()}–${highPrice.toLocaleString()}
              <span className="text-base font-normal text-ink/60 ml-1.5">
                {cadenceLabel}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footnote & Actions */}
      <div className="p-5 bg-white space-y-3">
        <p className="text-xs text-ink/75 leading-relaxed">{footnote}</p>

        <div className="flex flex-col gap-2.5 pt-1 no-print">
          {onPrimaryCtaClick && (
            <button
              type="button"
              onClick={onPrimaryCtaClick}
              className={`btn-report ${accentColor} w-full`}
            >
              {primaryCtaLabel}
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {secondaryCtaLabel && onSecondaryCtaClick && (
              <button
                type="button"
                onClick={onSecondaryCtaClick}
                className="btn-report btn-paper w-full text-xs"
              >
                {secondaryCtaLabel}
              </button>
            )}
            {showPrintButton && (
              <button
                type="button"
                onClick={handlePrint}
                className="btn-report btn-paper w-full text-xs"
              >
                <IconDownloadPdf size={16} />
                Print / Save PDF Estimate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

