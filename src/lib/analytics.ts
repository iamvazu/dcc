"use client";

export type AnalyticsEventName =
  | "calc_start"
  | `calc_step_${number}`
  | "calc_complete"
  | "calc_lead_submit"
  | "audit_booked"
  | "call_click"
  | "sms_click"
  | "quote_pdf_download"
  | "checklist_download"
  | "outbound_gbp_click";

export interface AnalyticsPayload {
  calculator_type?: "commercial" | "residential" | "none";
  facility_type?: string;
  sqft_band?: string;
  city?: string;
  page_type?: string;
  estimate_low?: number;
  estimate_high?: number;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const enrichedPayload = {
    event,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(enrichedPayload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (typeof window.clarity === "function") {
    window.clarity("set", "last_event", event);
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[DCC Analytics] ${event}`, enrichedPayload);
  }
}

