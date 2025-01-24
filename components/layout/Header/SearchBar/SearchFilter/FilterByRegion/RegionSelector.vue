<template>
  <div
    class="w-98 absolute top-full left-8 lg:left-0 mt-4 bg-white shadow-xl px-6 py-6 z-40 rounded-3xl"
  >
    <section class="w-full">
      <h4 class="text-sm text-bold font-medium">Búsqueda por región</h4>
      <div class="w-full flex flex-col items-center justify-between mt-4">
        <div class="w-full flex">
          <div
            class="w-40 p-2"
            v-for="option in searchRegions.slice(0, 3)"
            :key="option.id"
          >
            <RegionCard
              :imgUrl="option.img"
              :label="option.name"
              :isSelected="values.where === option.id"
              @handleCategorySelected="handleSelectCategory(option.id)"
            />
          </div>
        </div>
        <div class="w-full flex mt-4">
          <div
            class="w-40 p-2"
            v-for="option in searchRegions.slice(3, 6)"
            :key="option.id"
          >
            <RegionCard
              :imgUrl="option.img"
              :label="option.name"
              :isSelected="values.where === option.id"
              @handleCategorySelected="handleSelectCategory(option.id)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import RegionCard from "~/components/common/RegionCard/RegionCard.vue";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";

const useSearchBar = useSearchBarStore();

const { values, handleRegionSelection } = useSearchBar;

const { searchRegions } = storeToRefs(useSearchBar);

function handleSelectCategory(id) {
  handleRegionSelection(id);
}
</script>
