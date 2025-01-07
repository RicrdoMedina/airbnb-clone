<template>
  <div :class="dynamicClasses">
    <h4 class="text-bold font-medium text-2xl mb-4">¿Cuándo es tu viaje?</h4>
    <div class="w-full relative mt-6 mb-2">
      <SubFilterButtons
        :options="dateOptions"
        :selectedOption="activeSubFilter"
        @change="toggleSubFilter"
      />
    </div>

    <div class="w-full">
      <component
        :is="currentComponent"
      />
    </div>
  </div>
</template>
<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import SubFilterButtons from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SubFilterButtons.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import MobileMonthSelector from "~/components/common/MobileMonthSelector/MobileMonthSelector.vue";

const useSearch = useFiltersStore();

const { handleRegionSelection, values, toggleSubFilter } = useSearch;

const { dateOptions, activeSubFilter } = storeToRefs(useSearch);

const selectedRegion = ref(null);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const defaultClasses = "w-full rounded-xl p-4 shadow-lg";

const activeClasses = "block";

const inactiveClasses = "hidden";

const { dynamicClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const currentComponent = computed(() => {
  if (activeSubFilter.value === "Month") return MobileMonthSelector;
});


function handleClick(id) {
  handleRegionSelection(id);
  selectedRegion.value = id;
}
</script>
