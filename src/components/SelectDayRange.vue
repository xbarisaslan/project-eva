<template>
  <div>
    <select
      :value="selectedOption"
      @input="onInput"
      class="w-36 float-right text-gray-600 text-sm font-medium px-2 py-1 rounded-sm border-b-2 border-gray-300 hover:opacity-60 transition ease-in focus:outline-none cursor-pointer"
    >
      <option v-for="{ text, value } in options" :key="text" :value="value">
        {{ text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
defineProps({
  options: {
    require: true,
    type: Array,
  },
});

const store = useStore();

const selectedOption = computed(() => store.state.selectedDay.dayRange);

const onInput = (e) => {
  store.commit("selectedDay/setDayRange", e.target.value);
};
</script>
