import useSWR from "swr";
import { apiFetch } from "@/lib/api/mutator";
import type {
  ListingSearchRequest,
  Pageable,
  PageResponseListingSummaryResponse,
} from "@/lib/api/generated/models";

export type ListingFilters = ListingSearchRequest & Pageable;

function searchListings(filters: ListingFilters) {
  return apiFetch<PageResponseListingSummaryResponse>({
    url: "/api/listings",
    method: "GET",
    params: filters,
  });
}

const DEFAULT_FILTERS: ListingFilters = { size: 24, sort: ["createdAt,desc"] };

export function useListings(filters: ListingFilters = DEFAULT_FILTERS) {
  const key = ["/api/listings", filters] as const;
  return useSWR(key, () => searchListings(filters));
}
