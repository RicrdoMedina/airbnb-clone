<template>
  <div :class="dynamicClasses" ref="$searchFilter">
    <FilterByRegion />
    <FilterByStayOptions />
    <FilterNumberOfGuests />

    <template v-if="filterStates.where">
      <RegionSelector
        :options="searchRegions"
        @handleClick="handleRegionSelection"
      />
    </template>

    <template
      v-if="filterStates.arrival || filterStates.output || filterStates.when"
    >
      <FloatingTabsStayOptions />
    </template>

    <template v-if="filterStates.who">
      <GuestCountSelector />
    </template>
  </div>
</template>

<script setup>
import RegionSelector from "./FilterByRegion/RegionSelector.vue";
import GuestCountSelector from "./FilterNumberOfGuests/GuestCountSelector.vue";
import FloatingTabsStayOptions from "./FilterByStayOptions/FloatingTabsStayOptions.vue";
import { useClickOutside } from "~/components/composables/useClickOutside";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import FilterByRegion from "./FilterByRegion/FilterByRegion.vue";
import FilterByStayOptions from "./FilterByStayOptions/FilterByStayOptions.vue";
import FilterNumberOfGuests from "./FilterNumberOfGuests/FilterNumberOfGuests.vue";

const $searchFilter = ref(null);

const useSearch = useFiltersStore();

const { isFilterActive, filterStates, searchRegions } = storeToRefs(useSearch);

const { disableSearch, resetFilterStates, handleRegionSelection } = useSearch;

const defaultClasses =
  "w-full rounded-full h-16 top-0 left-0 flex overflow-hidden border";

const activeClasses = "bg-custom-gray-200 border-gray-300";

const inactiveClasses = "bg-white shadow-search-box-inactive";

const { dynamicClasses } = useDynamicClasses(
  isFilterActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const handleClickOutside = (event) => {
  if ($searchFilter.value && !$searchFilter.value.contains(event.target)) {
    disableSearch();
    resetFilterStates();
  }
};

useClickOutside(handleClickOutside);
</script>
