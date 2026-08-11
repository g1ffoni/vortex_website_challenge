"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, FolderOpen, Package } from "lucide-react";
import { useAuth } from "@/features/auth";
import { useListings, useDeleteListing, type ListingFilters } from "@/features/listings";
import type { ListingSummaryResponse } from "@/lib/api/generated/models";
import { ApiError } from "@/lib/api/mutator";
import Container from "@/components/ui/container/Container";
import LinkButton from "@/components/ui/button/LinkButton";
import Button from "@/components/ui/button/Button";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import { ListingStatusBadge } from "@/components/ui/badge/ListingBadges";
import { formatPrice } from "@/lib/format";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { status, user } = useAuth();

  if (status !== "authenticated" || !user) {
    return (
      <Container as="section" className={styles.page}>
        <EmptyState
          icon={<Lock />}
          title="Log in to see your listings"
          description="Your listed items show up here once you're logged in."
          action={<LinkButton href="/login">Log in</LinkButton>}
        />
      </Container>
    );
  }

  return <MyListings ownerId={user.id} />;
}

function MyListings({ ownerId }: { ownerId: number }) {
  const filters: ListingFilters = { ownerId, size: 50, sort: ["createdAt,desc"] };
  const { data, isLoading, mutate } = useListings(filters);
  const listings = data?.content ?? [];

  return (
    <Container as="section" className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>My listings</h1>
          <p className={styles.subtitle}>Track and manage the items you&apos;ve listed.</p>
        </div>
        <LinkButton href="/listings/new">List an item</LinkButton>
      </div>

      {isLoading ? (
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.skeleton} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <EmptyState
          icon={<FolderOpen />}
          title="You haven't listed anything yet"
          description="How about giving something you don't use anymore a new home?"
          action={<LinkButton href="/listings/new">List my first item</LinkButton>}
        />
      ) : (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <MyListingRow key={listing.id} listing={listing} onDeleted={() => mutate()} />
          ))}
        </div>
      )}
    </Container>
  );
}

function MyListingRow({
  listing,
  onDeleted,
}: {
  listing: ListingSummaryResponse;
  onDeleted: () => void;
}) {
  const deleteListing = useDeleteListing(listing.id as number);
  const [error, setError] = useState<string | null>(null);
  const isDonation = !listing.price || listing.price === 0;
  const href = `/listings/${listing.id}`;

  async function handleDelete() {
    if (!confirm("Remove this listing? This can't be undone.")) return;
    setError(null);
    try {
      await deleteListing.trigger();
      onDeleted();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't remove this listing.");
    }
  }

  return (
    <div className={styles.card}>
      <Link href={href} className={styles.thumbnailLink}>
        {listing.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary/simulated image URLs, not a configured remote host
          <img src={listing.thumbnailUrl} alt="" className={styles.thumbnail} />
        ) : (
          <div className={styles.thumbnailFallback} aria-hidden="true">
            <Package />
          </div>
        )}
      </Link>
      <div className={styles.body}>
        <Link href={href} className={styles.titleLink}>
          {listing.title}
        </Link>
        <div className={styles.meta}>
          <ListingStatusBadge status={listing.status} />
          <span>{isDonation ? "Donation" : formatPrice(listing.price)}</span>
        </div>
        {error && <span className={styles.rowError}>{error}</span>}
        <div className={styles.actions}>
          <LinkButton href={href} size="sm" variant="secondary">
            View listing
          </LinkButton>
          {listing.status === "ACTIVE" && (
            <Button
              size="sm"
              variant="danger"
              isLoading={deleteListing.isMutating}
              onClick={handleDelete}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
