<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import CarInfo from './CarInfo.vue';

const carStore = useCarStore();
const isLoading = ref(true);

interface UserCars {
    model: string | null;
    image: string | null;
    plate: string | null;
    mileage: number | null;
    type: string | null;
}

onMounted(async () => {
    try {
        await carStore.fetchCarsUserList();
    } catch (error) {
        console.error("Failed to fetch data on mounted:", error);
    } finally {
        isLoading.value = false;
    }
});

const userCarsList = computed<UserCars[]>(() => carStore.userCarsList);

console.log(userCarsList.value);


</script>

<template>
    <div v-if="userCarsList?.length" class="grid grid-cols-3 text-black gap-x-5">
        <CarInfo v-for="(car, index) in userCarsList" :key="index" v-show="index < 3 && car?.image && car?.reg_number"
            :car="car" />
    </div>

    <div v-if="isLoading">
        <p class="text-[0.9rem]">Fetching...</p>
    </div>

    <div v-else-if="!isLoading && userCarsList?.length === 0"
        class="flex items-center justify-center h-full text-center text-gray-400">
        <p>No previous checks.</p>
    </div>
</template>
