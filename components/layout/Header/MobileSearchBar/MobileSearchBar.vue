<template>
  <div class="w-full block md:hidden z-50 relative bg-white">
    <div
      class="w-full h-full flex items-center justify-center overflow-hidden pt-3 pb-2 px-6 z-50"
    >
      <div class="flex flex-grow">
        <div
          class="w-full flex items-center justify-center rounded-full h-12 shadow-mobile-filter mr-2"
          @click.stop.prevent="openModal()"
        >
          <div class="w-14 flex items-center justify-center text-black">
            <img class="w-6" src="/images/Search.svg" alt="Search" />
          </div>
          <div class="w-full flex flex-col items-start justify-center pt-1">
            <div class="w-full flex items-center justify-start">
              <h4 class="text-xs text-bold font-medium">
                ¿A dónde quieres ir?
              </h4>
            </div>
            <div class="w-full flex items-center justify-start p-0.5">
              <span
                class="text-xs text-light relative flex items-center justify-start"
                >En cualqui...</span
              >
              <span
                class="text-xs text-light relative flex items-center justify-start pl-4 before:content-[''] before:bg-light before:absolute before:w-2px before:h-2px before:rounded-full before:left-2"
                >Cualquier...</span
              >
              <span
                class="text-xs text-light relative flex items-center justify-start pl-4 before:content-[''] before:bg-light before:absolute before:w-2px before:h-2px before:rounded-full before:left-2"
                >¿Cuántos?</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-grow-0">
        <span
          class="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-custom-gray-400"
        >
          <img class="w-4" src="/images/FilterIcon.svg" alt="Filter" />
        </span>
      </div>
    </div>
    <div class="w-full border-b-2 border-custom-gray-200">
      <CategorySwiper
        :items="categories"
        :itemsToShow="12"
        :categoryActive="categoryActive ? categoryActive : 1"
        :touchDrag="true"
        :mouseDrag="true"
        @handleCategorySelected="setCategoryActive"
      />
    </div>
  </div>
</template>

<script setup>
import { useAppModalStore } from "~/store/AppModalStore";
import { useCategoryCarouselStore } from "~/store/CategoryCarouselStore";
import { storeToRefs } from "pinia";
import CategorySwiper from "~/components/common/CategorySwiper/CategorySwiper.vue";

const useCategoryStore = useCategoryCarouselStore();
const useModalStore = useAppModalStore();

const { setCategoryActive } = useCategoryStore;

const { setOpen, setSelectedComponent } = useModalStore;

const { categoryActive, categories } = storeToRefs(useCategoryStore);

function openModal() {
  setOpen(true);
  setSelectedComponent("MobileSearchFilter");
}
</script>
