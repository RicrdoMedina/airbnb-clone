import { defineStore } from "pinia";
import {
  compareDates,
  getDateFromMonth,
  getNext12Months,
  getNextYear,
} from "~/utils/dateUtils";
import { isArray, isEmpty } from "~/utils/helpers";

export const useFiltersStore = defineStore("filtersStore", () => {
  // State
  const isFilterActive = ref(false);
  const isStickyFilterActive = ref(false);
  const isSubFilterActive = ref(false);
  const activeFilter = ref(null);
  const littleSearchIsActive = ref(false);
  const activeSubFilter = ref("Dates");

  const filterStates = reactive({
    where: ref(false),
    when: ref(false),
    arrival: ref(false),
    output: ref(false),
    who: ref(false),
  });

  const showWhenOptions = ref(false);

  const stickyFilterInitiated = ref(false);

  const circularMonthSelector = ref(3);

  const values = reactive({
    who: ref(null),
    where: ref(0),
    arrivalDate: ref(null),
    departureDate: ref(null),
    when: ref([]),
    approximateDays: ref(0),
    adults: ref(0),
    children: ref(0),
    babies: ref(0),
    stayDuration: ref(1),
    selectedMonths: ref([]),
  });

  const dateRange = ref([]);

  const searchRegions = ref([
    { id: 1, name: "Búsqueda Flexible", img: "/images/FlexibleSearch.jpg" },
    { id: 2, name: "Europa", img: "/images/Europa.jpg" },
    { id: 3, name: "Brazil", img: "/images/Brazil.jpg" },
    { id: 4, name: "Estados Unidos", img: "/images/Usa.jpg" },
    { id: 5, name: "Argentina", img: "/images/Italia.jpg" },
    { id: 6, name: "Caribeña", img: "/images/Caribe.jpg" },
  ]);

  const stayDurations = ref([
    { id: 1, name: "Fin de semana" },
    { id: 2, name: "Semana" },
    { id: 3, name: "Mes" },
  ]);

  const dateOptions = ref([
    { label: "Fechas", value: "Dates", filter: "arrival" },
    { label: "Meses", value: "Month", filter: "when" },
    { label: "Flexible", value: "Flexible", filter: "when" },
  ]);

  const exactDates = ref([
    { id: 1, name: "Fechas Exactas", value: "" },
    { id: 2, name: "1 día", value: 1 },
    { id: 3, name: "2 días", value: 2 },
    { id: 4, name: "3 días", value: 3 },
    { id: 5, name: "4 días", value: 4 },
    { id: 6, name: "5 días", value: 5 },
    { id: 7, name: "6 días", value: 6 },
    { id: 8, name: "7 días", value: 7 },
  ]);

  const availableMonths = ref(getNext12Months());

  // Computed
  const tripStartDate = computed(() => {
    const date = calculateFutureDate(1);
    return date;
  });
  const tripEndDate = computed(() => {
    const date = calculateFutureDate(4);
    return date;
  });

  // Methods

  function disableSearch() {
    activeFilter.value = null;
    isFilterActive.value = false;
  }

  function activateFilter(filterName) {
    isFilterActive.value = true;
    activeFilter.value = filterName;
    resetFilterStates();
    if (filterStates[filterName] !== undefined) filterStates[filterName] = true;
  }

  function resetFilterStates() {
    Object.keys(filterStates).forEach((key) => (filterStates[key] = false));
  }

  function toggleFilterActive(val) {
    isStickyFilterActive.value = val;
  }

  function toggleSubFilter(filterName, subFilterName) {
    if (!filterName) return false;

    if (subFilterName) {
      handleSubFilter(filterName, subFilterName);
      return false;
    }

    if (isSameActiveOption(filterName)) {
      disableSearch();
      resetFilterStates();
      return false;
    }

    activateFilter(filterName);
  }

  function openFilter() {
    isFilterActive.value = true;
    isSubFilterActive.value = true;
    isStickyFilterActive.value = true;

    handleDateFilter();
  }

  function handleSubFilter(filterName, subFilterName) {
    if (subFilterName === "Month" || subFilterName === "Flexible") {
      showWhenOptions.value = true;
      filterStates.when = true;
    } else {
      showWhenOptions.value = false;
    }
    activeSubFilter.value = subFilterName;
    isSubFilterActive.value = true;
    activateFilter(filterName);
  }

  function getFilterValue(filterName) {
    if (filterName in filterStates) {
      const value = filterStates[filterName];
      return value;
    }
    return null;
  }

  function isSameActiveOption(filterName) {
    if (filterName === activeFilter.value) {
      if (getFilterValue(filterName) && filterName !== "where") {
        return true;
      }
    }
    return false;
  }

  function handleRegionSelection(regionId) {
    const region = searchRegions.value.find((r) => r.id === regionId);
    if (region) {
      values.where = region.id;

      handleDateFilter();
    }
  }

  function handleDateFilter() {
    if (showWhenOptions.value) {
      activateFilter("when");
    } else {
      activateFilter("arrival");
    }
  }

  function updateValue(key, newValue) {
    if (values[key] !== undefined) {
      values[key] = newValue;
    }
  }

  function toggleMonthSelection(month) {
    const index = values.selectedMonths.indexOf(month);
    if (index === -1) {
      values.selectedMonths.push(month);
    } else {
      values.selectedMonths.splice(index, 1);
    }
  }

  function handleDateRange(date, range) {
    const minDate = dateRange.value[0] || null;

    if (isArray(date)) {
      dateRange.value = [...date];
      // activateFilter("output");
      return;
    }

    if (range === "MIN") {
      handleMinimumRange(minDate, date);
    }

    if (range === "MAX") {
      handleMaximumRange(minDate, date);
    }

    activateFilter("output");
  }

  function handleMinimumRange(minDate, date) {
    if (minDate) {
      if (
        compareDates(date, minDate, {
          comparisonType: "after",
          ignoreTime: true,
        })
      ) {
        dateRange.value = [minDate, date];
      } else if (
        compareDates(date, minDate, {
          comparisonType: "equal",
          ignoreTime: true,
        })
      ) {
        dateRange.value = [date, date];
      } else {
        dateRange.value = [date];
      }
    } else {
      dateRange.value = [date];
    }
  }

  function handleMaximumRange(minDate, date) {
    if (minDate) {
      if (
        compareDates(date, minDate, {
          comparisonType: "before",
          ignoreTime: true,
        })
      ) {
        dateRange.value = [date, minDate];
      } else {
        dateRange.value = [minDate, date];
      }
    } else {
      dateRange.value = [date];
    }
  }

  function handleResetDateRange() {
    dateRange.value = [];
  }

  function toggleLittleSearch(val) {
    littleSearchIsActive.value = val;
  }

  function toggleStickyFilterInitiated(val) {
    stickyFilterInitiated.value = val;
  }

  function updateCircularMonthSelector(index) {
    circularMonthSelector.value = index;
  }

  return {
    // State
    isStickyFilterActive,
    isFilterActive,
    isSubFilterActive,
    activeFilter,
    activeSubFilter,
    filterStates,
    showWhenOptions,
    values,
    searchRegions,
    stayDurations,
    availableMonths,
    dateRange,
    littleSearchIsActive,
    stickyFilterInitiated,
    dateOptions,
    circularMonthSelector,
    exactDates,

    // Computed
    tripStartDate,
    tripEndDate,

    // Methods
    disableSearch,
    activateFilter,
    resetFilterStates,
    toggleSubFilter,
    handleRegionSelection,
    updateValue,
    toggleMonthSelection,
    handleDateRange,
    handleResetDateRange,
    toggleFilterActive,
    handleDateFilter,
    openFilter,
    toggleLittleSearch,
    toggleStickyFilterInitiated,
    updateCircularMonthSelector,
  };
});
