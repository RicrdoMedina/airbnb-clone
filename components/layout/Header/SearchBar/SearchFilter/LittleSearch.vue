<template>
  <div :class="dynamicClasses">
    <div
      class="w-full flex items-center justify-between rounded-full h-12 flex overflow-hidden border bg-white shadow-search-box-inactive"
    >
      <button class="flex-grow flex items-center justify-start pl-5 text-bold text-sm font-medium">En cualquier lugar del mundo</button>
      <button class="w-36 relative flex items-center justify-end text-bold flex-grow-0 text-sm font-medium">
        <span class="absolute right-5">Cualquier semana</span>
      </button>
      <button class="w-36 relative text-light flex-grow-0 text-sm flex items-center justify-end">
        <span class="absolute right-16">¿Cuántos?</span>
      </button>
      <button
        class="absolute right-2 bg-tomato w-8 h-8 text-white rounded-full flex items-center justify-center font-medium"
      >
        <span><img class="w-5" src="/images/Search.svg" alt="Search" /></span>
      </button>
    </div>
  </div>
</template>

<script setup>

import { useDynamicClasses } from "~/components/composables/useDynamicClasses";


const isScrolledDown = ref(false); // Estado que indica si el scroll supera los 50px.

let lastScrollY = 0;

const defaultClasses =
  "w-full h-full flex items-center lg:w-33 mx-auto cursor-pointer element2 z-10 cursor-pointer";

const activeClasses = "showAnimate";

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
