import { useDismiss } from "@/lib/api/generated/notification-controller/notification-controller";

export function useDismissNotification(id: number) {
  return useDismiss(id);
}
