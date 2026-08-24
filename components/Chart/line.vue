<template>
  <canvas :class="props.class" ref="chartCanvas" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Define Props
const props = withDefaults(
  defineProps<{
    data: { label: string; value: number }[];
    class?: string;
    height?: number | string;
    width?: number | string;
    unit?: string;
  }>(),
  { unit: 'miles' }
);

// Computed properties for chart data
const labels = computed(() => props.data.map((item) => item.label));
const values = computed(() => props.data.map((item) => item.value));
const datasetLabel = computed(() => `Mileage (${props.unit})`);
const height = computed(() => convertToNumber(props.height));
const width = computed(() => convertToNumber(props.width));

// Convert height & width to numbers if needed
function convertToNumber(value: any) {
  if (typeof value === 'string' && value.includes('%')) return value;
  return typeof value === 'string' ? parseFloat(value) : value;
}

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Chart reference
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

// Initialize Chart on Mount
onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: datasetLabel.value,
            data: values.value,
            borderColor: '#F94144',
            backgroundColor: 'rgba(249, 65, 68, 0.2)',
            borderWidth: 2,
            pointRadius: 4,
            fill: true, // Fill area under the line
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
                const miles = Number(value);
                return miles ? `${miles / 1000}K` : '0';
              },
            },
          },
          x: {
            ticks: {
              callback(value) {
                const label = labels.value[Number(value)];
                const [, month, year] = label?.split('/') ?? [];
                return month && year ? `${month}/${year}` : label;
              },
            },
          },
        },
        plugins: {
          legend: { display: false }, // Hide legend
          tooltip: {
            enabled: true, // Enable tooltips
            mode: 'nearest', // Show tooltip for nearest data point
            intersect: false, // Ensure tooltips appear even when not directly on the point
            callbacks: {
              title: function (tooltipItems) {
                return `Date: ${tooltipItems[0].label}`; // Show the label (Date or category)
              },
              label: function (tooltipItem) {
                return `Mileage: ${tooltipItem.raw.toLocaleString()} ${props.unit}`;
              },
            },
          },
        },
      },
    });
  }
});

watch(
  [() => props.data, () => props.unit],
  () => {
    if (!chart) return;

    chart.data.labels = labels.value;
    chart.data.datasets[0].data = values.value;
    chart.data.datasets[0].label = datasetLabel.value;
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
/* Ensures full responsiveness */
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
