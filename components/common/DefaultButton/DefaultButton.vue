<template>
  <button
    :disabled="isDisabled"
    :type="type"
    @click.stop.prevent="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>

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

const emit = defineEmits(["onClick"]);

const handleClick = (event) => {
  emit("onClick", event);
};
</script>
