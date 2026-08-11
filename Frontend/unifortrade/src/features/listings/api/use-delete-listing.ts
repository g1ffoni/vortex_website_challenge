import { useDelete1 } from "@/lib/api/generated/listing-controller/listing-controller";

export function useDeleteListing(id: number) {
  return useDelete1(id);
}
