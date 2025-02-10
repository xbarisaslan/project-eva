<template>
  <div class="grid grid-cols-5 items-center px-4 pb-2 border-b border-gray-300">
    <h6>SKU</h6>
    <h6>Product Name</h6>
    <div class="text-right">
      <p>{{ date }}</p>
      <p>Sales/Units</p>
      <p>Avg. Selling Price</p>
    </div>
    <div class="col-span-2 text-right">
      <p>SKU Refund Rate</p>
      <p>(Last 60 days)</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  date: {
    require: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
