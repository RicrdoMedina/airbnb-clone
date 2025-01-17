<template>
  <div :class="dynamicClasses">
    <h4 class="text-bold font-medium text-2xl my-4">¿Quién te acompaña?</h4>
    <div class="w-full h-full relative mb-2">
      <div class="w-full">
        <CounterCard
          title="Adultos"
          subtitle="Edad: 13 años o más"
          :counter="adultsCounter"
          @updateCounter="handleSetNumberAdults"
        />
      </div>
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Niños"
          subtitle="De 2 a 12 años"
          :counter="childrenCounter"
          @updateCounter="handleSetNumberChildren"
        />
      </div>
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Bebés"
          subtitle="Menos de 2 años"
          :counter="babiesCounter"
          @updateCounter="handleSetNumberBabies"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard/CounterCard.vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  adultsCounter: {
    type: Number,
    default: 0,
  },
  childrenCounter: {
    type: Number,
    default: 0,
  },
  babiesCounter: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  "setNumberAdults",
  "setNumberChildren",
  "setNumberBabies",
]);

const defaultClasses = "bg-white mx-3 mt-1 bg-white z-60 rounded-3xl shadow-floating-card overflow-hidden px-6 pb-4";

const activeClasses = "block";

const inactiveClasses = "hidden";

const { dynamicClasses } = useDynamicClasses(
  () => props.isOpen,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

function handleSetNumberAdults (counter) {
  emit("setNumberAdults", counter);
}


function handleSetNumberChildren (counter) {
  emit("setNumberChildren", counter);
}


function handleSetNumberBabies (counter) {
  emit("setNumberBabies", counter);
}


</script>
