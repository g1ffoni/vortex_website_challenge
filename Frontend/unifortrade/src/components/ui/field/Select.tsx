import type { SelectHTMLAttributes } from "react";
import styles from "./FormControl.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export default function Select({ invalid, className, ...rest }: SelectProps) {
  return (
    <select
      className={[styles.control, invalid && styles.invalid, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
