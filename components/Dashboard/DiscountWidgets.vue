<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { useCarStore } from '@/stores/car';
import ApiService from '~/services/apiService';
import { useDiscountWidgetsStore } from '@/stores/dashboardDiscountWidgets';

const envConfig = useRuntimeConfig();
const carStore = useCarStore();
const discountWidgetsStore = useDiscountWidgetsStore();
const errorMessage = ref(null);
const stripePromise = ref(null);
const check_colors = ['#60C5FF', '#1EE6A8', '#EF343A'];
const payment_method = ref(null);

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
  customPlans.value.map(item => {
    item.pricePerCheck =
      item.reports_count && item.price_after_discount
        ? Number((item.price_after_discount / item.reports_count).toFixed(2))
        : null;
    return item;
  })
);

async function buyCustomPlan(plan) {
  try {
    if (!plan.plan_code) {
      errorMessage.value = "No plan code provided.";
      return;
    }

    const response = await carStore.buyCustomPlan(plan);
    const result = response.payload;

    const stripe = stripePromise.value;
    if (!stripe) {
      console.error("Stripe.js not loaded");
      return;
    }

    console.log("Payment intent response: ", result);

    // Ensure requires_action is true before calling handleCardAction
    if (result.requires_action && result.client_secret) {
      console.log("3D Secure required. Handling authentication...");

      const { error, paymentIntent } = await stripe.handleCardAction(result.client_secret);

      if (error) {
        console.error("Payment authentication failed:", error);
        errorMessage.value = "Payment authentication failed. Please try again.";
        return;
      }

      // Confirm payment intent on the backend
      const confirmedPayment = await ApiService.post("confirm-payment-intent", {
        payment_intent_id: paymentIntent.id,
      });

      if (!confirmedPayment.success) {
        console.error("Payment confirmation failed:", confirmedPayment);
        errorMessage.value = "Payment confirmation failed. Please try again.";
        return;
      }

      console.log("Payment confirmed successfully!", confirmedPayment);
    } else if (result.status === "succeeded") {
      
      console.log("Payment completed successfully:", result);
    } else {
      console.log("Plan purchased successfully:", result);
    }
  } catch (error) {
    errorMessage.value = error.data?.message || "An error occurred while processing the payment.";
    console.error("Error processing payment:", error);
  } finally {
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  }
}

</script>

<template>
  <div class="h-[11.5rem] bg-white rounded-xl flex justify-between">
    <div class="px-9 pt-4 pb-6 text-black flex flex-col justify-between">
      <div class="space-y-1 pr-8">
        <p class="text-2xl font-bold">
          You are running out of checks ?
        </p>
        <p class="text-[0.9rem]">These offers are for you</p>
      </div>
      <div class="flex items-center space-x-1 font-bold">
        <small>
          Get a new plan instead
        </small>
        <span>
          <img src="/public/images/svg/icon-chev-right.svg" alt="">
        </span>
      </div>
    </div>
    <div class="flex px-[1.1rem] py-[0.9rem] space-x-5">
      <div v-for="(pln, index) in mappedPlans" :key="pln.id"
        class="h-[9.4rem] w-[10.35rem] rounded-lg px-[0.8rem] pt-[1.2rem] pb-[0.6rem] flex flex-col"
        :style="{ backgroundColor: `rgba(${parseInt(check_colors[index].slice(1, 3), 16)}, ${parseInt(check_colors[index].slice(3, 5), 16)}, ${parseInt(check_colors[index].slice(5, 7), 16)}, 0.30)` }">
        <div class="flex-1 text-center space-y-2 text-black">
          <div class="leading-[0.8rem]">
            <p class="text-[1.2rem] font-bold">{{ pln.name }}</p>
            <p class="text-[0.7rem]">Full Report</p>
          </div>
          <div class="leading-[0.2rem]">
            <p class="text-3xl font-bold outlined-text">-{{ pln.discount_percentage }}%</p>
            <p class="text-[0.6rem]"> £{{ pln.pricePerCheck }} per check</p>
          </div>
        </div>
        <button @click="buyCustomPlan(pln)"
          class="w-full h-[1.95rem] bg-black text-white rounded-[0.4rem] text-[0.8rem] font-semibold">
          Get now
        </button>
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
