<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArcElement, Chart, DoughnutController } from 'chart.js';

Chart.register(ArcElement, DoughnutController);

const props = defineProps<{
  failRate: number | string;
  failCount?: number;
  totalCount?: number;
  class?: string;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const failRate = computed(() => Math.max(0, Math.min(100, Number(props.failRate) || 0)));
const passRate = computed(() => 100 - failRate.value);
const failCount = computed(() => props.failCount ?? Math.round((props.totalCount ?? 100) * failRate.value / 100));
const passCount = computed(() => Math.max(0, (props.totalCount ?? 100) - failCount.value));
let chart: Chart<'doughnut'> | null = null;

const gaugeDetails = {
  id: 'gaugeDetails',
  afterDatasetsDraw(chart: Chart<'doughnut'>) {
    const arcs = chart.getDatasetMeta(0).data as ArcElement[];
    if (!arcs.length) return;

    const { ctx } = chart;
    const { x, y, innerRadius, outerRadius } = arcs[0];
    const labelRadius = (innerRadius + outerRadius) / 2;

    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${Math.max(18, Math.min(21, outerRadius * 0.18))}px "TT Norms Pro"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    arcs.forEach((arc, index) => {
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const value = index === 0 ? passRate.value : failRate.value;
      ctx.fillText(`${value}%`, x + Math.cos(angle) * labelRadius, y + Math.sin(angle) * labelRadius);
    });

    const angle = arcs[0].endAngle;
    const directionX = Math.cos(angle);
    const directionY = Math.sin(angle);
    const baseX = x - directionX * innerRadius * 0.22;
    const baseY = y - directionY * innerRadius * 0.22;
    const tipX = x + directionX * innerRadius * 0.95;
    const tipY = y + directionY * innerRadius * 0.95;
    const halfBaseWidth = 4;

    ctx.fillStyle = '#0F1829';
    ctx.beginPath();
    ctx.moveTo(baseX - directionY * halfBaseWidth, baseY + directionX * halfBaseWidth);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(baseX + directionY * halfBaseWidth, baseY - directionX * halfBaseWidth);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};

onMounted(() => {
  if (!chartCanvas.value) return;

  chart = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [passRate.value, failRate.value],
        backgroundColor: ['#FFA500', '#F94144'],
        borderWidth: 0,
      }],
    },
    options: {
      aspectRatio: 2,
      circumference: 180,
      rotation: 270,
      cutout: '60%',
      layout: { padding: { bottom: 24 } },
      events: [],
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
    plugins: [gaugeDetails],
  });
});

watch([passRate, failRate], ([pass, fail]) => {
  if (!chart) return;
  chart.data.datasets[0].data = [pass, fail];
  chart.update();
});

onBeforeUnmount(() => chart?.destroy());
</script>

<template>
  <div :class="props.class" class="mx-auto w-full max-w-[360px]">
    <canvas ref="chartCanvas"></canvas>
    <div class="mt-5 flex items-center justify-center gap-4 whitespace-nowrap text-[15px]">
      <div class="flex items-center gap-2">
        <span class="size-3 rounded-full bg-[#F94144]"></span>
        <span>Fail rate ({{ failCount }})</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="size-3 rounded-full bg-[#FFA500]"></span>
        <span>Pass rate ({{ passCount }})</span>
      </div>
    </div>
  </div>
</template>
