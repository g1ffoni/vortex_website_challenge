import { useGetContact } from "@/lib/api/generated/listing-controller/listing-controller";

export function useListingContact(id: number | undefined) {
  return useGetContact(id as number, { swr: { enabled: id !== undefined } });
}
