<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCarStore } from '@/stores/car';
const carStore = useCarStore();

const isLoading = ref(true);

interface UserCars {
    model: null;
    image: null;
    plate: null;
    mileage: null;
    type: null;
}

onMounted(async () => {
    try {
        await carStore.fetchCarsUserList();
        isLoading.value = false;
    } catch (error) {
        console.error("Failed to fetch data on mounted:", error);
    }
});
const userCarsList = computed<UserCars>(() => carStore.userCarsList);
</script>

<template>
    <div>
        <template v-if="userCarsList.length > 0">
            <div v-for="(car, index) in userCarsList" :key="index"
                class="h-[12.5rem] rounded-xl bg-white flex flex-col items-center justify-between px-[1.7rem] py-[1.25rem]">
                <div class="flex w-full">
                    <div class="flex-1 flex items-center space-x-1">
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
                    <img :src="car.image" alt="">
                </div>

                <div class="w-full flex space-x-2">
                    <div class="w-[70%] flex justify-between space-x-1">
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
                    </div>
                    <div class="flex items-center space-x-1 text-[0.68rem] font-bold w-[30%] text-[#C2C2C2]">
                        <p>See more</p>
                        <img src="/public/images/svg/icon-chev-right.svg" alt="">
                    </div>
                </div>
            </div>
        </template>

        <div v-if="isLoading" >
            <p class="text-[0.9rem]">Fetching...</p>
        </div>
    </div>
</template>
