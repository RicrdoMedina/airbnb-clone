<template>
  <section class="w-full block md:hidden z-50 relative bg-secondary">
    <div
      class="w-full h-full flex items-center justify-center overflow-hidden pt-3 pb-2 px-6 z-50"
    >
      <div class="flex flex-grow">
        <div
          class="w-full bg-white flex items-center justify-center rounded-full h-12 shadow-mobile-filter mr-2"
          @click.stop.prevent="openModal()"
        >
          <div class="mr-1 flex items-center justify-center text-black">
            <NuxtImg
              class="w-6"
              loading="lazy"
              src="/images/Search.svg"
              alt="Search"
            />
          </div>
          <div class="flex flex-col items-start justify-center">
            <p :class="labelDynamicClasses">Empieza la busqueda</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-b-2 border-custom-gray-200 bg-secondary">
      <CategorySwiper
        :items="categoriesData"
        :itemsToShow="12"
        :categoryActive="categoryActive ? categoryActive : 1"
        :touchDrag="true"
        :mouseDrag="true"
        :isLoading="isLoading"
        @handleCategorySelected="handleCategorySelected"
      />
    </div>
  </section>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useAppModalStore } from "~/store/app/AppModalStore";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import CategorySwiper from "~/components/common/CategorySwiper/CategorySwiper.vue";

const useDataStore = useAppDataStore();
const useSearchBar = useSearchBarStore();
const useModalStore = useAppModalStore();

const { setIsLoadingListingData } = useDataStore;

const { setCategoryActive } = useSearchBar;

const { setOpen, setSelectedComponent } = useModalStore;

const { categoryActive } = storeToRefs(useSearchBar);

const { categoriesData, isLoading } = storeToRefs(useDataStore);

const labelDefaultClasses = "text-bold text-sm font-medium rounded-md";

const labelActiveClasses = "background-animation";

const labelInactiveClasses = "";

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  isLoading,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

function openModal() {
  setOpen(true);
  setSelectedComponent("MobileSearchFilter");
}

function handleCategorySelected (val) {
  setIsLoadingListingData(true)
  setTimeout(() => {
    setIsLoadingListingData(false)
  }, 400);
  setCategoryActive(val)
}
</script>
