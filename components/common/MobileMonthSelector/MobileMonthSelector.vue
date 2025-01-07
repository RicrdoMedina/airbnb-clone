<template>
  <div class="w-full pt-6">
    <div class="w-full flex items-center justify-center shadow-bottom h-16">
      <CounterCard
        :counter="monthCounter"
        min="1"
        max="12"
        title="Mes(es)"
        @updateCounter="setMonthCounter"
      />
    </div>
    <div
      class="w-full flex items-center justify-center shadow-bottom h-16"
    >
    <p class="w-full text-left text-bold text-md">Fecha de inicio</p>
  </div>
    <div
      class="w-full flex items-center justify-center shadow-bottom h-16"
    >
    <p class="w-full text-left text-bold text-md">Fecha de finalización</p>
  </div>
  </div>
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard/CounterCard.vue";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
const useSearch = useFiltersStore();
const { updateValue, values } = useSearch;
const { tripEndDate, tripStartDate } = storeToRefs(useSearch);

const monthCounter = ref(1);

function setMonthCounter(val) {
  monthCounter.value = val;
}
</script>
