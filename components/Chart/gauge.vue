<template>
  <div :class="props.class" class="relative">
    <canvas ref="chartCanvas" :height="height" :width="width"></canvas>
    <div class="absolute bottom-[10%] flex items-center justify-center w-full -translate-x-1/2 left-1/2">
      <div class="flex items-center justify-center gap-4 mt-4 text-sm">
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-[#FF9F29] mr-2"></div>
          <small>Pass Rate ({{ passRate }})</small>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 rounded-full bg-[#FF4646] mr-2"></div>
          <small>Fail Rate ({{ failRate }})</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js';

// Register Chart.js elements
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

// Props definition
const props = defineProps<{
  failRate: number | string; // Fail rate percentage
  class?: string; // Tailwind classes for styling
  height?: string | number; // Canvas height
  width?: string | number; // Canvas width
}>();

// Computed properties to determine canvas size
const height = computed(() => convertToNumber(props.height, 150));
const width = computed(() => convertToNumber(props.width, 150));
const failRate = computed(() => convertToNumber(props.failRate, 0));
const passRate = computed(() => 100 - failRate.value);

console.log(failRate.value, passRate.value);

function convertToNumber(value: any, defaultValue: number) {
  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }
  return typeof value === 'string' ? parseFloat(value) : value || defaultValue;
}

// Reference to canvas element
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Function to create gauge chart
onMounted(() => {
  if (chartCanvas.value) {
    const totalRate = passRate.value + failRate.value; // The sum of passRate and failRate

    const data = {
      datasets: [
        {
          data: [passRate.value, failRate.value], // Two segments for pass and fail rates
          backgroundColor: ['#FF9F29', '#FF4646'], // Orange for pass, red for fail
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    };

    const options = {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      hover: {
        mode: undefined,
      },
      animation: {
        onComplete() {
          const chartInstance = Chart.getChart(chartCanvas.value!);

          if (!chartInstance) return;

          const ctx = chartInstance.ctx;
          const centerX = (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
          const centerY = chartInstance.chartArea.bottom - 100;
          const chartRadius = Math.min(chartInstance.chartArea.right - chartInstance.chartArea.left,
            chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2;

          // Clear and redraw
          ctx.save();
          chartInstance.draw();

          // Draw percentage labels on the gauge
          const fontSize = Math.max(16, Math.min(20, chartRadius / 4));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFFFFF'; // White text for better visibility on colored sections

          // Calculate angles for label positioning
          // For pass rate: center angle is at (passRate/2) degrees from left
          const passCenter = Math.PI - (Math.PI * (passRate.value / 200)); // Divide by 200 to get midpoint
          // For fail rate: center angle is at (failRate/2) degrees from right
          const failCenter = Math.PI * (failRate.value / 200);

          // Position labels in the middle of their sections
          const labelRadius = chartRadius * 0.85;

          // Draw pass rate label (in orange section)
          const passLabelX = centerX + labelRadius * Math.cos(passCenter);
          const passLabelY = centerY - labelRadius * Math.sin(passCenter);
          ctx.fillText(passRate.value.toString() + '%', passLabelX, passLabelY);

          // Draw fail rate label (in red section)
          const failLabelX = centerX + labelRadius * Math.cos(failCenter);
          const failLabelY = centerY - labelRadius * Math.sin(failCenter);
          ctx.fillText(failRate.value.toString() + '%', failLabelX, failLabelY);

          // Calculate needle angle based on the fail rate
          const needleAngle = Math.PI * (failRate.value / 100);
          const needleLength = chartRadius * 0.6;
          const circleRadius = 8; // Base circle radius

          // Calculate needle endpoint
          const needleX = centerX + needleLength * Math.cos(needleAngle);
          const needleY = centerY - needleLength * Math.sin(needleAngle);

          // Draw the needle with triangular shape
          ctx.beginPath();

          // Calculate base points of the triangle
          const baseAngle = needleAngle + Math.PI / 2; // Perpendicular to needle angle
          const baseWidth = circleRadius; // Match circle radius
          const baseX1 = centerX + baseWidth * Math.cos(baseAngle);
          const baseY1 = centerY - baseWidth * Math.sin(baseAngle);
          const baseX2 = centerX + baseWidth * Math.cos(baseAngle + Math.PI);
          const baseY2 = centerY - baseWidth * Math.sin(baseAngle + Math.PI);

          // Draw triangular needle
          ctx.beginPath();
          ctx.moveTo(baseX1, baseY1);
          ctx.lineTo(needleX, needleY);
          ctx.lineTo(baseX2, baseY2);
          ctx.closePath();

          // Fill with gradient for 3D effect
          const needleGradient = ctx.createLinearGradient(centerX, centerY, needleX, needleY);
          needleGradient.addColorStop(0, '#2B2B2B');
          needleGradient.addColorStop(1, '#000000');
          ctx.fillStyle = needleGradient;
          ctx.fill();

          // Draw the center circle
          ctx.beginPath();
          ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.fill();

          ctx.restore();
        },
      },
      events: [],
    };

    new Chart(chartCanvas.value, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
});

</script>

<style scoped></style>
