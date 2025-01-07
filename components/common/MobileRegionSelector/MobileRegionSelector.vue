<template>
  <div :class="dynamicClasses">
    <h4 class="text-bold font-medium text-2xl mb-4">¿A dónde quieres ir?</h4>
    <div
      class="w-full h-12 rounded-lg flex items-center justify-start border border-gray-500 px-4"
    >
      <span class="">
        <OutlineSearch size="18px" stroke-width="3px" />
      </span>
      <input
        class="w-full h-full pl-2 outline-0 border-none"
        type="text"
        placeholder="Explora destinos"
        :value="values.where"
      />
    </div>
    <div class="w-full relative mt-6 mb-2">
      <RegionSwiper
        :items="searchRegions"
        :category-active="selectedRegion"
        @handle-category-selected="handleClick"
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import RegionSwiper from "~/components/common/RegionSwiper/RegionSwiper.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const useSearch = useFiltersStore();

const { handleRegionSelection, values } = useSearch;

const { searchRegions } = storeToRefs(useSearch);

const selectedRegion = ref(null);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default:false,
  },
});


const defaultClasses =
  "w-full rounded-xl p-4 shadow-lg";

const activeClasses = "block";

const inactiveClasses = "hidden";

const { dynamicClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);


function handleClick(id) {
  handleRegionSelection(id)
  selectedRegion.value = id;
}
</script>
