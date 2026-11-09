import React from "react";
import Image from "next/image";
import { site } from "@/lib/data";

interface CertStripProps {
  theme?: "light" | "dark";
}

export function CertStrip({ theme = "light" }: CertStripProps) {
  const isDark = theme === "dark";

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      aria-label="Official Federal, State, and Insurance Certifications"
    >
      {site.certifications.map((cert) => {
        const badgeImage =
          "badgeImage" in cert ? (cert as { badgeImage?: string }).badgeImage : undefined;

        return (
          <div
            key={cert.code}
            className={`p-3.5 rounded-lg border flex items-center gap-3 transition-shadow ${
              isDark
                ? "border-white/15 bg-white/5 text-paper"
                : "border-rule bg-white text-ink shadow-xs"
            }`}
          >
            {badgeImage && (
              <div className="shrink-0 bg-white rounded-md p-1 flex items-center justify-center">
                <Image
                  src={badgeImage}
                  alt={cert.label}
                  width={52}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                <span
                  className={`text-[11px] font-bold tracking-wide uppercase ${
                    isDark ? "text-flag" : "text-brand"
                  }`}
                >
                  {cert.code}
                </span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    isDark
                      ? "bg-pass/25 text-emerald-300"
                      : "bg-pass/10 text-pass"
                  }`}
                >
                  Verified
                </span>
              </div>
              <div className="text-xs font-semibold leading-snug line-clamp-2">
                {cert.label}
              </div>
              <div
                className={`text-[11px] mt-1 truncate ${
                  isDark ? "text-paper/65" : "text-ink/60"
                }`}
              >
                {cert.idNumber}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



