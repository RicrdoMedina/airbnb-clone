<template>
  <div class="w-full mt-4">
    <MultiCalendar
      :minDate="getMinDate"
      :maxDate="getMaxDate"
      @handleChange="handleDateRange"
    />
    <div class="w-full mt-4 flex items-center justify-start">
      <button
        type="button"
        :class="exactDateButtonDynamicClasses"
        @click.stop.prevent="$emit('setApproximateDays', '')"
      >
        Fechas Exactas
      </button>
      <template v-for="day in [1, 2, 3, 7]" :key="day">
        <button
          type="button"
          :class="dynamicClasses(day).value"
          @click.stop.prevent="$emit('setApproximateDays', day)"
        >
          <span class="inline-block mr-2">
            <img class="w-3" src="/images/IconDate.svg" alt="Fechas Exactas" />
          </span>
          {{ day }} día{{ day > 1 ? "s" : "" }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MultiCalendar from "~/components/common/MultiCalendar/MultiCalendar.vue";
import { storeToRefs } from "pinia";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { isEmpty } from "~/utils/helpers";

const useSearch = useFiltersStore();

const { dateRange } = storeToRefs(useSearch);

const { handleDateRange } = useSearch;

const props = defineProps({
  approximateDays: {
    type: Number,
    default: 0,
    required: true,
  },
});

const exactDateButtonDefaultClasses =
  "text-xs px-3 py-1 mr-3 ease-in-out transition-all duration-500 h-full flex items-center justify-center text-light cursor-pointer rounded-full";

const exactDateButtonActiveClasses = "shadow-solid-black-2";

const exactDateButtonInactiveClasses =
  "shadow-custom-gray hover:shadow-solid-black";

const { dynamicClasses: exactDateButtonDynamicClasses } = useDynamicClasses(
  () => !props.approximateDays,
  exactDateButtonDefaultClasses,
  exactDateButtonActiveClasses,
  exactDateButtonInactiveClasses
);

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
  return isEmpty(dateRange.value) ? null : dateRange.value[0];
});

const getMaxDate = computed(() => {
   return isEmpty(dateRange.value) ? null : dateRange.value[1];
});
</script>
