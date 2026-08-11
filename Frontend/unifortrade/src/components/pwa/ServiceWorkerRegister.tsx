"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
      console.info(
        "[sw] Skipped in development — only registers on a production build (`next build && next start`)."
      );
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("[sw] Registration failed:", error);
    });
  }, []);

  return null;
}
