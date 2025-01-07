<template>
  <div class="w-full h-full p-6 flex flex-col">
    <ul class="w-full flex items-center justify-center h-12 flex-grow-0">
      <li
        :class="dynamicClasses(index).value"
        v-for="(tab, index) in tabsArr"
        :key="index"
        @click.stop.prevent="handleClick(index)"
      >
        {{ tab }}
      </li>
    </ul>

    <div class="w-full flex flex-col flex-grow py-4">
      <SelectedOptionBox
        label="Dónde"
        :value="values.where"
        placeholder="Explora destinos"
        :class="{'mb-2':true, hidden:filterStates.where}"
        @handleSelectOption="toggleSubFilter('where')"
      />

      <MobileRegionSelector :isOpen="filterStates.where"/>

      <SelectedOptionBox label="Cuándo" :value="values.where" class="mb-2"  :class="{'mb-2':true, hidden:true}"/>

      <MobileFilterByStayDateSelector :isOpen="true"/>

      <SelectedOptionBox
        label="Quién"
        :value="formattedNumberGuests"
        class="mb-2"
      />
    </div>
    <div class="w-full flex items-center justify-between flex-grow-0 h-16">
      <DefaultButton class="text-bold font-medium text-sm underline">
        Limpiar Todo
      </DefaultButton>

      <DefaultButton
        class="h-12 px-4 rounded-lg flex items-center justify-center bg-tomato font-medium text-white"
      >
        <OutlineSearch size="16px" stroke-width="3px" />
        <span class="ml-1"> Buscar </span>
      </DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useFormattedGuests } from "~/components/composables/useFormattedGuests";
import SelectedOptionBox from "~/components/common/SelectedOptionBox/SelectedOptionBox.vue";
import MobileRegionSelector from "~/components/common/MobileRegionSelector/MobileRegionSelector.vue";
import MobileFilterByStayDateSelector from "~/components/common/MobileFilterByStayDateSelector/MobileFilterByStayDateSelector.vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const useSearch = useFiltersStore();

const { toggleSubFilter, filterStates, values, updateValue } = useSearch;

const { isFilterActive } = storeToRefs(useSearch);

const defaultClasses =
  "w-auto h-full py-2 px-4 text-sm font-medium transition-all duration-500 ease-in-out";
const activeClasses = "text-bold shadow-bottom-black-2";
const inactiveClasses = "text-light hover:text-black";

const tabsArr = ["Estadías", "Experiencias"];
const selectedTab = ref(0);

const dynamicClasses = (id) =>
  useDynamicClasses(
    () => selectedTab.value === id,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;

const { formattedNumberGuests } = useFormattedGuests(values);

function handleClick(id) {
  selectedTab.value = id;
}
</script>
