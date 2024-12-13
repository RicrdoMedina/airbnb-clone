<template>
  <div
    :class="dynamicClasses"
    @click.stop.prevent="handleChangeFilterOption('When')"
    v-if="showFilterWhen"
  >
    <span class="w-full text-xs font-medium text-bold">Cuándo </span>
    <div :class="inputDynamicClasses">
      {{ selectedFilterValue }}
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFormattedWhenValue } from "~/components/composables/useFormattedWhenValue";
import { truncateString } from "~/components/utils/stringUtils";

const useSearch = useSearchStore();

const { handleChangeFilterOption } = useSearch;

const {
  filterWhenActive,
  filterValueWhen,
  filterActive,
  whenValue,
  showFilterWhen,
  tripStartDate,
  tripEndDate,
  whenDoYouWantToGo,
  subFilterOption,
  stayList,
  stayAtPlace,
  months,
} = storeToRefs(useSearch);

const defaultClasses =
  "w-60 h-full rounded-full flex flex-col items-center justify-center px-6 ease-in-out transition-all duration-500 z-10";

const inputDefaultClasses = "w-full bg-transparent border-0 outline-0 text-sm";

const activeClasses = "bg-white shadow-xl";

const inputActiveClasses = "text-bold font-medium";

const inactiveClasses = computed(() => ({
  "hover:bg-custom-gray-200": !filterActive.value,
  "hover:bg-custom-gray-300": filterActive.value && !filterWhenActive.value,
}));

const inputInactiveClasses = "text-light";

const { filterValueWhenFormatted } = useFormattedWhenValue(
  whenValue,
  tripStartDate,
  tripEndDate,
  "d MMM."
);

const { dynamicClasses } = useDynamicClasses(
  filterWhenActive,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const { dynamicClasses: inputDynamicClasses } = useDynamicClasses(
  whenValue,
  inputDefaultClasses,
  inputActiveClasses,
  inputInactiveClasses
);

const filterWhenDoYouWantToGoFormatted = computed(() => {
  const selected = stayList.value.filter(
    (item) => item.id === stayAtPlace.value
  );

  if (whenDoYouWantToGo.value.length > 0) {
    let message = "";
    const selectedIdsList = whenDoYouWantToGo.value;

    months.value.forEach((month) => {
      selectedIdsList.forEach((id) => {
        if (id === month.id) {
          message += `${month.shortName},`;
        }
      });
    });

    return truncateString(
      `${selected[0]["name"].toLowerCase()} en ${message}`,
      24
    );
  }

  return truncateString(`Cualquier ${selected[0]["name"].toLowerCase()}`, 24);
});

const selectedFilterValue = computed(() =>
  subFilterOption.value === "Month"
    ? filterValueWhenFormatted.value
    : filterWhenDoYouWantToGoFormatted.value
);
</script>
