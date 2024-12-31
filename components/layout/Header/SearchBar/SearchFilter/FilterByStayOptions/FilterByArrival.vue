<template>
  <div class="w-full flex items-center justify-start rounded-full h-full">
    <SelectedLocation/>
    <SelectedArrivalDate />
    <SelectedDepartureDate />
  </div>
</template>

<script setup>
import SelectedArrivalDate from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SelectedArrivalDate.vue";
import SelectedDepartureDate from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SelectedDepartureDate.vue";
import SelectedLocation from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SelectedLocation.vue";
</script>
