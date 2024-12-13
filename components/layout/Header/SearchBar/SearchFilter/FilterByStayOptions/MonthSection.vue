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
        :value="whenValue"
        @handleChange="handleWhenValue"
      />
      <div class="w-full flex items-center justify-center mt-4">
        <p class="text-light text-sm">
          {{ filterValueWhenFormatted }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircularMonthRangeSelectorCopy3 from "~/components/common/CircularMonthRangeSelectorCopy3.vue";
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";

const useSearch = useSearchStore();

const { handleWhenValue } = useSearch;

const { tripEndDate, tripStartDate, whenValue } = storeToRefs(useSearch);

const { filterValueWhenFormatted } = useFormattedWhenValue(
  whenValue,
  tripStartDate,
  tripEndDate,
  "d MMM. yyyy"
);
</script>
