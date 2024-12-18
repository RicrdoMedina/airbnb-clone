<template>
  <div
    class="absolute top-full left-0 mt-4 bg-white shadow-xl px-6 py-6 z-10 w-108"
  >
    <section class="w-full">
      <div class="w-full flex items-center justify-center">
        <SubFilterButtons
          :options="options"
          :selectedOption="activeSubFilter"
          @change="toggleSubFilter"
        />
      </div>

      <component
        :is="currentComponent"
        :approximateDays="values.approximateDays"
        :stayList="stayDurations"
        :stayAtPlace="values.stayDuration"
        :items="availableMonths"
        :selectedItems="values.selectedMonths"
        @setApproximateDays="handleApproximateDays"
        @handleStayAtPlace="handleStayAtPlace"
      />
    </section>
  </div>
</template>

<script setup>
import SubFilterButtons from "./SubFilterButtons.vue";
import DatesSection from "./DatesSection.vue";
import MonthSection from "./MonthSection.vue";
import FlexibleSection from "./FlexibleSection.vue";

import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useFiltersStore();

const { toggleSubFilter, updateValue, filterStates, values } = useSearch;
const { activeSubFilter, stayDurations, availableMonths } =
  storeToRefs(useSearch);

const options = [
  { label: "Fechas", value: "Dates", filter: "arrival" },
  { label: "Meses", value: "Month", filter: "when" },
  { label: "Flexible", value: "Flexible", filter: "when" },
];

const currentComponent = computed(() => {
  if (activeSubFilter.value === "Dates") return DatesSection;
  if (activeSubFilter.value === "Month") return MonthSection;
  if (activeSubFilter.value === "Flexible") return FlexibleSection;
});

function handleApproximateDays(value) {
  updateValue("approximateDays", value);
}

function handleStayAtPlace(value) {
  updateValue("stayDuration", value);
}
</script>
