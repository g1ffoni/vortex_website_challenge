import Link from "next/link";
import Container from "@/components/ui/container/Container";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <span className={styles.brand}>
              Unifor<span className={styles.brandAccent}>Trade</span>
            </span>
            <p className={styles.tagline}>
              A circular-economy marketplace for campus: pass along what you don&apos;t use
              anymore and help students who are just getting started.
            </p>
          </div>

          <div>
            <p className={styles.columnTitle}>Platform</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/listings">Browse listings</Link>
              </li>
              <li>
                <Link href="/listings/new">List an item</Link>
              </li>
              <li>
                <Link href="/dashboard">My listings</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.columnTitle}>Account</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/login">Log in</Link>
              </li>
              <li>
                <Link href="/register">Create account</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} UniforTrade — Vortex Lab.</span>
          <span>Made by students, for students.</span>
        </div>
      </Container>
    </footer>
  );
}
