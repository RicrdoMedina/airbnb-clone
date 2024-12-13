<template>
  <div
    class="w-full h-full flex flex-col items-start justify-center relative z-50"
    @click.stop.prevent="handleChangeFilterOption('WhoIs')"
  >
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
          :class="[filterActive ? 'w-5 mr-1' : 'w-5']"
          src="/images/Search.svg"
          alt="Search"
      /></span>

      <template v-if="filterActive"> Buscar </template>
    </button>
  </div>

  <!-- SelectedRegionHoverBackground -->
  <div :class="dynamicClasses"></div>

  <!-- SelectedGuestsHoverBackground -->
  <template v-if="filterOutputActive">
    <div
      class="w-80 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
    ></div>
  </template>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";

const useSearch = useSearchStore();

const { handleChangeFilterOption } = useSearch;

const {
  filterActive,
  filterOutputActive,
  filterWhoIsActive,
  filterWhenActive,
  numberAdults,
  numberChildren,
  numberBabies
} = storeToRefs(useSearch);

const defaultClasses =
  "absolute inset-0 w-full h-full rounded-full ease-in-out transition-all duration-500 z-40";

const buttonDefaultClasses =
  "text-white rounded-full flex items-center justify-center h-12 font-medium";

const activeClasses = "bg-white shadow-search-box-inactive";

const buttonActiveClasses = "bg-primary w-28";

const inactiveClasses = computed(() => ({
  "group-hover:bg-custom-gray-200": !filterActive.value,
  "group-hover:bg-custom-gray-300":
    filterActive.value && !filterWhoIsActive.value,
}));

const buttonInactiveClasses = "w-12 bg-tomato";

const { dynamicClasses } = useDynamicClasses(
  filterWhoIsActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  filterActive,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);

  const formattedNumberGuests = computed(() => {
    const numberGuests =
      numberAdults.value + numberChildren.value + numberBabies.value;

    if (!numberGuests) return "¿Cuántos?";

    const formattedNumberGuests = `${numberGuests} huéspedes`;

    return formattedNumberGuests;
  });
</script>
