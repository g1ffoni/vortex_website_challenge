import { usePatch1 } from "@/lib/api/generated/listing-controller/listing-controller";

export function useUpdateListing(id: number) {
  return usePatch1(id);
}
