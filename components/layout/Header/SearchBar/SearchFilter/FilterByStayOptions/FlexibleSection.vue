<template>
  <div class="w-full">
    <h3
      class="text-lg text-bold font-medium mt-8 w-full flex items-center justify-center"
    >
      ¿Cuánto tiempo quieres quedarte?
    </h3>
    <div class="w-full flex items-center justify-center mt-4">
      <DefaultButton
        v-for="option in stayList"
        :key="option.id"
        :class="dynamicClasses(option.id).value"
        @onClick="handleStayAtPlace(option.id)"
      >
        <span> {{ option.name }}</span>
      </DefaultButton>
    </div>
    <h3
      class="text-lg text-bold font-medium mt-8 w-full flex items-center justify-center"
    >
      ¿Cuándo quieres ir?
    </h3>
    <div class="w-full mt-4">
      <MonthYearSlider
        :items="items"
        :itemsToShow="5"
        :selectedItems="selectedItems"
        @handleClick="toggleMonthSelection"
      />
    </div>
  </div>
</template>

<script setup>
import MonthYearSlider from "~/components/common/MonthYearSlider/MonthYearSlider.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const useSearchBar = useSearchBarStore();

const { toggleMonthSelection } = useSearchBar;

const props = defineProps({
  stayList: Array,
  stayAtPlace: Number,
  items: Array,
  selectedItems: Array,
});

const emit = defineEmits(["handleStayAtPlace"]);

const defaultClasses =
  "text-sm text-light rounded-full py-2 px-6 flex items-center justify-center transition-all duration-500 mx-2";
const activeClasses = "shadow-solid-black-2";
const inactiveClasses = "shadow-custom-gray hover:shadow-solid-black";

const dynamicClasses = (id) =>
  useDynamicClasses(
    () => props.stayAtPlace === id,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;

function handleStayAtPlace(id) {
  emit("handleStayAtPlace", id);
}
</script>
