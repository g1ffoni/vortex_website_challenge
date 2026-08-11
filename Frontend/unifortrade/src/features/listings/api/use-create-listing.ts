import { useCreate2 } from "@/lib/api/generated/listing-controller/listing-controller";

export function useCreateListing() {
  return useCreate2();
}
