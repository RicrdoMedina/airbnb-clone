<template>
  <section :class="littleSearchClasses">
    <div
      class="w-full items-center justify-between rounded-full h-12 flex overflow-hidden border md:bg-white shadow-search-box-inactive"
    >
      <DefaultButton
        class="flex-grow relative flex items-center justify-start pl-5 text-bold text-sm font-medium cursor-pointer"
        @click="handleClick('where')"
      >
        <span class="rounded-md">{{ text1 }}</span>
      </DefaultButton>

      <DefaultButton
        class="w-36 relative flex items-center justify-end text-bold flex-grow-0 text-sm font-medium before:content-[''] before:bg-custom-gray-400 before:absolute before:left-4 lg:before:-left-2 before:w-px before:h-6 cursor-pointer"
        @click="toggleDateFilter"
      >
        <span
          class="absolute right-5 rounded-md"
          >{{ text2 }}</span
        >
      </DefaultButton>

      <DefaultButton
        class="w-36 relative text-light flex-grow-0 text-sm flex items-center justify-end before:content-[''] before:bg-custom-gray-400 before:absolute before:left-4 lg:before:-left-2 before:w-px before:h-6 cursor-pointer"
        @click="handleClick('who')"
      >
        <span
          class="absolute right-16 rounded-md"
          >{{ text3 }}</span
        >
      </DefaultButton>

      <DefaultButton
        class="absolute right-2 bg-tomato w-8 h-8 text-white rounded-full flex items-center justify-center font-medium"
      >
        <span><OutlineSearch size="15px" :strokeWidth="'4px'" /></span>
      </DefaultButton>
    </div>
  </section>
</template>

<script setup>
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { storeToRefs } from "pinia";
import { truncateString } from "~/utils/stringUtils";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";

const useSearchBar = useSearchBarStore();

const {
  toggleSubFilter,
  toggleFilterActive,
  toggleLittleSearch,
  toggleStickyFilterInitiated,
  handleDateFilter,
} = useSearchBar;

const { littleSearchIsActive } = storeToRefs(useSearchBar);

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
    return "w-full h-full hidden md:flex items-center lg:w-33 mx-auto cursor-pointer little-search-transition z-50 cursor-pointer show-transition ";
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
