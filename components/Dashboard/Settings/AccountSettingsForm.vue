<script setup>
import { ref, reactive } from 'vue';
import countries from "~/static/countryData.json";

const user = ref({});
const profile = ref({});

const fetchUserData = async () => {
    try {
        const response = await $fetch('/api/user-profile');
        user.value = response.user;
        profile.value = response.profile;

        form.first_name = profile.value.first_name || '';
        form.last_name = profile.value.last_name || '';
        form.email = user.value.email || '';
        form.country = profile.value.country || '';
        form.telephone = profile.value.telephone || '';
        form.postcode = profile.value.postcode || '';
        form.city = profile.value.city || '';
        form.user_id = profile.value.id;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

onMounted(fetchUserData);

// Form state
const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    telephone: '',
    postcode: '',
    city: '',
    user_id: '',
});

const errors = reactive({});
const processing = ref(false);
const formSuccess = ref(false);

const submitForm = async () => {
    processing.value = true;
    formSuccess.value = false;

    try {
        // Replace with your API endpoint
        await $fetch('/api/profile/update', {
            method: 'PATCH',
            body: form
        });

        // Show success message
        formSuccess.value = true;

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.value = false;
        }, 5000);

        // Clear any previous errors
        Object.keys(errors).forEach(key => {
            errors[key] = null;
        });
    } catch (error) {
        if (error.response?.data?.errors) {
            Object.assign(errors, error.response.data.errors);
        }
    } finally {
        processing.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="flex flex-col h-full">
        <div class="flex items-center justify-center flex-1 px-8 text-black md:py-0">
            <div class="grid grid-cols-2 gap-x-8 gap-y-8">
                <!-- First Name -->
                <div class="col-span-1">
                    <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input id="first-name" type="text" class="block w-full mt-1 border-gray-300 rounded bg-gray-50"
                        v-model="form.first_name" />
                    <div v-if="errors.first_name" class="mt-2 text-sm text-red-600">{{ errors.first_name }}</div>
                </div>

                <!-- Last Name -->
                <div class="col-span-1">
                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input id="last-name" type="text" class="block w-full mt-1 border-gray-300 rounded bg-gray-50"
                        v-model="form.last_name" />
                    <div v-if="errors.last_name" class="mt-2 text-sm text-red-600">{{ errors.last_name }}</div>
                </div>

                <!-- Username -->
                <div class="col-span-1">
                    <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
                    <input id="username" disabled type="text"
                        class="block w-full mt-1 border-gray-300 rounded disabled bg-gray-50" v-model="form.email" />
                    <div v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</div>
                </div>

                <!-- Email -->
                <div class="col-span-1">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" disabled type="email"
                        class="block w-full mt-1 border-gray-300 rounded disabled bg-gray-50" v-model="form.email" />
                    <div v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</div>
                </div>

                <!-- Telephone -->
                <div class="col-span-1">
                    <label for="telephone" class="block text-sm font-medium text-gray-700">Telephone</label>
                    <input id="telephone" type="tel" class="block w-full mt-1 border-gray-300 rounded bg-gray-50"
                        v-model="form.telephone" />
                    <div v-if="errors.telephone" class="mt-2 text-sm text-red-600">{{ errors.telephone }}</div>
                </div>

                <!-- Country -->
                <div class="col-span-1">
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <select v-model="form.country" class="block w-full mt-1 border-gray-300 rounded bg-gray-50">
                        <option disabled selected> -- Select Country --</option>
                        <option v-for="country in countries" :key="country.alpha2Code" :value="country.alpha2Code">{{
                            country.name }}</option>
                    </select>
                    <div v-if="errors.country" class="mt-2 text-sm text-red-600">{{ errors.country }}</div>
                </div>

                <!-- Postcode -->
                <div class="col-span-1">
                    <label for="postcode" class="block text-sm font-medium text-gray-700">Postcode</label>
                    <input id="postcode" type="text" class="block w-full mt-1 border-gray-300 rounded bg-gray-50"
                        v-model="form.postcode" />
                    <div v-if="errors.postcode" class="mt-2 text-sm text-red-600">{{ errors.postcode }}</div>
                </div>

                <!-- City -->
                <div class="col-span-1">
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input id="city" type="text" class="block w-full mt-1 border-gray-300 rounded bg-gray-50"
                        v-model="form.city" />
                    <div v-if="errors.city" class="mt-2 text-sm text-red-600">{{ errors.city }}</div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between px-8 py-6 text-black bg-primary-blue">
            <p>Update your personal information</p>
            <button class="flex items-center justify-center px-4 py-2 space-x-2 text-white rounded bg-primary"
                :disabled="processing">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 26 22" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.6545 0.367326C12.1443 -0.122442 12.9383 -0.122442 13.4281 0.367326L18.4446 5.38385C18.9344 5.87362 18.9344 6.66769 18.4446 7.15745C17.9549 7.64722 17.1608 7.64722 16.671 7.15745L13.7954 4.28187V15.0496C13.7954 15.7422 13.2339 16.3037 12.5413 16.3037C11.8487 16.3037 11.2872 15.7422 11.2872 15.0496V4.28187L8.41159 7.15745C7.92182 7.64722 7.12775 7.64722 6.63798 7.15745C6.14821 6.66769 6.14821 5.87362 6.63798 5.38385L11.6545 0.367326ZM3.76239 3.76239C3.06975 3.76239 2.50826 4.32388 2.50826 5.01652V17.5578C2.50826 18.2505 3.06975 18.812 3.76239 18.812H21.3202C22.0128 18.812 22.5743 18.2505 22.5743 17.5578V5.01652C22.5743 4.32388 22.0128 3.76239 21.3202 3.76239C20.6276 3.76239 20.0661 3.2009 20.0661 2.50826C20.0661 1.81562 20.6276 1.25413 21.3202 1.25413C23.3981 1.25413 25.0826 2.93861 25.0826 5.01652V17.5578C25.0826 19.6357 23.3981 21.3202 21.3202 21.3202H3.76239C1.68448 21.3202 0 19.6357 0 17.5578V5.01652C0 2.93861 1.68448 1.25413 3.76239 1.25413C4.45503 1.25413 5.01652 1.81562 5.01652 2.50826C5.01652 3.2009 4.45503 3.76239 3.76239 3.76239Z"
                            fill="white" />
                    </svg>
                </span>
                <span>Update</span>
            </button>
        </div>
    </form>
</template>

<style scoped>
input:focus,
select:focus {
    border: 1px solid var(--primary) !important;
    outline: none;
}

:root {
    --primary: #FF7400;
}
</style>
