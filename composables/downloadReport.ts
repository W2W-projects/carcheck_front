import { ref } from "vue";
import ApiService from "~/services/apiService";

export const useDownloadReport = () => {
  const isDownloading = ref(false);
  const downloadStatus = ref("idle"); // 'idle', 'downloading', 'success', 'error'
  const errorMessage = ref<string | null>(null);

  // Helper function to format date
  const formatReportDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Transform car data to match the expected PDF structure with all required keys
  const transformCarData = (car: any) => {
    // Initialize the structure with all required keys set to null
    console.log("Transforming car data:", car);
    let carData: any = {
      vbrand_logo: null,
      vehicleImageUrl: null,
      smmtDetails: null,
      dimensions: null,
      vehicleRegistration: null,
      motVed: null,
      general: null,
      performance: null,
      classificationDetails: null,
      vehicleHistory: null,
      MOTHistory: null,
      vehicleValuationsList: null,
      stolenRecord: null,
      writeOff: null,
      financeRecords: null,
      riskRecords: null,
    };

    try {
      // If this is a saved car with details property
      if (car && car.details) {
        console.log("Processing saved car format");

        // Map the data while preserving the expected key structure
        // Image and logo
        carData.vehicleImageUrl = car.image || car.details?.imageUrl || null;
        carData.vbrand_logo = car.details?.vbrand_logo || null;

        // Vehicle registration - always required for the report
        carData.vehicleRegistration = {
          Vrm: car.reg_number || car.details?.vrm || null,
          Make: car.details?.make || null,
          Model: car.details?.makeModel || null,
          Colour: car.details?.color || null,
          YearOfManufacture: car.details?.yearOfManufacture || null,
        };

        // Basic SMMT details
        carData.smmtDetails = {
          Range: null,
          FuelType: car.details?.fuelType || null,
          ModelVariant: car.details?.makeModel || null,
        };

        // MOT History is critical - extract it correctly
        if (
          car.details?.motHistory?.RecordList &&
          Array.isArray(car.details.motHistory.RecordList)
        ) {
          carData.MOTHistory = [...car.details.motHistory.RecordList];
          console.log(`Found ${carData.MOTHistory.length} MOT records`);
        } else {
          carData.MOTHistory = [];
          console.log("No MOT history found or format is unexpected");
        }

        // Create empty structures for missing data
        // This ensures all required keys are present for the PDF template
        if (!carData.dimensions) carData.dimensions = {};
        if (!carData.general) carData.general = { Engine: {} };
        if (!carData.performance) carData.performance = {};
        if (!carData.classificationDetails) carData.classificationDetails = {};
        if (!carData.vehicleHistory) carData.vehicleHistory = {};
        if (!carData.vehicleValuationsList) carData.vehicleValuationsList = {};
        if (!carData.motVed) carData.motVed = {};
        if (!carData.stolenRecord) carData.stolenRecord = null;
        if (!carData.writeOff) carData.writeOff = null;
        if (!carData.financeRecords) carData.financeRecords = null;
        if (!carData.riskRecords) carData.riskRecords = null;
      }
      // If this is a search result (array of objects with single keys)
      else if (Array.isArray(car)) {
        console.log("Processing array format");

        // Extract data from array of objects
        car.forEach((item) => {
          // Extract the key and value from each array item
          const key = Object.keys(item)[0];
          const value = item[key];

          // Direct mapping for all expected keys
          if (Object.hasOwn(carData, key)) {
            carData[key] = value;
          }
          // Special case for vehicleImageUrl
          else if (key === "vehicleImage") {
            carData.vehicleImageUrl = value;
          }
        });
      }
      // Single object format (flat structure)
      else if (car && typeof car === "object") {
        console.log("Processing flat object format");

        // Map all available fields while preserving key structure
        carData.vehicleImageUrl = car.imageUrl || car.vehicleImageUrl || null;
        carData.vbrand_logo = car.vbrand_logo || null;

        carData.vehicleRegistration = {
          Vrm: car.vrm || car.reg_number || null,
          Make: car.make || null,
          Model: car.makeModel || null,
          Colour: car.color || null,
          YearOfManufacture: car.yearOfManufacture || null,
        };

        carData.smmtDetails = {
          Range: null,
          FuelType: car.fuelType || null,
          ModelVariant: car.makeModel || null,
        };

        // Handle MOT History from different possible locations
        if (car.MOTHistory) {
          carData.MOTHistory = car.MOTHistory;
        } else if (car.motHistory?.RecordList) {
          carData.MOTHistory = car.motHistory.RecordList;
        } else {
          carData.MOTHistory = [];
        }

        // Map any other available fields from car object
        const directMappingKeys = [
          "dimensions",
          "general",
          "performance",
          "classificationDetails",
          "vehicleHistory",
          "vehicleValuationsList",
          "stolenRecord",
          "writeOff",
          "financeRecords",
          "riskRecords",
          "motVed",
        ];

        directMappingKeys.forEach((key) => {
          if (car[key]) carData[key] = car[key];
        });
      }
    } catch (error) {
      console.error("Error transforming car data:", error);
    }

    // Ensure all keys exist even if empty objects
    const requiredKeys = [
      "vbrand_logo",
      "vehicleImageUrl",
      "smmtDetails",
      "dimensions",
      "vehicleRegistration",
      "motVed",
      "general",
      "performance",
      "classificationDetails",
      "vehicleHistory",
      "MOTHistory",
      "vehicleValuationsList",
      "stolenRecord",
      "writeOff",
      "financeRecords",
      "riskRecords",
    ];

    requiredKeys.forEach((key) => {
      if (carData[key] === null) {
        if (
          [
            "dimensions",
            "smmtDetails",
            "vehicleRegistration",
            "motVed",
            "general",
            "performance",
            "classificationDetails",
            "vehicleHistory",
            "vehicleValuationsList",
          ].includes(key)
        ) {
          carData[key] = {};
        } else if (key === "MOTHistory") {
          carData[key] = [];
        }
      }
    });

    console.log("Transformed data ready with keys:", Object.keys(carData));
    return carData;
  };

  const downloadReport = async (carData: any) => {
    // Initialize stores
    const tokenStore = useTokenStore();
    const subscriptionStore = useSubscriptionStore();
    const authStore = useAuthStore();

    // Reset state
    isDownloading.value = true;
    downloadStatus.value = "downloading";
    errorMessage.value = null;

    try {
      const isAuthenticated = tokenStore.getToken && tokenStore.getStatus;
      const hasSubscription = await subscriptionStore.getHasSubscription();
      const subscriptionStatus = subscriptionStore.getSubscriptionStatus;

      // Authentication check
      if (!isAuthenticated) {
        errorMessage.value = "Authentication required. Please log in.";
        downloadStatus.value = "error";
        return { success: false, redirectTo: "/auth/login" };
      }

      // Subscription check
      if (isAuthenticated && !subscriptionStatus) {
        errorMessage.value = "Active subscription required.";
        downloadStatus.value = "error";
        return { success: false, redirectTo: "/pricing" };
      }

      // Get subscription details
      const subscription = await subscriptionStore.getUserSubscription();
      const user = authStore.user;

      // Check if user can download report
      if (
        hasSubscription?.active ||
        hasSubscription?.request_count > 0 ||
        user.request_count > 0 ||
        user.one_off_request_count > 0
      ) {
        if (!subscription) {
          errorMessage.value =
            "You don't have any active subscription. Please buy or upgrade plan.";
          downloadStatus.value = "error";
          return { success: false };
        }

        // Transform the car data to match PDF template structure
        const transformedData = transformCarData(carData);

        // Make API request
        const token = tokenStore.getToken;
        //  subscription?.plan?.plan_code || "48h-expert-subscription",
        const response = await ApiService.post(
          "users/download-report",
          {
            email: authStore.user?.email,
            report_type: "premium",
            car_data: [transformedData],
          },
          token
        );

        if (response.success && response.payload) {
          const payload = response.payload;
          const downloadUrl = payload.report_link;

          // Create download link and trigger download
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `report-${formatReportDate()}.pdf`;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          downloadStatus.value = "success";
          return { success: true };
        } else {
          throw new Error("Failed to retrieve the report data.");
        }
      } else {
        errorMessage.value = "No available requests. Please purchase a plan.";
        downloadStatus.value = "error";
        return { success: false, redirectTo: "/payment/plans" };
      }
    } catch (error) {
      console.error("Download error:", error);
      errorMessage.value =
        error?.data?.message || "Error occurred during the download process.";
      downloadStatus.value = "error";
      return { success: false, error };
    } finally {
      isDownloading.value = false;
    }
  };

  return {
    downloadReport,
    isDownloading,
    downloadStatus,
    errorMessage,
  };
};
