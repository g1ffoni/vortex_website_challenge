import type { TextareaHTMLAttributes } from "react";
import styles from "./FormControl.module.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export default function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={[styles.control, invalid && styles.invalid, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
