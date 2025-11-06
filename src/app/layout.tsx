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
  title: "Portfolio | Fullstack Developer",
  description: "Fullstack developer specializing in React, TypeScript, cybersecurity, and network infrastructure. CCNA certified with business and IT background.",
  keywords: ["Fullstack Developer", "React", "TypeScript", "Next.js", "Cybersecurity", "CCNA", "Penetration Testing", "Network Infrastructure"],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "64x64" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Portfolio | Fullstack Developer",
    description: "Fullstack developer specializing in React, TypeScript, cybersecurity, and network infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
