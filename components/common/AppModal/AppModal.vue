<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-60 max-h-universal"
  >
    <div class="relative flex flex-col w-full h-full overflow-clip max-h-full">
      <div class="w-full h-full flex flex-col justify-between bg-secondary">
        <header
          class="w-full h-20 flex flex-grow-0 relative justify-between items-center"
          :class="{ 'fade-in-down': isOpen }"
        >
          <DefaultButton
            class="absolute w-8 h-8 rounded-full flex items-center justify-center left-4 border bg-white border-custom-gray-400"
            @onClick="closeModal"
          >
            <NuxtImg
              class="w-3"
              loading="lazy"
              src="/images/CloseIcon.svg"
              alt="Close"
            />
          </DefaultButton>

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
        </header>
        <section
          class="flex-grow overflow-y-auto overflow-x-hidden scrollbar-none"
          :class="{ 'fade-in-down': isOpen }"
        >
          <component :is="currentComponent" v-bind="componentProps" />
        </section>
        <footer
          class="w-full px-4 flex items-center justify-between flex-grow-0 h-16 bg-white"
          :class="{ hidden: hideFooter, 'fade-in-up': isOpen }"
        >
          <DefaultButton
            class="text-bold font-medium text-sm underline"
            @onClick="clearAll()"
          >
            Limpiar Todo
          </DefaultButton>

          <DefaultButton
            class="h-10 px-6 rounded-lg flex items-center justify-center bg-tomato font-medium text-white"
            @onClick="submit()"
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
import { useAppDataStore } from "~/store/app/AppDataStore";
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { useAppModalStore } from "~/store/app/AppModalStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import MobileSearchFilter from "~/components/common/MobileSearchFilter/MobileSearchFilter.vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
const selectedTab = ref(0);
const useDataStore = useAppDataStore();
const useSearchBar = useSearchBarStore();
const useModalStore = useAppModalStore();

const { setIsLoadingListingData } = useDataStore;

const { updateValue, handleSelectedDateId, updateCircularMonthSelector } =
  useSearchBar;

const { setOpen } = useModalStore;

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

function clearAll() {
  handleSelectedDateId([]);
  updateValue("travelDate", []);
  updateCircularMonthSelector(3);
  updateValue("selectedMonths", []);
  updateValue("when", []);
  updateValue("adults", 0);
  updateValue("children", 0);
  updateValue("babies", 0);
}

function submit () {
  closeModal()
  setIsLoadingListingData(true)
  setTimeout(() => {
    setIsLoadingListingData(false)
  }, 400);
}

watch(isOpen, async (newValue, oldValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden", "fixed", "inset-0");
  } else {
    document.body.classList.remove("overflow-hidden", "fixed", "inset-0");
  }
});
</script>
