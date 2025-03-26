<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['close-modal']);

const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const errors = reactive({});
const processing = ref(false);
const formSuccess = ref(false);

const updatePassword = async () => {
    processing.value = true;
    formSuccess.value = false;

    try {
        await $fetch('/api/password/update', {
            method: 'PATCH',
            body: form,
        });

        formSuccess.value = true;

        Object.keys(form).forEach(key => {
            form[key] = '';
        });

        emit('close-modal');

        setTimeout(() => {
            formSuccess.value = false;
        }, 5000);

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
    <form @submit.prevent="updatePassword" class="flex flex-col h-full">
        <div class="flex items-center justify-center flex-1 text-black md:py-0">
            <div class="grid w-full grid-cols-1 px-6 gap-y-8">
                <!-- Current Password -->
                <div>
                    <label for="current-password" class="block text-sm font-medium text-gray-700">Current
                        Password</label>
                    <div class="flex items-center justify-around gap-x-2">
                        <div class="flex items-center justify-center w-10 h-10 my-auto rounded-md bg-primary">

                            <img src="/assets/svg/lock-closed.svg" alt="">

                        </div> <!-- Space for SVG -->
                        <input id="current-password" type="password" class="block w-full mt-1 rounded"
                            v-model="form.current_password" required />
                    </div>
                    <div v-if="errors.current_password" class="mt-2 text-sm text-red-600">{{ errors.current_password }}
                    </div>
                </div>

                <!-- New Password -->
                <div>
                    <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
                    <div class="flex items-center justify-around gap-x-2">
                        <div class="flex items-center justify-center w-10 h-10 my-auto rounded-md bg-primary">

                            <img src="/assets/svg/lock-closed.svg" alt="">

                        </div> <!-- Space for SVG -->
                        <input id="new-password" type="password" class="block w-full mt-1 rounded"
                            v-model="form.password" required />
                    </div>
                    <div v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</div>
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="password-confirmation" class="block text-sm font-medium text-gray-700">Confirm
                        Password</label>
                    <div class="flex items-center justify-around gap-x-2">
                        <div class="flex items-center justify-center w-10 h-10 my-auto rounded-md bg-primary">

                            <img src="/assets/svg/lock-closed.svg" alt="">

                        </div> <!-- Space for SVG -->
                        <input id="password-confirmation" type="password" class="block w-full mt-1 rounded"
                            v-model="form.password_confirmation" required />
                    </div>
                    <div v-if="errors.password_confirmation" class="mt-2 text-sm text-red-600">{{
                        errors.password_confirmation }}</div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between px-8 mb-4 text-black bg-primary-blue">
            <p>Update your password</p>
            <button
                class="flex items-center justify-center space-x-2 text-white rounded bg-primary w-[7.3125rem] h-[2.1875rem]"
                :disabled="processing">
                <span>


                    <img src="/assets/svg/update.svg" alt="">

                </span>
                <span>Update</span>
            </button>
        </div>

        <div v-if="formSuccess" class="px-8 py-4 text-center text-white bg-green-500">
            Password updated successfully.
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
    height: 3.1875rem;
    background-color: rgba(255, 165, 0, 0.06);
    border: 1px solid rgba(140, 140, 140, 0.2);
}
</style>
