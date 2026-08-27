<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import CarInfo from './CarInfo.vue';

const carStore = useCarStore();
const isLoading = ref(true);
const { carousel, updateCurrentSlide, startDrag, drag, endDrag } = useCarousel();

function startChecksDrag(event: PointerEvent) {
    if (window.matchMedia('(min-width: 768px)').matches || (event.target as HTMLElement).closest('button, a, input')) return;
    startDrag(event);
}

const filteredCars = computed(() => {
    if (!carStore.userCarsList?.length) return [];

    return carStore.userCarsList
        .filter(car => car?.image && car?.reg_number)
        .slice(0, 3);
});

const hasLoaded = ref(false);

onMounted(async () => {
    if (hasLoaded.value) return;

    try {
        await carStore.fetchCarsUserList();
        hasLoaded.value = true;
    } catch (error) {
        console.error("Failed to fetch data on mounted:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="min-w-0 space-y-4">
        <div v-if="isLoading"
            class="checks-scroll flex w-full min-w-0 gap-[10px] overflow-x-auto pl-[7.5vw] md:grid md:grid-cols-3 md:gap-4 md:overflow-hidden md:px-0"
            role="status"
            aria-label="Loading recent checks">
            <div v-for="item in 3" :key="item"
                class="w-[71.79vw] min-w-[230px] max-w-[280px] aspect-[258/182] flex-none rounded-xl bg-white px-6 py-4 md:h-[12.5rem] md:w-auto md:min-w-0 md:max-w-none md:aspect-auto md:px-[1.7rem] md:py-[1.25rem]">
                <div class="flex justify-between">
                    <UtilitiesSkeleton class="w-20 h-3" />
                    <UtilitiesSkeleton class="w-8 h-3" />
                </div>
                <UtilitiesSkeleton class="w-32 h-20 mx-auto mt-4" />
                <div class="flex justify-between mt-4">
                    <UtilitiesSkeleton class="w-12 h-3" />
                    <UtilitiesSkeleton class="w-12 h-3" />
                    <UtilitiesSkeleton class="w-12 h-3" />
                </div>
            </div>
            <span class="sr-only">Loading recent checks...</span>
        </div>

        <div v-else-if="filteredCars.length"
            ref="carousel"
            class="checks-scroll flex w-full min-w-0 cursor-grab select-none gap-[10px] overflow-x-auto pl-[7.5vw] active:cursor-grabbing md:grid md:cursor-auto md:select-auto md:grid-cols-3 md:gap-4 md:overflow-hidden md:px-0"
            @scroll.passive="updateCurrentSlide" @pointerdown="startChecksDrag" @pointermove="drag"
            @pointerup="endDrag" @pointercancel="endDrag" @pointerleave="endDrag">
            <CarInfo v-for="(car, index) in filteredCars" :key="car.id || index" :car="car"
                class="transition-all duration-300 hover:shadow-md" />
        </div>

        <!-- Empty State - More responsive -->
        <div v-else class="flex items-center justify-center py-8 text-center text-gray-400 sm:py-12">
            <div class="px-4">
                <p class="text-base sm:text-lg">No previous checks.</p>
                <p class="mt-2 text-xs sm:text-sm">Start checking vehicles to see them here.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checks-scroll {
    scrollbar-width: none;
}

.checks-scroll::-webkit-scrollbar {
    display: none;
}

@media (max-width: 767px) {
    .checks-scroll {
        width: 100vw;
        max-width: 100vw;
        overflow-x: scroll;
        overflow-y: hidden;
        overscroll-behavior-inline: contain;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
