import { usePatchSelf } from "@/lib/api/generated/self-controller/self-controller";

export function useUpdateSelf() {
  return usePatchSelf();
}
