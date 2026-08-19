<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

const route = useRoute();
const pageTitle = computed(() => route.meta?.title || 'Car Check');

useHead({
  title: pageTitle,
});

</script>

<template>
  <div class="bg-checkout min-h-screen" style="--checkout-bg: url('/images/webp/bg-checkout.webp')">
    <Header />
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
  background: var(--checkout-bg) no-repeat center center;
  background-repeat: no-repeat !important;
  background-size: 120%;
  opacity: 2%;
  z-index: 1;
}

.bg-checkout>* {
  position: relative;
  z-index: 2;
}
</style>
