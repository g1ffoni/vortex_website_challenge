import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./AuthCard.module.css";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Link href="/" className={styles.brand}>
          Unifor<span className={styles.brandAccent}>Trade</span>
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.form}>{children}</div>
        <p className={styles.footer}>{footer}</p>
      </div>
    </div>
  );
}
