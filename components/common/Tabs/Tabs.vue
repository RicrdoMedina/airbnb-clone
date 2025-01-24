<template>
  <div class="w-full">
    <div class="w-full">
      <ul class="w-full h-12 hidden md:flex shadow-bottom">
        <li
          :class="dynamicClasses(item.id).value"
          v-for="(item, index) in tabLabels"
          :key="index"
          @click.stop.prevent="handleCategorySelected(item.id)"
        >
          <button type="button">
            {{ item.name }}
          </button>
        </li>
      </ul>
      <TabLabelsSwiper
        :items="tabLabels"
        :categoryActive="selectedTab"
        @handleCategorySelected="handleCategorySelected"
      />
    </div>
    <div class="w-full flex flex-wrap mt-4">
      <template v-for="(item, index) in bodyData" :key="index">
        <DestinationCard :title="item.title" :subtitle="item.subtitle" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { isEmpty } from "~/utils/helpers";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import DestinationCard from "~/components/common/DestinationCard/DestinationCard.vue";
import TabLabelsSwiper from "~/components/common/Tabs/TabLabelsSwiper/TabLabelsSwiper.vue";

const props = defineProps({
  tabLabels: {
    type: Array,
    required: true,
  },
  tabsData: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: Number,
    default: 1,
  },
});

const selectedTab = ref(0);
const bodyData = ref([]);

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

function handleCategorySelected(id) {
  selectedTab.value = id;
}

function showData(id) {
  if (isEmpty(props.tabsData)) {
    return;
  }
  const result = props.tabsData.filter((item) => item.categoryId === id);

  bodyData.value = [...result];
}

onMounted(() => {
  selectedTab.value = props.defaultValue;
  showData(props.defaultValue);
});

watch(selectedTab, async (newVal, oldVal) => {
  showData(newVal);
});
</script>
