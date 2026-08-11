import { useClaim } from "@/lib/api/generated/listing-controller/listing-controller";

export function useClaimListing(id: number) {
  return useClaim(id);
}
