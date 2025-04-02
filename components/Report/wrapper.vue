<script lang="ts" setup>
const props = defineProps<{
  class?: string
}>()
</script>
<template>
  <section class="xl:px-[8.25rem] px-5 max-w-screen-2xl mx-auto w-full" :class="props.class">
    <slot />
  </section>
</template>