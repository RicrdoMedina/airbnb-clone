<template>
  <div :class="listingFiltersClasses">
    <div
      class="w-full flex items-center justify-center relative h-24 md:px-12 lg:px-12 xl:px-14 2xl:px-14 3xl:px-16 my-4"
    >
      <div class="w-3/6 flex-grow relative pr-4">
        <CategoryCarousel
          :items="categories"
          :itemsToShow="12"
          :categoryActive="categoryActive"
          @handleCategorySelected="setCategoryActive"
        />
      </div>
      <div class="flex-grow-0 flex items-center justify-center pl-4">
        <DefaultButton
          class="w-28 h-11 rounded-lg shadow-custom-gray hover:shadow-solid-black flex items-center justify-center ease-in-out transition-all duration-500"
        >
          <img class="w-4" src="/images/FilterIcon.svg" alt="Filter" />
          <span class="ml-2 text-sm"> Filtros </span>
        </DefaultButton>

        <DefaultButton
          class="w-64 h-11 ml-4 rounded-lg shadow-custom-gray hover:shadow-solid-black flex items-center justify-center ease-in-out transition-all duration-500"
        >
          <span class="mr-2 text-sm"> Precio Total sin impuestos </span>

          <SwitchButton v-model="isSwitchOn" />
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { useCategoryCarouselStore } from "~/store/CategoryCarouselStore";
import { storeToRefs } from "pinia";
import CategoryCarousel from "~/components/common/CategoryCarousel/CategoryCarousel.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import SwitchButton from "~/components/common/SwitchButton/SwitchButton.vue";

const useSearch = useFiltersStore();

const useCategoryStore = useCategoryCarouselStore();

const { setCategoryActive } = useCategoryStore;

const { categoryActive, categories } = storeToRefs(useCategoryStore);

const { littleSearchIsActive, isStickyFilterActive } = storeToRefs(useSearch);

const isSwitchOn = ref(false);

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

<style lang="scss" scoped></style>
