import { ref } from "vue";

export const useCarDetails = () => {
  const isModalOpen = ref(false);
  const selectedCar = ref(null);

  function showCarDetailsModal(car: any) {
    selectedCar.value = car;
    isModalOpen.value = true;
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
