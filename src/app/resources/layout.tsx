import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Checklists & 2026 Rate Guides | Debra's",
  description:
    "Download our printable 42-point commercial cleaning inspection checklist PDF and compare 2026 Placer & Sacramento house and office cleaning cost guides.",
  alternates: {
    canonical: "/resources/",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
