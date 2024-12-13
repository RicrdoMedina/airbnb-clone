<template>
  <ClientOnly>
    <Carousel :items-to-show="5">
      <Slide v-for="month in months" :key="month.id">
        <div class="carousel__item">
          <MonthYearDisplayCard
            :name="month.name"
            :year="month.year"
            :id="month.id"
            @handleClick="handleWhenDoYouWantToGo"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </ClientOnly>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import MonthYearDisplayCard from "./MonthYearDisplayCard.vue";

import { useSearchStore } from "~/store/HeaderSearchBarStore";

const useSearch = useSearchStore();

const { whenDoYouWantToGo } = storeToRefs(useSearch);


const { handleWhenDoYouWantToGo } = useSearch;

const props = defineProps({
  months: {
    type: Array,
    default: [],
    required: true,
  },
});
</script>

<style lang="css" scoped>
.carousel__item {
}

.carousel__slide {
}
</style>
