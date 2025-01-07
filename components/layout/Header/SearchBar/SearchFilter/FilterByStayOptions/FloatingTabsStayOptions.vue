<template>
  <div
    class="absolute top-full right-0 left-0 mt-4 mx-auto bg-white shadow-xl px-6 py-6 z-40 w-108 rounded-3xl"
  >
    <section class="w-full">
      <div class="w-full flex items-center justify-center">
        <SubFilterButtons
          :options="dateOptions"
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
import SubFilterButtons from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SubFilterButtons.vue";
import DatesSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/DatesSection.vue";
import MonthSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/MonthSection.vue";
import FlexibleSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/FlexibleSection.vue";

import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useFiltersStore();

const { toggleSubFilter, updateValue, filterStates, values } = useSearch;
const { activeSubFilter, stayDurations, availableMonths,dateOptions } =
  storeToRefs(useSearch);

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
