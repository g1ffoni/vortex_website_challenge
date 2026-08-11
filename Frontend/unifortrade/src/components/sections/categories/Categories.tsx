"use client";

import Link from "next/link";
import { Loader2, Tag } from "lucide-react";
import { useCategories } from "@/features/categories";
import Container from "@/components/ui/container/Container";
import styles from "./Categories.module.css";

export default function Categories() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <section className={styles.section} id="categories">
      <Container>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Browse by category</h2>
            <p className={styles.subtitle}>
              From freshman year to your final project: find what you need by area.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {isLoading && categories.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.card} aria-hidden="true">
                  <span className={`${styles.emoji} ${styles.spin}`}>
                    <Loader2 />
                  </span>
                  <span className={styles.name}>Loading…</span>
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/listings?category=${category.slug}`}
                  className={styles.card}
                >
                  {category.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary category image URLs, not a configured remote host
                    <img src={category.imageUrl} alt="" className={styles.thumbnail} />
                  ) : (
                    <span className={styles.emoji} aria-hidden="true">
                      <Tag />
                    </span>
                  )}
                  <span className={styles.name}>{category.name}</span>
                </Link>
              ))}
        </div>
      </Container>
    </section>
  );
}
