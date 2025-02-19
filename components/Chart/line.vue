<template>
  <canvas :class="props.class" ref="chartCanvas" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Define Props
const props = defineProps<{
  data: { label: string; value: number }[];
  class?: string;
  height?: number | string;
  width?: number | string;
}>();

// Computed properties for chart data
const labels = computed(() => props.data.map((item) => item.label));
const values = computed(() => props.data.map((item) => item.value));
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

// Initialize Chart on Mount
onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: 'Mileage (km)',
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
                return `${value.toLocaleString()} mi`; // Format Y-axis values with currency
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
                return `Mileage: ${tooltipItem.raw.toLocaleString()}`; // Show the value in currency format
              },
            },
          },
        },
      },
    });
  }
});
</script>

<style scoped>
/* Ensures full responsiveness */
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
