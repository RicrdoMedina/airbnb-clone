<template>
  <div
    class="w-full h-full flex flex-col items-start justify-center relative z-50"
    @click.stop.prevent="toggleSubFilter('where')"
  >
    <label class="text-xs font-medium text-bold" for="">Dónde</label>
    <input
      :class="inputDynamicClasses"
      type="text"
      placeholder="Explora destinos"
      :value="values.where"
    />

    <span
      class="flex items-center justify-center w-6 h-6 absolute right-4 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
      v-show="showCloseIcon"
      @click.stop.prevent="reset"
    >
      <img class="w-3" src="/images/CloseIcon.svg" alt="Close" />
    </span>
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="hoverBackgroundDynamicClasses"></div>

  <!-- SelectedRegionHoverBackground -->
  <div
    class="w-64 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
    v-show="filterStates.arrival || filterStates.when"
  ></div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useFiltersStore();

const { toggleSubFilter, filterStates, values,updateValue } = useSearch;

const { isFilterActive } = storeToRefs(useSearch);

const hoverBackgroundDefaultClasses =
  "absolute inset-0 w-full h-full rounded-full ease-in-out transition-all duration-500 z-40";

const inputDefaultClasses = "w-full bg-transparent border-0 outline-0 text-sm";

const hoverBackgroundActiveClasses = "bg-white shadow-search-box-inactive";

const inputActiveClasses = "text-bold font-medium";

const hoverBackgroundInactiveClasses = computed(() => ({
  "group-hover:bg-custom-gray-200": !isFilterActive.value,
  "group-hover:bg-custom-gray-300": isFilterActive.value && !filterStates.where,
}));

const inputInactiveClasses = "text-light";

const { dynamicClasses: hoverBackgroundDynamicClasses } = useDynamicClasses(
  () => filterStates.where,
  hoverBackgroundDefaultClasses,
  hoverBackgroundActiveClasses,
  hoverBackgroundInactiveClasses
);

const { dynamicClasses: inputDynamicClasses } = useDynamicClasses(
  () => values.where,
  inputDefaultClasses,
  inputActiveClasses,
  inputInactiveClasses
);

const showCloseIcon = computed(() => {
  return values.where && filterStates.where;
});

function reset() {
  updateValue("where", null);
}
</script>
