import { useCreate1 } from "@/lib/api/generated/rating-controller/rating-controller";

export function useCreateRating(userId: number) {
  return useCreate1(userId);
}
