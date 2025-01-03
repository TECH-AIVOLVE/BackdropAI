import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Backdrop AI",
  description: "Create Stunning Visuals with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
            <UserProvider>
              <div>
                {children}
                <Analytics />
                <SpeedInsights />
                <Toaster />
              </div>
            </UserProvider>
        </SupabaseProvider>
        
      </body>
    </html>
  );
}
