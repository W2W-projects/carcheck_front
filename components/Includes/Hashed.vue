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
  <span class="blur-text">{{ props.contain === 'zero' ? '00' : 'XXXXX' }}</span>
</template>

<style scoped>
.blur-text {
  filter: blur(5px);
}
</style>