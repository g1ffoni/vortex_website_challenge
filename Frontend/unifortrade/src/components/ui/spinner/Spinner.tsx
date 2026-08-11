import styles from "./Spinner.module.css";

type SpinnerProps = {
  size?: "sm" | "md";
  label?: string;
};

export default function Spinner({ size = "md", label = "Loading" }: SpinnerProps) {
  return (
    <span className={`${styles.spinner} ${styles[size]}`} role="status" aria-label={label}>
      <span className={styles.visuallyHidden}>{label}</span>
    </span>
  );
}
