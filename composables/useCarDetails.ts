import { ref } from "vue";
import { useCarStore } from "~/stores/car";

export const useCarDetails = () => {
  const isModalOpen = ref(false);
  const selectedCar = ref<any>(null);

  async function showCarDetailsModal(car: any) {
    selectedCar.value = car;
    isModalOpen.value = true;

    if (!car?.id) return;

    try {
      const detail = await useCarStore().fetchCarDetail(car.id);
      if (!detail || selectedCar.value?.id !== car.id) return;

      selectedCar.value = {
        ...car,
        details: { ...car.details, ...detail.details },
      };
    } catch (error) {
      console.error("Failed to fetch car detail:", error);
    }
  }

  function closeCarDetailsModal() {
    selectedCar.value = null;
    isModalOpen.value = false;
  }

  return {
    isModalOpen,
    selectedCar,
    showCarDetailsModal,
    closeCarDetailsModal,
  };
};
