<template>
  <div
    class="w-full h-full flex flex-col items-start justify-center relative z-50"
    @click.stop.prevent="handleChangeFilterOption('Where')"
  >
    <label class="text-xs font-medium text-bold" for="">Dónde</label>
    <input
      :class="inputDynamicClasses"
      type="text"
      placeholder="Explora destinos"
      :value="filterValueWhere"
    />
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="hoverBackgroundDynamicClasses"></div>

  <!-- SelectedRegionHoverBackground -->
  <div
    class="w-64 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
    v-show="filterArrivalActive || filterWhenActive"
  ></div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useSearchStore();

const { handleChangeFilterOption } = useSearch;

const {
  filterWhereActive,
  filterActive,
  filterValueWhere,
  filterArrivalActive,
  filterWhenActive,
} = storeToRefs(useSearch);

const hoverBackgroundDefaultClasses = "absolute inset-0 w-full h-full rounded-full ease-in-out transition-all duration-500 z-40";

const inputDefaultClasses = "w-full bg-transparent border-0 outline-0 text-sm";

const hoverBackgroundActiveClasses = "bg-white shadow-search-box-inactive";

const inputActiveClasses = "text-bold font-medium";


const hoverBackgroundInactiveClasses = computed(() => ({
  "group-hover:bg-custom-gray-200": !filterActive.value,
  "group-hover:bg-custom-gray-300":
    filterActive.value && !filterWhereActive.value,
}));

const inputInactiveClasses = "text-light";

const { dynamicClasses: hoverBackgroundDynamicClasses } = useDynamicClasses(
  filterWhereActive,
  hoverBackgroundDefaultClasses,
  hoverBackgroundActiveClasses,
  hoverBackgroundInactiveClasses
);

const { dynamicClasses: inputDynamicClasses } = useDynamicClasses(
  filterValueWhere,
  inputDefaultClasses,
  inputActiveClasses,
  inputInactiveClasses
);
</script>
