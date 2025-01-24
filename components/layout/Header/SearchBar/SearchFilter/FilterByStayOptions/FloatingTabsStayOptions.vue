<template>
  <div
    class="absolute top-full right-0 left-0 mt-4 mx-auto bg-white shadow-xl px-6 py-6 z-40 w-108 rounded-3xl"
  >
    <section class="w-full">
      <div class="flex items-center justify-center">
        <SubFilterButtons
          :options="dateOptions"
          :selectedOption="activeSubFilter"
          @handleClick="toggleSubFilter"
        />
      </div>

      <component
        :is="currentComponent"
        :dateRange="values.travelDate"
        :selectedDate="values.approximateDays"
        :additionalOptions="exactDates"
        :stayList="stayDurations"
        :stayAtPlace="values.stayDuration"
        :items="availableMonths"
        :selectedItems="values.selectedMonths"
        :tripStartDate="tripStartDate"
        :tripEndDate="tripEndDate"
        :selectedMonth="values.when"
        :circularMonthSelector="circularMonthSelector"
        @handleApproximateDays="handleApproximateDays"
        @handleStayAtPlace="handleStayAtPlace"
        @handleDateRange="handleDateRange"
        @handleSelectedMonthRange="handleSelectedMonthRange"
      />
    </section>
  </div>
</template>

<script setup>
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import SubFilterButtons from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SubFilterButtons.vue";
import DatesSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/DatesSection.vue";
import MonthSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/MonthSection.vue";
import FlexibleSection from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/FlexibleSection.vue";

const useSearchBar = useSearchBarStore();

const {
  toggleSubFilter,
  updateValue,
  values,
  handleDateRange,
  updateCircularMonthSelector,
} = useSearchBar;
const {
  activeSubFilter,
  stayDurations,
  availableMonths,
  dateOptions,
  exactDates,
  tripEndDate,
  tripStartDate,
  circularMonthSelector,
} = storeToRefs(useSearchBar);

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

function handleSelectedMonthRange(index, value) {
  updateValue("when", value);
  updateCircularMonthSelector(index);
}
</script>
