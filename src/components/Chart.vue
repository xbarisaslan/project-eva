<template>
  <div style="width: 100%; overflow-x: auto">
    <SelectDayRange
      :options="[
        { text: 'Last 7 days', value: '7' },
        { text: 'Last 14 days', value: '14' },
        { text: 'Last 30 days', value: '30' },
        { text: 'Last 60 days', value: '60' },
      ]"
    />
    <div style="min-width: 1600px">
      <Chart :options="chartOptions"></Chart>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Chart } from "highcharts-vue";
import { useStore } from "vuex";
import SelectDayRange from "./SelectDayRange.vue";
import useDailySalesData from "../composables/useDailySalesData";

const emit = defineEmits();
const store = useStore();
const { dailySalesData, fetchDailySales } = useDailySalesData();

const handleColumnClick = (event) => {
  const point = event.point;
  store.commit("selectedColumnData/setColumnData", point);
  emit("renderTable");
};

const chartOptions = ref({
  chart: { type: "column" },
  title: { text: "Daily Sales", align: "left" },
  xAxis: {
    categories: [],
    labels: { rotation: -45 },
  },
  yAxis: {
    title: { text: "Amount ($)" },
  },
  plotOptions: {
    column: {
      stacking: "normal",
      pointWidth: 16,
      dataLabels: {
        enabled: true,
        format: "${y}",
        color: "white",
        inside: true,
        rotation: -90,
        align: "center",
        verticalAlign: "middle",
        style: { fontSize: "12px" },
      },
      point: {
        events: {
          click: handleColumnClick,
        },
      },
    },
  },
  series: [
    {
      name: "Profit",
      data: [],
      color: "#7AE0C3",
      stack: "sales",
      dataLabels: { enabled: false },
    },
    {
      name: "FBA Sales",
      data: [],
      color: "#6D4BF0",
      stack: "sales",
      dataLabels: { enabled: false },
    },
    {
      name: "FBM Sales",
      data: [],
      color: "#6543D9",
      stack: "sales",
      dataLabels: { enabled: false },
    },
  ],
});

const updateChartData = () => {
  const dates = dailySalesData.value.map((x) => x.date);
  const fbaSales = dailySalesData.value.map((x) => x.fbaAmount);
  const fbmSales = dailySalesData.value.map((x) => x.fbmAmount);
  const profit = dailySalesData.value.map((x) => x.profit);

  chartOptions.value.xAxis.categories = dates;
  chartOptions.value.series[1].data = fbaSales;
  chartOptions.value.series[2].data = fbmSales;
  chartOptions.value.series[0].data = profit;
};

onMounted(async () => {
  await fetchDailySales();
  updateChartData();
});

watch(
  () => store.state.selectedDay.dayRange,
  async (newValue) => {
    await fetchDailySales(newValue);
    updateChartData();
  },
  { immediate: true }
);

// watch(
//   () => selectedPoint.value,
//   (newValue) => {
//     store.commit("selectedColumnData/setColumnData", newValue);
//     console.log(store.getters["selectedColumnData/getColumnData"]);
//   }
// );
</script>
