<template>
  <header :class="containerHeaderClasses">
    <div class="w-full">
      <div id="contentHeader" :class="headerDynamicClasses">
        <div
          class="xl:flex-[1_0_140px] hidden md:flex items-center justify-start z-50"
        >
          <NuxtLink to="/" class="hidden xl:block cursor-pointer">
            <NuxtImg class="w-28" preload src="/images/Logo.svg" alt="Logo" />
          </NuxtLink>
          <NuxtLink to="/" class="block xl:hidden cursor-pointer">
            <NuxtImg class="w-8" preload src="/images/Isotipo.svg" alt="Logo" />
          </NuxtLink>
        </div>
        <div
          class="xl:flex-[0_1_auto] w-full md:w-auto h-full flex flex-col items-center justify-center"
        >
          <MobileSearchBar />
          <LittleSearch />
          <div
            class="absolute hidden md:block w-full md:h-full md:top-16 lg:top-0 left-0 z-30"
          >
            <SearchBar />
          </div>
        </div>
        <div
          class="xl:flex-[1_0_140px] hidden md:flex items-center justify-end relative z-50"
        >
          <NuxtLink
            to="/"
            class="text-sm font-medium cursor-pointer flex whitespace-nowrap rounded-xl"
            :class="{ 'background-animation': isLoading }"
            >Pon tu espacio en Airbnb</NuxtLink
          >
          <div class="inline-block mx-4">
            <LanguageSelector />
          </div>
          <div class="inline-block">
            <HeaderDropdown />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useSearchBarStore } from "~/store/layout/Header/SearchBarStore";
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import HeaderDropdown from "~/components/layout/Header/HeaderDropdown.vue";
import LanguageSelector from "~/components/layout/Header/LanguageSelector.vue";
import MobileSearchBar from "~/components/layout/Header/MobileSearchBar/MobileSearchBar.vue";
import SearchBar from "~/components/layout/Header/SearchBar/SearchBar.vue";
import LittleSearch from "~/components/layout/Header/LittleSearch/LittleSearch.vue";

const useDataStore = useAppDataStore();
const useSearchBar = useSearchBarStore();

const {
  toggleLittleSearch,
  toggleFilterActive,
  toggleStickyFilterInitiated,
  disableSearch,
} = useSearchBar;

const { isStickyFilterActive, littleSearchIsActive, stickyFilterInitiated } =
  storeToRefs(useSearchBar);
const { isLoading } = storeToRefs(useDataStore);

let lastScrollY = 0;

const headerDefaultClasses =
  "w-full flex items-center justify-between h-auto md:h-20 after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-20 after:bg-white";

const headerActiveClasses = "active";

const headerInactiveClasses = "";

const { dynamicClasses: headerDynamicClasses } = useDynamicClasses(
  isStickyFilterActive,
  headerDefaultClasses,
  headerActiveClasses,
  headerInactiveClasses
);

const containerHeaderClasses = computed(() => {
  if (isStickyFilterActive.value) {
    return "container-header flex h-20 sticky w-full z-50 top-0 left-0 bg-white md:shadow-bottom md:px-8 lg:px-10 xl:px-11 2xl:px-14 3xl:px-16 transition-all duration-300 ease-custom-ease";
  }

  if (littleSearchIsActive.value) {
    return "container-header flex h-20 sticky w-full z-50 top-0 left-0 bg-white md:shadow-bottom md:px-8 lg:px-10 xl:px-11 2xl:px-14 3xl:px-16 transition-all duration-300 ease-custom-ease";
  }

  return "container-header flex h-auto md:h-60 lg:h-44 sticky w-full z-50 top-0 left-0 bg-white md:shadow-bottom md:px-8 lg:px-10 xl:px-11 2xl:px-14 3xl:px-16 transition-all duration-300 ease-custom-ease";
});

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (window.innerWidth > 768) {
    if (!lastScrollY) {
      if (currentScrollY > 5) {
        toggleLittleSearch(true);
      }
    } else {
      if (stickyFilterInitiated.value) {
        if (currentScrollY > 5) {
          toggleLittleSearch(false);
          toggleFilterActive(true);
          toggleStickyFilterInitiated(false);
          disableSearch();
        }
      } else if (isStickyFilterActive.value && !stickyFilterInitiated.value) {
        toggleLittleSearch(true);
        toggleFilterActive(false);
      } else {
        if (!isStickyFilterActive.value) {
          if (currentScrollY > 5) {
            toggleLittleSearch(true);
          } else {
            toggleLittleSearch(false);
          }
        }
      }
    }
  }

  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
