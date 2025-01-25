<template>
  <nav class="w-full hidden md:flex items-center justify-center h-20">
    <ul class="w-full h-full flex items-center justify-center">
      <li>
        <NuxtLink to="/" class="">
          <DefaultButton
            class="text-sm text-bold font-medium hover:text-bold ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
            :class="buttonDynamicClasses"
          >
            <span> Estadísticas</span>
          </DefaultButton>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/" class="">
          <DefaultButton
            class="mx-4 text-sm text-light hover:text-gray-900 ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
            :class="buttonDynamicClasses"
          >
            <span> Experiencias</span>
          </DefaultButton>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/" class="">
          <DefaultButton
            class="text-sm text-light hover:text-gray-900 ease-in-out transition-all rounded-lg duration-500 cursor-pointer"
            :class="buttonDynamicClasses"
          >
            <span> Experiencias en línea</span>
          </DefaultButton>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
const useDataStore = useAppDataStore();
const { isLoading } = storeToRefs(useDataStore);

const buttonDefaultClasses = "";

const buttonActiveClasses = "background-animation";

const buttonInactiveClasses = "";

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  isLoading,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);
</script>
