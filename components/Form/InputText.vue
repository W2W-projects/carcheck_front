<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <input type="email" id="email"
        class="bg-gray-50 border-2 border-black text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>