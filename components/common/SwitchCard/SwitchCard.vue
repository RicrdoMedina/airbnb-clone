<template>
  <div class="w-full px-6 my-6">
    <div class="w-full flex px-4 py-3 border border-custom-gray-300 rounded-lg">
      <div class="flex flex-col">
        <h3 :class="titleDynamicClasses">
          {{ title }}
        </h3>
        <p :class="subtitleDynamicClasses">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex-grow-0 w-20 h-full flex items-center justify-center">
        <span v-if="isLoading" class="background-animation h-6 w-12 rounded-xl"></span>
        <SwitchButton v-model="isSwitchOn" v-else/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import SwitchButton from "~/components/common/SwitchButton/SwitchButton.vue";

const isSwitchOn = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const titleDefaultClasses = "w-full flex-grow text-xs font-medium text-bold"

const titleActiveClasses = "background-animation h-4 rounded-md";

const titleInactiveClasses = "";

const { dynamicClasses: titleDynamicClasses } = useDynamicClasses(
  () => props.isLoading,
  titleDefaultClasses,
  titleActiveClasses,
  titleInactiveClasses
);

const subtitleDefaultClasses = "text-xs text-light mt-2"

const subtitleActiveClasses = "background-animation h-4 rounded-md";

const subtitleInactiveClasses = "";

const { dynamicClasses: subtitleDynamicClasses } = useDynamicClasses(
  () => props.isLoading,
  subtitleDefaultClasses,
  subtitleActiveClasses,
  subtitleInactiveClasses
);
</script>
