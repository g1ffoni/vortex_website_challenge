"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { ApiError } from "@/lib/api/mutator";
import AuthCard from "@/components/ui/auth-card/AuthCard";
import Field from "@/components/ui/field/Field";
import Input from "@/components/ui/field/Input";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    uniforId: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setDetails([]);

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        uniforId: form.uniforId,
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setDetails(err.details);
      } else {
        setError("Couldn't create your account right now. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Use your Unifor student ID to start listing and reserving items."
      footer={
        <>
          Already have an account? <Link href="/login">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert tone="danger" details={details}>
            {error}
          </Alert>
        )}

        <Field label="Full name" htmlFor="name" required>
          <Input
            id="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>

        <Field label="Student ID" htmlFor="uniforId" hint="6 digits" required>
          <Input
            id="uniforId"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Example: 202601"
            autoComplete="username"
            required
            value={form.uniforId}
            onChange={(event) => update("uniforId", event.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>

        <Field label="Phone" htmlFor="phoneNumber" hint="Digits only, with area code" required>
          <Input
            id="phoneNumber"
            type="tel"
            autoComplete="tel"
            placeholder="Example: +5585999990000"
            required
            value={form.phoneNumber}
            onChange={(event) => update("phoneNumber", event.target.value)}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          hint="At least 8 characters, with a letter and a number"
          required
        >
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={form.password}
            onChange={(event) => update("password", event.target.value)}
          />
        </Field>

        <Field label="Confirm password" htmlFor="confirmPassword" required>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={form.confirmPassword}
            onChange={(event) => update("confirmPassword", event.target.value)}
          />
        </Field>

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
