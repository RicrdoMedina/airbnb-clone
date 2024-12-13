<template>
  <div class="absolute top-full left-0 mt-4 bg-white shadow-xl px-6 py-6 z-10">
    <section class="w-full">
      <h4 class="text-sm text-bold font-medium">Búsqueda por región</h4>
      <div class="w-full flex flex-col items-center justify-between mt-4">
        <div class="w-full flex">
          <div
            class="w-40 p-2"
            v-for="option in options.slice(0, 3)"
            :key="option.id"
          >
            <button
              class="flex items-center justify-center flex-col"
              type="button"
              @click.stop.prevent="handleClickWhereButton(option.id)"
            >
              <img
                class="rounded-md ease-in-out transition-all duration-500 border border-gray-200 hover:border-gray-900"
                :src="option.img"
                :alt="option.name"
              />
              <span class="block text-left w-full mt-2 text-sm text-light">{{
                option.name
              }}</span>
            </button>
          </div>
        </div>
        <div class="w-full flex mt-4">
          <div
            class="w-40 p-2"
            v-for="option in options.slice(3, 6)"
            :key="option.id"
          >
            <button
              class="flex items-center justify-center flex-col"
              type="button"
              @click.stop.prevent="handleClickWhereButton(option.id)"
            >
              <img
                class="rounded-md ease-in-out transition-all duration-500 border border-gray-200 hover:border-gray-900"
                :src="option.img"
                :alt="option.name"
              />
              <span class="block text-left w-full mt-2 text-sm text-light">{{
                option.name
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/HeaderSearchBarStore";

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
});

const useSearch = useSearchStore();

const { handleClickWhereButton } = useSearch;
</script>
