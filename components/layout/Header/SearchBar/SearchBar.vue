<template>
  <form :class="searchBarClasses" action="" id="searchBar">
    <SearchOptions />
    <SearchFilter />
  </form>
</template>

<script setup>
import SearchFilter from "~/components/layout/Header/SearchBar/SearchFilter/SearchFilter.vue";
import SearchOptions from "~/components/layout/Header/SearchBar/SearchOptions/SearchOptions.vue";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
const useSearchBar = useSearchBarStore();
const { isStickyFilterActive, littleSearchIsActive } = storeToRefs(useSearchBar);

const searchBarClasses = computed(() => {
  if (isStickyFilterActive.value) {
    return "w-full lg:w-108 px-4 md:px-16 lg:px-0 mx-auto block relative search-bar-transition md:bg-white cursor-pointer";
  }
  if (littleSearchIsActive.value) {
    return "w-full lg:w-108 px-4 md:px-16 lg:px-0 mx-auto block relative search-bar-transition hide-transition cursor-pointer";
  }

  return "w-full lg:w-108 px-4 md:px-16 lg:px-0 mx-auto hide block relative search-bar-transition cursor-pointer";
});
</script>
