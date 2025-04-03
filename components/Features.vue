<script lang="ts" setup>
import { defineProps } from 'vue';
import featureData from '@/static/features.json';
const features = featureData.features.index;

const props = defineProps({
    moreFeatures: Array,
    addedMoreFeatures: Array,
    textSize: {
        type: String,
        default: 'md:text-xl text:xs'
    },
    alignment: {
        type: String,
        default: 'grid md:grid-cols-2 grid-cols-2 gap-x-[2.1rem] gap-y-[0.35rem]'
    }
});
</script>

<template>
    <div class="pl-1 text-black " :class="props.alignment">
        <div v-for="(feature, index) in features" :key="feature.id" class="flex items-center space-x-4">
            <img :src="`/assets/svg/${feature.icon}`" class="w-5" :alt="`Feature Icon ${index + 1}`">
            <p class="md:tracking-wider font-extralight" :class="props.textSize">{{ feature.title }}</p>
        </div>

        <div v-for="feature in props.addedMoreFeatures" :key="feature.id" class="flex items-center space-x-4">
            <img :src="`/svg/${feature.icon}`" class="w-5" :alt="`Feature Icon ${feature.id}`" />
            <p class="md:tracking-wider font-extralight" :class="props.textSize">{{ feature.title }}</p>
        </div>
    </div>
</template>