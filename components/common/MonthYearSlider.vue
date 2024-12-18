<template>
  <div class="w-full relative">
    <Carousel
      v-model="currentSlide"
      :items-to-show="itemsToShow"
      :wrap-around="false"
      ref="carousel"
    >
      <Slide v-for="item in items" :key="item.id">
        <div class="carousel__item">
          <MonthYearDisplayCard
            :name="item.name"
            :year="item.year"
            :id="item.id"
            :selected="isSelected(item.id).value"
            @handleClick="(id) => $emit('handleClick', id)"
          />
        </div>
      </Slide>
    </Carousel>

    <button
      class="absolute left-0 top-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
      type="button"
      @click="handlePrev"
      v-show="!isPrevDisabled"
    >
      <img class="w-4" src="/images/PrevIcon.svg" alt="Prev" />
    </button>
    <button
      class="absolute right-0 top-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
      type="button"
      @click="handleNext"
      v-show="!isNextDisabled"
    >
      <img class="w-4" src="/images/NextIcon.svg" alt="Next" />
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import MonthYearDisplayCard from "./MonthYearDisplayCard.vue";

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
  },
  itemsToShow: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["handleClick"]);

const isSelected = (id) => {
  return computed(() => {
    return props.selectedItems.includes(id);
  });
};

const currentSlide = ref(0);
const currentSlideAux = ref(0);

const handleNext = () => {
  const remainingItems = props.items.length - currentSlideAux.value;

  if (remainingItems) {
    if (remainingItems <= props.itemsToShow) {
      currentSlide.value = currentSlideAux.value + remainingItems;
      currentSlideAux.value += remainingItems;
    } else {
      currentSlide.value += props.itemsToShow;
      currentSlideAux.value += props.itemsToShow;
    }
  }
};

const handlePrev = () => {
  const prevIndex = Math.max(currentSlideAux.value - props.itemsToShow, 0);
  currentSlideAux.value = prevIndex;
  currentSlide.value = prevIndex;
};

const isNextDisabled = computed(
  () => currentSlideAux.value >= props.items.length - props.itemsToShow
);

const isPrevDisabled = computed(() => currentSlideAux.value <= 0);
</script>

<style lang="css" scoped>
.carousel__item {
}

.carousel__slide {
}
</style>
