import { useComplete } from "@/lib/api/generated/listing-controller/listing-controller";

export function useCompleteListing(id: number) {
  return useComplete(id);
}
