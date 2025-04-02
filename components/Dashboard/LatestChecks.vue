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
        <!-- Loading State - Improved for mobile -->
        <div v-if="isLoading" class="py-6 text-center sm:py-8">
            <div
                class="inline-block w-5 h-5 border-2 rounded-full sm:w-6 sm:h-6 border-t-primary border-primary-light animate-spin">
            </div>
            <p class="mt-2 text-[0.85rem] sm:text-[0.9rem]">Fetching your recent checks...</p>
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
