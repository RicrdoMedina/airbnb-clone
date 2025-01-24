<template>
  <div
    class="listing-card w-full flex flex-col items-start justify-start cursor-pointer mb-2"
  >
    <NuxtLink to="/" class="w-full">
      <div
        class="w-full h-72 md:h-96 lg:h-80 xl:h-72 2xl:h-72 3xl:h-64 relative rounded-xl overflow-hidden"
      >
        <div
          class="absolute top-3 left-2 py-1 px-2 bg-white rounded-2xl text-black font-medium text-sm z-10"
          v-show="item.favoritesAmongGuests"
        >
          Favorito entre huéspedes
        </div>
        <span class="absolute top-3 right-2 w-6 z-10 cursor-pointer">
          <FavIcon />
        </span>
        <Carousel :items="item.galleryImages" />
      </div>
      <div class="w-full mt-1">
        <h4
          class="w-full flex items-center justify-between text-black text-base font-medium"
        >
          {{ item.location }}
          <span class="flex items-center justify-start text-light font-normal">
            <img class="w-3 mr-2" src="/images/StarIcon.svg" />
            {{ item.rating }}
          </span>
        </h4>
        <p class="w-full text-light text-base">
          {{ item.distanceFromLocation }}
        </p>
        <p class="w-full text-light text-base">{{ item.availableDates }}</p>
        <p class="w-full text-light text-base mt-2">
          <span class="text-black font-medium">{{ item.nightlyCost }}</span> por
          noche
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import Carousel from "~/components/common/Carousel/Carousel.vue";
import FavIcon from "~/components/common/FavIcon/FavIcon.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator(value) {
      if (!value.location || typeof value.location !== "string") {
        return false;
      }
      if (
        !value.distanceFromLocation ||
        typeof value.distanceFromLocation !== "string"
      ) {
        return false;
      }
      if (!value.availableDates || typeof value.availableDates !== "string") {
        return false;
      }
      if (!value.nightlyCost || typeof value.nightlyCost !== "string") {
        return false;
      }
      if (typeof value.rating !== "number") {
        return false;
      }
      if (!Array.isArray(value.galleryImages)) {
        return false;
      }
      if (value.galleryImages.some((img) => typeof img !== "string")) {
        return false;
      }
      if (typeof value.favoritesAmongGuests !== "boolean") {
        return false;
      }
      return true;
    },
  },
});
</script>
