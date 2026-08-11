"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, FolderOpen, type LucideIcon } from "lucide-react";
import styles from "./BottomNav.module.css";

const TABS: {
  href: string;
  label: string;
  icon: LucideIcon;
  emphasized?: boolean;
}[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listings", label: "Listings", icon: Search },
  { href: "/listings/new", label: "Create Listing", icon: Plus },
  { href: "/dashboard", label: "My items", icon: FolderOpen },
];

function isTabActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/listings") {
    return (
      pathname === "/listings" ||
      (pathname.startsWith("/listings/") &&
        !pathname.startsWith("/listings/new"))
    );
  }
  return pathname.startsWith(href);
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {TABS.map((tab) => {
        const isActive = isTabActive(tab.href, pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
          >
            <span className={styles.icon} aria-hidden="true">
              <tab.icon />
            </span>
            <span className={styles.label}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
