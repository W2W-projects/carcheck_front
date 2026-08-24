<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import CarInfo from './CarInfo.vue';

const carStore = useCarStore();
const isLoading = ref(true);

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
    <div class="space-y-4">
        <div v-if="isLoading" class="grid grid-cols-1 gap-3 sm:gap-4 xs:grid-cols-2 md:grid-cols-3" role="status"
            aria-label="Loading recent checks">
            <div v-for="item in 3" :key="item"
                class="h-[12.5rem] rounded-xl bg-white px-[1.7rem] py-[1.25rem]">
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

        <!-- Car Grid - Responsive layout improved -->
        <div v-else-if="filteredCars.length"
            class="grid grid-cols-1 gap-3 overflow-hidden sm:gap-4 xs:grid-cols-2 md:grid-cols-3">
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
