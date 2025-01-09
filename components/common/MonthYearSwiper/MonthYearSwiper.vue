<template>
  <div class="container-swiper w-full relative flex md:hidden">
    <div class="w-full flex">
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
            <MonthYearDisplayCard
              :name="item.name"
              :year="item.year"
              :id="item.id"
              :isSelected="isSelected(item.id).value"
              @handleClick="handleSelect(item.id)"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import MonthYearDisplayCard from "~/components/common/MonthYearDisplayCard/MonthYearDisplayCard.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
  selectedItems: {
    type: Array,
    default: [],
    required: true,
  }
});

const emit = defineEmits(["handleClick"]);

const isSelected = (id) => {
  return computed(() => {
    return props.selectedItems.includes(id);
  });
};

function handleSelect(id) {
  emit("handleClick", id);
}
</script>
