<script lang="ts" setup>
import { defineProps } from 'vue';
import featureData from '@/static/features.json';
const features = featureData.features.index;

const props = defineProps({
    moreFeatures: Array,
    addedMoreFeatures: Array,
    textSize: {
        type: String,
        default: 'text-xl'
    },
    alignment: {
        type: String,
        default: 'grid md:grid-cols-2 grid-cols-1 gap-x-[2.1rem] gap-y-[0.35rem]'
    }
});
</script>

<template>
    <div class="pl-1 text-black " :class="props.alignment">
        <div v-for="(feature, index) in features" :key="feature.id" class="flex items-center space-x-4">
            <img :src="`/assets/svg/${feature.icon}`" class="w-5" :alt="`Feature Icon ${index + 1}`">
            <p class="tracking-wider font-extralight" :class="props.textSize">{{ feature.title }}</p>
        </div>

        <!-- <div class="flex items-center space-x-2">
            <img src="assets/svg/damage-check.svg" class="w-6" alt="Feature Icon 1">
            <p class="font-extralight">Damage Check</p>
        </div>
        <div class="flex items-center space-x-2">
            <img src="assets/svg/owner-history.svg" class="w-6" alt="Feature Icon 2">
            <p class="font-extralight">Owners History</p>
        </div>
        <div class="flex items-center space-x-2">
            <img src="assets/svg/milage-history.svg" class="w-6" alt="Feature Icon 3">
            <p class="font-extralight">Mileage History</p>
        </div>
        <div class="flex items-center space-x-2">
            <img src="assets/svg/car-features.svg" class="w-6" alt="Feature Icon 4">
            <p class="font-extralight">Car Features</p>
        </div>
        <div class="flex items-center space-x-2">
            <img src="assets/svg/theft-check.svg" class="w-6" alt="Feature Icon 4">
            <p class="font-extralight">Theft Check</p>
        </div>
        <div class="flex items-center space-x-2">
            <img src="assets/svg/warning.svg" class="w-6" alt="Feature Icon 4">
            <p class="font-extralight">MOT History</p>
        </div> -->
        <div v-for="feature in props.addedMoreFeatures" :key="feature.id" class="flex items-center space-x-4">
            <img :src="`/svg/${feature.icon}`" class="w-5" :alt="`Feature Icon ${feature.id}`" />
            <p class="text-xl tracking-wider font-extralight">{{ feature.title }}</p>
        </div>
    </div>
</template>