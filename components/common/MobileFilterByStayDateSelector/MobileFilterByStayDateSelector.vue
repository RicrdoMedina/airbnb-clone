<template>
  <div>
    <section :class="dynamicClasses">
      <h2 class="text-bold font-medium text-xl pt-4 px-6">
        ¿Cuándo es tu viaje?
      </h2>
      <div class="h-full">
        <div class="w-full relative mt-6 mb-2 px-4">
          <SubFilterButtons
            :options="dateOptions"
            :selectedOption="activeSubFilter"
            @change="toggleSubFilter"
          />
        </div>

        <div class="w-full h-full">
          <component
            :is="currentComponent"
            :startDate="filterValueWhenFormatted.startDate"
            :endDate="filterValueWhenFormatted.endDate"
            :monthCounter="circularMonthSelector"
            monthCounterLabel="Mes(es)"
            startDateLabel="Fecha de inicio"
            endDateLabel="Fecha de finalización"
            :approximateDays="values.approximateDays"
            :stayList="stayDurations"
            :stayAtPlace="values.stayDuration"
            :availableMonths="availableMonths"
            :selectedItems="values.selectedMonths"
            :exactDates="exactDates"
            @setMonthCounter="setMonthCounter"
            @setStayAtPlace="setStayAtPlace"
            @setMonth="toggleMonthSelection"
            @setApproximateDays="setApproximateDays"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import SubFilterButtons from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SubFilterButtons.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import MobileMonthSelector from "~/components/common/MobileMonthSelector/MobileMonthSelector.vue";
import MobileFlexibleDate from "~/components/common/MobileFlexibleDate/MobileFlexibleDate.vue";
import MobileDateSelector from "~/components/common/MobileDateSelector/MobileDateSelector.vue";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";
import { calculateFutureDate } from "~/utils/dateUtils";

const useSearch = useFiltersStore();

const {
  handleRegionSelection,
  values,
  toggleMonthSelection,
  toggleSubFilter,
  updateCircularMonthSelector,
  updateValue,
} = useSearch;

const {
  dateOptions,
  activeSubFilter,
  stayDurations,
  availableMonths,
  tripStartDate,
  tripEndDate,
  circularMonthSelector,
  exactDates
} = storeToRefs(useSearch);

const selectedRegion = ref(null);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const defaultClasses =
  "mx-3 mt-4 h-auto relative bg-white z-60 rounded-3xl shadow-floating-card";

const activeClasses = "block";

const inactiveClasses = "hidden";

const { dynamicClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const currentComponent = computed(() => {
  if (activeSubFilter.value === "Dates") return MobileDateSelector;
  if (activeSubFilter.value === "Month") return MobileMonthSelector;
  if (activeSubFilter.value === "Flexible") return MobileFlexibleDate;
});

const { filterValueWhenFormatted } = useFormattedWhenValue(
  () => values.when,
  tripStartDate,
  tripEndDate,
  "d MMM. yyyy"
);

function handleClick(id) {
  handleRegionSelection(id);
  selectedRegion.value = id;
}

function setMonthCounter(val) {
  const monthUpdated = val + 1;
  const endDate = calculateFutureDate(monthUpdated);
  updateCircularMonthSelector(val);
  updateValue("when", [tripStartDate.value, endDate]);
}

function setStayAtPlace(value) {
  updateValue("stayDuration", value);
}

function setApproximateDays (value) {
  updateValue("approximateDays",value)
}
</script>
