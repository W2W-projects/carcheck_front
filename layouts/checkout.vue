<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageTitle = computed(() => route.meta?.title || 'Car Check');

useHead({
  title: pageTitle,
});

</script>

<template>
  <div class="bg-checkout min-h-screen" style="--checkout-bg: url('/images/webp/bg-checkout.webp')">
    <header class="flex h-24 items-start px-8 pt-12 lg:h-32 lg:items-center lg:px-[9.12rem] lg:pt-0">
      <img src="/svg/logo.svg" class="w-[5.25rem] lg:w-[9.15rem]" alt="Car Check">
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.bg-checkout {
  position: relative;
  background-color: #EEEEEE !important;
}

.bg-checkout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--checkout-bg) no-repeat center / cover;
  mix-blend-mode: color-burn;
  opacity: 10%;
  z-index: 1;
}

.bg-checkout>* {
  position: relative;
  z-index: 2;
}
</style>
