<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-60 max-h-universal"
  >
    <div class="relative flex flex-col w-full h-full overflow-clip max-h-full">
      <div class="w-full h-full flex flex-col justify-between bg-white">
        <div
          class="w-full h-20 flex flex-grow-0 relative justify-between items-center"
        >
          <button
            @click="closeModal"
            class="absolute w-8 h-8 rounded-full flex items-center justify-center left-4 border border-custom-gray-400"
          >
            <img class="w-3" src="/images/CloseIcon.svg" alt="Close" />
          </button>

          <ul class="w-full h-8 flex items-center justify-center">
            <li
              :class="dynamicClasses(index).value"
              v-for="(tab, index) in tabsArr"
              :key="index"
              @click.stop.prevent="handleClick(index)"
            >
              {{ tab }}
            </li>
          </ul>
        </div>
        <div class="flex-grow overflow-y-auto overflow-x-hidden scrollbar-none">
          <component :is="currentComponent" v-bind="componentProps" />
        </div>
        <footer
          class="w-full px-4 flex items-center justify-between flex-grow-0 h-16"
          :class="{ hidden: hideFooter }"
        >
          <DefaultButton class="text-bold font-medium text-sm underline">
            Limpiar Todo
          </DefaultButton>

          <DefaultButton
            class="h-12 px-4 rounded-lg flex items-center justify-center bg-tomato font-medium text-white"
          >
            <OutlineSearch size="16px" strokeWidth="3px" />
            <span class="ml-1"> Buscar </span>
          </DefaultButton>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useAppModalStore } from "~/store/AppModalStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import MobileSearchFilter from "~/components/common/MobileSearchFilter/MobileSearchFilter.vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
import { useHead } from "nuxt/app";
const selectedTab = ref(0);
const useModalStore = useAppModalStore();

const { setOpen, setHideFooter } = useModalStore;

const { isOpen, selectedComponent, props, hideFooter } =
  storeToRefs(useModalStore);

const currentComponent = computed(() => {
  if (selectedComponent.value === "MobileSearchFilter")
    return MobileSearchFilter;
});
const componentProps = computed(() => props || {});

const tabsArr = ["Estadías", "Experiencias"];

const defaultClasses =
  "w-auto h-full py-2 px-4 text-sm font-medium transition-all duration-500 ease-in-out flex items-center justify-center";
const activeClasses = "text-bold shadow-bottom-black-2";
const inactiveClasses = "text-light hover:text-black";

const dynamicClasses = (id) =>
  useDynamicClasses(
    () => selectedTab.value === id,
    defaultClasses,
    activeClasses,
    inactiveClasses
  ).dynamicClasses;

const closeModal = () => {
  setOpen(false);
};

function handleClick(id) {
  selectedTab.value = id;
}

watch(isOpen, async (newValue, oldValue) => {
  if (newValue) {
    useHead({
      bodyAttrs: {
        class: "overflow-hidden fixed inset-0",
      },
    });
  } else {
    useHead({
      bodyAttrs: {
        class: null,
      },
    });
  }
});
</script>
