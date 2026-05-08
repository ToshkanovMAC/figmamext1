import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sport News – Latest Sports Updates",
  description: "Your #1 source for football, basketball, car sport, table tennis news, FIDE ratings, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
