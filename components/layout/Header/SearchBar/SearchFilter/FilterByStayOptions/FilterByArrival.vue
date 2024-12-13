<template>
  <div class="w-full flex items-center justify-start rounded-full h-full">
    <SelectedLocation />
    <SelectedArrivalDate />
    <SelectedDepartureDate />
  </div>
</template>

<script setup>
import SelectedArrivalDate from "./SelectedArrivalDate.vue";
import SelectedDepartureDate from "./SelectedDepartureDate.vue";
import SelectedLocation from "./SelectedLocation.vue";
</script>
