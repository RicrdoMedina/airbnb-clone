<template>
  <div :class="dynamicClasses">
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
import { useCategoryCarouselStore } from "~/store/CategoryCarouselStore";
import { storeToRefs } from "pinia";
import CategoryCarousel from "~/components/common/CategoryCarousel/CategoryCarousel.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import SwitchButton from "~/components/common/SwitchButton/SwitchButton.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const useCategoryStore = useCategoryCarouselStore();

const { setCategoryActive } = useCategoryStore;

const { categoryActive, categories } = storeToRefs(useCategoryStore);

const isSwitchOn = ref(false);

const isScrolledDown = ref(false); // Estado que indica si el scroll supera los 50px.

let lastScrollY = 0;

const defaultClasses =
  "sticky z-30 bg-white transition-all duration-300 ease-custom-ease overflow-hidden";

const activeClasses = "top-20";

const inactiveClasses = "top-60 lg:top-44";

const { dynamicClasses } = useDynamicClasses(
  isScrolledDown,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
const handleScroll = debounce(() => {
  // Detectar si el usuario ha hecho scroll hacia abajo más de 5px.
  const currentScrollY = window.scrollY;
  if (currentScrollY > 5){
    isScrolledDown.value = true;
  } else  {
    isScrolledDown.value = false;
  }
  lastScrollY = currentScrollY; // Actualiza la última posición del scroll.
}, 100);

onMounted(() => {
  // Agregar el listener para el evento scroll.
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // Remover el listener para evitar fugas de memoria.
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped></style>
