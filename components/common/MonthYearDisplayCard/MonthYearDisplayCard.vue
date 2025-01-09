<template>
  <button
    type="button"
    @click.stop.prevent="handleSelected"
    :class="buttonDynamicClasses"
  >
    <img class="w-10" :src="getCalendarImage" alt="Calendar" />
    <span class="text-bold font-medium text-base mt-2">{{ name }}</span>
    <span class="text-bold text-sm">{{ year }}</span>
  </button>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  name: {
    type: String,
    default: "Name",
    required: true,
  },
  year: {
    type: String,
    default: "2024",
    required: true,
  },
  id: {
    type: Number,
    default: 0,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["handleClick"]);

function handleSelected() {
  emit("handleClick", props.id);
}

const buttonDefaultClasses =
  "w-28 md:w-32 h-32 md:h-36 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-black";

const buttonActiveClasses = "border-2 border-black";

const buttonInactiveClasses = "border border-custom-gray-400";

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  () => props.isSelected,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);

const getCalendarImage = computed(() =>
  props.isSelected ? "/images/CalendarOpen.jpg" : "/images/Calendar.jpg"
);

</script>
