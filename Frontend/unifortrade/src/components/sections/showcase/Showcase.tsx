"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import { useCategories } from "@/features/categories";
import { useListings } from "@/features/listings";
import Container from "@/components/ui/container/Container";
import LinkButton from "@/components/ui/button/LinkButton";
import ItemCard from "@/components/ui/item-card/ItemCard";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import styles from "./Showcase.module.css";

export default function Showcase() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const { data: categories = [] } = useCategories();

  const { data, isLoading } = useListings({
    size: 8,
    sort: ["createdAt,desc"],
    status: "ACTIVE",
    categoryId,
  });
  const listings = data?.content ?? [];

  return (
    <section className={styles.section} id="listings">
      <Container>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Latest listings</h2>
            <p className={styles.subtitle}>Fresh finds from other Unifor students.</p>
          </div>
        </div>

        <div className={styles.filters} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`${styles.filterButton} ${categoryId === undefined ? styles.filterButtonActive : ""}`}
            onClick={() => setCategoryId(undefined)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.filterButton} ${categoryId === category.id ? styles.filterButtonActive : ""}`}
              onClick={() => setCategoryId(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className={styles.grid} aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles.skeleton} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <EmptyState
            icon={<SearchX />}
            title="Nothing here yet"
            description="Be the first to list something in this category."
            action={<LinkButton href="/listings/new">List an item</LinkButton>}
          />
        ) : (
          <div className={styles.grid}>
            {listings.map((listing) => (
              <ItemCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <LinkButton href="/listings" variant="secondary">
            View all listings
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
