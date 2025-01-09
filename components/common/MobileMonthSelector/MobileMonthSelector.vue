<template>
  <div class="w-full h-full pt-6 flex flex-col">
    <div
      class="w-full flex flex-col justify-between px-4 overflow-x-hidden overflow-y-auto"
    >
      <div class="w-full flex items-center justify-center shadow-bottom h-16">
        <CounterCard
          :counter="monthCounter"
          :min="1"
          :max="12"
          :title="monthCounterLabel"
          @updateCounter="handleUpdateCounter"
        />
      </div>
      <div class="w-full flex items-center justify-between shadow-bottom h-16">
        <p class="text-left text-bold text-md">{{ startDateLabel }}</p>
        <p class="text-left text-bold text-md">
          {{ startDate }}
        </p>
      </div>
      <div class="w-full flex items-center justify-between shadow-bottom h-16">
        <p class="text-left text-bold text-md">{{ endDateLabel }}</p>
        <p class="text-left text-bold text-md">
          {{ endDate }}
        </p>
      </div>
    </div>

    <footer
      class="sticky left-0 right-0 bottom-0 border-t bg-white border-custom-gray-300 z-70 h-16 flex items-center justify-between px-4 rounded-bl-[1.5rem] rounded-br-[1.5rem]"
    >
      <DefaultButton class="text-bold font-medium text-sm underline">
        Omite
      </DefaultButton>

      <DefaultButton
        class="h-12 px-4 rounded-lg flex items-center justify-center bg-black font-medium text-white"
      >
        <span class="ml-1"> Siguiente </span>
      </DefaultButton>
    </footer>
  </div>
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard/CounterCard.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const props = defineProps({
  monthCounter: {
    type: Number,
    default: 0,
  },
  monthCounterLabel: {
    type: String,
    required: true,
  },
  startDateLabel: {
    type: String,
    required: true,
  },
  endDateLabel: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["setMonthCounter"]);

function handleUpdateCounter(val) {
  emit("setMonthCounter", val);
}
</script>
