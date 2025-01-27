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
            :isSelected="isSelected(item.id).value"
            @handleClick="handleSelect(item.id)"
          />
        </div>
      </Slide>
    </Carousel>

    <DefaultButton
      class="absolute left-0 top-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300 z-10"
      @onClick="handlePrev"
      v-show="!isPrevDisabled"
    >
      <NuxtImg
        class="w-4"
        loading="lazy"
        src="/images/PrevIcon.svg"
        alt="Prev"
      />
    </DefaultButton>

    <DefaultButton
      class="absolute right-0 top-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-custom-gray-300 z-10"
      @onClick="handleNext"
      v-show="!isNextDisabled"
    >
      <NuxtImg
        class="w-4"
        loading="lazy"
        src="/images/NextIcon.svg"
        alt="Next"
      />
    </DefaultButton>
  </div>
</template>

<script setup>
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import { computed, ref } from "vue";
import MonthYearDisplayCard from "~/components/common/MonthYearDisplayCard/MonthYearDisplayCard.vue";

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

const currentSlide = ref(0);
const currentSlideAux = ref(0);

const isSelected = (id) => {
  return computed(() => {
    return props.selectedItems.includes(id);
  });
};

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

function handleSelect(id) {
  emit("handleClick", id);
}

const isNextDisabled = computed(
  () => currentSlideAux.value >= props.items.length - props.itemsToShow
);

const isPrevDisabled = computed(() => currentSlideAux.value <= 0);
</script>
