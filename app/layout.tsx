import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BuildPro - Construction Project Management & Site ERP",
  description:
    "Enterprise construction management platform for tracking project budgets, live workforce attendance, site materials, and progress analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased selection:bg-orange-500 selection:text-white">
        <Providers>
          <DashboardShell>{children}</DashboardShell>
        </Providers>
      </body>
    </html>
  );
}
