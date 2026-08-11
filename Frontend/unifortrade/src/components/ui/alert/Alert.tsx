import type { ReactNode } from "react";
import styles from "./Alert.module.css";

type AlertProps = {
  tone?: "danger" | "success" | "info";
  title?: string;
  details?: string[];
  children?: ReactNode;
};

export default function Alert({ tone = "info", title, details, children }: AlertProps) {
  return (
    <div className={[styles.alert, styles[tone]].join(" ")} role="alert">
      {title && <strong>{title}</strong>}
      {children}
      {details && details.length > 0 && (
        <ul>
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
