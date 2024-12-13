<template>
  <div
    :class="containerDynamicClasses"
    @click.stop.prevent="handleChangeFilterOption('Output')"
    v-if="!showFilterWhen"
  >
    <!-- SelectedDepartureDateHoverBackground -->
    <template v-if="filterArrivalActive">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <!-- SelectedDepartureDateHoverBackground -->
    <template v-if="filterWhoIsActive">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <div class="w-full h-full z-50 flex flex-col items-center justify-center">
      <span class="w-full text-xs font-medium text-bold">Salida</span>
      <div :class="blockDynamicClasses">
        {{ formattedDepartureDate }}
        <span v-if="approximateDays" class="text-xs ml-1 text-light font-normal"
          >±{{ approximateDays }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { es } from "date-fns/locale";
import { format } from "date-fns";

const useSearch = useSearchStore();

const { handleChangeFilterOption } = useSearch;

const {
  filterArrivalActive,
  filterOutputActive,
  filterActive,
  departureDateValue,
  approximateDays,
  showFilterWhen,
  filterWhoIsActive,
} = storeToRefs(useSearch);

const defaultClasses = computed(() => ({
  "w-36": true,
  "h-full": true,
  "rounded-full": true,
  flex: true,
  "flex-col": true,
  "items-center": true,
  "justify-center": true,
  "px-6": true,
  relative: true,
  group: true,
  "z-0": filterArrivalActive.value,
  "z-10": !filterArrivalActive.value,
}));

const blockDefaultClasses =
  "w-full bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap";

const blockActiveClasses = "text-bold font-medium";

const activeClasses = "bg-white shadow-search-box-inactive";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !filterActive.value,
  "hover:bg-custom-gray-300":
    filterActive.value &&
    !filterOutputActive.value &&
    !filterArrivalActive.value &&
    !filterWhoIsActive.value,
}));

const blockInactiveClasses = "text-light";

const { dynamicClasses: containerDynamicClasses } = useDynamicClasses(
  filterOutputActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: blockDynamicClasses } = useDynamicClasses(
  departureDateValue,
  blockDefaultClasses,
  blockActiveClasses,
  blockInactiveClasses
);

const formattedDepartureDate = computed(() => {
  if (!departureDateValue.value) return "Agregar fecha";

  const formattedDate = format(departureDateValue.value, "dd MMM", {
    locale: es,
  });

  return formattedDate;
});
</script>
