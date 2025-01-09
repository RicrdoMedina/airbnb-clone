<template>
  <div class="container-swiper w-full h-10 relative flex items-center">
    <div class="w-full h-full flex items-center">
      <swiper
        :slides-per-view="'auto'"
        :space-between="10"
        :pagination="{
          type: 'fraction',
        }"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0"
        >
          <button
            type="button"
            :key="item.id"
            :class="dynamicClasses(item.value).value"
            @click.stop.prevent="handleSelect(item.value)"
          >
            <span class="inline-block mr-2" v-if="item.value">
              <img
                class="w-3"
                src="/images/IconDate.svg"
                alt="Fechas Exactas"
              />
            </span>
            {{ item.name }}
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

const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
  approximateDays: {
    type: [String, Number],
    default: [],
    required: true,
  },
});

const emit = defineEmits(["handleClick"]);

const exactDateButtonDefaultClasses =
  "px-4 h-8 text-sm ease-in-out border transition-all duration-500 flex items-center justify-center text-light rounded-full cursor-pointer z-10";

const exactDateButtonActiveClasses = "border-black";

const exactDateButtonInactiveClasses =
  "border-custom-gray";

const dynamicClasses = (day) =>
  useDynamicClasses(
    () => props.approximateDays === day,
    exactDateButtonDefaultClasses,
    exactDateButtonActiveClasses,
    exactDateButtonInactiveClasses
  ).dynamicClasses;

function handleSelect(id) {
  emit("handleClick", id);
}
</script>
