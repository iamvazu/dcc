import React from "react";
import Link from "next/link";

export function ProductCallout({
  title,
  description,
  href,
  cta,
  lane = "commercial",
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  lane?: "commercial" | "residential";
}) {
  const isRes = lane === "residential";
  return (
    <aside
      className={`my-6 rounded-xl border p-5 shadow-2xs ${
        isRes
          ? "border-sky/35 bg-sky/5 text-ink"
          : "border-brand/30 bg-brand/5 text-ink"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-display-wide text-base sm:text-lg text-ink">{title}</p>
          <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">{description}</p>
        </div>
        <Link
          href={href}
          className={`btn-report ${
            isRes ? "btn-sky" : "btn-brand"
          } text-xs shrink-0 whitespace-nowrap`}
        >
          {cta}
        </Link>
      </div>
    </aside>
  );
}
