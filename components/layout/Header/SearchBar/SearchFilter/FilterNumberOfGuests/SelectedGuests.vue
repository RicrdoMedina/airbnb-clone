<template>
  <div :class="dynamicClasses" @click.stop.prevent="toggleSubFilter('who')">
    <span
      class="text-xs font-medium text-bold rounded-md"
      :class="{ 'background-animation': isLoading }"
      >Quién</span
    >
    <div
      class="w-4/5 text-light bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap rounded-md"
      :class="{ 'background-animation': isLoading, 'mt-0.5': isLoading }"
    >
      {{ formattedNumberGuests }}
    </div>
    <span
      class="flex items-center justify-center w-6 h-6 absolute right-2 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
      v-show="shouldShowCloseIcon"
      @click.stop.prevent="reset"
    >
      <img class="w-3" src="/images/CloseIcon.svg" alt="Close" />
    </span>
  </div>
  <div class="w-auto h-full flex items-center justify-center z-50">
    <DefaultButton :class="buttonDynamicClasses" :isDisabled="!isFilterActive" @onClick="getListings">
      <span :class="[isFilterActive ? 'w-5 mr-1' : 'w-5']">
        <OutlineSearch size="20px" :strokeWidth="'4px'" />
      </span>

      <template v-if="isFilterActive"> Buscar </template>
    </DefaultButton>
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="hoverBackgroundDynamicClasses"></div>

  <!-- SelectedGuestsHoverBackground -->
  <template v-if="shouldGuestsHoverBackground">
    <div
      class="w-80 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
    ></div>
  </template>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFormattedGuests } from "~/components/composables/useFormattedGuests";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";

const useDataStore = useAppDataStore();
const useSearchBar = useSearchBarStore();

const { toggleSubFilter, filterStates, values, updateValue } = useSearchBar;
const { getListings } = useDataStore;

const { isFilterActive } = storeToRefs(useSearchBar);
const { isLoading } = storeToRefs(useDataStore);

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
  "before:w-px": true,
  "before:h-8": true,
  "before:-left-6": true,
}));

const hoverBackgroundDefaultClasses =
  "absolute inset-0 w-full h-full rounded-full ease-in-out transition-all duration-500 z-40";

const buttonDefaultClasses =
  "text-white rounded-full flex items-center justify-center h-12 font-medium text-white bg-tomato";

const hoverBackgroundActiveClasses = "bg-white shadow-search-box-inactive";

const buttonActiveClasses = "w-28";

const hoverBackgroundInactiveClasses = computed(() => ({
  "group-hover:bg-custom-gray-200": !isFilterActive.value,
  "group-hover:bg-custom-gray-300": isFilterActive.value && !filterStates.who,
}));

const buttonInactiveClasses = "w-12";

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

const { formattedNumberGuests } = useFormattedGuests(values);

const shouldShowCloseIcon = computed(() => {
  const numberGuests = values.adults + values.children + values.babies;

  return numberGuests && filterStates.who;
});

const shouldGuestsHoverBackground = computed(() => {
  return filterStates.output;
});

function reset() {
  updateValue("adults", 0);
  updateValue("children", 0);
  updateValue("babies", 0);
}
</script>
