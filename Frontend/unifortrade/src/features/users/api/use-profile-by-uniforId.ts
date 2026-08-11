import { useFindByUniforId } from "@/lib/api/generated/user-controller/user-controller";

export function useProfileByUniforId(uniforId: string | undefined) {
  return useFindByUniforId(uniforId as string, {
    swr: { enabled: Boolean(uniforId) },
  });
}
