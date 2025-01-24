<template>
  <div
    class="w-auto px-4 md:px-0 relative group shadow-bottom-2 ease-in-out transition-all duration-500 h-16 md:rounded-md flex flex-col items-center justify-center cursor-pointer"
    @click.stop.prevent="onClick"
  >
    <div class="w-full h-8 flex items-center justify-center">
      <span
        v-if="isLoading"
        class="background-animation w-6 h-6 rounded-full"
      ></span>
      <img class="w-5 md:w-6" :src="url" :alt="text" v-else />
    </div>
    <div :class="containerLabelDynamicClasses">
      <p :class="labelDynamicClasses">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  id: {
    type: [Number, null],
    default: "",
    required: true,
  },
  url: {
    type: [String, null],
    default: "",
    required: true,
  },
  text: {
    type: [String, null],
    default: "",
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleClick"]);

const labelDefaultClasses = computed(() => ({
  "text-xs": true,
  "md:font-medium": true,
  "group-hover:text-black": true,
  "text-center": true,
  "whitespace-nowrap": true,
  "ease-in-out": true,
  "transition-all": true,
  "duration-500": true,
  "background-animation": props.isLoading,
  "rounded-md": props.isLoading,
  "text-transparent": props.isLoading,
  "w-20": props.isLoading,
  "md:w-16": props.isLoading,
  "h-4": props.isLoading,
}));

const containerLabelDefaultClasses =
  "w-full h-6 flex items-start justify-center mt-1 after:content-[''] after:absolute after:absolute after:-bottom-0 after:w-full after:h-0.5";

const labelActiveClasses = "text-black";

const cointainerLabelActiveClasses = "after:bg-black";

const labelInactiveClasses = "text-light";

const containerLabelInactiveClasses = "group-hover:after:bg-custom-gray-300";

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  () => props.isSelected,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

const { dynamicClasses: containerLabelDynamicClasses } = useDynamicClasses(
  () => props.isSelected,
  containerLabelDefaultClasses,
  cointainerLabelActiveClasses,
  containerLabelInactiveClasses
);

function onClick() {
  emit("handleClick");
}
</script>
