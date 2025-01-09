<template>
  <div class="w-full flex flex-col justify-between">
    <div class="w-full flex flex-col flex-grow pt-2 pb-4">
      <SelectedOptionBox
        label="Dónde"
        :value="getValueInputRegion"
        placeholder="Explora destinos"
        :class="{ hidden: filterStates.where }"
        @handleSelectOption="openFilter('where')"
      />

      <MobileRegionSelector
        title="¿A dónde quieres ir?"
        placeholder="Explora destinos"
        :isOpen="filterStates.where"
        :items="searchRegions"
        :inputValue="getValueInputRegion"
        :selectedItem="values.where"
        @setSelectItem="setSelectRegion"
      />

      <SelectedOptionBox
        label="Cuándo"
        placeholder="Agrega fechas"
        :value="selectedFilterValue"
        :class="{ hidden: showWhenFilter }"
        @handleSelectOption="openDateFilter()"
      />

      <MobileFilterByStayDateSelector :isOpen="showWhenFilter" />

      <SelectedOptionBox
        label="Quién"
        :value="formattedNumberGuests"
        :class="{ hidden: filterStates.who || showWhenFilter }"
        @handleSelectOption="openFilter('who')"
      />

      <MobileGuestCountSelector
        :isOpen="filterStates.who"
        :adultsCounter="values.adults"
        :childrenCounter="values.children"
        :babiesCounter="values.babies"
        @setNumberAdults="setNumberAdults"
        @setNumberChildren="setNumberChildren"
        @setNumberBabies="setNumberBabies"
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { useAppModalStore } from "~/store/AppModalStore";
import { storeToRefs } from "pinia";
import { useFormattedGuests } from "~/components/composables/useFormattedGuests";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";
import { useFilterWhenDoYouWantToGo } from "~/components/composables/useFilterWhenDoYouWantToGo";
import { useValueInputRegion } from "~/components/composables/useValueInputRegion";
import SelectedOptionBox from "~/components/common/SelectedOptionBox/SelectedOptionBox.vue";
import MobileRegionSelector from "~/components/common/MobileRegionSelector/MobileRegionSelector.vue";
import MobileFilterByStayDateSelector from "~/components/common/MobileFilterByStayDateSelector/MobileFilterByStayDateSelector.vue";
import MobileGuestCountSelector from "~/components/common/MobileGuestCountSelector/MobileGuestCountSelector.vue";
import { truncateString } from "~/utils/stringUtils";

const useSearch = useFiltersStore();
const useModalStore = useAppModalStore();
const { setHideFooter } = useModalStore;
const {
  toggleSubFilter,
  filterStates,
  values,
  updateValue,
  handleRegionSelection,
} = useSearch;

const {
  showWhenOptions,
  activeSubFilter,
  stayDurations,
  availableMonths,
  tripStartDate,
  tripEndDate,
  searchRegions
} = storeToRefs(useSearch);

const { formattedNumberGuests } = useFormattedGuests(values);

const { filterValueWhenFormatted } = useFormattedWhenValue(
  () => values.when,
  tripStartDate,
  tripEndDate,
  "d MMM."
);

const { filterWhenDoYouWantToGoFormatted } = useFilterWhenDoYouWantToGo(
  values,
  stayDurations,
  availableMonths,
  truncateString
);

const selectedFilterValue = computed(() =>
  activeSubFilter.value === "Month"
    ? `${filterValueWhenFormatted.value.startDate} - ${filterValueWhenFormatted.value.endDate}`
    : filterWhenDoYouWantToGoFormatted.value
);

const showWhenFilter = computed(() => {
  return filterStates.arrival || filterStates.output || filterStates.when;
});

const { getValueInputRegion } = useValueInputRegion(values, searchRegions);


function setSelectRegion(id) {
  setHideFooter(true);
  handleRegionSelection(id);
}

function openFilter(filterName) {
  setHideFooter(false);
  toggleSubFilter(filterName);
}

function openDateFilter() {
  setHideFooter(true);
  toggleSubFilter("when");
}

function setNumberAdults(value) {
  updateValue("adults", value);
}

function setNumberChildren(value) {
  updateValue("children", value);
}

function setNumberBabies(value) {
  updateValue("babies", value);
}
</script>
