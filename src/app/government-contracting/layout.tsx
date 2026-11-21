import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WOSB & CA Small Business Janitorial (#2040639) | Debra's",
  description:
    "Capability statement for Debra's Classic Cleaning LLC. SBA WOSB/EDWOSB, CA DGS Small Business ID 2040639, SAM.gov CAGE 9Z5E9, NAICS 561720.",
  alternates: {
    canonical: "/government-contracting/",
  },
};

export default function GovernmentContractingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
