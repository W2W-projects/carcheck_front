<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Features from '../Features.vue';

interface Props {
  theftCheck?: boolean;
  damageCheck?: boolean;
  carFeatures?: boolean;
  ownersHistory?: boolean;
  mileageHistory?: boolean;
  motHistory?: boolean;
}

defineProps<Props>();

const isVisible = ref(false);

const observerCallback: IntersectionObserverCallback = (entries) => {
  for (const entry of entries) {
    if (entry.target.id === 'report-info' && entry.isIntersecting) {
      isVisible.value = false;
    } else if (entry.target.id === 'show-bottom-bar' && !entry.isIntersecting) {
      isVisible.value = true;
    }
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0,
    rootMargin: '0px'
  });

  const triggerElement = document.getElementById('show-bottom-bar');
  const reportInfoElement = document.getElementById('report-info');

  if (triggerElement) observer.observe(triggerElement);
  if (reportInfoElement) observer.observe(reportInfoElement);

  onUnmounted(() => {
    if (triggerElement) observer.unobserve(triggerElement);
    if (reportInfoElement) observer.unobserve(reportInfoElement);
    observer.disconnect();
  });
});

</script>

<template>
  <div v-show="isVisible" role="region" aria-label="Download report"
    class="fixed inset-x-3 bottom-3 z-[1000] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-xl border border-black/5 bg-white shadow-[0_-2px_16px_rgba(0,0,0,0.14)] md:inset-x-0 md:bottom-0 md:max-h-none md:overflow-visible md:rounded-none">
    <div
      class="grid items-center max-w-7xl gap-3 px-4 py-3 mx-auto sm:grid-cols-[minmax(0,1fr)_18rem] sm:px-6 md:py-4 lg:px-8 xl:grid-cols-[auto_minmax(0,1fr)_18rem] xl:gap-8">
      <div class="text-xl leading-tight text-center text-black font-extralight sm:text-left md:text-2xl xl:text-3xl">
        Your report is <span class="font-bold text-gray-800">READY!</span>
      </div>
      <div class="hidden min-w-0 xl:block">
        <Features text-size="text-xs 2xl:text-sm"
          alignment="grid grid-cols-3 gap-x-4 gap-y-2" />
      </div>
      <IncludesGetFullReport class="w-full sm:w-72" />
    </div>
  </div>
</template>

<style scoped></style>
