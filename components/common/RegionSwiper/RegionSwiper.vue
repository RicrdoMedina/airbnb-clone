<template>
  <div class="w-full relative flex md:hidden">
    <div class="w-full flex">
      <swiper
      :slides-per-view="2.5"
      :space-between="20"
      :pagination="{
        type: 'fraction',
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <div
            class="carousel__item w-full h-full"
            @click.stop.prevent="handleSelectCategory(item.id)"
          >
            <button
              class="flex w-full h-full items-center justify-center flex-col"
              type="button"
            >
            <div class="w-full">

              <img
                :class="pictureDynamicClasses(item.id).value"
                :src="item.img"
                :alt="item.name"
              />
            </div>
              <span :style="{ fontSize: '0.75rem' }" :class="labelDynamicClasses(item.id).value">{{
                item.name
              }}</span>
            </button>
          </div>
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

const labelDefaultClasses =
  "block text-left w-full mt-2 whitespace-nowrap";
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
