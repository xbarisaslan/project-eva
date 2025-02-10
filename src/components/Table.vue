<template>
  <div class="my-40 mx-20 font-medium text-gray-700 text-md">
    <TableHeader :date="date" />
    <div
      v-for="item in paginatedData"
      :key="item.sku"
      class="grid grid-cols-5 items-center bg-gray-100 px-4 py-2"
    >
      <h6>{{ item.sku.sku }}</h6>
      <h6>{{ item.sku.productName }}</h6>
      <div class="text-right text-green-500 text-lg">
        <p>$1638 / {{ item.sku.shippingAmount }}</p>
        <!-- I couldn't determine what to write in place of 1638$ from the API response and through that the value that comes with the division. -->
        <p>$32.77</p>
      </div>
      <div class="col-span-2 text-right">
        <p>{{ item.refundRate }}%</p>
      </div>
    </div>

    <PageNavigation
      :currentPage="currentPage"
      :totalPages="totalPages"
      @previous-page="previousPage"
      @next-page="nextPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import PageNavigation from "./PageNavigation.vue";
import TableHeader from "./TableHeader.vue";
import useDailySku from "../composables/useDailySku";

const { fetchDailySkuList, tableData } = useDailySku();

const store = useStore();
const date = computed(
  () => store.getters["selectedColumnData/getColumnData"].category
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedData = computed(() => {
  if (!tableData.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  return tableData.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return tableData.value ? Math.ceil(tableData.value.length / itemsPerPage) : 1;
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

watch(
  () => store.getters["selectedColumnData/getColumnData"],
  async (newValue) => {
    if (newValue) {
      await fetchDailySkuList();
    }
  },
  { immediate: true }
);

// watch(store.getters["selectedColumnData/getColumnData"], (newVal) => {
//   store.commit("selectedColumnData/setColumnData", newVal);
// });

onMounted(() => {
  fetchDailySkuList();
});
</script>

<style lang="scss" scoped></style>
