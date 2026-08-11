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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [uniforId, setUniforId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(uniforId, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? "Invalid student ID or password."
          : "Couldn't log in right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Log in"
      subtitle="Sign in with your Unifor student ID to list and reserve items."
      footer={
        <>
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}

        <Field label="Student ID" htmlFor="uniforId" required>
          <Input
            id="uniforId"
            name="uniforId"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Example: 202601"
            autoComplete="username"
            required
            value={uniforId}
            onChange={(event) => setUniforId(event.target.value)}
          />
        </Field>

        <Field label="Password" htmlFor="password" required>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Log in
        </Button>
      </form>
    </AuthCard>
  );
}
