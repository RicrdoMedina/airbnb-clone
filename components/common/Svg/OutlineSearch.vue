<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    :style="{ height: size, width: size, stroke: color, strokeWidth:strokeWidth }"
    aria-hidden="true"
    role="presentation"
    focusable="false"
  >
    <g fill="none">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m19 19 11 11"></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: '24px',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  strokeWidth:{
    type: String,
    default: '1px',
  },
});
</script>
