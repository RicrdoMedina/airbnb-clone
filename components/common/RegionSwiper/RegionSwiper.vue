<template>
  <div class="container-swiper w-full h-full relative flex md:hidden">
    <div class="w-full h-ful flex">
      <swiper
        :slides-per-view="'auto'"
        :space-between="10"
        :pagination="{
          type: 'fraction',
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in items" :key="index">
          <button
            class="flex w-28 h-32 items-center justify-center flex-col"
            type="button"
            @click.stop.prevent="handleSelectCategory(item.id)"
          >
            <div class="w-full">
              <img
                :class="pictureDynamicClasses(item.id).value"
                :src="item.img"
                :alt="item.name"
              />
            </div>
            <span
              :style="{ fontSize: '0.75rem' }"
              :class="labelDynamicClasses(item.id).value"
              >{{ item.name }}</span
            >
          </button>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const pictureDefaultClasses =
  "rounded-md ease-in-out transition-all duration-500 border";
const pictureActiveClasses = "border-black";
const pictureInactiveClasses = "border-custom-gray-300";

const labelDefaultClasses = "block text-left w-full mt-2 whitespace-nowrap";
const labelActiveClasses = "text-bold font-medium";
const labelInactiveClasses = "text-light";

const pictureDynamicClasses = (id) =>
  useDynamicClasses(
    () => props.categoryActive === id,
    pictureDefaultClasses,
    pictureActiveClasses,
    pictureInactiveClasses
  ).dynamicClasses;

const labelDynamicClasses = (id) =>
  useDynamicClasses(
    () => props.categoryActive === id,
    labelDefaultClasses,
    labelActiveClasses,
    labelInactiveClasses
  ).dynamicClasses;

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  categoryActive: {
    type: Number,
    default: null,
    required: true,
  },
  itemsToShow: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["handleCategorySelected"]);

function handleSelectCategory(id) {
  emit("handleCategorySelected", id);
}
</script>
