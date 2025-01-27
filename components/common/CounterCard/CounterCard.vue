<template>
  <div class="relative w-full flex flex-col">
    <p class="w-full text-left text-bold text-md">{{ title }}</p>
    <p class="w-full text-left text-light text-sm">{{ subtitle }}</p>

    <div class="flex absolute top-0 right-0">
      <DefaultButton
        class="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:border-black ease-in-out transition-all duration-500 cursor-pointer"
        @onClick="decrease"
        v-if="counter > 0"
      >
        <NuxtImg
          class="w-3"
          preload
          src="/images/MinusIcon.svg"
          alt="Minus"
        />
      </DefaultButton>
      <div class="text-light text-lg mx-4">{{ counter }}</div>
      <DefaultButton
        class="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:border-black ease-in-out transition-all duration-500 cursor-pointer"
        @onClick="increase"
      >
        <NuxtImg
          class="w-3"
          preload
          src="/images/PlusIcon.svg"
          alt="Plus"
        />
      </DefaultButton>
    </div>
  </div>
</template>

<script setup>
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  counter: {
    type: Number,
    default: 0,
    required: true,
  },
});

const emit = defineEmits({
  updateCounter: (value) => {
    if (typeof value !== "number") {
      return false;
    }
    return true;
  },
});

const increase = () => {
  props.counter < props.max && emit("updateCounter", props.counter + 1);
};
const decrease = () => {
  if (props.counter > props.min) emit("updateCounter", props.counter - 1);
};
</script>
