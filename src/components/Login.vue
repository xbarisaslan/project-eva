<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-gray-200 flex flex-col items-center self-center gap-4 p-12 rounded-lg"
    >
      <input
        class="border border-gray-200 px-2 py-1 bg-white outline-none rounded-md"
        v-model="email"
        placeholder="E-mail"
      />
      <input
        class="border border-gray-200 px-2 py-1 bg-white outline-none rounded-md"
        v-model="password"
        placeholder="Password"
      />
      <button
        class="text-white font-medium w-full bg-red-300 hover:opacity-80 transition ease-in cursor-pointer py-1 mt-2 rounded-xl"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
</script>

<style lang="scss" scoped></style>
