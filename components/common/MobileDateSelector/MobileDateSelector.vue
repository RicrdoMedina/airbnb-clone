<template>
  <div class="w-full h-full pt-6 flex flex-col">
    <div
      class="w-full flex flex-col justify-between px-4 overflow-x-hidden overflow-y-auto"
    ></div>

    <footer
      class="sticky h-28 left-0 right-0 bottom-0 bg-white z-70 flex flex-col items-center px-4 rounded-bl-[1.5rem] rounded-br-[1.5rem] border-t border-custom-gray-300"
    >
      <div
        class="w-full h-12 relative flex items-center flex-grow-0"
      >
        <ExactDateSwiper
          :items="exactDates"
          :approximateDays="approximateDays"
          @handleClick="handleSetApproximateDays"
        />
      </div>
      <div
        class="w-full flex-grow flex items-center justify-between border-t border-custom-gray-300"
      >
        <DefaultButton class="text-bold font-medium text-sm underline">
          Restablecer
        </DefaultButton>

        <DefaultButton
          class="h-12 px-4 rounded-lg flex items-center justify-center bg-black font-medium text-white"
        >
          <span class="ml-1"> Siguiente </span>
        </DefaultButton>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ExactDateSwiper from "~/components/common/ExactDateSwiper/ExactDateSwiper.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const props = defineProps({
  exactDates: {
    type: Array,
    default: [],
  },
  approximateDays: {
    type: [String, Number],
    default: [],
    required: true,
  },
});

const emit = defineEmits(["setApproximateDays"]);

function handleSetApproximateDays(val) {
  emit("setApproximateDays", val);
}
</script>
