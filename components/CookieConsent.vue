<script setup lang="ts">
type Preferences = {
  strictlyNecessary: true;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

const emptyPreferences = (): Preferences => ({
  strictlyNecessary: true,
  performance: false,
  functional: false,
  targeting: false,
});

const { appName } = useRuntimeConfig().public;
const consent = useCookie<Preferences | null>('carcheck_consent_settings', {
  maxAge: 60 * 60 * 24 * 365,
  path: '/',
  sameSite: 'lax',
  secure: import.meta.client && location.protocol === 'https:',
});
const settingsOpen = useState<boolean>('cookieSettingsOpen', () => false);
const dialog = ref<HTMLDialogElement | null>(null);
const preferences = ref<Preferences>(emptyPreferences());
const managing = ref(false);

function open(manage = false) {
  managing.value = manage;
  if (!dialog.value?.open) dialog.value?.showModal();
}

function save(choice: Preferences) {
  preferences.value = { ...choice, strictlyNecessary: true };
  consent.value = preferences.value;
  settingsOpen.value = false;
  dialog.value?.close();
}

onMounted(() => {
  const saved = consent.value;
  if (saved?.strictlyNecessary === true &&
    typeof saved.performance === 'boolean' &&
    typeof saved.functional === 'boolean' &&
    typeof saved.targeting === 'boolean') {
    preferences.value = saved;
  } else {
    open();
  }
});

watch(settingsOpen, (value) => {
  if (value) open(true);
});
</script>

<template>
  <dialog ref="dialog" aria-labelledby="cookie-title" aria-modal="true" class="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-[24px] border-0 bg-white p-0 font-norms text-[#0f1829] shadow-2xl backdrop:bg-[#0f1829]/70" @cancel.prevent>
    <div class="bg-[#0f1829] px-6 pb-6 pt-7 text-white sm:px-8">
      <p class="mb-3 text-xs font-bold tracking-[.18em] text-[#ff9a46]">{{ appName.toUpperCase() }} / PRIVACY</p>
      <h2 id="cookie-title" class="text-3xl font-bold tracking-tight">{{ managing ? 'Cookie settings' : 'Your cookie choices' }}<span class="text-brand">.</span></h2>
    </div>

    <div class="px-6 pb-7 pt-6 sm:px-8">
      <template v-if="!managing">
        <p class="text-sm leading-6 text-[#465163]">We use essential cookies to run the site. You can choose whether to allow optional cookies for performance, functionality and targeting.</p>
        <p class="mt-3 text-sm text-[#465163]">Read our <NuxtLink to="/privacy-policy" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#bd5100] underline underline-offset-2">Privacy and Cookies Policy</NuxtLink>.</p>
        <div class="mt-7 grid gap-3 sm:grid-cols-2">
          <button type="button" class="rounded-xl border border-[#d6dce3] px-5 py-3 font-bold hover:bg-[#fff8f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="save(emptyPreferences())">Reject optional</button>
          <button type="button" class="rounded-xl bg-brand px-5 py-3 font-bold text-[#0f1829] hover:bg-[#ff9a46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="save({ strictlyNecessary: true, performance: true, functional: true, targeting: true })">Accept all</button>
        </div>
        <button type="button" class="mt-4 w-full text-sm font-bold text-[#bd5100] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="managing = true">Manage preferences</button>
      </template>

      <template v-else>
        <p class="text-sm leading-6 text-[#465163]">Choose which optional cookies you’d like to allow. Essential cookies are always on.</p>
        <div class="mt-6 space-y-3">
          <div class="flex items-center justify-between rounded-xl border border-[#e1e4e8] p-4">
            <span class="font-semibold">Strictly necessary</span>
            <span class="text-xs font-bold text-[#667386]">ALWAYS ON</span>
          </div>
          <label v-for="option in ([
            { key: 'performance', label: 'Performance / analytics' },
            { key: 'functional', label: 'Functional cookies' },
            { key: 'targeting', label: 'Targeting cookies' },
          ] as const)" :key="option.key" class="flex cursor-pointer items-center justify-between rounded-xl border border-[#e1e4e8] p-4 font-semibold hover:border-brand">
            {{ option.label }}
            <input v-model="preferences[option.key]" type="checkbox" class="h-5 w-5 shrink-0 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          </label>
        </div>
        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" class="rounded-xl border border-[#d6dce3] px-5 py-3 font-bold hover:bg-[#fff8f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="save(preferences)">Confirm choices</button>
          <button type="button" class="rounded-xl bg-brand px-5 py-3 font-bold text-[#0f1829] hover:bg-[#ff9a46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="save({ strictlyNecessary: true, performance: true, functional: true, targeting: true })">Accept all</button>
        </div>
        <button type="button" class="mt-4 w-full text-sm font-bold text-[#bd5100] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" @click="managing = false">Back</button>
      </template>
    </div>
  </dialog>
</template>
