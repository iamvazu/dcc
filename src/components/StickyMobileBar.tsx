"use client";

import React from "react";
import Link from "next/link";
import { site } from "@/lib/data";
import { IconPhone, IconSms, IconCalculator } from "./Icons";
import { trackEvent } from "@/lib/analytics";

interface StickyMobileBarProps {
  calculatorHref?: string;
}

export function StickyMobileBar({
  calculatorHref = "/pricing/commercial-cleaning-calculator/",
}: StickyMobileBarProps) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-ink text-paper border-t-2 border-ink shadow-[0_-2px_10px_rgba(23,32,30,0.2)] no-print"
      role="region"
      aria-label="Quick Contact and Instant Price Actions"
    >
      <div className="grid grid-cols-3 divide-x divide-paper/20">
        <a
          href={`tel:${site.phoneRaw}`}
          onClick={() => trackEvent("call_click", { page_type: "mobile_sticky_bar" })}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:bg-paper/10 no-underline"
        >
          <IconPhone size={16} />
          <span>Call</span>
        </a>

        <a
          href={`sms:${site.smsRaw}?body=Hi%20Debra%2C%20I%27d%20like%20a%20cleaning%20estimate.`}
          onClick={() => trackEvent("sms_click", { page_type: "mobile_sticky_bar" })}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:bg-paper/10 no-underline"
        >
          <IconSms size={16} />
          <span>Text</span>
        </a>

        <Link
          href={calculatorHref}
          onClick={() => trackEvent("calc_start", { page_type: "mobile_sticky_bar" })}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 font-mono text-xs font-bold uppercase tracking-wider bg-brand text-white hover:bg-brand/90 no-underline"
        >
          <IconCalculator size={16} />
          <span>Instant Price</span>
        </Link>
      </div>
    </div>
  );
}

