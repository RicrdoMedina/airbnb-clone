<template>
  <div>
    <section :class="containerClasses">
      <h2 class="text-bold font-medium text-xl pt-4 px-6">
        ¿Cuándo es tu viaje?
      </h2>
      <div class="h-full">
        <div class="w-full relative mt-6 mb-2 px-4">
          <SubFilterButtons
            :options="dateOptions"
            :selectedOption="activeSubFilter"
            @handleClick="toggleSubFilter"
          />
        </div>

        <div class="w-full h-full">
          <div class="w-full h-full pt-6 flex flex-col">
            <component
              monthCounterLabel="Mes(es)"
              startDateLabel="Fecha de inicio"
              endDateLabel="Fecha de finalización"
              :is="currentComponent"
              :startDate="filterValueWhenFormatted.startDate"
              :endDate="filterValueWhenFormatted.endDate"
              :monthCounter="circularMonthSelector"
              :dateRange="values.travelDate"
              :approximateDays="values.approximateDays"
              :stayList="stayDurations"
              :stayAtPlace="values.stayDuration"
              :availableMonths="availableMonths"
              :selectedItems="values.selectedMonths"
              :exactDates="exactDates"
              :selectedDateId="selectedDateId"
              :secondaryButtonText="secondaryButtonText"
              @setMonthCounter="setMonthCounter"
              @setStayAtPlace="setStayAtPlace"
              @setMonth="toggleMonthSelection"
              @setApproximateDays="setApproximateDays"
              @handleRangeStart="handleRangeStart"
              @handleRangeEnd="handleRangeEnd"
              @handleSelectedDateId="handleSelectedDateId"
              @handleDateRange="handleDateRange"
              @handleReset="handleReset"
              @handleNext="handleNext"
            />

            <footer :class="footerClasses">
              <div
                class="w-full h-12 relative flex items-center flex-grow-0 px-4"
                v-if="showExactDateSwiper"
              >
                <ExactDateSwiper
                  :items="exactDates"
                  :categoryActive="values.approximateDays"
                  @handleSelectCategory="setApproximateDays"
                />
              </div>
              <div
                class="w-full flex-grow flex items-center justify-between border-t border-custom-gray-300 px-4"
              >
                <DefaultButton
                  class="text-bold font-medium text-sm underline"
                  @onClick="handleReset"
                >
                  {{ secondaryButtonText }}
                </DefaultButton>

                <DefaultButton
                  class="h-12 px-4 rounded-lg flex items-center justify-center bg-black font-medium text-white"
                  @onClick="handleNext"
                >
                  <span class="ml-1"> Siguiente </span>
                </DefaultButton>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { watch, toRefs } from "vue";
const { $localeEs } = useNuxtApp();
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import SubFilterButtons from "~/components/layout/Header/SearchBar/SearchFilter/FilterByStayOptions/SubFilterButtons.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import MobileMonthSelector from "~/components/common/MobileMonthSelector/MobileMonthSelector.vue";
import MobileFlexibleDate from "~/components/common/MobileFlexibleDate/MobileFlexibleDate.vue";
import MobileDateSelector from "~/components/common/MobileDateSelector/MobileDateSelector.vue";
import { calculateFutureDate } from "~/utils/dateUtils";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import ExactDateSwiper from "~/components/common/ExactDateSwiper/ExactDateSwiper.vue";

const useSearchBar = useSearchBarStore();

const {
  values,
  toggleMonthSelection,
  toggleSubFilter,
  updateCircularMonthSelector,
  updateValue,
  handleDateRange,
  handleSelectedDateId,
} = useSearchBar;

const {
  dateOptions,
  activeSubFilter,
  stayDurations,
  availableMonths,
  tripStartDate,
  tripEndDate,
  circularMonthSelector,
  exactDates,
  selectedDateId,
} = storeToRefs(useSearchBar);

const { travelDate, when, selectedMonths } = toRefs(values);

const secondaryButtonText = ref("Omite");
const showExactDateSwiper = ref(false);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleNext"]);

