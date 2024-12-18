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
    type: [Date, null],
    default: null,
    required: true,
  },
  maxDate: {
    type: [Date, null],
    default: null,
    required: true,
  },
});

const emit = defineEmits(["handleChange"]);

onMounted(() => {
  if (props.minDate && props.maxDate) {
    date.value = [props.minDate, props.maxDate];
  }

  if (props.minDate && !props.maxDate) {
    date.value = [props.minDate];
  }
  // const startDate = new Date();
  // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  // date.value = [startDate, endDate];
});

watch(date, async (newDate, oldDate) => {
  emit("handleChange", newDate);
});

watch(
  () => [props.minDate, props.maxDate],
  ([newMinDate, newMaxDate], [oldMinDate, oldMaxDate]) => {
    if (newMinDate && newMaxDate) {
      date.value = [newMinDate, newMaxDate];
    }

    if (newMinDate && !newMaxDate) {
      date.value = [newMinDate];
    }

    if (!newMinDate && !newMaxDate) {
      date.value = [];
    }
  }
);

function handleRangeStart(value) {
  emit("handleChange", value, "MIN");
}

function handleRangeEnd(value) {
  emit("handleChange", value, "MAX");
}
</script>
