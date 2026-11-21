import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Free 20-Min Facility Walkthrough | Debra's",
  description:
    "Schedule a free 20-minute commercial cleaning walkthrough in Rocklin, Roseville, or Sacramento. Written 42-point baseline report with zero obligation.",
  alternates: {
    canonical: "/benchmark-audit/",
  },
};

export default function BenchmarkAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
