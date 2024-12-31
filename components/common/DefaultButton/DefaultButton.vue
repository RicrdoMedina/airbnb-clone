<template>
  <button
    :class="$attrs.class"
    :disabled="isDisabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.isDisabled) {
    emit("click", event);
  }
};
</script>
