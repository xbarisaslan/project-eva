<template>
  <div>
    <div
      class="w-[28rem] bg-gray-200 flex flex-col items-center self-center gap-4 px-12 py-8 rounded-lg"
    >
      <h1 class="font-semibold text-2xl">Login</h1>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-medium text-lg" for="email">E-mail</label>
        <Input id="email" placeholder="E-mail" v-model="email" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-medium text-lg" for="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <p class="text-red-500 font-semibold">{{ error }}</p>
      <button
        class="text-white font-medium w-[60%] mx-auto py-1 bg-red-400 hover:opacity-80 transition ease-in cursor-pointer rounded-xl"
        @click="handleLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import useAuth from "../composables/useAuth";
import Input from "./Input.vue";
const { loginUser, error } = useAuth();

const email = ref(null);
const password = ref(null);

const handleLogin = async () => {
  try {
    await loginUser(email.value, password.value);
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped></style>
