import { useFindById1 } from "@/lib/api/generated/listing-controller/listing-controller";

export function useListing(id: number | undefined) {
  return useFindById1(id as number, { swr: { enabled: id !== undefined } });
}
