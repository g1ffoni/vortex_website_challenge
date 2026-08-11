import { useGetSelf } from "@/lib/api/generated/self-controller/self-controller";

export function useSelf(enabled: boolean) {
  return useGetSelf({ swr: { enabled } });
}
