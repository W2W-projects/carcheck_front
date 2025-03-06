<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useCarStore } from '@/stores/car';

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

</script>

<template>
    <div v-if="userCarsList?.length" class="grid grid-cols-3 text-black gap-x-5">
        <div v-for="(car, index) in userCarsList" :key="index" v-show="index < 3 && car?.image && car?.reg_number"
            class="h-[12.5rem] rounded-xl bg-white flex flex-col items-center justify-between px-[1.7rem] py-[1.25rem]">
            <div class="flex w-full">
                <div class="flex items-center flex-1 space-x-1">
                    <div class="w-[0.8rem]">
                        <img src="#" class="w-full" alt="">
                    </div>
                    <div class="flex flex-col leading-3">
                        <small class="font-bold">{{ car.details?.make ?? car.details?.makeModel }}</small>
                        <p class="text-[0.5rem] font-bold text-[#CFCCCC]">{{ car.details?.makeModel }}</p>
                    </div>
                </div>
                <div>
                    <p class="text-[0.65rem] font-bold">{{ car.details?.yearOfManufacture }}</p>
                </div>
            </div>
            <div>
                <img :src="car.image" alt="" class="max-w-[9rem]">
            </div>

            <div class="flex w-full space-x-2">
                <div class="flex justify-between flex-1 space-x-1">
                    <div class="leading-3">
                        <div class="text-[0.5rem] space-x-1 flex items-center">
                            <span>Plate</span>
                        </div>
                        <div class="text-[0.7rem] uppercase font-bold">
                            {{ car.reg_number }}
                        </div>
                    </div>
                    <div class="leading-3">
                        <div class="text-[0.5rem] space-x-1 flex items-center">
                            <span>Mileage</span>
                        </div>
                        <div class="text-[0.7rem] font-bold">
                            {{ car.details?.mileage }}
                        </div>
                    </div>
                    <div class="leading-3">
                        <div class="text-[0.5rem] space-x-1 flex items-center">
                            <span>Type</span>
                        </div>
                        <div class="text-[0.7rem] font-bold">
                            {{ car.details?.fuelType }}
                        </div>
                    </div>
                    <div class="flex items-center space-x-1 text-[0.58rem]  font-bold text-[#C2C2C2]">
                        <p>See more</p>
                        <img src="/images/svg/icon-chev-right.svg" alt="Chevron">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isLoading">
        <p class="text-[0.9rem]">Fetching...</p>
    </div>

    <div v-else-if="!isLoading && userCarsList?.length === 0"
        class="flex items-center justify-center h-full text-center text-gray-400">
        <p>No previous checks.</p>
    </div>
</template>
