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
      <swiper-slide v-for="(item, index) in displayItems" :key="index">
        <div class="carousel__item">
          <IconTextCard
            :id="item.id"
            :url="item.url"
            :text="item.name"
            :isSelected="isSelected(item.id).value"
            :isLoading="isLoading"
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
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const loadingPlaceholder = Array.from({ length: 24 }, (_, i) => ({ id: i }));

const displayItems = computed(() =>
  props.isLoading ? loadingPlaceholder : props.items
);

const emit = defineEmits(["handleCategorySelected"]);

const isSelected = (id) =>
  computed(() => {
    if (props.isLoading) {
      return false;
    }

    return id === props.categoryActive;
  });

function handleSelectCategory(id) {
  emit("handleCategorySelected", id);
}
</script>
