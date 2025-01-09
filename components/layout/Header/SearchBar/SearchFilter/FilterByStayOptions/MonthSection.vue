<template>
  <div class="w-full">
    <h3
      class="text-lg text-bold font-medium mt-8 w-full flex items-center justify-center"
    >
      ¿Cuándo es tu viaje?
    </h3>
    <div class="w-full flex flex-col items-center justify-center mt-8">
      <CircularMonthRangeSelectorCopy3
        :starDate="tripStartDate"
        :endDate="tripEndDate"
        :value="circularMonthSelector"
        @handleChange="handleChange"
      />
      <div class="w-full flex items-center justify-center mt-4">
        <p class="text-light text-sm">
          {{ filterValueWhenFormatted.startDate }} - {{ filterValueWhenFormatted.endDate  }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircularMonthRangeSelectorCopy3 from "~/components/common/CircularMonthRangeSelector/CircularMonthRangeSelectorCopy3.vue";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";

const useSearch = useFiltersStore();

const { updateValue, values, updateCircularMonthSelector } = useSearch;

const { tripEndDate, tripStartDate, circularMonthSelector } =
  storeToRefs(useSearch);

const { filterValueWhenFormatted } = useFormattedWhenValue(
  () => values.when,
  tripStartDate,
  tripEndDate,
  "d MMM. yyyy"
);

function handleChange(index, value) {
  updateValue("when", value);
  updateCircularMonthSelector(index);
}
</script>
