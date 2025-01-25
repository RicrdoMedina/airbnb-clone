<template>
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
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard/CounterCard.vue";

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
  }
});

const emit = defineEmits(["setMonthCounter", "handleNext", "handleReset"]);

function handleUpdateCounter(val) {
  emit("setMonthCounter", val);
}

</script>
