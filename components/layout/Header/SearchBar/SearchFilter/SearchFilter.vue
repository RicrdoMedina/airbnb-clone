<template>
  <div :class="dynamicClasses" ref="$searchFilter">
    <FilterByRegion />
    <FilterByStayOptions />
    <FilterNumberOfGuests />

    <template v-if="shouldShowRegionSelector">
      <RegionSelector />
    </template>

    <template v-if="shouldShowFloatingTabs">
      <FloatingTabsStayOptions />
    </template>

    <template v-if="shouldShowGuestCountSelector">
      <GuestCountSelector />
    </template>
  </div>
</template>

<script setup>
import RegionSelector from "~/components/layout/Header/SearchBar/SearchFilter/FilterByRegion/RegionSelector.vue";
import GuestCountSelector from "~/components/layout/Header/SearchBar/SearchFilter/FilterNumberOfGuests/GuestCountSelector.vue";
import FloatingTabsStayOptions from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/FloatingTabsStayOptions.vue";
import { useClickOutside } from "~/components/composables/useClickOutside";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import FilterByRegion from "~/components/layout/Header/SearchBar/SearchFilter/FilterByRegion/FilterByRegion.vue";
import FilterByStayOptions from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/FilterByStayOptions.vue";
import FilterNumberOfGuests from "~/components/layout/Header/SearchBar/SearchFilter/FilterNumberOfGuests/FilterNumberOfGuests.vue";

const $searchFilter = ref(null);

const useSearchBar = useSearchBarStore();

const { isFilterActive, filterStates } = storeToRefs(useSearchBar);

const { disableSearch, resetFilterStates } = useSearchBar;

const defaultClasses =
  "w-full hidden md:flex rounded-full h-16 top-0 left-0 flex overflow-hidden border cursor-pointer";

const activeClasses = "bg-custom-gray-200 border-gray-300";

const inactiveClasses = "bg-white shadow-search-box-inactive";

const { dynamicClasses } = useDynamicClasses(
  isFilterActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const handleClickOutside = (event) => {
  if (window.innerWidth < 768) {
    return;
  }
  if ($searchFilter.value && !$searchFilter.value.contains(event.target)) {
    disableSearch();
    resetFilterStates();
  }
};

const shouldShowRegionSelector = computed(() => {
  return filterStates.value.where;
});

const shouldShowFloatingTabs = computed(() => {
  return (
    filterStates.value.arrival ||
    filterStates.value.output ||
    filterStates.value.when
  );
});

const shouldShowGuestCountSelector = computed(() => {
  return filterStates.value.who;
});

useClickOutside(handleClickOutside);
</script>
