<template>
  <div class="w-full">
    <h3
      class="text-lg text-bold font-medium mt-8 w-full flex items-center justify-center"
    >
      ¿Cuánto tiempo quieres quedarte?
    </h3>
    <div class="w-full flex items-center justify-center mt-4">
      <template v-for="option in stayList" :key="option.id">
        <button
          type="button"
          :class="dynamicClasses(option.id).value"
          @click.stop.prevent="$emit('handleStayAtPlace', option.id)"
        >
          {{ option.name }}
        </button>
      </template>
    </div>
    <h3
      class="text-lg text-bold font-medium mt-8 w-full flex items-center justify-center"
    >
      ¿Cuándo quieres ir?
    </h3>
    <div class="w-full mt-4">
      <MonthYearSlider :months="months" />
    </div>
  </div>
</template>

<script setup>
import MonthYearSlider from "~/components/common/MonthYearSlider.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  stayList: Array,
  stayAtPlace: Number,
  months: Array,
});

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
</script>
