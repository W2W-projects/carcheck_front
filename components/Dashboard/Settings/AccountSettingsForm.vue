<script setup>
import { ref, reactive, computed, watch } from 'vue';
import countries from "~/static/countryData.json";

const authStore = useAuthStore();
const user = computed(() => authStore.getCurrentUser);

const form = reactive({
    first_name: '',
    last_name: '',
    email: null,
    country: null,
    phone: '',
    postcode: '',
    city: '',
    username: null,
});

const errors = reactive({});
const processing = ref(false);
const formSuccess = ref(false);

const resetFormWithUserData = () => {
    if (!user.value) return;

    Object.keys(form).forEach(key => {
        form[key] = user.value[key] || form[key];
    });
};

const submitForm = async () => {
    processing.value = true;
    formSuccess.value = false;

    try {
        await authStore.updateUserDetails(form);
        formSuccess.value = true;

        Object.keys(errors).forEach(key => errors[key] = null);

        await authStore.fetchUserDetails();

        setTimeout(() => formSuccess.value = false, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            Object.assign(errors, error.response.data.errors);
        } else {
            errors.general = 'An error occurred while updating your profile';
        }
    } finally {
        processing.value = false;
    }
};

// Simple, efficient watcher that triggers once and when data changes
watch(() => user.value, resetFormWithUserData, { immediate: true });
</script>

<template>
    <form @submit.prevent="submitForm" class="flex flex-col h-full">
        <div v-if="formSuccess" class="px-4 py-2 mx-8 mb-4 text-green-700 bg-green-100 rounded">
            Your profile has been updated successfully!
        </div>

        <div v-if="errors.general" class="px-4 py-2 mx-8 mb-4 text-red-700 bg-red-100 rounded">
            {{ errors.general }}
        </div>

        <div class="flex items-center justify-center flex-1 px-8 text-black md:py-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <!-- First Name -->
                <div class="col-span-1">
                    <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input id="first-name" type="text" class="block w-full mt-1 rounded" v-model="form.first_name" />
                    <div v-if="errors.first_name" class="mt-2 text-sm text-red-600">{{ errors.first_name }}</div>
                </div>

                <!-- Last Name -->
                <div class="col-span-1">
                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input id="last-name" type="text" class="block w-full mt-1 rounded" v-model="form.last_name" />
                    <div v-if="errors.last_name" class="mt-2 text-sm text-red-600">{{ errors.last_name }}</div>
                </div>

                <!-- Username -->
                <div class="col-span-1">
                    <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
                    <input id="username" disabled type="text" class="block w-full mt-1 text-gray-400 rounded disabled"
                        v-model="form.username" />
                    <div v-if="errors.username" class="mt-2 text-sm text-red-600">{{ errors.username }}</div>
                </div>

                <!-- Email -->
                <div class="col-span-1">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" disabled type="email" class="block w-full mt-1 text-gray-400 rounded disabled"
                        v-model="form.email" />
                    <div v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</div>
                </div>

                <!-- phone -->
                <div class="col-span-1">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                    <input id="phone" type="tel" class="block w-full mt-1 rounded" v-model="form.phone" />
                    <div v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</div>
                </div>

                <!-- Country -->
                <div class="col-span-1">
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <select v-model="form.country" class="block w-full mt-1 rounded">
                        <option disabled selected> -- Select Country --</option>
                        <option v-for="country in countries" :key="country.alpha2Code" :value="country.alpha2Code">{{
                            country.name }}</option>
                    </select>
                    <div v-if="errors.country" class="mt-2 text-sm text-red-600">{{ errors.country }}</div>
                </div>

                <!-- Postcode -->
                <div class="col-span-1">
                    <label for="postcode" class="block text-sm font-medium text-gray-700">Postcode</label>
                    <input id="postcode" type="text" class="block w-full mt-1 rounded" v-model="form.postcode" />
                    <div v-if="errors.postcode" class="mt-2 text-sm text-red-600">{{ errors.postcode }}</div>
                </div>

                <!-- City -->
                <div class="col-span-1">
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input id="city" type="text" class="block w-full mt-1 rounded" v-model="form.city" />
                    <div v-if="errors.city" class="mt-2 text-sm text-red-600">{{ errors.city }}</div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between px-8 mt-5 mb-4 text-black md:mt-0 bg-primary-blue">
            <p class="hidden md:block">Update your personal information</p>
            <button
                class="flex items-center justify-center space-x-2 text-white rounded bg-brand w-full md:w-[7.3125rem] h-[2.1875rem]"
                :disabled="processing">
                <span>
                    <img src="/assets/svg/update.svg" alt="">
                </span>
                <span>Update</span>
            </button>
        </div>
    </form>
</template>

<style scoped>
input:focus,
select:focus,
input:active,
select:active {
    border: 1px solid #FF7400 !important;
    outline: none !important;
    box-shadow: none !important;
}

input,
select {
    height: 2.93488rem;
    background-color: rgba(255, 165, 0, 0.06);
    border: 1px solid rgba(140, 140, 140, 0.2);
}
</style>
