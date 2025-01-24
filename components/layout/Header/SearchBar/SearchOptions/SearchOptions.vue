<template>
  <nav class="w-full hidden md:flex items-center justify-center h-20">
    <NuxtLink to="/" class="">
      <DefaultButton
        class="text-sm text-bold font-medium hover:text-bold ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
        :class="{ 'background-animation': isLoading }"
      >
        <span> Estadísticas</span>
      </DefaultButton>
    </NuxtLink>
    <NuxtLink to="/" class="">
      <DefaultButton
        class="mx-4 text-sm text-light hover:text-gray-900 ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
        :class="{ 'background-animation': isLoading }"
      >
        <span> Experiencias</span>
      </DefaultButton>
    </NuxtLink>
    <NuxtLink to="/" class="">
      <DefaultButton
        class="text-sm text-light hover:text-gray-900 ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
        :class="{ 'background-animation': isLoading }"
      >
        <span> Experiencias en línea</span>
      </DefaultButton>
    </NuxtLink>
  </nav>
</template>

<script setup>
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
const useDataStore = useAppDataStore();
const { isLoading } = storeToRefs(useDataStore);
</script>
