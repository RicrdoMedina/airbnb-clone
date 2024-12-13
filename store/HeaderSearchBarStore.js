// store/filters.ts
import { defineStore } from "pinia";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  formatMonthDate,
  getDateFromMonth,
  getFormattedFirstDayOfMonth,
  getMonthWithOffset,
  getNext12Months,
  getNextYear,
} from "~/components/utils/dateUtils";

export const useSearchStore = defineStore("searchStore", () => {
  const filterActive = ref(false);
  const subFilterActive = ref(false);
  const filterOption = ref(null);
  const subFilterOption = ref("Dates");

  // Active filter
  const filterWhereActive = ref(false);
  const filterWhenActive = ref(false);
  const filterArrivalActive = ref(false);
  const filterOutputActive = ref(false);
  const filterWhoIsActive = ref(false);
  const showFilterWhen = ref(false);

  // Values
  const filterValueWhere = ref(null);
  const arrivalDateValue = ref(null);
  const departureDateValue = ref(null);
  const whenValue = ref([]);
  const approximateDays = ref(null);
  const numberAdults = ref(0);
  const numberChildren = ref(0);
  const numberBabies = ref(0);
  const stayAtPlace = ref(1);
  const whenDoYouWantToGo = ref([]);
  const searchListByRegion = ref([
    { id: 1, name: "Búsqueda Flexible", img: "/images/FlexibleSearch.jpg" },
    { id: 2, name: "Europa", img: "/images/Europa.jpg" },
    { id: 3, name: "Brazil", img: "/images/Brazil.jpg" },
    { id: 4, name: "Estados Unidos", img: "/images/Usa.jpg" },
    { id: 5, name: "Argentina", img: "/images/Italia.jpg" },
    { id: 6, name: "Caribeña", img: "/images/Caribe.jpg" },
  ]);

  const stayList = ref([
    { id: 1, name: "Fin de semana" },
    { id: 2, name: "Semana" },
    { id: 3, name: "Mes" },
  ]);

  const months = ref(getNext12Months());

  const filterList = {
    1: { name: "Where", state: filterWhereActive },
    2: { name: "Arrival", state: filterArrivalActive },
    3: { name: "When", state: filterWhenActive },
    4: { name: "Output", state: filterOutputActive },
    5: { name: "WhoIs", state: filterWhoIsActive },
  };

  const subFilterList = {
    1: { name: "Dates", state: filterWhereActive },
    2: { name: "Month", state: filterArrivalActive },
    3: { name: "Flexible", state: filterOutputActive },
  };

  function getFilterValue(option) {
    const result = Object.values(filterList).filter((filter) => {
      return option === filter.name;
    });

    if (result.length > 0) return result[0].state.value;

    return null;
  }

  const tripStartDate = computed(() => {
    const add = 0;
    const nextYear = getNextYear();
    const nextMonth = getDateFromMonth(add, nextYear);

    return nextMonth;
  });

  const tripEndDate = computed(() => {
    const add = 3;
    const nextYear = getNextYear();
    const nextMonth = getDateFromMonth(add, nextYear);

    return nextMonth;
  });

  function resetOption() {
    filterOption.value = null;
    Object.values(filterList).map((filter) => {
      filter.state.value = false;
    });
  }

  function setInactiveFilter() {
    filterActive.value = false;
    filterOption.value = null;
    Object.values(filterList).map((filter) => {
      filter.state.value = false;
    });
  }

  function handleChangeFilterOption(option, subOption) {
    if (!option) return false;

    // Maneja la lógica cuando se pasa un subOption
    if (subOption) {
      handleSubOption(option, subOption);
      return false;
    }

    // Verifica si se está seleccionando la misma opción activa
    if (isSameActiveOption(option)) {
      handleSameActiveOption(option);
      return false;
    }

    // Activa la nueva opción de filtro
    activateNewOption(option);
  }

  function handleSubOption(option, subOption) {
    const isMonthOrFlexible = subOption === "Month" || subOption === "Flexible";

    showFilterWhen.value = isMonthOrFlexible;
    filterWhenActive.value = isMonthOrFlexible;
    subFilterOption.value = subOption;
    subFilterActive.value = true;

    // Activa la nueva opción de filtro
    activateNewOption(option);
  }

  function isSameActiveOption(option) {
    if (option === filterOption.value) {
      if (getFilterValue(option) && option !== "Where") {
        return true;
      }
    }
    return false;
  }

  function handleSameActiveOption(option) {
    resetOption();
    filterActive.value = false;
    filterOption.value = null;
  }

  function activateNewOption(option) {
    filterActive.value = true;
    filterOption.value = option;

    // Reinicia todos los estados de los filtros
    resetAllFilters();

    // Activa el estado del filtro correspondiente
    activateFilterState(option);
  }

  function resetAllFilters() {
    Object.values(filterList).forEach((filter) => {
      filter.state.value = false;
    });
  }

  function activateFilterState(option) {
    const filter = Object.values(filterList).find((f) => f.name === option);
    if (filter) {
      filter.state.value = true;
    }
  }

  function handleClickWhereButton(value) {
    const regionsList = [
      { id: 1, region: null, handle: handleFlexibleSearch },
      { id: 2, region: "Europa", handle: handleSearchByRegion },
      { id: 3, region: "Brazil", handle: handleSearchByRegion },
      { id: 4, region: "Estados Unidos", handle: handleSearchByRegion },
      { id: 5, region: "Argentina", handle: handleSearchByRegion },
      { id: 6, region: "Caribeña", handle: handleSearchByRegion },
    ];

    regionsList.forEach((item) => {
      if (value === item.id) {
        item.handle(item.region);
      }
    });
  }

  function setFilterValueWhere(val) {
    filterValueWhere.value = val;
  }

  function handleFlexibleSearch() {
    if (showFilterWhen.value) {
      filterWhenActive.value = true;
      filterWhereActive.value = false;
    } else {
      handleChangeFilterOption("Arrival");
    }
    setFilterValueWhere("");
  }

  function handleSearchByRegion(region) {
    if (showFilterWhen.value) {
      filterWhenActive.value = true;
      filterWhereActive.value = false;
    } else {
      handleChangeFilterOption("Arrival");
    }

    setFilterValueWhere(region);
  }

  function handleWhenValue(val) {
    whenValue.value = val;
  }

  function handleArrivalDate(arrivalDate) {
    arrivalDateValue.value = arrivalDate;
  }

  function handleDepartureDate(departureDate) {
    departureDateValue.value = departureDate;
  }

  function setApproximateDays(val) {
    if (!val) {
      approximateDays.value = 0;
      return false;
    }
    approximateDays.value = val;
  }

  function setNumberAdults(val) {
    numberAdults.value = val;
  }

  function setNumberChildren(val) {
    numberChildren.value = val;
  }

  function setNumberBabies(val) {
    numberBabies.value = val;
  }

  function handleStayAtPlace(stay) {
    stayAtPlace.value = stay;
  }

  function handleWhenDoYouWantToGo(month) {
    const months = whenDoYouWantToGo.value;

    let indice = months.indexOf(month);

    if (indice !== -1) {
      months.splice(indice, 1);

      whenDoYouWantToGo.value = months;
    } else {
      whenDoYouWantToGo.value.push(month);
    }
  }

  return {
    handleChangeFilterOption,
    handleClickWhereButton,
    handleArrivalDate,
    handleDepartureDate,
    setApproximateDays,
    setNumberAdults,
    setNumberChildren,
    setNumberBabies,
    handleStayAtPlace,
    handleWhenDoYouWantToGo,
    handleWhenValue,
    setInactiveFilter,
    filterActive,
    subFilterActive,
    filterWhereActive,
    filterWhenActive,
    filterArrivalActive,
    filterOutputActive,
    filterWhoIsActive,
    showFilterWhen,
    filterOption,
    subFilterOption,
    searchListByRegion,
    filterValueWhere,
    arrivalDateValue,
    whenValue,
    departureDateValue,
    approximateDays,
    numberAdults,
    numberChildren,
    numberBabies,
    stayList,
    stayAtPlace,
    whenDoYouWantToGo,
    months,
    tripStartDate,
    tripEndDate,
  };
});
