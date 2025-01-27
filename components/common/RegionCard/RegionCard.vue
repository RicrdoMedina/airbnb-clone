<template>
  <div
    class="region-card flex w-full h-full items-center justify-center flex-col box-border"
    @click.stop.prevent="handleSelectCategory()"
  >
    <div class="region-card__content w-full h-full box-border">
      <NuxtImg
        :class="pictureDynamicClasses"
        preload
        :src="imgUrl"
        :alt="label"
        v-if="imgUrl"
      />
    </div>
    <span :class="labelDynamicClasses">{{ label }}</span>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
const props = defineProps({
  imgUrl: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleCategorySelected"]);

const pictureDefaultClasses =
  "rounded-md w-full ease-in-out transition-all duration-500 border box-border object-cover hover:border-gray-900";
const pictureActiveClasses = "border-black";
const pictureInactiveClasses = "border-custom-gray-300";

const labelDefaultClasses =
  "block text-left w-full mt-2 whitespace-nowrap text-xs";
const labelActiveClasses = "text-bold font-medium";
const labelInactiveClasses = "text-light";

const { dynamicClasses: pictureDynamicClasses } = useDynamicClasses(
  () => props.isSelected,
  pictureDefaultClasses,
  pictureActiveClasses,
  pictureInactiveClasses
);

const { dynamicClasses: labelDynamicClasses } = useDynamicClasses(
  () => props.isSelected,
  labelDefaultClasses,
  labelActiveClasses,
  labelInactiveClasses
);

function handleSelectCategory() {
  emit("handleCategorySelected");
}
</script>
