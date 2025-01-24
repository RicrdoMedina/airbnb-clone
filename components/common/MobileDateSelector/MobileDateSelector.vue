<template>
  <div class="w-full flex flex-col justify-between">
    <MobileVerticalCaledar
      :dateRange="dateRange"
      :selectedDateId="selectedDateId"
      @handleSelectedDateId="handleSelectedDateId"
      @handleRangeStart="handleRangeStart"
      @handleRangeEnd="handleRangeEnd"
    />
  </div>
</template>

<script setup>
import MobileVerticalCaledar from "~/components/common/MobileVerticalCaledar/MobileVerticalCaledar.vue";

const props = defineProps({
  selectedDateId: {
    type: Array,
    default: [],
  },
  dateRange: {
    type: Array,
    default: [],
  }
});

const emit = defineEmits([
  "handleRangeStart",
  "handleRangeEnd",
  "handleSelectedDateId",
]);

function handleRangeStart(value, range) {
  emit("handleRangeStart", value, range);
}

function handleRangeEnd(value, range) {
  emit("handleRangeEnd", value, range);
}

function handleSelectedDateId(val) {
  emit("handleSelectedDateId", val);
}
</script>
