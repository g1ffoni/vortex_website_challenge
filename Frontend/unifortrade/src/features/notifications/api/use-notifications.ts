import { useFindAll } from "@/lib/api/generated/notification-controller/notification-controller";

export function useNotifications() {
  return useFindAll({ swr: { refreshInterval: 30_000 } });
}
