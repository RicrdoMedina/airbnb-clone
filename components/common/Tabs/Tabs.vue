<template>
  <div class="w-full">
    <div class="w-full">
      <ul class="w-full h-12 flex shadow-bottom">
        <li
          :class="dynamicClasses(index).value"
          v-for="(item, index) in items"
          :key="index"
          @click.stop.prevent="handleClick(index)"
        >
          <button type="button">
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
    <div class="w-full flex flex-wrap mt-4">
      <template v-for="(item, index) in body[selectedTab]" :key="index">
        <DestinationCard
          :title="item.title"
          :subtitle="item.subtitle"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import DestinationCard from "~/components/common/DestinationCard/DestinationCard.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  body: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: Number,
  },
});

const selectedTab = ref(null);

const defaultClasses =
  "w-auto h-full p-4 text-sm font-medium transition-all duration-500 ease-in-out";
const activeClasses = "text-bold shadow-bottom-black-2";
const inactiveClasses = "text-light hover:text-black";

const dynamicClasses = (id) =>
  useDynamicClasses(
    () => selectedTab.value === id,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;

function handleClick(id) {
  selectedTab.value = id;
}

onMounted(() => {
  selectedTab.value = props.defaultValue;
});
</script>

<style lang="scss" scoped></style>
