<template>
  <div :class="dynamicClasses" @click.stop.prevent="toggleSubFilter('who')">
    <span class="text-xs font-medium text-bold">Quién</span>
    <div
      class="w-full text-light bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap"
    >
      {{ formattedNumberGuests }}
    </div>
  </div>
  <div class="w-auto h-full flex items-center justify-center z-50">
    <button :class="buttonDynamicClasses">
      <span
        ><img
          :class="[isFilterActive ? 'w-5 mr-1' : 'w-5']"
          src="/images/Search.svg"
          alt="Search"
      /></span>

      <template v-if="isFilterActive"> Buscar </template>
    </button>
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="hoverBackgroundDynamicClasses"></div>

  <!-- SelectedGuestsHoverBackground -->
  <template v-if="filterStates.output">
    <div
      class="w-80 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
    ></div>
  </template>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useFiltersStore();

const { toggleSubFilter, filterStates, values } = useSearch;

const {
  isFilterActive,
  showWhenOptions,
  stayDurations,
  availableMonths,
  tripStartDate,
  tripEndDate,
  activeSubFilter,
} = storeToRefs(useSearch);

const defaultClasses = computed(() => ({
  filter: true,
  "w-full": true,
  "h-full": true,
  flex: true,
  "flex-col": true,
  "items-start": true,
  "justify-center": true,
  relative: true,
  "z-50": true,
  "before:hidden": isFilterActive.value,
  "before:content-['']": true,
  "before:bg-custom-gray-400": true,
  "before:absolute": true,
  "before:left-0": true,
  "before:w-px": true,
  "before:h-8": true,
  "before:-left-6": true,
}));

const hoverBackgroundDefaultClasses =
  "absolute inset-0 w-full h-full rounded-full ease-in-out transition-all duration-500 z-40";

const buttonDefaultClasses =
  "text-white rounded-full flex items-center justify-center h-12 font-medium";

const hoverBackgroundActiveClasses = "bg-white shadow-search-box-inactive";

const buttonActiveClasses = "bg-primary w-28";

const hoverBackgroundInactiveClasses = computed(() => ({
  "group-hover:bg-custom-gray-200": !isFilterActive.value,
  "group-hover:bg-custom-gray-300": isFilterActive.value && !filterStates.who,
}));

const buttonInactiveClasses = "w-12 bg-tomato";

const { dynamicClasses } = useDynamicClasses(
  () => false,
  defaultClasses,
  "",
  ""
);

const { dynamicClasses: hoverBackgroundDynamicClasses } = useDynamicClasses(
  () => filterStates.who,
  hoverBackgroundDefaultClasses,
  hoverBackgroundActiveClasses,
  hoverBackgroundInactiveClasses
);

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  isFilterActive,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);

const formattedNumberGuests = computed(() => {
  const numberGuests = values.adults + values.children + values.babies;

  if (!numberGuests) return "¿Cuántos?";

  const formattedNumberGuests = `${numberGuests} huéspedes`;

  return formattedNumberGuests;
});
</script>
