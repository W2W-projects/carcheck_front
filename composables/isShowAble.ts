import { computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useSubscriptionStore } from "~/stores/subscription";
import { useCarRegistrationSearchStore } from "~/stores/carRegistrationSearch";

export function useIsShowAble() {
  const authStore = useAuthStore();
  const subscriptionStore = useSubscriptionStore();
  const carRegistrationSearchStore = useCarRegistrationSearchStore();

  const user = computed(() => authStore.user);
  const subscription = computed(() => subscriptionStore.subscription);
  const hasSubscription = computed(() => subscriptionStore.hasSubscription);
  const allowFullReport = computed(
    () => carRegistrationSearchStore.allowFullReport
  );

  const isShowAble = computed(() => {
    if (allowFullReport.value) {
      return true;
    }

    if (
      !subscription.value ||
      !subscription.value.plan ||
      !hasSubscription.value ||
      !user.value
    ) {
      return false;
    }

    if (
      !(
        subscription.value.plan.plan_code === "48h-basic-subscription" &&
        hasSubscription.value.onTrial
      )
    ) {
      return (
        (user.value.request_count || 0) > 0 ||
        (user.value.one_off_request_count || 0) > 0
      );
    }

    return false;
  });

  return { isShowAble };
}
