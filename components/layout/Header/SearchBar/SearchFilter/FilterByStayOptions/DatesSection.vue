<template>
  <div class="w-full mt-4">
    <MultiCalendar
      :minDate="arrivalDateValue"
      :maxDate="departureDateValue"
      @onRangeStart="handleArrivalDate"
      @onRangeEnd="handleDepartureDate"
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
import MultiCalendar from "~/components/common/MultiCalendar.vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const useSearch = useSearchStore();

const { arrivalDateValue, departureDateValue } = storeToRefs(useSearch);

const { handleArrivalDate, handleDepartureDate } = useSearch;

const props = defineProps({
  approximateDays: Number,
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
</script>
