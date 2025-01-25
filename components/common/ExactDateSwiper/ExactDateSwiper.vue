<template>
  <div class="container-swiper w-full h-full relative flex items-center">
    <div class="w-full h-full flex items-center">
      <swiper
        :slidesPerView="'auto'"
        :spaceBetween="10"
        :observer="true"
        :observe-parents="true"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0 w-auto"
        >
          <div class="carousel__item">
            <div
              :key="item.id"
              :class="dynamicClasses(item.value).value"
              @click.prevent="handleSelectCategory(item.value)"
            >
              <span class="inline-block mr-2" v-if="item.value">
                <NuxtImg
                  class="w-3"
                  loading="lazy"
                  src="/images/IconDate.svg"
                  alt="Fechas Exactas"
                />
              </span>
              {{ item.name }}
            </div>
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

const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
  categoryActive: {
    type: [String, Number],
    default: [],
    required: true,
  },
});

const emit = defineEmits(["handleSelectCategory"]);

const exactDateButtonDefaultClasses =
  "px-4 relative h-8 text-sm ease-in-out border transition-all duration-500 flex items-center justify-center text-light rounded-full cursor-pointer";

const exactDateButtonActiveClasses = "border-black";

const exactDateButtonInactiveClasses = "border-custom-gray";

const dynamicClasses = (day) =>
  useDynamicClasses(
    () => props.categoryActive === day,
    exactDateButtonDefaultClasses,
    exactDateButtonActiveClasses,
    exactDateButtonInactiveClasses
  ).dynamicClasses;

function handleSelectCategory(id) {
  emit("handleSelectCategory", id);
}
</script>
