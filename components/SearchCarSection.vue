<script setup>

const addedMoreFeatures = reactive([]);
const isAddMoreBtnHidden = ref(false);
const moreFeatures = async () => {
  addedMoreFeatures.push(
    {
      "id": 12, "title": "Write off", "icon": "warning.svg"
    },
    {
      "id": 7, "title": "Finance History", "icon": "financial-history.svg"
    },
    {
      "id": 8, "title": "Tax Records", "icon": "tax-records.svg"
    },
    {
      "id": 9, "title": "Technical data", "icon": "technicaldata.svg"
    },
    {
      "id": 10, "title": "Vehicle Valuation", "icon": "valuation.svg"
    }
  );
  isAddMoreBtnHidden.value = true;
}
</script>

<template>
  <div
    class="lg:px-[9.12rem] overflow-hidden px-4 section-1-bg lg:min-h-[41rem] flex flex-col items-start w-full pt-[5.4%] mx-auto max-w-screen-2xl"
    style="--section-bg: url('/png/car-find-section-bg-1.png')"
    id="check">
    <h1 class="lg:text-[2.5rem] text-xl text-[#0F1829] md:leading-[2.8rem]">Check it before
      <br />
      <span class="text-2xl font-bold text-center lg:text-4xl">you regret it </span>
    </h1>

    <div class="h-[4.25rem] mt-4 flex lg:translate-x-[30%] translate-x-[15%] relative items-center ">
      <SearchBar class="lg:scale-[160%] scale-[120%]" width="lg:w-[15.55rem] w-[75%] min-w-[15.55rem]"
        :focused="false" />
    </div>
    <p class="text-[#0F1829] mt-5 lg:text-[1.95rem] md:text-2xl text-xl  font-thin">We can generate a <span
        class="font-bold">full history</span> <br />
      report for <span class="font-bold">any car</span></p>

    <!--  features      -->
    <div>
      <Features :addedMoreFeatures="addedMoreFeatures" class="mt-[1.9rem]"></Features>
      <div class="flex flex-row items-center justify-center w-full mt-5" v-if="isAddMoreBtnHidden == false">
        <button class="bg-none" @click="moreFeatures">
          <p class="text-[#FF7400] md:text-[1.3rem] md:tracking-widest font-bold">And more ...</p>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.section-1-bg {
  background-image: var(--section-bg);
  background-size: cover;
  background-position: 0% 79%;
}

@media screen and (min-width: 1500px) {
  .section-1-bg {
    background-position: 0% 75%;
  }
}
</style>
