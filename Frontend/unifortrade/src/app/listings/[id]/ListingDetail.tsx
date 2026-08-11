"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ban, Package, ArrowLeft, Folder, User, Calendar, PartyPopper } from "lucide-react";
import { useAuth } from "@/features/auth";
import {
  useListing,
  useClaimListing,
  useCancelListingClaim,
  useCompleteListing,
  useListingContact,
  useDeleteListing,
} from "@/features/listings";
import { ApiError } from "@/lib/api/mutator";
import { ListingStatusBadge, ListingTypeBadge } from "@/components/ui/badge/ListingBadges";
import Container from "@/components/ui/container/Container";
import Button from "@/components/ui/button/Button";
import LinkButton from "@/components/ui/button/LinkButton";
import Alert from "@/components/ui/alert/Alert";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import { formatDate, formatPrice } from "@/lib/format";
import styles from "./listing-detail.module.css";

export default function ListingDetail({ id }: { id: number }) {
  const router = useRouter();
  const { status: authStatus, user } = useAuth();

  const listingQuery = useListing(id);
  const listing = listingQuery.data;

  const [activeImage, setActiveImage] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);

  const isOwner = Boolean(user && listing?.owner?.id === user.id);
  const isClaimed = listing?.status === "CLAIMED";

  const claim = useClaimListing(id);
  const cancelClaim = useCancelListingClaim(id);
  const complete = useCompleteListing(id);
  const deleteListing = useDeleteListing(id);
  const contact = useListingContact(
    isClaimed && authStatus === "authenticated" ? id : undefined
  );
  const isInvolved = Boolean(contact.data) && !contact.error;

  async function runAction(action: () => Promise<unknown>) {
    setActionError(null);
    try {
      await action();
      await listingQuery.mutate();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't complete this action.");
    }
  }

  if (listingQuery.error) {
    return (
      <Container as="section" className={styles.page}>
        <EmptyState
          icon={<Ban />}
          title="Listing not found"
          description="This listing may have been removed."
          action={<LinkButton href="/listings">Back to listings</LinkButton>}
        />
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container as="section" className={styles.page}>
        <p>Loading…</p>
      </Container>
    );
  }

  const isDonation = !listing.price || listing.price === 0;
  const gallery = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [];

  return (
    <Container as="section" className={styles.page}>
      <Link href="/listings" className={styles.back}>
        <ArrowLeft aria-hidden="true" /> Back to listings
      </Link>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          {gallery.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary/simulated image URLs, not a configured remote host
            <img src={gallery[activeImage]} alt={listing.title} className={styles.mainImage} />
          ) : (
            <div className={styles.mainImageFallback} aria-hidden="true">
              <Package />
            </div>
          )}
          {gallery.length > 1 && (
            <div className={styles.thumbRow}>
              {gallery.map((url, index) => (
                // eslint-disable-next-line @next/next/no-img-element -- arbitrary/simulated image URLs, not a configured remote host
                <img
                  key={url + index}
                  src={url}
                  alt=""
                  className={`${styles.thumb} ${index === activeImage ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.badges}>
            <ListingStatusBadge status={listing.status} />
            <ListingTypeBadge type={listing.type} />
          </div>

          <h1 className={styles.title}>{listing.title}</h1>

          <span className={`${styles.price} ${isDonation ? styles.donation : ""}`}>
            {isDonation ? "Donation" : formatPrice(listing.price)}
          </span>

          <div className={styles.meta}>
            {listing.category?.name && (
              <span>
                <Folder aria-hidden="true" /> {listing.category.name}
              </span>
            )}
            {listing.owner?.name && (
              <Link href={`/profile/${listing.owner.id}`}>
                <User aria-hidden="true" /> {listing.owner.name}
              </Link>
            )}
            {listing.createdAt && (
              <span>
                <Calendar aria-hidden="true" /> {formatDate(listing.createdAt)}
              </span>
            )}
          </div>

          <p className={styles.description}>{listing.description}</p>

          {actionError && <Alert tone="danger">{actionError}</Alert>}

          {listing.status === "ACTIVE" && !isOwner && (
            <div className={styles.actions}>
              {authStatus === "authenticated" ? (
                <Button isLoading={claim.isMutating} onClick={() => runAction(() => claim.trigger())}>
                  Reserve item
                </Button>
              ) : (
                <LinkButton href="/login">Log in to reserve</LinkButton>
              )}
            </div>
          )}

          {listing.status === "ACTIVE" && isOwner && (
            <div className={styles.actions}>
              <Button
                variant="danger"
                isLoading={deleteListing.isMutating}
                onClick={async () => {
                  if (!confirm("Remove this listing?")) return;
                  setActionError(null);
                  try {
                    await deleteListing.trigger();
                    router.push("/dashboard");
                  } catch (err) {
                    setActionError(
                      err instanceof ApiError ? err.message : "Couldn't remove this listing."
                    );
                  }
                }}
              >
                Remove listing
              </Button>
            </div>
          )}

          {isClaimed && !isOwner && !isInvolved && (
            <Alert>This listing was already claimed by someone else.</Alert>
          )}

          {isClaimed && isOwner && contact.data && (
            <dl className={styles.contactCard}>
              <dt>Your listing was claimed by {contact.data.displayName}</dt>
              <dd>
                Here&apos;s their contact info: {contact.data.email} · {contact.data.phone}
              </dd>
            </dl>
          )}

          {isClaimed && isInvolved && !isOwner && contact.data && (
            <dl className={styles.contactCard}>
              <dt>You claimed this listing</dt>
              <dd>
                Here&apos;s the seller&apos;s contact info: {contact.data.email} ·{" "}
                {contact.data.phone}
              </dd>
            </dl>
          )}

          {isClaimed && isInvolved && (
            <div className={styles.actions}>
              <Button
                variant="secondary"
                isLoading={cancelClaim.isMutating}
                onClick={() => runAction(() => cancelClaim.trigger())}
              >
                Cancel reservation
              </Button>
              {isOwner && (
                <Button
                  isLoading={complete.isMutating}
                  onClick={() => runAction(() => complete.trigger())}
                >
                  Confirm handoff
                </Button>
              )}
            </div>
          )}

          {listing.status === "COMPLETED" && (
            <Alert tone="success">
              <span className={styles.celebrate}>
                This item has been delivered. <PartyPopper aria-hidden="true" size={16} />
              </span>
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
}
