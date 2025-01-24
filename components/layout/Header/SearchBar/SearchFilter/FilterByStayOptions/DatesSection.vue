<template>
  <div class="w-full mt-4">
    <MultiCalendar
      :minDate="getMinDate"
      :maxDate="getMaxDate"
      @handleChange="handleChange"
    />
    <div class="w-full mt-4 flex items-center justify-start">
      <DefaultButton
        v-for="date in additionalOptions"
        :key="date.id"
        :class="dynamicClasses(date.value).value"
        @onClick="handleApproximateDays(date.value)"
      >
        <span class="inline-block mr-2" v-if="date.value">
          <img class="w-3" src="/images/IconDate.svg" alt="Fechas Exactas" />
        </span>
        {{ date.name }}
      </DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MultiCalendar from "~/components/common/MultiCalendar/MultiCalendar.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { isEmpty } from "~/utils/helpers";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const props = defineProps({
  dateRange: {
    type: Array,
    required: true,
  },
  additionalOptions: {
    type: Array,
    default: [],
  },
  selectedDate: {
    type: Number,
    default: 0,
    required: true,
  },
});

const emit = defineEmits(["handleDateRange", "handleApproximateDays"]);

const exactDateButtonDefaultClasses =
  "text-xs px-3 py-1 mr-3 ease-in-out transition-all duration-500 h-full flex items-center justify-center text-light cursor-pointer rounded-full cursor-pointer z-10";

const exactDateButtonActiveClasses = "shadow-solid-black-2";

const exactDateButtonInactiveClasses =
  "shadow-custom-gray hover:shadow-solid-black";

const dynamicClasses = (day) =>
  useDynamicClasses(
    () => props.selectedDate === day,
    exactDateButtonDefaultClasses,
    exactDateButtonActiveClasses,
    exactDateButtonInactiveClasses
  ).dynamicClasses;

// const minDate = ref(new Date());
// const maxDate = ref(new Date(new Date().setDate(new Date().getDate() + 7)));

const getMinDate = computed(() => {
  return isEmpty(props.dateRange) ? null : props.dateRange[0];
});

const getMaxDate = computed(() => {
  return isEmpty(props.dateRange) ? null : props.dateRange[1];
});

function handleChange(val, range) {
  emit("handleDateRange", val, range);
}

function handleApproximateDays(val) {
  emit("handleApproximateDays", val);
}
</script>
