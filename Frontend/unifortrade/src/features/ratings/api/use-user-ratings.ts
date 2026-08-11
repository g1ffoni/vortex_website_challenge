import { useFindByUserId } from "@/lib/api/generated/rating-controller/rating-controller";

export function useUserRatings(userId: number | undefined) {
  return useFindByUserId(userId as number, { swr: { enabled: userId !== undefined } });
}
