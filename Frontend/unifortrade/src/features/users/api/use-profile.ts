import { useFindById } from "@/lib/api/generated/user-controller/user-controller";

export function useProfile(id: number | undefined) {
  return useFindById(id as number, { swr: { enabled: id !== undefined } });
}
