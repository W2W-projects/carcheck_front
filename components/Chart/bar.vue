<template>
  <!-- Apply a conditional class based on hasSubscription -->
  <canvas :class="{ 'blurred': !props.hasSubscription }" ref="chartCanvas" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Props definition
const props = withDefaults(
  defineProps<{
    data: { label: string; value: number }[];
    class?: string;
    height?: number | string;
    width?: number | string;
    currency?: string;
    hasSubscription?: boolean;
  }>(),
  { height: 25, width: '100%', currency: '£', hasSubscription: false }
);

// Computed properties for labels and values
const labels = computed(() => props.data.map((item) => item.label));
const values = computed(() => props.data.map((item) => item.value));
const datasetLabel = computed(() => `Price (${props.currency})`);
const height = computed(() => convertToNumber(props.height));
const width = computed(() => convertToNumber(props.width));

// Function to convert string to number
function convertToNumber(value: any) {
  if (typeof value === "string" && value.includes("%")) return value;
  return typeof value === "string" ? parseFloat(value) : value;
}

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

// Function to create and configure the chart
onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: datasetLabel.value,
            data: values.value,
            backgroundColor: '#F94144',
            borderWidth: 1,
            barThickness: 20,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return props.hasSubscription
                  ? `${props.currency}${value.toLocaleString()}`
                  : 'X'.repeat(value.toString().length);
              },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: props.hasSubscription },
        },
      },
    });
  }
});

watch(
  [() => props.data, () => props.currency, () => props.hasSubscription],
  () => {
    if (!chart) return;

    chart.data.labels = labels.value;
    chart.data.datasets[0].data = values.value;
    chart.data.datasets[0].label = datasetLabel.value;

    if (chart.options.plugins?.tooltip) {
      chart.options.plugins.tooltip.enabled = props.hasSubscription;
    }

    chart.update();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  chart?.destroy();
  chart = null;
});
</script>

<style scoped>
/* Only apply blur if the user lacks a subscription */
canvas.blurred {
  filter: blur(2px);
}
</style>
