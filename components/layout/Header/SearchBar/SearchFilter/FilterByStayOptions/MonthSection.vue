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
        @handleSelectedMonthRange="handleSelectedMonthRange"
      />
      <div class="w-full flex items-center justify-center mt-4">
        <p class="text-light text-sm">
          {{ filterValueWhenFormatted.startDate }} -
          {{ filterValueWhenFormatted.endDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircularMonthRangeSelectorCopy3 from "~/components/common/CircularMonthRangeSelector/CircularMonthRangeSelectorCopy3.vue";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";

const props = defineProps({
  tripStartDate: {
    type: Date,
    required: true,
  },
  tripEndDate: {
    type: Date,
    required: true,
  },
  selectedMonth: {
    type: Array,
    required: true,
  },
  circularMonthSelector: {
    type: Number,
    default: 0,
    required: true,
  },
});

const emit = defineEmits(["handleSelectedMonthRange"]);

const { filterValueWhenFormatted } = useFormattedWhenValue(
  () => props.selectedMonth,
  props.tripStartDate,
  props.tripEndDate,
  "d MMM. yyyy"
);

function handleSelectedMonthRange(index, value) {
  emit("handleSelectedMonthRange", index, value);
}
</script>
