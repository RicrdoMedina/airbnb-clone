<template>
  <div :class="dynamicClasses" @click.stop.prevent="toggleSubFilter('who')">
    <span
      :class="labelDynamicClasses"
      >Quién</span
    >
    <div
      :class="fieldDynamicClasses"
    >
      {{ formattedNumberGuests }}
    </div>
    <span
      class="flex items-center justify-center w-6 h-6 absolute right-2 cursor-pointer rounded-full hover:bg-custom-gray-300 ease-in-out transition-all duration-500"
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
  <div class="w-auto h-full flex items-center justify-center z-50">
    <DefaultButton
      :class="buttonDynamicClasses"
      :isDisabled="!isFilterActive"
      @onClick="getListings"
    >
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

const defaultClasses =
  "filter w-full h-full flex flex-col items-start justify-center relative z-50 before:content-[''] before:bg-custom-gray-400 before:absolute before:w-px before:h-8 before:-left-6";

const activeClasses = "before:hidden";

const inactiveClasses = "";

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

const labelDefaultClasses =
  "text-xs font-medium text-bold rounded-md";

const labelActiveClasses = "background-animation";

const labelInactiveClasses = "";

const fieldDefaultClasses =
  "w-4/5 text-light bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap rounded-md";

const fieldActiveClasses = "background-animation mt-0.5";

const fieldInactiveClasses = "";

const { dynamicClasses } = useDynamicClasses(
  isFilterActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
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

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  isLoading,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

const { dynamicClasses: fieldDynamicClasses } = useDynamicClasses(
  isLoading,
  fieldDefaultClasses,
  fieldActiveClasses,
  fieldInactiveClasses
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
