import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bharadwajgade.com"),
  title: "Bharadwaj Gade | Backend & AI Engineer",
  description:
    "Backend and AI engineer building reliable AI pipelines, real-time data systems, and production SaaS.",
  openGraph: {
    title: "Bharadwaj Gade | Backend & AI Engineer",
    description: "Reliable AI pipelines, real-time data systems, and production SaaS.",
    url: "https://bharadwajgade.com",
    siteName: "Bharadwaj Gade",
    type: "website",
  },
  twitter: { card: "summary", title: "Bharadwaj Gade | Backend & AI Engineer", description: "Reliable AI pipelines, real-time data systems, and production SaaS." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
