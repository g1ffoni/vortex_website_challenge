"use client";

import { useState, type FormEvent } from "react";
import { Ban, Star } from "lucide-react";
import { useAuth } from "@/features/auth";
import { useProfile, useSelf, useUpdateSelf } from "@/features/users";
import { useUserRatings, useCreateRating } from "@/features/ratings";
import type { CurrentUserResponse } from "@/lib/api/generated/models";
import { ApiError } from "@/lib/api/mutator";
import Container from "@/components/ui/container/Container";
import Field from "@/components/ui/field/Field";
import Input from "@/components/ui/field/Input";
import Textarea from "@/components/ui/field/Textarea";
import Select from "@/components/ui/field/Select";
import Button from "@/components/ui/button/Button";
import LinkButton from "@/components/ui/button/LinkButton";
import Alert from "@/components/ui/alert/Alert";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import RatingStars from "@/components/ui/rating-stars/RatingStars";
import { formatDate } from "@/lib/format";
import styles from "./profile.module.css";

function initial(name: string | null | undefined): string {
  return name?.[0]?.toUpperCase() ?? "?";
}

export default function ProfileView({ id }: { id: number }) {
  const { status: authStatus, user } = useAuth();
  const isOwnProfile = authStatus === "authenticated" && user?.id === id;

  const profileQuery = useProfile(id);
  const ratingsQuery = useUserRatings(id);
  const selfQuery = useSelf(isOwnProfile);

  if (profileQuery.error) {
    return (
      <Container as="section" className={styles.page}>
        <EmptyState
          icon={<Ban />}
          title="User not found"
          description="This profile may not exist."
          action={<LinkButton href="/listings">Back to listings</LinkButton>}
        />
      </Container>
    );
  }

  const profile = profileQuery.data;
  if (!profile) {
    return (
      <Container as="section" className={styles.page}>
        <p>Loading…</p>
      </Container>
    );
  }

  const ratings = ratingsQuery.data;
  const average = ratings?.average ?? 0;

  function refreshAfterSave() {
    selfQuery.mutate();
    profileQuery.mutate();
  }

  return (
    <Container as="section" className={styles.page}>
      <div className={styles.profileCard}>
        <div className={styles.avatarLg} aria-hidden="true">
          {initial(profile.name)}
        </div>
        <div>
          <h1 className={styles.name}>{profile.name}</h1>
          {isOwnProfile && selfQuery.data?.uniforId && (
            <p className={styles.handle}>@{selfQuery.data.uniforId}</p>
          )}
          <div className={styles.ratingSummary}>
            <RatingStars score={average} />
            <span>
              {ratings?.count ? `${average.toFixed(1)} (${ratings.count})` : "No ratings yet"}
            </span>
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Account details</h2>
          {selfQuery.data ? (
            <EditProfileForm self={selfQuery.data} onSaved={refreshAfterSave} />
          ) : (
            <div className={styles.panel}>Loading your info…</div>
          )}
        </div>
      )}

      {!isOwnProfile && authStatus === "authenticated" && (
        <RateUserSection userId={id} onRated={() => ratingsQuery.mutate()} />
      )}

      {!isOwnProfile && authStatus !== "authenticated" && (
        <div className={styles.section}>
          <div className={styles.panel}>
            Want to leave a rating?{" "}
            <LinkButton href="/login" size="sm">
              Log in
            </LinkButton>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ratings</h2>
        {ratingsQuery.isLoading ? (
          <p>Loading…</p>
        ) : !ratings || (ratings.ratings?.length ?? 0) === 0 ? (
          <EmptyState icon={<Star />} title="No ratings yet" description="Nothing to show here yet." />
        ) : (
          <div className={styles.ratingList}>
            {ratings.ratings?.map((rating) => (
              <div key={rating.id} className={styles.ratingRow}>
                <div className={styles.avatarSm} aria-hidden="true">
                  {initial(rating.raterDisplayName)}
                </div>
                <div className={styles.ratingContent}>
                  <div className={styles.ratingHeader}>
                    <span className={styles.raterName}>{rating.raterDisplayName}</span>
                    {rating.createdAt && (
                      <span className={styles.ratingDate}>{formatDate(rating.createdAt)}</span>
                    )}
                  </div>
                  <RatingStars score={rating.score ?? 0} />
                  {rating.comment && <p className={styles.ratingComment}>{rating.comment}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

function EditProfileForm({
  self,
  onSaved,
}: {
  self: CurrentUserResponse;
  onSaved: () => void;
}) {
  const updateSelf = useUpdateSelf();
  const [name, setName] = useState(self.profile?.name ?? "");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(self.contactInfo?.phoneNumber ?? "");
  const [email, setEmail] = useState(self.contactInfo?.email ?? "");
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setDetails([]);
    setSaved(false);
    try {
      await updateSelf.trigger({
        name: name.trim() || undefined,
        bio: bio.trim() || undefined,
        profilePicture: profilePicture.trim() || undefined,
        phoneNumber: phoneNumber.trim() || undefined,
        email: email.trim() || undefined,
      });
      setBio("");
      setProfilePicture("");
      setSaved(true);
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setDetails(err.details);
      } else {
        setError("Couldn't save your changes. Please try again.");
      }
    }
  }

  return (
    <form className={`${styles.panel} ${styles.form}`} onSubmit={handleSubmit}>
      {error && (
        <Alert tone="danger" details={details}>
          {error}
        </Alert>
      )}
      {saved && !error && <Alert tone="success">Your profile was updated.</Alert>}

      <Field label="Name" htmlFor="edit-name">
        <Input id="edit-name" value={name} onChange={(event) => setName(event.target.value)} />
      </Field>

      <div className={styles.formRow}>
        <Field label="Phone" htmlFor="edit-phone">
          <Input
            id="edit-phone"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="edit-email">
          <Input
            id="edit-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Bio"
        htmlFor="edit-bio"
        hint="Leave blank to keep your current bio. Up to 500 characters."
      >
        <Textarea
          id="edit-bio"
          maxLength={500}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </Field>

      <Field
        label="Avatar URL"
        htmlFor="edit-avatar"
        hint="Leave blank to keep your current picture."
      >
        <Input
          id="edit-avatar"
          type="url"
          placeholder="Example: https://example.com/avatar.jpg"
          value={profilePicture}
          onChange={(event) => setProfilePicture(event.target.value)}
        />
      </Field>

      <Button type="submit" isLoading={updateSelf.isMutating}>
        Save changes
      </Button>
    </form>
  );
}

function RateUserSection({ userId, onRated }: { userId: number; onRated: () => void }) {
  const createRating = useCreateRating(userId);
  const [score, setScore] = useState("5");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      await createRating.trigger({ score: Number(score), comment: comment.trim() || undefined });
      setComment("");
      onRated();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your rating.");
    }
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Leave a rating</h2>
      <form className={`${styles.panel} ${styles.form}`} onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}

        <Field label="Score" htmlFor="rating-score" required>
          <Select id="rating-score" value={score} onChange={(event) => setScore(event.target.value)}>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </Select>
        </Field>

        <Field label="Comment" htmlFor="rating-comment" hint="Optional, up to 2000 characters">
          <Textarea
            id="rating-comment"
            maxLength={2000}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Field>

        <Button type="submit" isLoading={createRating.isMutating}>
          Submit rating
        </Button>
      </form>
    </div>
  );
}
