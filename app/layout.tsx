import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const nohemi = localFont({
  variable: "--font-nohemi-display",
  display: "swap",
  src: [
    {
      path: "../public/nohemi-font-family/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/nohemi-font-family/Nohemi-Medium-BF6438cc57ddecd.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/nohemi-font-family/Nohemi-SemiBold-BF6438cc57db2ff.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/nohemi-font-family/Nohemi-Bold-BF6438cc577b524.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Financial Systems Design Portfolio",
  description:
    "A portfolio about trust, money movement, onboarding, operational clarity, regulated workflows, ecosystem banking, and customer financial behavior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${nohemi.variable} h-full antialiased`}
    >
      <body className={`${urbanist.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
