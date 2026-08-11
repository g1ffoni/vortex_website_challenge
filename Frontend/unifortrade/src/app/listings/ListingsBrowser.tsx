"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { useCategories } from "@/features/categories";
import { useListings, type ListingFilters } from "@/features/listings";
import type { ListingSearchRequestType } from "@/lib/api/generated/models";
import Container from "@/components/ui/container/Container";
import ItemCard from "@/components/ui/item-card/ItemCard";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import Input from "@/components/ui/field/Input";
import Select from "@/components/ui/field/Select";
import Button from "@/components/ui/button/Button";
import styles from "./listings.module.css";

const PAGE_SIZE = 12;

const TYPE_OPTIONS: { label: string; value: ListingSearchRequestType | undefined }[] = [
  { label: "All", value: undefined },
  { label: "For sale", value: "SALE" },
  { label: "Donation", value: "DONATION" },
];

export default function ListingsBrowser() {
  const searchParams = useSearchParams();

  const { data: categories = [] } = useCategories();

  const [keywordInput, setKeywordInput] = useState(searchParams.get("q") ?? "");
  const [appliedKeyword, setAppliedKeyword] = useState(searchParams.get("q") ?? "");
  const [categorySlug, setCategorySlug] = useState(searchParams.get("category") ?? "");
  const [type, setType] = useState<ListingSearchRequestType | undefined>(undefined);
  const [page, setPage] = useState(0);

  const categoryId = categories.find((category) => category.slug === categorySlug)?.id;

  const filters: ListingFilters = {
    status: "ACTIVE",
    page,
    size: PAGE_SIZE,
    sort: ["createdAt,desc"],
    keyword: appliedKeyword || undefined,
    categoryId,
    type,
  };

  const { data: result, isLoading } = useListings(filters);
  const listings = result?.content ?? [];

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedKeyword(keywordInput.trim());
    setPage(0);
  }

  return (
    <Container as="section" className={styles.page}>
      <div className={styles.header}>
        <h1>Browse listings</h1>
        <p className={styles.subtitle}>
          Books, calculators, lab coats and more — listed by other Unifor students.
        </p>
      </div>

      <div className={styles.toolbar}>
        <form onSubmit={handleSearchSubmit} className={styles.searchRow}>
          <Input
            className={styles.searchInput}
            type="search"
            placeholder="Search by title or description…"
            aria-label="Search listings"
            value={keywordInput}
            onChange={(event) => setKeywordInput(event.target.value)}
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        <div className={styles.filterRow}>
          <div className={styles.typeGroup} role="group" aria-label="Filter by type">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`${styles.typeButton} ${type === option.value ? styles.typeButtonActive : ""}`}
                onClick={() => {
                  setType(option.value);
                  setPage(0);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <Select
            className={styles.categorySelect}
            aria-label="Filter by category"
            value={categorySlug}
            onChange={(event) => {
              setCategorySlug(event.target.value);
              setPage(0);
            }}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {!isLoading && result && (
        <p className={styles.resultCount}>
          {result.totalElements ?? 0}{" "}
          {result.totalElements === 1 ? "item found" : "items found"}
        </p>
      )}

      {isLoading ? (
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div key={index} className={styles.skeleton} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <EmptyState
          icon={<SearchX />}
          title="No items found"
          description="Try a different keyword or remove some filters."
        />
      ) : (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <ItemCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {result && (result.totalPages ?? 0) > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
          >
            Previous
          </Button>
          <span className={styles.pageLabel}>
            Page {page + 1} of {result.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={result.last}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
}
