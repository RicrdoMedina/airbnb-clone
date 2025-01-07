<template>
  <div class="w-1/2 md:w-96 lg:w-60 px-2 py-3 overflow-hidden cursor-pointer">
    <NuxtLink to="/" class="">
      <h5 class="text-bold text-sm font-medium">{{ title }}</h5>
      <p class="text-light text-sm">{{ formattedSubtitle }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
import { truncateString } from "~/utils/stringUtils";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
});

const formattedSubtitle = computed(() => {
  return truncateString(props.subtitle, 25);
});
</script>
