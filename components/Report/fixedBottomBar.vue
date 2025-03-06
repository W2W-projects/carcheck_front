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
  <report-wrapper v-show="isVisible" class="bg-white">
    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[1000] py-4 lg:px-[8rem]">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap items-center justify-between md:flex-nowrap">
          <div class="text-3xl text-black font-extralight">
            Your report is <span class="font-bold text-gray-800">READY!</span>
          </div>
          <div>
            <Features text-size="text-sm" alignment="grid grid-cols-3 gap-x-4 gap-y-2" />
          </div>
          <IncludesGetFullReport />
        </div>
      </div>
    </div>
  </report-wrapper>
</template>

<style scoped></style>