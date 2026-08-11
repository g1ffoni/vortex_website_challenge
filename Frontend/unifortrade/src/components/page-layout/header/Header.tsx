"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/features/auth";
import { useProfile } from "@/features/users";
import Container from "@/components/ui/container/Container";
import LinkButton from "@/components/ui/button/LinkButton";
import Button from "@/components/ui/button/Button";
import NotificationBell from "@/components/page-layout/notification-bell/NotificationBell";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/#categories", label: "Categories" },
  { href: "/#how-it-works", label: "How it works" },
];

export default function Header() {
  const { status, user, logout } = useAuth();
  const { data: ownProfile } = useProfile(
    status === "authenticated" ? user?.id : undefined,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand}>
            Unifor<span className={styles.brandAccent}>Trade</span>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            {status === "authenticated" ? (
              <>
                <NotificationBell />
                <Link
                  href={`/profile/${user?.id}`}
                  className={styles.userGreeting}
                >
                  Welcome, {ownProfile?.name ?? user?.uniforId}!
                </Link>
                <LinkButton
                  href="/dashboard"
                  variant="secondary"
                  size="sm"
                  className={styles.desktopOnly}
                >
                  My listings
                </LinkButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className={styles.desktopOnly}
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <LinkButton
                  href="/login"
                  variant="ghost"
                  size="sm"
                  className={styles.desktopOnly}
                >
                  Log in
                </LinkButton>
                <LinkButton
                  href="/listings/new"
                  variant="primary"
                  size="sm"
                  className={styles.desktopOnly}
                >
                  List an item
                </LinkButton>
              </>
            )}

            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className={styles.mobileNavDivider} />

            {status === "authenticated" ? (
              <>
                <Link
                  href={`/profile/${user?.id}`}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  Welcome, {ownProfile?.name ?? user?.uniforId}!
                </Link>
                <LinkButton
                  href="/dashboard"
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => setMenuOpen(false)}
                >
                  My listings
                </LinkButton>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <LinkButton
                  href="/login"
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </LinkButton>
                <LinkButton
                  href="/listings/new"
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => setMenuOpen(false)}
                >
                  List an item
                </LinkButton>
              </>
            )}
          </nav>
        )}
      </Container>
    </header>
  );
}
