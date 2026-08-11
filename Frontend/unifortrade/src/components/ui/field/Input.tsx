import type { InputHTMLAttributes } from "react";
import styles from "./FormControl.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export default function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      className={[styles.control, invalid && styles.invalid, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
