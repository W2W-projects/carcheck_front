<script lang="ts" setup>
const props = defineProps<{
  class?: string
}>()
</script>
<template>
  <section class="w-full max-w-screen-2xl px-9 mx-auto md:px-5 xl:px-[8.25rem]" :class="props.class">
    <slot />
  </section>
</template>
