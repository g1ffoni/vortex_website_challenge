import Link from "next/link";
import { Package } from "lucide-react";
import type { ListingSummaryResponse } from "@/lib/api/generated/models";
import { ListingStatusBadge } from "@/components/ui/badge/ListingBadges";
import { formatPrice } from "@/lib/format";
import styles from "./ItemCard.module.css";

type ItemCardProps = {
  listing: ListingSummaryResponse;
};

export default function ItemCard({ listing }: ItemCardProps) {
  const isDonation = !listing.price || listing.price === 0;

  return (
    <Link href={`/listings/${listing.id}`} className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {listing.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- gallery URLs are arbitrary, unconfigured remote hosts (simulated image URLs per the challenge spec)
          <img src={listing.thumbnailUrl} alt="" className={styles.thumbnail} loading="lazy" />
        ) : (
          <div className={styles.thumbnailFallback} aria-hidden="true">
            <Package />
          </div>
        )}
        <span className={styles.statusBadge}>
          <ListingStatusBadge status={listing.status} />
        </span>
      </div>
      <div className={styles.body}>
        {listing.categoryName && <span className={styles.category}>{listing.categoryName}</span>}
        <h3 className={styles.title}>{listing.title}</h3>
        <span className={[styles.price, isDonation && styles.donation].filter(Boolean).join(" ")}>
          {isDonation ? "Donation" : formatPrice(listing.price)}
        </span>
      </div>
    </Link>
  );
}
