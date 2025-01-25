<template>
  <section :class="listingFiltersClasses">
    <div
      class="w-full flex items-center justify-center relative h-24 md:px-12 lg:px-12 xl:px-14 2xl:px-14 3xl:px-16 my-4"
    >
      <div class="w-3/6 flex-grow relative pr-4">
        <CategoryCarousel
          :items="categoriesData"
          :itemsToShow="12"
          :categoryActive="categoryActive"
          :isLoading="isLoading"
          @handleCategorySelected="setCategoryActive"
        />
      </div>
      <div class="flex-grow-0 flex items-center justify-center pl-4">
        <DefaultButton
          class="w-28 h-11 rounded-lg shadow-custom-gray hover:shadow-solid-black flex items-center justify-center ease-in-out transition-all duration-500"
          :isDisabled="isLoading"
        >
          <NuxtImg
            class="w-4"
            loading="lazy"
            src="/images/FilterIcon.svg"
            alt="Filter"
            v-if="!isLoading"
          />

          <span v-else class="w-4 h-4 rounded-md background-animation"></span>
          <span
            class="ml-2 text-sm rounded-lg"
            :class="buttonDynamicClasses"
          >
            Filtros
          </span>
        </DefaultButton>

        <DefaultButton
          class="w-64 h-11 ml-4 rounded-lg shadow-custom-gray hover:shadow-solid-black flex items-center justify-center ease-in-out transition-all duration-500"
          :isDisabled="isLoading"
        >
          <span
            class="mr-2 text-sm rounded-lg"
            :class="buttonDynamicClasses"
          >
            Precio Total sin impuestos
          </span>

          <span
            v-if="isLoading"
            class="w-12 h-6 background-animation rounded-xl"
          ></span>
          <SwitchButton v-model="isSwitchOn" v-else />
        </DefaultButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppDataStore } from "~/store/app/AppDataStore";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import CategoryCarousel from "~/components/common/CategoryCarousel/CategoryCarousel.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import SwitchButton from "~/components/common/SwitchButton/SwitchButton.vue";
const useSearchBar = useSearchBarStore();
const useDataStore = useAppDataStore();
const { categoriesData, isLoading } = storeToRefs(useDataStore);
const { setCategoryActive } = useSearchBar;

const { littleSearchIsActive, isStickyFilterActive, categoryActive } =
  storeToRefs(useSearchBar);

const isSwitchOn = ref(false);

const buttonDefaultClasses = "";

const buttonActiveClasses = "background-animation";

const buttonInactiveClasses = "";

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  isLoading,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);

const listingFiltersClasses = computed(() => {
  if (isStickyFilterActive.value) {
    return "sticky  hidden md:flex  w-full z-30 bg-white transition-all duration-300 ease-custom-ease overflow-hidden top-20";
  }

  if (littleSearchIsActive.value) {
    return "sticky  hidden md:flex  w-full z-30 bg-white transition-all duration-300 ease-custom-ease overflow-hidden top-20";
  }

  return "sticky  hidden md:flex  w-full z-30 bg-white transition-all duration-300 ease-custom-ease overflow-hidden top-20";
});
</script>
