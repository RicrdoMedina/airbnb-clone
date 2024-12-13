<template>
  <div :class="dynamicClasses" ref="$searchFilter">
    <FilterByRegion />
    <FilterByStayOptions />
    <FilterNumberOfGuests />

    <template v-if="filterWhereActive">
      <RegionSelector :options="searchListByRegion" />
    </template>

    <template
      v-if="filterArrivalActive || filterOutputActive || filterWhenActive"
    >
      <FloatingTabsStayOptions />
    </template>

    <template v-if="filterWhoIsActive">
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
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import FilterByRegion from "./FilterByRegion/FilterByRegion.vue";
import FilterByStayOptions from "./FilterByStayOptions/FilterByStayOptions.vue";
import FilterNumberOfGuests from "./FilterNumberOfGuests/FilterNumberOfGuests.vue";

const $searchFilter = ref(null);

const useSearch = useSearchStore();

const {
  filterActive,
  filterWhereActive,
  searchListByRegion,
  filterArrivalActive,
  filterOutputActive,
  filterWhenActive,
  filterWhoIsActive
} = storeToRefs(useSearch);

const { setInactiveFilter } = useSearch;

const defaultClasses = "w-full rounded-full h-16 top-0 left-0 flex overflow-hidden border";

const activeClasses = "bg-custom-gray-200 border-gray-300";

const inactiveClasses = "bg-white shadow-search-box-inactive";

const { dynamicClasses } = useDynamicClasses(
  filterActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const handleClickOutside = (event) => {
  if ($searchFilter.value && !$searchFilter.value.contains(event.target)) {
    setInactiveFilter();
  }
};

useClickOutside(handleClickOutside);
</script>
