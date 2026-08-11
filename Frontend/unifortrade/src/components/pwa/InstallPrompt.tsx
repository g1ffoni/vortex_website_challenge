"use client";

import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import styles from "./InstallPrompt.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className={styles.banner} role="status">
      <span className={styles.message}>
        <Smartphone aria-hidden="true" size={18} /> Install UniforTrade on your home screen for
        quick access.
      </span>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.installButton}
          onClick={async () => {
            await deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
          }}
        >
          Install
        </button>
        <button
          type="button"
          className={styles.dismissButton}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
