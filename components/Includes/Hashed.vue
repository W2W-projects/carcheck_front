<script setup lang="ts">
// type DisplayType = '0' | 'X';

// const props = defineProps<{
//   contain?: string;
//   // count: number,
//   // type: DisplayType
// }>();

const props = defineProps<{ contain?: String }>();

</script>

<template>
  <span v-if="props.contain==='stars'" class="text-gray-500">*******</span>
  <span v-else class="blur-text">{{ props.contain === 'zero' ? '00' : 'XXXXX' }}</span>
</template>

<style scoped>
.blur-text {
  filter: blur(13px);
}
</style>