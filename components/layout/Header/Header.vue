<template>
  <div :class="dynamicClasses">
    <div class="w-full">
      <header class="w-full flex items-center justify-between h-20">
        <div class="xl:flex-[1_0_140px] flex items-center justify-start z-50">
          <NuxtLink to="/" class="hidden xl:block cursor-pointer">
            <img class="w-28" src="/images/Logo.svg" alt="Logo" />
          </NuxtLink>
          <NuxtLink to="/" class="block xl:hidden cursor-pointer">
            <img class="w-8" src="/images/Isotipo.svg" alt="Logo" />
          </NuxtLink>
        </div>
        <div class="xl:flex-[0_1_auto] h-full flex items-center justify-center">
          <LittleSearch />
          <div class="absolute w-full h-full top-16 lg:top-0 left-0 z-20">
            <SearchBar />
          </div>
        </div>
        <div
          class="xl:flex-[1_0_140px] flex items-center justify-end relative z-50"
        >
          <NuxtLink to="/" class="text-sm font-medium cursor-pointer"
            >Pon tu espacio en Airbnb</NuxtLink
          >
          <div class="inline-block mx-4">
            <LanguageSelector />
          </div>
          <div class="inline-block">
            <HeaderDropdown />
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup>
import HeaderDropdown from "@/components/layout/Header/HeaderDropdown.vue";
import LanguageSelector from "@/components/layout/Header/LanguageSelector.vue";
import SearchBar from "@/components/layout/Header/SearchBar/SearchBar.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import LittleSearch from "~/components/layout/Header/SearchBar/SearchFilter/LittleSearch.vue";

const isScrolledDown = ref(false); // Estado que indica si el scroll supera los 50px.

let lastScrollY = 0;

const defaultClasses =
  "sticky z-50 top-0 left-0 bg-white shadow-bottom md:px-8 lg:px-10 xl:px-11 2xl:px-14 3xl:px-16 transition-all duration-300 ease-custom-ease";

const activeClasses = "h-20";

const inactiveClasses = "h-60 lg:h-44";

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
  console.log("currentScrollY", currentScrollY);
  console.log("lastScrollY", lastScrollY);
  if (currentScrollY > 5) {
    isScrolledDown.value = true;
  } else {
    isScrolledDown.value = false;
  }
  lastScrollY = currentScrollY; // Actualiza la última posición del scroll.
}, 100);

onMounted(() => {
  // Agregar el listener para el evento scroll.
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  // Remover el listener para evitar fugas de memoria.
  window.removeEventListener("scroll", handleScroll);
});
</script>
