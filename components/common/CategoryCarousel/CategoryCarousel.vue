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
      <Slide v-for="(item, index) in displayItems" :key="`slide-${index}`">
        <div class="carousel__item">
          <IconTextCard
            v-if="isLoading"
            :isLoading="true"
            :id="null"
            :url="null"
            :text="null"
            :isSelected="false"
          />
          <IconTextCard
            v-else
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
      class="absolute -left-4 top-0 bottom-0 w-10 h-full bg-custom-left-gradient-white hidden md:flex items-center justify-center z-10"
      v-show="!isPrevDisabled"
    >
      <DefaultButton
        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
        @onClick="handlePrev"
      >
        <NuxtImg
          class="w-4"
          loading="lazy"
          src="/images/PrevIcon.svg"
          alt="Prev"
        />
      </DefaultButton>
    </div>

    <div
      class="absolute -right-4 top-0 bottom-0 w-10 h-full bg-custom-right-gradient-white hidden md:flex items-center justify-center z-10"
      v-show="!isNextDisabled"
    >
      <DefaultButton
        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300"
        @onClick="handleNext"
      >
        <NuxtImg
          class="w-4"
          loading="lazy"
          src="/images/NextIcon.svg"
          alt="Next"
        />
      </DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
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
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleCategorySelected"]);

const currentSlide = ref(0);
const currentSlideAux = ref(0);

const breakpoints = {
  300: { itemsToShow: 3.5, snapAlign: "center" },
  400: { itemsToShow: 3.5, snapAlign: "start" },
  500: { itemsToShow: 3.5, snapAlign: "start" },
  769: { itemsToShow: 5, snapAlign: "start" },
  900: { itemsToShow: 5, snapAlign: "start" },
  1100: { itemsToShow: 6, snapAlign: "start" },
  1280: { itemsToShow: 7, snapAlign: "start" },
  1400: { itemsToShow: 9, snapAlign: "start" },
  1500: { itemsToShow: 10, snapAlign: "start" },
  1700: { itemsToShow: 12, snapAlign: "start" },
};

const loadingPlaceholder = Array.from({ length: 24 }, (_, i) => ({ id: i }));

const displayItems = computed(() =>
  props.isLoading ? loadingPlaceholder : props.items
);

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
</script>
