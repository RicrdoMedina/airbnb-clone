<template>
  <div
    class="w-auto relative group shadow-bottom-2 ease-in-out transition-all duration-500 h-16 rounded-md flex flex-col items-center justify-center cursor-pointer"
    @click.stop.prevent="onClick"
  >
    <div class="w-full h-8 flex items-center justify-center">
      <img class="w-6" :src="url" :alt="text" />
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
});

const emit = defineEmits(["handleClick"]);

const labelDefaultClasses =
  "text-xs font-medium group-hover:text-black text-center whitespace-nowrap ease-in-out transition-all duration-500";

const containerLabelDefaultClasses =
  "w-full h-6 flex items-start justify-center mt-1 after:content-[''] after:absolute after:-bottom-0 after:w-full after:h-0.5";

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

<style lang="scss" scoped></style>
