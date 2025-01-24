<template>
  <div
    class="w-full flex flex-col items-center justify-center mt-8 lg:mb-12 pb-8 shadow-bottom"
  >
    <div
      class="w-full 3xl:w-8/12 px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-14 3xl:px-0 flex flex-col"
    >
      <h2
        class="flex flex-col md:flex-row items-start justify-start text-xl text-black font-medium mb-2"
      >
        Inspiración para escapadas
        <span class="block md:inline"
          >futuras {{ !isEmpty(travelCategoriesData) }}</span
        >
      </h2>
      <template v-if="!isEmpty(travelCategoriesData)">
        <Tabs
          :tabLabels="travelCategoriesData.categories"
          :defaultValue="1"
          :tabsData="travelCategoriesData.data"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import Tabs from "~/components/common/Tabs/Tabs.vue";
import { isEmpty } from "~/utils/helpers";
const useDataStore = useAppDataStore();
const { travelCategoriesData } = storeToRefs(useDataStore);
</script>
