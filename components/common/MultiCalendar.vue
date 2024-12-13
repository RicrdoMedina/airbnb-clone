<template>
  <ClientOnly>
    <VueDatePicker
      v-model="date"
      locale="es-Bo"
      :range="true"
      multi-calendars
      :start-date="minDate"
      :min-date="new Date()"
      :focus-start-date="true"
      :partial-range="true"
      auto-apply
      :inline="true"
      :action-row="{
        showSelect: false,
        showCancel: false,
        showNow: false,
        showPreview: false,
      }"
      @range-start="handleRangeStart"
      @range-end="handleRangeEnd"
    >
      <template #clock-icon>
        <svg></svg>
      </template>
    </VueDatePicker>
  </ClientOnly>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted, watch } from "vue";

const date = ref([]);

const props = defineProps({
  minDate: {
    type: Date,
    default: () => new Date(),
  },
  maxDate: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(["onRangeStart", "onRangeEnd"]);

onMounted(() => {
  if (props.minDate && props.maxDate) {
    date.value = [props.minDate, props.maxDate];
  }
  // const startDate = new Date();
  // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  // date.value = [startDate, endDate];
});

watch(date, async (newDate, oldDate) => {
  emit("onRangeStart", newDate[0]);
  emit("onRangeEnd", newDate[1]);

});

function handleRangeStart(value) {
  emit("onRangeStart", value);
}

function handleRangeEnd(value) {
  emit("onRangeEnd", value);
}
</script>
