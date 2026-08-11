"use client";

import { useStats } from "@/features/stats";
import Container from "@/components/ui/container/Container";
import styles from "./Stats.module.css";

const numberFormatter = new Intl.NumberFormat("en-US");

function formatStat(value: number | undefined): string {
  return numberFormatter.format(value ?? 0);
}

export default function Stats() {
  const { data: stats, isLoading } = useStats();

  const tiles = [
    { label: "Registered students", value: stats?.registeredUsersCount },
    { label: "Items rehomed", value: stats?.completedClaimsCount },
    { label: "Sales completed", value: stats?.completedSaleClaimsCount },
    { label: "Donations made", value: stats?.completedDonationClaimsCount },
  ];

  return (
    <section className={styles.section} aria-label="Platform statistics">
      <Container>
        <div className={styles.grid}>
          {tiles.map((tile) => (
            <div key={tile.label} className={styles.tile}>
              <p className={styles.value}>{isLoading ? "—" : formatStat(tile.value)}</p>
              <p className={styles.label}>{tile.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
