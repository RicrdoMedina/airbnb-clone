<template>
  <div :class="littleSearchClasses">
    <div
      class="w-full flex items-center justify-between rounded-full h-12 flex overflow-hidden border bg-white shadow-search-box-inactive"
    >
      <button
        class="flex-grow relative flex items-center justify-start pl-5 text-bold text-sm font-medium cursor-pointer"
        @click.stop.prevent="handleClick('where')"
      >
        {{ text1 }}
      </button>
      <button
        class="w-36 relative flex items-center justify-end text-bold flex-grow-0 text-sm font-medium before:content-[''] before:bg-custom-gray-400 before:absolute before:left-4  lg:before:-left-2 before:w-px before:h-6 cursor-pointer"
        @click.stop.prevent="toggleDateFilter"
      >
        <span class="absolute right-5">{{ text2 }}</span>
      </button>
      <button
        class="w-36 relative text-light flex-grow-0 text-sm flex items-center justify-end before:content-[''] before:bg-custom-gray-400 before:absolute before:left-4 lg:before:-left-2 before:w-px before:h-6 cursor-pointer"
        @click.stop.prevent="handleClick('who')"
      >
        <span class="absolute right-16">{{ text3 }}</span>
      </button>
      <button
        class="absolute right-2 bg-tomato w-8 h-8 text-white rounded-full flex items-center justify-center font-medium"
      >
        <span><img class="w-5" src="/images/Search.svg" alt="Search" /></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "~/store/HeaderSearchBarStore";
import { storeToRefs } from "pinia";
import { truncateString } from "~/utils/stringUtils";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const useSearch = useFiltersStore();

const {
  toggleSubFilter,
  toggleFilterActive,
  toggleLittleSearch,
  toggleStickyFilterInitiated,
  handleDateFilter,
} = useSearch;

const { littleSearchIsActive } = storeToRefs(useSearch);

const windowWidth = ref(0);

const defaultText1 = "En cualquier lugar del mundo";
const defaultText2 = "Cualquier semana";
const defaultText3 = "¿Cuántos?";

const text1 = ref(null);
const text2 = ref(null);
const text3 = ref(null);

const breackPoints = {
  950: {
    text1: {
      value: defaultText1,
      limit: 12,
      ref: text1,
    },
    text2: {
      value: defaultText2,
      limit: 12,
      ref: text2,
    },
    text3: {
      value: defaultText3,
      limit: 5,
      ref: text3,
    },
  },
};

const littleSearchClasses = computed(() => {
  if (littleSearchIsActive.value) {
    return "w-full h-full flex items-center lg:w-33 mx-auto cursor-pointer little-search-transition z-50 cursor-pointer show-transition ";
  }

  return "w-full h-full hidden md:flex items-center lg:w-33 mx-auto cursor-pointer little-search-transition z-10 cursor-pointer";
});

function updateWindowSize() {
  windowWidth.value = window.innerWidth;
}

function handleClick(filterName) {
  toggleLittleSearch(false);
  toggleFilterActive(true);
  toggleStickyFilterInitiated(true);
  toggleSubFilter(filterName);
}

function toggleDateFilter() {
  toggleLittleSearch(false);
  toggleFilterActive(true);
  toggleStickyFilterInitiated(true);
  handleDateFilter();
}

function handleWindowResize(newWidth) {
  Object.keys(breackPoints).forEach((point) => {
    const textArrr = [defaultText1, defaultText2, defaultText3];
    if (parseInt(point) >= newWidth) {
      const elements = breackPoints[point];

      Object.keys(elements).forEach((key) => {
        const currentElement = elements[key];

        if (textArrr.includes(currentElement.value)) {
          currentElement.ref.value = truncateString(
            currentElement.value,
            currentElement.limit
          );
        }
      });
    } else {
      Object.keys(breackPoints).forEach((point) => {
        const elements = breackPoints[point];
        Object.keys(elements).forEach((key) => {
          const currentElement = elements[key];

          currentElement.ref.value = currentElement.value;
        });
      });
    }
  });
}

onMounted(() => {
  window.addEventListener("resize", updateWindowSize);
  handleWindowResize(window.innerWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowSize);
});

watch(windowWidth, async (newWidth, oldWidth) => {
  handleWindowResize(newWidth);
});
</script>
