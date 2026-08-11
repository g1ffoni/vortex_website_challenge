import { Suspense } from "react";
import type { Metadata } from "next";
import ListingsBrowser from "./ListingsBrowser";

export const metadata: Metadata = {
  title: "Listings — UniforTrade",
};

export default function ListingsPage() {
  return (
    <Suspense fallback={null}>
      <ListingsBrowser />
    </Suspense>
  );
}
