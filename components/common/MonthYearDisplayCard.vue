<template>
  <button type="button" @click.stop.prevent="handleSelected" :class="buttonDynamicClasses">
    <img
      class="w-10"
      :src="getCalendarImage"
      alt="Calendar"
    />
    <span class="text-bold font-medium text-base mt-2">{{ name }}</span>
    <span class="text-bold text-sm">{{ year }}</span>
  </button>
</template>

<script setup>
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import { useSearchStore } from "~/store/HeaderSearchBarStore";

const useSearch = useSearchStore();

const props = defineProps({
  name: {
    type: String,
    default: "Name",
  },
  year: {
    type: String,
    default: "2024",
  },
  id: {
    type: Number,
    default: 0,
  },
});

const isActive = ref(false);

const emit = defineEmits(["handleClick"]);

function handleSelected() {
  isActive.value = isActive.value ? false : true;
  emit("handleClick", props.id);
}

const buttonDefaultClasses = "w-32 h-36 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-black";

const buttonActiveClasses = "border-2 border-black";

const buttonInactiveClasses = "border border-custom-gray-400";

const { dynamicClasses: buttonDynamicClasses } = useDynamicClasses(
  isActive,
  buttonDefaultClasses,
  buttonActiveClasses,
  buttonInactiveClasses
);

const getCalendarImage = computed(() => 
  isActive.value ? '/images/CalendarOpen.jpg' : '/images/Calendar.jpg'
);

</script>
