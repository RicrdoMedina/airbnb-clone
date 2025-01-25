<template>
  <div class="container-carousel w-full h-full relative">
    <Carousel
      class="w-full h-full"
      :itemsToShow="itemsToShow"
      :wrapAround="true"
    >
      <Slide v-for="item in items" :key="item">
        <div class="carousel__item w-full h-full">
          <NuxtImg
            class="w-full h-full object-cover"
            loading="lazy"
            :src="item"
            alt="Carousel Image"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>
<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemsToShow: {
    type: Number,
    default: 1,
  },
});
</script>
