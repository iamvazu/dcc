import React from "react";
import Link from "next/link";
import { site } from "@/lib/data";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
}

export function Breadcrumbs({ items, theme = "light" }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${site.website}${item.href}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-mono text-xs py-2.5 border-b ${
        theme === "dark"
          ? "border-paper/20 text-paper/75"
          : "border-rule text-ink/70"
      }`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {fullItems.map((item, idx) => {
          const isLast = idx === fullItems.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span
                  aria-current="page"
                  className={
                    theme === "dark" ? "text-paper font-bold" : "text-ink font-bold"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`underline hover:text-brand ${
                    theme === "dark" ? "text-paper/80" : "text-ink/75"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

