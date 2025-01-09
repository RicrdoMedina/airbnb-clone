<template>
  <div class="w-full h-full pt-3 flex flex-col justify-between">
    <div
      class="w-full flex flex-col px-4 pb-4"
    >
      <h3
        class="text-base text-bold font-medium mt-1 flex items-center pt-4 border-t border-custom-gray-200"
      >
        ¿Cuánto tiempo quieres quedarte?
      </h3>
      <div
        class="w-full flex items-center justify-start md:justify-center mt-4"
      >
        <template v-for="option in stayList" :key="option.id">
          <button
            type="button"
            :class="dynamicClasses(option.id).value"
            @click.stop.prevent="handleStayAtPlace(option.id)"
          >
            {{ option.name }}
          </button>
        </template>
      </div>
      <div class="w-full mt-4 border-t border-custom-gray-200">
        <h3 class="text-base text-bold font-medium mt-4 flex items-center">
          ¿Cuándo quieres ir?
        </h3>

        <div class="w-full relative mt-4">
          <MonthYearSwiper
            :items="availableMonths"
            :selectedItems="selectedItems"
            @handleClick="handleSetMonth"
          />
        </div>
      </div>
    </div>

    <footer
      class="sticky left-0 right-0 bottom-0 border-t bg-white border-custom-gray-300 z-70 h-16 flex items-center justify-between px-4 rounded-bl-[1.5rem] rounded-br-[1.5rem]"
    >
      <DefaultButton class="text-bold font-medium text-sm underline">
        Omite
      </DefaultButton>

      <DefaultButton
        class="h-12 px-4 rounded-lg flex items-center justify-center bg-black font-medium text-white"
      >
        <span class="ml-1"> Siguiente </span>
      </DefaultButton>
    </footer>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import MonthYearSwiper from "~/components/common/MonthYearSwiper/MonthYearSwiper.vue";

const props = defineProps({
  stayAtPlace: {
    type: Number,
    default: 1,
  },
  stayList: {
    type: Array,
    default: [],
  },
  availableMonths: {
    type: Array,
    default: [],
  },
  selectedItems: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["setStayAtPlace", "setMonth"]);

const defaultClasses =
  "text-sm text-light rounded-full py-1 md:py-2 px-3 md:px-6 flex items-center justify-center transition-all duration-500 mx-1 md:mx-2";
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
  emit("setStayAtPlace", id);
}

function handleSetMonth(id) {
  emit("setMonth", id);
}
</script>
