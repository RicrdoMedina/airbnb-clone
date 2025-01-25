<template>
  <div :class="dynamicClasses">
    <h4 class="text-bold font-medium text-2xl mb-4">{{ title }}</h4>
    <div
      class="w-full h-12 rounded-lg flex items-center justify-start border border-gray-500 px-4"
    >
      <span class="">
        <OutlineSearch size="18px" stroke-width="3px" />
      </span>
      <input
        class="w-full h-full pl-2 outline-0 border-none"
        type="text"
        :placeholder="placeholder"
        :value="inputValue"
      />
    </div>
    <div class="w-full relative h-36 mt-3 mb-2">
      <RegionSwiper
        :items="items"
        :categoryActive="selectedItem"
        @handleCategorySelected="handleSelectItem"
      />
    </div>
  </div>
</template>

<script setup>
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import RegionSwiper from "~/components/common/RegionSwiper/RegionSwiper.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputValue: {
    type: String,
    default: "",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: [],
  },
  selectedItem: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["setSelectItem"]);

const defaultClasses = "bg-white mx-3 rounded-3xl p-4 shadow-floating-card mt-2 mb-4 slide-down";

const activeClasses = "block active";

const inactiveClasses = "hidden";

const { dynamicClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

function handleSelectItem(id) {
  emit("setSelectItem", id);
}
</script>
