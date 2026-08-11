import type { Metadata, Viewport } from "next";
import { AppProvider } from "./provider";
import "@/styles/abstracts/index.css";
import "@/styles/globals/index.css";
import Header from "@/components/page-layout/header/Header";
import Footer from "@/components/page-layout/footer/Footer";
import BottomNav from "@/components/page-layout/bottom-nav/BottomNav";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export const metadata: Metadata = {
  title: "UniforTrade — Circular economy on campus",
  description:
    "List, donate, or find books, calculators, lab coats and other items within your university.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UniforTrade",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          {children}
          <Footer />
          <BottomNav />
          <InstallPrompt />
          <ServiceWorkerRegister />
        </AppProvider>
      </body>
    </html>
  );
}