const footerDefaultClasses =
  "sticky bg-white left-0 right-0 bottom-0 bg-white z-70 flex flex-col items-center rounded-bl-[1.5rem] rounded-br-[1.5rem] border-t border-custom-gray-300";

const footerActiveClasses = "h-28";

const footerInactiveClasses = "h-16";

const { dynamicClasses: footerClasses } = useDynamicClasses(
  showExactDateSwiper,
  footerDefaultClasses,
  footerActiveClasses,
  footerInactiveClasses
);

const defaultClasses =
  "bg-white mx-3 mt-1 h-auto relative bg-white z-60 rounded-3xl shadow-floating-card";

const activeClasses = "block";

const inactiveClasses = "hidden";

const { dynamicClasses: containerClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const currentComponent = computed(() => {
  if (activeSubFilter.value === "Dates") return MobileDateSelector;
  if (activeSubFilter.value === "Month") return MobileMonthSelector;
  if (activeSubFilter.value === "Flexible") return MobileFlexibleDate;
});

const filterValueWhenFormatted = computed(() => {
  if (isEmpty(values.when)) {
    const firstDayNextMonth = formatMonthDate(
      tripStartDate.value,
      $localeEs,
      "d MMM. yyyy"
    );
    const firstDayLastMonth = formatMonthDate(
      tripEndDate.value,
      $localeEs,
      "d MMM. yyyy"
    );
    return {
      startDate: `${firstDayNextMonth}`,
      endDate: `${firstDayLastMonth}`,
    };
  } else {
    const firstDayNextMonth = formatMonthDate(
      values.when[0],
      $localeEs,
      "d MMM. yyyy"
    );
    const firstDayLastMonth = formatMonthDate(
      values.when[1],
      $localeEs,
      "d MMM. yyyy"
    );
    return {
      startDate: `${firstDayNextMonth}`,
      endDate: `${firstDayLastMonth}`,
    };
  }
});

function setMonthCounter(val) {
  updateCircularMonthSelector(val);
  const monthUpdated = val + 1;
  const endDate = calculateFutureDate(monthUpdated);
  updateValue("when", [tripStartDate.value, endDate]);
}

function setStayAtPlace(value) {
  updateValue("stayDuration", value);
}

function setApproximateDays(value) {
  updateValue("approximateDays", value);
}

function handleRangeStart(value) {
  handleDateRange(value, "MIN");
}

function handleRangeEnd(value) {
  handleDateRange(value, "MAX");
}

function handleNext() {
  emit("handleNext");
}

function handleReset() {
  if (secondaryButtonText.value === "Omite") {
    emit("handleNext");
    return;
  }
  handleSelectedDateId([]);
  updateValue("travelDate", []);
  updateCircularMonthSelector(3);
  updateValue("selectedMonths", []);
  updateValue("when", []);
}

function handleSecondaryButtonText(
  newTravelDate,
  newWhenValue,
  newSelectedMonths
) {
  if (
    isEmpty(newTravelDate) &&
    isEmpty(newWhenValue) &&
    isEmpty(newSelectedMonths)
  ) {
    secondaryButtonText.value = "Omite";
  } else {
    secondaryButtonText.value = "Restablecer";
  }
}

watch(
  () => [
    travelDate.value,
    when.value,
    selectedMonths.value,
    props.isOpen,
    activeSubFilter.value,
  ],
  ([
    newTravelDate = [],
    newWhenValue = [],
    newSelectedMonths = [],
    newOpen,
    newActiveSubFilter,
  ]) => {
    handleSecondaryButtonText(newTravelDate, newWhenValue, newSelectedMonths);

    if (newOpen) {
      handleSecondaryButtonText(
        travelDate.value,
        when.value,
        selectedMonths.value
      );
    }

    if (newActiveSubFilter === "Dates") {
      showExactDateSwiper.value = true;
    } else {
      showExactDateSwiper.value = false;
    }
  }
);
</script>
