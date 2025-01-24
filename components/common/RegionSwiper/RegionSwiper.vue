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
          <div
            class="w-28 h-32"
            @click.stop.prevent="handleSelectCategory(item.id)"
          >
            <RegionCard
              :imgUrl="item.img"
              :label="item.name"
              :isSelected="categoryActive === item.id"
              @handleCategorySelected="handleSelectCategory(item.id)"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import RegionCard from "~/components/common/RegionCard/RegionCard.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
});

const emit = defineEmits(["handleCategorySelected"]);

function handleSelectCategory(id) {
  emit("handleCategorySelected", id);
}
</script>
