<script setup>
import { reactive, ref } from 'vue';
import ApiService from '~/services/apiService';

const { appName, contactEmail, contactPhone } = useRuntimeConfig().public;
const phoneHref = `tel:${contactPhone.replace(/[^\d+]/g, '')}`;
const form = reactive({ name: '', email: '', message: '' });
const submitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function submitForm() {
  if (submitting.value) return;

  submitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await ApiService.post('contact', {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    form.name = '';
    form.email = '';
    form.message = '';
    successMessage.value = 'Your message has been sent. We’ll be in touch soon.';
  } catch (error) {
    const firstValidationError = Object.values(error?.data?.errors || {}).flat()[0];
    errorMessage.value = error?.status === 422
      ? firstValidationError || 'Please check your details and try again.'
      : error?.status === 429
        ? 'Too many messages. Please wait a few minutes before trying again.'
        : 'We could not send your message. Please try again.';
  } finally {
    submitting.value = false;
  }
}

definePageMeta({ title: 'Contact Us' });
</script>

<template>
  <section class="px-4 pb-20 font-norms text-[#0f1829] sm:px-6 lg:pb-28">
    <div class="mx-auto grid max-w-[1240px] overflow-hidden rounded-[28px] bg-[#0f1829] lg:grid-cols-2">
      <div class="relative overflow-hidden px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
        <div class="relative z-10">
          <p class="mb-5 text-xs font-bold tracking-[.18em] text-[#ff9a46]">{{ appName.toUpperCase() }} / SUPPORT</p>
          <h1 class="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Let's talk<span class="text-brand">.</span></h1>
          <p class="max-w-md text-lg leading-7 text-[#cbd2dd]">Questions about a vehicle report or your account? Send us a message and our team will help.</p>
          <div class="mt-12 border-t border-white/20 pt-7">
            <p class="mb-2 text-sm text-[#aeb8c7]">Email</p>
            <a :href="`mailto:${contactEmail}`" class="break-all text-lg font-bold text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-[#ff9a46]">{{ contactEmail }}</a>
            <p class="mb-2 mt-6 text-sm text-[#aeb8c7]">Phone</p>
            <a :href="phoneHref" class="text-lg font-bold text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-[#ff9a46]">{{ contactPhone }}</a>
          </div>
        </div>
        <div class="pointer-events-none absolute -bottom-44 -right-48 h-[450px] w-[450px] rounded-full border border-white/10" aria-hidden="true"></div>
      </div>

      <div class="bg-white px-7 py-12 sm:px-12 lg:py-16">
        <h2 class="mb-2 text-3xl font-bold">Send us a message</h2>
        <p class="mb-8 text-[#596576]">Fill in the form below and we’ll get back to you by email.</p>

        <form class="space-y-5" @submit.prevent="submitForm">
          <div>
            <label for="contact-name" class="mb-2 block text-sm font-bold">Full name</label>
            <input id="contact-name" v-model="form.name" type="text" name="name" autocomplete="name" required minlength="2" maxlength="120" placeholder="Your name" class="w-full rounded-xl border border-[#d6dce3] bg-white px-4 py-3 text-[#0f1829] outline-none placeholder:text-[#929ba8] focus:border-brand focus:ring-2 focus:ring-brand/20">
          </div>
          <div>
            <label for="contact-email" class="mb-2 block text-sm font-bold">Email address</label>
            <input id="contact-email" v-model="form.email" type="email" name="email" autocomplete="email" required maxlength="255" placeholder="you@example.com" class="w-full rounded-xl border border-[#d6dce3] bg-white px-4 py-3 text-[#0f1829] outline-none placeholder:text-[#929ba8] focus:border-brand focus:ring-2 focus:ring-brand/20">
          </div>
          <div>
            <label for="contact-message" class="mb-2 block text-sm font-bold">Message</label>
            <textarea id="contact-message" v-model="form.message" name="message" required minlength="10" maxlength="5000" rows="6" placeholder="Tell us how we can help" class="w-full resize-y rounded-xl border border-[#d6dce3] bg-white px-4 py-3 text-[#0f1829] outline-none placeholder:text-[#929ba8] focus:border-brand focus:ring-2 focus:ring-brand/20"></textarea>
          </div>

          <p v-if="errorMessage" role="alert" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{{ errorMessage }}</p>
          <p v-if="successMessage" role="status" class="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{{ successMessage }}</p>

          <button type="submit" :disabled="submitting" class="inline-flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3 font-bold text-[#0f1829] transition-colors hover:bg-[#ff9a46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f1829] disabled:cursor-wait disabled:opacity-60">
            {{ submitting ? 'Sending...' : 'Send message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
