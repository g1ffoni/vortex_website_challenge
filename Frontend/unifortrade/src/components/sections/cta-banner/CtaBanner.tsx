import Container from "@/components/ui/container/Container";
import LinkButton from "@/components/ui/button/LinkButton";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.banner}>
          <h2 className={styles.title}>Ready to give what you don&apos;t use a new home?</h2>
          <p className={styles.subtitle}>
            Listing takes less than 2 minutes. Donations are even faster.
          </p>
          <div className={styles.actions}>
            <LinkButton href="/listings/new" variant="secondary" className={styles.secondaryAction}>
              List an item
            </LinkButton>
            <LinkButton href="/listings" variant="ghost" className={styles.ghostAction}>
              Browse listings
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
