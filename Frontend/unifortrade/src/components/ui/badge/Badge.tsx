import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "success" | "warning" | "information" | "accent" | "neutral" | "danger";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

export default function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
