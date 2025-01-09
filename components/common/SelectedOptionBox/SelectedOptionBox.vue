<template>
  <div
    class="mx-3 h-14 px-4 shadow-bottom-2 mt-2 rounded-xl flex items-center justify-between"
    :class="$attrs.class"
    @click.stop.prevent="handleClick()"
  >
    <span class="text-light font-medium text-sm"> {{ label }} </span>
    <span class="text-bold font-medium text-sm">
      {{ value ? value : placeholder }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
  },
});

const emit = defineEmits(["handleSelectOption"]);

function handleClick() {
  emit("handleSelectOption");
}
</script>
