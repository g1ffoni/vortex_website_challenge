"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAuth } from "@/features/auth";
import { useCategories } from "@/features/categories";
import { useCreateListing } from "@/features/listings";
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
import styles from "./new.module.css";

export default function NewListingPage() {
  const { status: authStatus } = useAuth();

  if (authStatus !== "authenticated") {
    return (
      <Container as="section" className={styles.page}>
        <EmptyState
          icon={<Lock />}
          title="Log in to list an item"
          description="You need a Unifor account to publish a listing."
          action={<LinkButton href="/login">Log in</LinkButton>}
        />
      </Container>
    );
  }

  return <NewListingForm />;
}

function NewListingForm() {
  const router = useRouter();
  const { data: categories = [] } = useCategories();
  const createListing = useCreateListing();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [isDonation, setIsDonation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setDetails([]);

    try {
      const listing = await createListing.trigger({
        title,
        description: description || undefined,
        price: isDonation ? 0 : Number(price),
        gallery: [imageUrl],
        categoryId: Number(categoryId),
      });
      router.push(listing.id ? `/listings/${listing.id}` : "/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setDetails(err.details);
      } else {
        setError("Couldn't publish the listing right now. Please try again.");
      }
    }
  }

  return (
    <Container as="section" className={styles.page}>
      <div className={styles.header}>
        <h1>List an item</h1>
        <p className={styles.subtitle}>Fill in the details below. It takes less than 2 minutes.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && (
          <Alert tone="danger" details={details}>
            {error}
          </Alert>
        )}

        <Field label="Title" htmlFor="title" hint="3 to 100 characters" required>
          <Input
            id="title"
            minLength={3}
            maxLength={100}
            required
            placeholder="Example: Calculus Vol. 1 (Stewart)"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Field>

        <Field label="Category" htmlFor="categoryId" required>
          <Select
            id="categoryId"
            required
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Description"
          htmlFor="description"
          hint="Optional — if filled in, 10 to 500 characters"
        >
          <Textarea
            id="description"
            minLength={10}
            maxLength={500}
            placeholder="Condition, details that help whoever reserves it…"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Field>

        <Field label="Image URL" htmlFor="imageUrl" hint="Link to a photo of the item" required>
          <Input
            id="imageUrl"
            type="url"
            required
            placeholder="Example: https://example.com/photo.jpg"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </Field>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary/simulated image URL preview, not a configured remote host
          <img src={imageUrl} alt="" className={styles.preview} />
        )}

        <label className={styles.checkboxRow} htmlFor="isDonation">
          <input
            id="isDonation"
            type="checkbox"
            checked={isDonation}
            onChange={(event) => setIsDonation(event.target.checked)}
          />
          This item is a donation (no cost)
        </label>

        {!isDonation && (
          <Field label="Price (R$)" htmlFor="price" required>
            <Input
              id="price"
              type="number"
              min={0.01}
              step="0.01"
              required
              placeholder="Example: 45.00"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Field>
        )}

        <Button type="submit" isLoading={createListing.isMutating}>
          Publish listing
        </Button>
      </form>
    </Container>
  );
}
