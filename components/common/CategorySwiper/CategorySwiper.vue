<template>
  <div class="container-swiper w-full h-full relative">
    <swiper
      :slides-per-view="'auto'"
      :space-between="10"
      :pagination="{
        type: 'fraction',
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <div class="carousel__item">
          <IconTextCard
            :id="item.id"
            :url="item.url"
            :text="item.name"
            :isSelected="item.id === categoryActive"
            @handleClick="handleSelectCategory(item.id)"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import IconTextCard from "~/components/common/IconTextCard/IconTextCard.vue";
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
