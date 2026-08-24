<script setup>
import { useCarRegistrationSearchStore } from "@/stores/carRegistrationSearch";
const router = useRouter();
const carRegistrationSearch = useCarRegistrationSearchStore();
const searchInput = ref(null);

const props = defineProps({
  height: {
    type: String,
    default: "h-16"
  },
  width: {
    type: String,
    default: "w-2/3"
  },
  inputHeight: {
    type: String,
    default: "h-[0.25rem]"
  },
  inputWidth: {
    type: String,
    default: "w-full"
  },
  buttonClass: {
    type: String,
    default: "h-9 w-[2.85rem]"
  },
  focused: {
    type: Boolean,
    default: false
  }
});

definePageMeta({
  title: "SearchBar",
  meta: [
    {
      hid: "Search Car Registration number",
      name: "Search Car Registration number",
      content: "Search Car Registration number",
    },
  ],
  // middleware: ['guest'],
});
const vehicle_number = ref("");
const placeholderText = ref("AB12 CDE");

const errors = ref([]);
const errorMessage = ref("");
const searchTxt = ref(null);
const MIN_LENGTH = 5;
const MAX_LENGTH = 10;
const validReportTypes = ["basic", "export", "single-offer"];

const processedCarNumber = computed({
  get() {
    return vehicle_number.value.toUpperCase();
  },
  set(value) {
    vehicle_number.value = value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase();
  },
});

onMounted(() => {
  if (typeof window !== "undefined") {
    const regNumber = localStorage.getItem("reg_number");
    if (regNumber) {
      vehicle_number.value = regNumber;
    } else {
      vehicle_number.value = "";
    }
  }
  if (props.focused) {
    searchInput.value?.focus();
  }
});

watch(errors, () => {
  setTimeout(() => {
    errors.value = [];
  }, 5000);
});

watch(() => props.focused, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});

const handleBlur = () => {
  if (props.focused) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const searchForCarReg = async () => {
  errorMessage.value = "";
  searchTxt.value = "Processing...";
  try {
    errors.value = [];
    if (
      processedCarNumber.value.length < MIN_LENGTH ||
      processedCarNumber.value.length > MAX_LENGTH
    ) {
      errors.value.push(`Vehicle number is not valid.`);
      searchTxt.value = null;
      errorMessage.value = "";
      return;
    }
    await carRegistrationSearch.searchCarRegNumber(processedCarNumber.value);
    searchTxt.value = null;
    // router.push(`/report`);
    if (router.currentRoute.value.path === "/report") {
      window.location.reload();
    } else {
      router.push(`/report`);
    }

  } catch (error) {
    if (!error?.data?.success) {
      // let sub = subscription.value;
      // if(hasSubscription.active==true){
      // }
    }

    searchTxt.value = null;
    if (error?.data?.message) {
      errorMessage.value = error.data.message;
    } else {
      errors.value = error.response?.data?.errors || [
        "Something went wrong while checking car number. Please verify Registration Number.",
      ];
    }

    setTimeout(() => {
      errorMessage.value = "";
      errors.value = [];
    }, 5000);
  }
};
</script>

<template>
  <div class="relative">
    <div class="relative bg-[#FFA500] py-1 pl-2 pr-1 rounded flex flex-row items-center space-x-1"
      :class="[props.width]">
      <div class="flex items-center justify-center mr-[0.27rem]">
        <img src="assets/svg/uk-flag.svg" class="w-8" alt="UK Flag" />
      </div>
      <input @keyup.enter="searchForCarReg" @blur="handleBlur" type="text" :placeholder="placeholderText"
        v-model="processedCarNumber" required
        class="block w-full placeholder-opacity-low custom-spacing py-4 transition text-2xl text-white bg-[#FFA500] rounded hover:bg-brand md:hover:bg-transparent md:hover:text-white md:dark:hover:text-white ring-0 active:ring-0 active:border-transparent outline-none focus:outline-none active:outline-none focus:border-transparent"
        :class="[props.inputHeight, props.inputWidth]" :autofocus="props.focused" ref="searchInput" />

      <button @click="searchForCarReg"
        class="bg-[#0F1829] py-1 px-2 rounded hover:bg-white md:hover:bg-transparent md:dark:hover:bg-transparent"
        :class="[props.buttonClass]">
        <template v-if="searchTxt">
          <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </template>
        <img src="assets/svg/search-icon.svg" v-else class="w-full" alt="Search car registration" />
      </button>
    </div>
    <div v-if="errors && errors.length && Array.isArray(errors)"
      class="absolute px-6 py-4 text-center transition-all duration-300 bg-white rounded-b alert alert-danger">
      <ul v-if="Array.isArray(errors)">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="absolute px-6 py-4 text-center transition-all duration-300 bg-white rounded-b alert alert-danger"
      style="line-height: 1rem;" v-if="errorMessage">
      <small>{{ errorMessage }}</small>
    </div>
  </div>
</template>

<style scoped>
.custom-spacing {
  letter-spacing: 0.1em;
}

.custom-spacing::placeholder {
  letter-spacing: 0.1em;
}

.placeholder-opacity-low::placeholder {
  opacity: 0.5;
}

.alert {
  color: red;
  justify-content: center;
}
</style>
