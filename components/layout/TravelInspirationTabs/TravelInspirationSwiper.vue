<template>
  <div class="container-swiper w-full relative flex md:hidden">
    <div class="shadow-bottom w-full h-12 flex">
      <swiper
        :slides-per-view="itemsToShow"
        :space-between="0"
        :pagination="{
          type: 'fraction',
        }"
        :navigation="true"
        :modules="modules"
        modules="[Pagination]"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in items" :key="index">
          <div
  :class="dynamicClasses(index).value"
            @click.stop.prevent="handleSelectCategory(index)"
          >
            {{ item }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const modules = [Navigation];

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  categoryActive: {
    type: Number,
    default: null,
  },
  itemsToShow: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(["handleCategorySelected"]);

const paginationOptions = {
  clickable: true,
};

const defaultClasses =
  "carousel__item w-full h-12 flex items-center justify-center text-sm font-medium transition-all duration-500 ease-in-out";
const activeClasses = "font-bold border-b-2 border-black";
const inactiveClasses = "text-light border-b-2 border-transparent";

const dynamicClasses = (id) =>
  useDynamicClasses(
    () => props.categoryActive === id,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;


function handleSelectCategory(id) {
  emit("handleCategorySelected", id);
}
</script>
