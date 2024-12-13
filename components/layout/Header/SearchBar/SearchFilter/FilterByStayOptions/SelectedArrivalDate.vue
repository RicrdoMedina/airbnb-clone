<template>
  <div
    :class="dynamicClasses"
    @click.stop.prevent="handleChangeFilterOption('Arrival')"
    v-if="!showFilterWhen"
  >
    <!-- SelectedArrivalDateHoverBackground -->
    <template v-if="filterWhereActive">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -left-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <!-- SelectedArrivalDateHoverBackground -->
    <template v-if="filterOutputActive">
      <div
        class="w-56 h-full group-hover:bg-custom-gray-300 absolute rounded-full -right-20 ease-in-out transition-all duration-500 z-0"
      ></div>
    </template>

    <div class="w-full h-full z-50 flex flex-col items-center justify-center">
      <span class="w-full text-xs font-medium text-bold">Llegada</span>
      <div :class="blockDynamicClasses">
        {{ formattedArrivalDate }}
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
  filterWhereActive,
  filterArrivalActive,
  filterOutputActive,
  filterActive,
  arrivalDateValue,
  approximateDays,
  showFilterWhen,
} = storeToRefs(useSearch);


const defaultClasses =
  "w-36 h-full rounded-full flex flex-col items-center justify-center px-6 relative group z-10";

const activeClasses = "bg-white shadow-search-box-inactive";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !filterActive.value,
  "hover:bg-custom-gray-300":
    filterActive.value &&
    !filterArrivalActive.value &&
    !filterWhereActive.value &&
    !filterOutputActive.value,
}));

const blockDefaultClasses =
  "w-full bg-transparent border-0 outline-0 text-sm text-ellipsis overflow-hidden whitespace-nowrap";

const blockActiveClasses = "text-bold font-medium";

const blockInactiveClasses = "text-light";

const { dynamicClasses } = useDynamicClasses(
  filterArrivalActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: blockDynamicClasses } = useDynamicClasses(
  arrivalDateValue,
  blockDefaultClasses,
  blockActiveClasses,
  blockInactiveClasses
);

  const formattedArrivalDate = computed(() => {
    if (!arrivalDateValue.value) return "Agregar fecha";

    const formattedDate = format(arrivalDateValue.value, "dd MMM", {
      locale: es,
    });

    return formattedDate;
  });
</script>
