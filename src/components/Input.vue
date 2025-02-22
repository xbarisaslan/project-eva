<template>
  <div>
    <input
      class="border border-gray-200 px-3 py-1 bg-white outline-none rounded-md w-full"
      :class="class"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup>
const emit = defineEmits();
defineProps({
  id: {
    type: String,
  },
  type: {
    type: [String, Number, Object],
    default: "text",
  },
  placeholder: {
    type: [String, Number, Object],
  },
  class: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Object],
    require: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<style lang="scss" scoped></style>
