<script setup>
import { ref } from 'vue';
import { useStripe } from '@/composables/useStripe';
import Stripe from '~/components/Payment/Stripe.vue';

import { useSubscriptionStore } from '@/stores/subscription';
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(() => subscriptionStore.hasSubscription);

const { processPayment } = useStripe();
const isProcessing = ref(false);
const errorMessage = ref('');

onMounted(() => {
  if (hasSubscription.value?.active) {
    // navigateTo('/');
  }

  startTimer();
});

definePageMeta({
  title: 'Payment Checkout',
  meta: [
    { hid: 'Car check payment checkout', name: 'Car check payment checkout', content: 'Car check payment checkout' }
  ],
  layout: 'checkout',
  // middleware: ['plan-check', 'auth'],
});

const handlePayment = async () => {
  isProcessing.value = true;
  errorMessage.value = '';
  try {
    const result = await processPayment();
    if (!result.success) {
      errorMessage.value = result.message || 'Payment failed';
    } else {
      alert('Payment successful!');
      // Navigate or update UI accordingly
    }
  } catch (error) {
    errorMessage.value = error.message || 'An unexpected error occurred';
  } finally {
    isProcessing.value = false;
  }
};

const minutes = ref(14);
const seconds = ref(59);

const startTimer = () => {
  const interval = setInterval(() => {
    if (seconds.value === 0) {
      minutes.value ? (minutes.value--, seconds.value = 59) : clearInterval(interval);
    } else {
      seconds.value--;
    }
  }, 1000);

  onUnmounted(() => clearInterval(interval));
};
</script>

<template>

  <section class="relative p-0 m-0 overflow-hidden">
    <div class="flex lg:flex-row flex-col-reverse mx-auto lg:px-[9.12rem] lg:py-10 py-4 px-8 lg:space-x-5">
      <div class="flex-1 h-full md:mt-0 mt-10">
        <OrderSummary />
      </div>
      <div class="lg:w-[26.8rem] space-y-6">
        <div class="text-[1.6rem] flex items-center justify-center space-x-2">
          <span>
            <img src="/assets/svg/fire.svg" alt="">
          </span>
          <p class="text-black">
            Report stored for
          </p>
          <span class="text-primary w-[4rem] font-bold">
            {{ minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes }}:{{ seconds === 0 ? '00' : seconds < 10
              ? '0' + seconds : seconds }} </span>
        </div>
        <div class="lg:p-10 p-5 bg-white rounded-xl text-[#2C2C2C] shadow z-30">
          <Stripe />
        </div>
      </div>
    </div>

    <div class="w-full lg:absolute hidden bottom-[16.05%] -z-10">
      <div class="relative z-10">
        <img src="/images/webp/checkout-car.webp" class="w-[35rem] translate-x-[6.9rem] translate-y-[3.5rem]" alt="">
      </div>
      <img src="/images/webp/checkout-road.webp" class="w-full scale-[110%]" alt="">
    </div>

    <div class="mx-auto lg:px-[9.12rem] px-8 space-x-5 text-black leading-4 pt-4 pb-14">
      <small>Get your CarCheck report and full access to CarCheck for just £0.49 with a 2-day trial. After the trial,
        unless you cancel, the subscription will automatically renew at £39.95 per month. You can cancel anytime. Feel
        free to contact us with any questions.</small>
    </div>
  </section>
</template>

<style scoped></style>