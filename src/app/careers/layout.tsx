import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Jobs in Rocklin & Roseville, CA | Debra's",
  description:
    "Now hiring W-2 residential house cleaners and evening commercial janitorial technicians in Rocklin, Roseville, and Placer County. Paid training & mileage.",
  alternates: {
    canonical: "/careers/",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
