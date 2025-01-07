<template>
  <div
    class="w-full md:w-80 rounded-full h-10 bg-custom-gray-200 flex items-center justify-between p-1"
  >
    <button
      type="button"
      v-for="option in options"
      :key="option.value"
      :class="dynamicClasses(option.value).value"
      @click.stop.prevent="handleChange(option.filter, option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  options: Array,
  selectedOption: String,
});

const emit = defineEmits(["change"]);
const handleChange = (filter,subFilter) => {
  emit("change", filter,subFilter);
};

const defaultClasses =
  "text-sm px-6 py-3 rounded-full ease-in-out transition-all duration-500 h-full flex items-center justify-center text-bold cursor-pointer";

const activeClasses = "bg-white border border-custom-gray-300";

const inactiveClasses = "border border-transparent hover:bg-custom-gray-300";

const dynamicClasses = (value) =>
  useDynamicClasses(
    () => props.selectedOption === value,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;
</script>
