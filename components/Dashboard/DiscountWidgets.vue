<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { useCarStore } from '@/stores/car';
import { useDiscountWidgetsStore } from '@/stores/dashboardDiscountWidgets';
import type { ApiRequestError, CustomPlan } from '~/types/models';

const envConfig = useRuntimeConfig();
const carStore = useCarStore();
const discountWidgetsStore = useDiscountWidgetsStore();
const errorMessage = ref<string | null>(null);
const stripePromise = shallowRef<Stripe | null>(null);
const check_colors = ['#60C5FF', '#1EE6A8', '#EF343A'];

const awaitingPayment = ref(false);
const selectedPlan = ref<CustomPlan | null>(null);

onMounted(async () => {
  try {
    stripePromise.value = await loadStripe(envConfig.public.stripe_public_key as string);
    await discountWidgetsStore.fetchDiscountWidgets();
  } catch (error) {
    console.error("Failed to fetch discount widgets:", error);
  }
});

const customPlans = computed(() => discountWidgetsStore.customPlans);
const mappedPlans = computed(() =>
  customPlans.value.map(item => ({
    ...item,
    pricePerCheck:
      item.reports_count && item.price_after_discount
        ? Number((Number(item.price_after_discount) / item.reports_count).toFixed(2))
        : null,
  }))
);

async function buyCustomPlan(plan: CustomPlan): Promise<void> {
  try {
    if (!plan.plan_code) {
      errorMessage.value = "No plan code provided.";
      return;
    }

    selectedPlan.value = plan;
    awaitingPayment.value = true;

    const response = await carStore.buyCustomPlan(plan);
    const result = response.payload;

    const stripe = stripePromise.value;
    if (!stripe) {
      console.error("Stripe.js not loaded");
      return;
    }

    // Ensure requires_action is true before calling handleCardAction
    if (result.requires_action && result.payment_intent_client_secret) {
      const { error, paymentIntent } = await stripe.handleCardAction(result.payment_intent_client_secret);

      if (error) {
        console.error("Payment authentication failed:", error);
        errorMessage.value = "Payment authentication failed. Please try again.";
        return;
      }

      // Confirm payment intent on the backend
      const confirmedPayment = await carStore.confirmPaymentIntent(paymentIntent.id);

      if (!confirmedPayment.success) {
        errorMessage.value = "Payment confirmation failed. Please try again.";
        return;
      }
    } else if (result.status === "succeeded") {
      await carStore.fetchRequestCounts();
    } else {
      return;
    }

    awaitingPayment.value = false;

  } catch (error: unknown) {
    errorMessage.value =
      (error as Partial<ApiRequestError>).data?.message ||
      "An error occurred while processing the payment.";
    console.error("Error processing payment:", error);
  } finally {
    setTimeout(() => {
      errorMessage.value = "";
      awaitingPayment.value = false;
    }, 5000);
  }
}

</script>

<template>
  <div class="h-auto min-h-[11.5rem] 2xl:min-h-[13rem] bg-white rounded-xl flex flex-col md:flex-row justify-between">
    <div class="flex flex-col justify-between px-4 pt-4 pb-6 text-black lg:px-9 md:px-5">
      <div class="pr-2 space-y-1 md:pr-8">
        <p class="text-xl font-bold md:text-2xl">
          Running out of <br /> checks ?
        </p>
        <p class="text-sm md:text-[0.9rem]">These offers are for you</p>
      </div>
      <div class="flex items-center space-x-1 font-bold">
        <small>
          Member-only discounts
        </small>
        <span>
          <img src="/public/images/svg/icon-chev-right.svg" alt="">
        </span>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row overflow-x-auto py-2 px-2 md:px-[1.1rem] md:py-[0.9rem] space-y-4 md:space-y-0 lg:space-x-5 md:space-x-2 2xl:my-auto">
      <div v-for="(pln, index) in mappedPlans" :key="pln.id"
        class="h-[9.4rem] w-full lg:w-[10.35rem] md:w-[10rem] rounded-lg px-[0.8rem] pt-[1.2rem] pb-[0.6rem] flex flex-col flex-shrink-0"
        :style="{ backgroundColor: `rgba(${parseInt(check_colors[index].slice(1, 3), 16)}, ${parseInt(check_colors[index].slice(3, 5), 16)}, ${parseInt(check_colors[index].slice(5, 7), 16)}, 0.30)` }">
        <!-- Plan content stays the same -->
        <div class="flex-1 space-y-2 text-center text-black">
          <div class="flex items-center justify-between">
            <div class="leading-[0.9rem] text-start">
              <p class="text-[0.95rem] font-extrabold">{{ pln.name }}</p>
              <p class="text-[0.7rem]">Full Report</p>
            </div>
            <p class="text-xl text-white outlined-text"
              style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
              -{{ pln.discount_percentage }}%
            </p>
          </div>
          <div class="leading-[0.4rem]">
            <small class="text-[0.7rem]">
              <span class="text-2xl"> £{{ pln.pricePerCheck }}</span>
              per check
            </small>
            <br />
            <small>
              You pay £{{ pln.price_after_discount }}
            </small>
          </div>
        </div>
        <button v-if="awaitingPayment && selectedPlan === pln" disabled class="w-full h-[1.95rem] transition-all duration-300 bg-green-500 text-white rounded-[0.4rem] text-[0.8rem] font-semibold
          flex items-center justify-center
          ">
          <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
        <button @click="buyCustomPlan(pln)" v-else
          class="w-full h-[1.95rem] bg-black text-white rounded-[0.4rem] text-[0.8rem] font-semibold">
          Get now
        </button>
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
