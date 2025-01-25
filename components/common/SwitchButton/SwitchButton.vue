<template>
  <div
    :class="dynamicClasses"
    @click="toggle"
  >
    <div
      :class="toggleSwitchDynamicClasses"
    />
  </div>
</template>

<script setup>

import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};

const defaultClasses =
  "toggle-switch flex items-center cursor-pointer w-12 h-6 rounded-full transition-all duration-300 relative will-change-auto";

const activeClasses = "bg-black";

const inactiveClasses = "bg-custom-gray-400";

const { dynamicClasses } = useDynamicClasses(
  () => props.modelValue,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const toggleSwitchDefaultClasses =
  "toggle-switch-circle absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 will-change-auto";

const toggleSwitchActiveClasses = "translate-x-6";

const toggleSwitchInactiveClasses = "";


const { dynamicClasses:toggleSwitchDynamicClasses } = useDynamicClasses(
  () => props.modelValue,
  toggleSwitchDefaultClasses,
  toggleSwitchActiveClasses,
  toggleSwitchInactiveClasses
);


</script>