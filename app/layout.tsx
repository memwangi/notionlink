import type { Metadata } from "next";
import { Hanken_Grotesk, Marcellus } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joseph Mugo",
  description: "Design portfolio of Joseph Mugo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className={`${hankenGrotesk.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
