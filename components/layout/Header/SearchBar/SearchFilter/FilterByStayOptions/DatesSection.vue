<template>
  <div class="w-full mt-4">
    <MultiCalendar
      :minDate="getMinDate"
      :maxDate="getMaxDate"
      @handleChange="handleChange"
    />
    <div class="w-full mt-4 flex items-center justify-start">
      <button
        type="button"
        v-for="date in exactDates"
        :key="date.id"
        :class="dynamicClasses(date.value).value"
        @click.stop.prevent="$emit('setApproximateDays', date.value)"
      >
        <span class="inline-block mr-2" v-if="date.value">
          <img class="w-3" src="/images/IconDate.svg" alt="Fechas Exactas" />
        </span>
        {{ date.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MultiCalendar from "~/components/common/MultiCalendar/MultiCalendar.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { isEmpty } from "~/utils/helpers";

const props = defineProps({
  dateRange:{
    type: Array,
    required: true,
  },
  exactDates: {
    type: Array,
    required: true,
  },
  approximateDays: {
    type: Number,
    default: 0,
    required: true,
  },
});

const emit = defineEmits(["handleDateRange"]);

const exactDateButtonDefaultClasses =
  "text-xs px-3 py-1 mr-3 ease-in-out transition-all duration-500 h-full flex items-center justify-center text-light cursor-pointer rounded-full cursor-pointer z-10";

const exactDateButtonActiveClasses = "shadow-solid-black-2";

const exactDateButtonInactiveClasses =
  "shadow-custom-gray hover:shadow-solid-black";


const dynamicClasses = (day) =>
  useDynamicClasses(
    () => props.approximateDays === day,
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

function handleChange (val, range) {
  emit("handleDateRange", val, range);
}
</script>
