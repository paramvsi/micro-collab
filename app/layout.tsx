import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "./providers/query-provider";
import "./globals.css";
import "@/lib/mock/init"; // Initialize mock data

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MicroCollab - Find help fast. Collaborate smart.",
  description:
    "Connect with experienced developers for short, focused help sessions (1-4 hours). Get help with debugging, refactoring, testing, and architectural guidance.",
  keywords: [
    "developer collaboration",
    "code help",
    "pair programming",
    "tech mentorship",
    "freelance developers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#1E1E26",
                border: "1px solid #27272A",
                color: "#F9FAFB",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
