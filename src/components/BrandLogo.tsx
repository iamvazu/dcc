import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  lane?: "commercial" | "residential";
  theme?: "light" | "dark";
  href?: string;
}

export function BrandLogo({ theme = "light", href = "/" }: BrandLogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href={href}
      className="inline-flex items-center shrink-0 no-underline focus:outline-none"
      aria-label="Debra's Classic Cleaning — Home"
    >
      <span
        className={`inline-flex items-center ${
          isDark ? "bg-white rounded-lg px-3.5 py-2 shadow-sm" : ""
        }`}
      >
        <Image
          src="/images/debras-logo.png"
          alt="Debra's Classic Cleaning"
          width={240}
          height={80}
          className="h-14 sm:h-16 lg:h-[70px] w-auto object-contain"
          priority
        />
      </span>
    </Link>
  );
}




