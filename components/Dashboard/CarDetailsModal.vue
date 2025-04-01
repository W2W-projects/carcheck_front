<template>
    <Teleport to="body">
        <div v-if="isOpen"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto text-black bg-black bg-opacity-50">
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 relative">
                <!-- Close button in top right -->
                <button @click="close" class="absolute text-gray-500 top-2 right-2 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Modal header -->
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-bold">
                            {{ carData.make || car?.details?.make }}
                            {{ carData.makeModel || car?.details?.makeModel }}
                        </h3>
                        <p class="font-bold">{{ carData.vrm || car?.reg_number }}</p>
                    </div>
                </div>

                <!-- Modal body -->
                <div class="p-4">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <!-- Vehicle Images -->
                        <div class="relative p-4 border rounded-lg">
                            <div class="absolute left-0 flex items-center top-2">
                                <img :src="carData.vbrand_logo || car?.details?.vbrand_logo" alt="Brand Logo"
                                    class="h-8">
                            </div>
                            <img :src="carData.imageUrl || car?.image" alt="Vehicle Image"
                                class="w-full h-auto rounded">
                        </div>

                        <!-- Vehicle Details -->
                        <div class="p-4 border rounded-lg">
                            <h4 class="mb-2 font-bold">Vehicle Details</h4>
                            <div class="grid grid-cols-2 gap-2 text-sm">
                                <div><span class="font-medium">Make:</span> {{ carData.make || car?.details?.make }}
                                </div>
                                <div><span class="font-medium">Model:</span> {{ carData.makeModel ||
                                    car?.details?.makeModel }}</div>
                                <div><span class="font-medium">VRM:</span> {{ carData.vrm || car?.reg_number }}</div>
                                <div><span class="font-medium">Year:</span> {{ carData.yearOfManufacture ||
                                    car?.details?.yearOfManufacture }}</div>
                                <div><span class="font-medium">Fuel Type:</span> {{ carData.fuelType ||
                                    car?.details?.fuelType }}</div>
                                <div><span class="font-medium">Color:</span> {{ carData.color || car?.details?.color }}
                                </div>
                                <div><span class="font-medium">Mileage:</span> {{ carData.mileage ||
                                    car?.details?.mileage }}</div>
                            </div>
                        </div>

                        <!-- MOT History -->
                        <div v-if="motHistory?.RecordList?.length"
                            class="col-span-1 p-4 border rounded-lg md:col-span-2">
                            <h4 class="mb-2 font-bold">MOT History</h4>
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div v-for="(mot, index) in motHistory.RecordList.slice(0, 6)" :key="index"
                                    class="p-3 border rounded-lg">
                                    <div class="flex justify-between mb-1">
                                        <span class="font-medium">{{ mot.TestDate }}</span>
                                        <span
                                            :class="mot.TestResult === 'Pass' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'">
                                            {{ mot.TestResult }}
                                        </span>
                                    </div>
                                    <p class="text-sm">Mileage: {{ mot.OdometerReading }} {{ mot.OdometerUnit }}</p>
                                    <p v-if="mot.ExpiryDate" class="text-sm">Expires: {{ mot.ExpiryDate }}</p>
                                    <div v-if="mot.AdvisoryNoticeList?.length" class="mt-2">
                                        <p class="text-sm font-medium">Advisories:</p>
                                        <ul class="pl-4 overflow-y-auto text-xs list-disc max-h-24">
                                            <li v-for="(advisory, i) in mot.AdvisoryNoticeList" :key="i" class="mb-1">{{
                                                advisory }}</li>
                                        </ul>
                                    </div>
                                    <div v-if="mot.FailureReasonList?.length" class="mt-2">
                                        <p class="text-sm font-medium text-red-500">Failures:</p>
                                        <ul class="pl-4 overflow-y-auto text-xs text-red-500 list-disc max-h-24">
                                            <li v-for="(failure, i) in mot.FailureReasonList" :key="i" class="mb-1">{{
                                                failure }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="flex justify-between p-4 border-t">
                    <button @click="close" class="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300">
                        Close
                    </button>
                    <button @click="downloadFullReport"
                        class="px-4 py-2 text-white rounded bg-primary hover:bg-primary-dark">
                        Download Full Report
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    car: {
        type: Object,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isOpen', 'download']);

// Handle different car data structures
const carData = computed(() => {
    // If car has details property, it might be from saved car
    if (props.car.details) {
        return props.car.details;
    }
    // Otherwise use the car object directly
    return props.car;
});

// Get MOT history from either structure
const motHistory = computed(() => {
    if (props.car.details?.motHistory) {
        return props.car.details.motHistory;
    } else if (props.car.motHistory) {
        return props.car.motHistory;
    } else {
        return null;
    }
});

function close() {
    emit('update:isOpen', false);
}

function downloadFullReport() {
    emit('download', props.car);
}
</script>

<style scoped>
/* Optional: Add custom styling here */
</style>