import { useCancelClaim } from "@/lib/api/generated/listing-controller/listing-controller";

export function useCancelListingClaim(id: number) {
  return useCancelClaim(id);
}
