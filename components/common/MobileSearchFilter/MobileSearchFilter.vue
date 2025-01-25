<template>
  <div class="w-full flex flex-col justify-between">
    <div class="w-full flex flex-col flex-grow pb-4">
      <SelectedOptionBox
        label="Dónde"
        :value="getValueInputRegion"
        placeholder="Explora destinos"
        :class="regionClasses"
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
        :class="whenClasses"
        @handleSelectOption="openDateFilter()"
      />

      <MobileFilterByStayDateSelector
        :isOpen="showWhenFilter"
        @handleNext="openFilter('who')"
      />

      <SelectedOptionBox
        label="Quién"
        :value="formattedNumberGuests"
        :class="whoClasses"
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
import { onMounted } from "vue";
import { es } from "date-fns/locale/index.js";
import { format } from "date-fns";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { useAppModalStore } from "~/store/app/AppModalStore";
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

const useSearchBar = useSearchBarStore();
const useModalStore = useAppModalStore();
const { setHideFooter } = useModalStore;
const {
  toggleSubFilter,
  filterStates,
  values,
  updateValue,
  handleRegionSelection,
  tripStartDate,
  tripEndDate,
} = useSearchBar;

const { activeSubFilter, stayDurations, availableMonths, searchRegions } =
  storeToRefs(useSearchBar);

const { formattedNumberGuests } = useFormattedGuests(values);

const isActive = ref(false);

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

const selectedFilterValue = computed(() => {
  if (activeSubFilter.value === "Dates" && !isEmpty(values.travelDate)) {
    if (values.travelDate.length > 1) {
      const starDate = format(values.travelDate[0], "dd MMM", {
        locale: es,
      });

      const endDate = format(values.travelDate[1], "dd MMM", {
        locale: es,
      });

      return values.approximateDays
        ? `${starDate} ±${values.approximateDays} - ${endDate} ±${values.approximateDays}`
        : `${starDate} - ${endDate}`;
    }

    const formattedDate = format(values.travelDate[0], "dd MMM", {
      locale: es,
    });

    return formattedDate;
  }

  if (activeSubFilter.value === "Month" && !isEmpty(values.when)) {
    return `${filterValueWhenFormatted.value.startDate} - ${filterValueWhenFormatted.value.endDate}`;
  }

  if (activeSubFilter.value === "Flexible" && !isEmpty(values.selectedMonths)) {
    return filterWhenDoYouWantToGoFormatted.value;
  }

  return "Agrega fechas";
});

const showWhenFilter = computed(() => {
  return filterStates.arrival || filterStates.output || filterStates.when;
});

const regionClasses = computed(() => {
  const active = isActive.value ? 'active': '';
  const hidden = filterStates.where ? 'hidden' : '';
  
  return `${active} ${hidden}`
});

const whenClasses = computed(() => {
  const active = isActive.value ? 'active': '';
  const hidden = showWhenFilter.value ? 'hidden' : '';
  
  return `${active} ${hidden}`
});


const whoClasses = computed(() => {
  const active = isActive.value ? 'active': '';
  const hidden = filterStates.who || showWhenFilter.value ? 'hidden' : '';
  
  return `${active} ${hidden}`
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

onMounted(() => {
  openFilter("where");
  setTimeout(() => {
    isActive.value = true;
  }, 100);
});
</script>
