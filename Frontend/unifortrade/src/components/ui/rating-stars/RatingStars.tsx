import { Star } from "lucide-react";
import styles from "./RatingStars.module.css";

type RatingStarsProps = {
  score: number;
  size?: "sm" | "md";
};

export default function RatingStars({ score, size = "sm" }: RatingStarsProps) {
  const rounded = Math.round(score);
  return (
    <span
      className={`${styles.stars} ${styles[size]}`}
      role="img"
      aria-label={`${score.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} aria-hidden="true" fill={index < rounded ? "currentColor" : "none"} />
      ))}
    </span>
  );
}
