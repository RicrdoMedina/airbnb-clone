<template>
  <div
    ref="$dropdown"
    class="relative flex items-center justify-between md:w-20 lg:w-20 xl:w-20 2xl:w-24 3xl:w-24 py-2 px-4 rounded-full bg-white border border-gray-300 cursor-pointer"
    @click="openMenu"
  >
    <NuxtImg class="w-4" preload src="/images/Hamburger.svg" alt="Hamburger" />

    <NuxtImg
      class="md:w-6 lg:w-6 xl:w-6 2xl:w-8 3xl:w-8"
      preload
      src="/images/User.svg"
      alt="Hamburger"
    />

    <nav
      v-if="isOpen"
      class="absolute right-4 w-56 top-12 p-2 bg-white shadow-xl"
    >
      <ul class="flex flex-col">
        <li class="text-sm cursor-pointer text-bold font-medium">Registrate</li>
        <li
          class="text-sm mt-4 cursor-pointer text-light hover:text-bold ease-in-out transition-all duration-500"
        >
          <NuxtLink to="/" class=""> Iniciar Sesion </NuxtLink>
        </li>
      </ul>
      <ul class="flex flex-col mt-4 border-t border-gray-300">
        <li
          class="text-sm mt-4 cursor-pointer text-light hover:text-bold ease-in-out transition-all duration-500"
        >
          <NuxtLink to="/" class=""> Pon tu espacio en AirBnb </NuxtLink>
        </li>
        <li
          class="text-sm mt-4 cursor-pointer text-light hover:text-bold ease-in-out transition-all duration-500"
        >
          <NuxtLink to="/" class=""> Centro de ayuda </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const $dropdown = ref(null);

const isOpen = ref(false);

function openMenu() {
  isOpen.value = !isOpen.value;
}

function hideMenu() {
  isOpen.value = false;
}

const handleClickOutside = (event) => {
  if ($dropdown.value && !$dropdown.value.contains(event.target)) {
    hideMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
