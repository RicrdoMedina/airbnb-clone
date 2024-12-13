<template>
  <div class="w-full">
    <header class="w-full flex items-center justify-between h-20">
      <div class="w-full flex items-center justify-start">
        <img
          class="w-28 hidden xl:block 2xl:block 3xl:block"
          src="/images/Logo.svg"
          alt="Logo"
        />
        <img
          class="w-8 block xl:hidden 2xl:hidden 3xl:hidden"
          src="/images/Isotipo.svg"
          alt="Logo"
        />
      </div>
      <div class="w-full flex items-center justify-center">
        <div class="absolute w-full top-0 left-0">
          <SearchBar/>
        </div>
      </div>
      <div class="w-full flex items-center justify-end">
        <button class="text-sm ml-4 font-medium">
          Pon tu espacio en Airbnb
        </button>
        <div class="mx-4">
          <LanguageSelector/>
        </div>
        <HeaderDropdown/>
      </div>
    </header>
  </div>
</template>

<script setup>
import HeaderDropdown from './HeaderDropdown.vue';
import LanguageSelector from './LanguageSelector.vue';
import SearchBar from './SearchBar/SearchBar.vue';
</script>
