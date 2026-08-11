import { useCreate } from "@/lib/api/generated/user-controller/user-controller";

export function useRegister() {
  return useCreate();
}
