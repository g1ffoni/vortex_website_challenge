import { useFindAllByOrderByNameAsc } from "@/lib/api/generated/category-controller/category-controller";

export function useCategories() {
  return useFindAllByOrderByNameAsc();
}
