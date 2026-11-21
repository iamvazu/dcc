import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Debra's Classic Cleaning | Rocklin, CA",
  description:
    "Call or text 916-668-8080 for house cleaning and commercial janitorial service in Rocklin, Roseville, Granite Bay & Sacramento. 2718 Wyatt Ct, Rocklin, CA 95765.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
