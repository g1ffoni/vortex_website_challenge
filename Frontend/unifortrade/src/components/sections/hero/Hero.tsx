"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Container from "@/components/ui/container/Container";
import LinkButton from "@/components/ui/button/LinkButton";
import styles from "./Hero.module.css";

export default function Hero() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/listings?q=${encodeURIComponent(trimmed)}` : "/listings");
  }

  return (
    <section className={styles.hero}>
      <Container>
        <h1 className={styles.title}>
          Give what you don&apos;t use anymore a new home —{" "}
          <span className={styles.highlight}>straight to another student</span>
        </h1>
        <p className={styles.description}>
          UniforTrade connects students finishing a course with students just starting it. List
          books, calculators, lab coats and other items to sell or donate right within your own
          university — no shipping, no hassle.
        </p>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <span className={styles.searchIcon} aria-hidden="true">
            <Search />
          </span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search for books, calculators, lab coats…"
            aria-label="Search listings"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <div className={styles.actions}>
          <LinkButton href="/listings/new" size="md">
            List an item
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
