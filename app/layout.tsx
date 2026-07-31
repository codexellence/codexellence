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
  title: "Codexellence",
  description: "",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 100' fill='none'><path d='M30 22 L8 50 L30 78' stroke='%237C3AED' stroke-width='11' stroke-linecap='round' stroke-linejoin='round'/><line x1='74' y1='18' x2='56' y2='82' stroke='%237C3AED' stroke-width='11' stroke-linecap='round'/><path d='M100 22 L122 50 L100 78' stroke='%237C3AED' stroke-width='11' stroke-linecap='round' stroke-linejoin='round'/></svg>",
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
