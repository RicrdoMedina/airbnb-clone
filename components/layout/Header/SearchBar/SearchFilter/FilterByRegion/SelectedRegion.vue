<template>
  <div
    class="w-full h-full flex flex-col items-start justify-center relative z-50"
    @click.stop.prevent="toggleSubFilter('where')"
  >
    <label
      :class="labelDynamicClasses"
      for=""
      >Dónde</label
    >

    <span
      class="w-4/5 h-5 mt-0.5 rounded-md background-animation"
      v-if="isLoading"
    ></span>
    <input
      :class="inputDynamicClasses"
      type="text"
      placeholder="Explora destinos"
      :value="getValueInputRegion"
      v-else
    />

    <span
      class="flex items-center justify-center w-6 h-6 absolute right-4 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
      v-show="shouldShowCloseIcon"
      @click.stop.prevent="reset"
    >
      <NuxtImg
        class="w-3"
        src="/images/CloseIcon.svg"
        alt="Close"
        loading="lazy"
      />
    </span>
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="hoverBackgroundDynamicClasses"></div>

  <!-- SelectedRegionHoverBackground -->
  <div
    class="w-64 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
    v-show="shouldShowHoverBackground"
  ></div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useValueInputRegion } from "~/components/composables/useValueInputRegion";
import { useAppDataStore } from "~/store/app/AppDataStore";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
const useDataStore = useAppDataStore();
const useSearchBar = useSearchBarStore();

const { toggleSubFilter, filterStates, values, updateValue } = useSearchBar;

const { isFilterActive, searchRegions } = storeToRefs(useSearchBar);

const { isLoading } = storeToRefs(useDataStore);

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

const labelDefaultClasses =
  "text-xs font-medium text-bold rounded-md";

const labelActiveClasses = "background-animation";

const labelInactiveClasses = "";

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

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  isLoading,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

const { getValueInputRegion } = useValueInputRegion(values, searchRegions);

const shouldShowCloseIcon = computed(() => {
  return values.where && filterStates.where;
});

const shouldShowHoverBackground = computed(() => {
  return filterStates.arrival || filterStates.when;
});

function reset() {
  updateValue("where", null);
}
</script>
