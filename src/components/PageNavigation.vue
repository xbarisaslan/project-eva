<template>
  <div>
    <div class="flex justify-end items-center mt-4">
      <button
        @click="$emit('previousPage')"
        :disabled="currentPage === 1"
        class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="$emit('nextPage')"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits();
defineProps({
  currentPage: {
    require: true,
    type: Number,
    default: 1,
  },
  totalPages: {
    require: true,
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
