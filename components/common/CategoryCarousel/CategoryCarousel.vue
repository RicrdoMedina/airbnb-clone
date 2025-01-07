<template>
  <div class="w-full h-full relative">
    <Carousel
      v-model="currentSlide"
      :items-to-show="itemsToShow"
      :wrap-around="false"
      :mouseDrag="true"
      :breakpoints="breakpoints"
      ref="carousel"
    >
      <Slide v-for="item in items" :key="item.id">
        <div class="carousel__item">
          <IconTextCard
            :id="item.id"
            :url="item.url"
            :text="item.name"
            :isSelected="item.id === categoryActive"
            @handleClick="handleSelectCategory(item.id)"
          />
        </div>
      </Slide>
    </Carousel>

    <div
      class="absolute -left-4 top-0 bottom-0 w-10 h-full bg-custom-left-gradient-white hidden md:flex items-center justify-center"
      v-show="!isPrevDisabled"
    >
      <button
        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
        type="button"
        @click="handlePrev"
      >
        <img class="w-4" src="/images/PrevIcon.svg" alt="Prev" />
      </button>
    </div>

    <div
      class="absolute -right-4 top-0 bottom-0 w-10 h-full bg-custom-right-gradient-white hidden md:flex items-center justify-center"
      v-show="!isNextDisabled"
    >
      <button
        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
        type="button"
        @click="handleNext"
      >
        <img class="w-4" src="/images/NextIcon.svg" alt="Next" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed,onMounted, ref } from "vue";
import IconTextCard from "~/components/common/IconTextCard/IconTextCard.vue";

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

const currentSlide = ref(0);
const currentSlideAux = ref(0);

const breakpoints = {
  // 300px and up
  300: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  // 400px and up
  400: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  // 500px and up
  500: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  // 500px and up
  769: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  // 500px and up
  900: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  // 500px and up
  1100: {
    itemsToShow: 6,
    snapAlign: "start",
  },
  // 500px and up
  1280: {
    itemsToShow: 7,
    snapAlign: "start",
  },
  // 500px and up
  1400: {
    itemsToShow: 9,
    snapAlign: "start",
  },
    // 500px and up
    1500: {
    itemsToShow: 10,
    snapAlign: "start",
  },
      // 500px and up
      1700: {
    itemsToShow: 12,
    snapAlign: "start",
  },
};

function handleNext() {
  const remainingItems = props.items.length - currentSlideAux.value;

  if (remainingItems > 0) {
    const increment = Math.min(remainingItems, props.itemsToShow);
    currentSlideAux.value += increment;
    currentSlide.value += increment;
  }
}

function handlePrev() {
  const decrement = Math.min(currentSlideAux.value, props.itemsToShow);
  currentSlideAux.value -= decrement;
  currentSlide.value -= decrement;
}

function handleSelectCategory(id) {
  emit("handleCategorySelected", id);
}

const isNextDisabled = computed(
  () => currentSlideAux.value >= props.items.length - props.itemsToShow
);

const isPrevDisabled = computed(() => currentSlideAux.value === 0);

onMounted(() => {

})
</script>