<template>
  <div class="flex justify-center items-center min-h-screen">
    <Login v-if="!isLoggedIn" />
    <div v-else class="mt-12">
      <Chart @render-table="renderTable = true" />
      <Table v-if="renderTable" />
    </div>
  </div>
</template>

<script setup>
import Login from "./components/Login.vue";
import Table from "./components/Table.vue";
import Chart from "./components/Chart.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();

const renderTable = ref(false);
const isLoggedIn = computed(() => store.getters["auth/getLoggedIn"]);
</script>

<style scoped></style>
