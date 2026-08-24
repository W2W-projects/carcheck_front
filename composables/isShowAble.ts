import { computed } from "vue";
import { useCarRegistrationSearchStore } from "~/stores/carRegistrationSearch";

export function useIsShowAble() {
  const carRegistrationSearchStore = useCarRegistrationSearchStore();

  const isShowAble = computed(() => carRegistrationSearchStore.allowFullReport);

  return { isShowAble };
}
