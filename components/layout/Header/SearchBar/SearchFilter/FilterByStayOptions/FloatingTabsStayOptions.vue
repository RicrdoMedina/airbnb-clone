<template>
  <div
    class="absolute top-full left-0 mt-4 bg-white shadow-xl px-6 py-6 z-10 w-108"
  >
    <section class="w-full">
      <div class="w-full flex items-center justify-center">
        <SubFilterButtons
          :options="options"
          :selectedOption="subFilterOption"
          @change="handleChangeFilterOption"
        />
      </div>

      <component
        :is="currentComponent"
        :approximateDays="approximateDays"
        :stayList="stayList"
        :stayAtPlace="stayAtPlace"
        :months="months"
        @setApproximateDays="setApproximateDays"
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

import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useSearchStore();

const { handleChangeFilterOption, setApproximateDays, handleStayAtPlace } =
  useSearch;
const { subFilterOption, approximateDays, stayAtPlace, stayList, months } =
  storeToRefs(useSearch);

const options = [
  { label: "Fechas", value: "Dates", filter: "Arrival" },
  { label: "Meses", value: "Month", filter: "When" },
  { label: "Flexible", value: "Flexible", filter: "When" },
];

const currentComponent = computed(() => {
  if (subFilterOption.value === "Dates") return DatesSection;
  if (subFilterOption.value === "Month") return MonthSection;
  if (subFilterOption.value === "Flexible") return FlexibleSection;
});
</script>
