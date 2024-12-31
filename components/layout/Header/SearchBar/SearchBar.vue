<template>
  <form :class="dynamicClasses" action="" id="searchBar">
    <SearchOptions/>
    <SearchFilter/>
  </form>
</template>

<script setup>
import SearchFilter from '~/components/layout/Header/SearchBar/SearchFilter/SearchFilter.vue';
import SearchOptions from '~/components/layout/Header/SearchBar/SearchOptions.vue';

import { useDynamicClasses } from "~/components/composables/useDynamicClasses";


const isScrolledDown = ref(false); // Estado que indica si el scroll supera los 50px.

let lastScrollY = 0;

const defaultClasses =
  "w-full lg:w-108 px-16 lg:px-0 mx-auto block relative element";

const activeClasses = "hidden-animate";

const inactiveClasses = "";

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
