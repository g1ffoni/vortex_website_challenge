import { useGetStats } from "@/lib/api/generated/stats-controller/stats-controller";

export function useStats() {
  return useGetStats();
}
