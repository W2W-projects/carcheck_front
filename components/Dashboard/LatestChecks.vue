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
        <div v-if="isLoading" class="py-8 text-center">
            <div class="inline-block w-6 h-6 border-2 rounded-full border-t-primary border-primary-light animate-spin">
            </div>
            <p class="mt-2 text-[0.9rem]">Fetching your recent checks...</p>
        </div>

        <div v-else-if="filteredCars.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CarInfo v-for="(car, index) in filteredCars" :key="car.id || index" :car="car" />
        </div>

        <div v-else class="flex items-center justify-center py-12 text-center text-gray-400">
            <div>
                <p>No previous checks.</p>
                <p class="mt-2 text-sm">Start checking vehicles to see them here.</p>
            </div>
        </div>
    </div>
</template>
