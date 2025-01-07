<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    :style="{
      height: size,
      width: size,
      stroke: color,
      strokeWidth: strokeWidth,
    }"
    aria-hidden="true"
    role="presentation"
    focusable="false"
  >
    <g fill="none">
      <circle cx="16" cy="16" r="14"></circle>
      <path
        d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"
      ></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: "24px",
  },
  color: {
    type: String,
    default: "currentColor",
  },
  strokeWidth: {
    type: String,
    default: '1px',
  },
});
</script>
