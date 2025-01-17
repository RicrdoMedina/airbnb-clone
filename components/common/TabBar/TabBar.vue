<template>
  <div
    :class="tabBarDynamicClasses"
  >
    <div class="w-full flex h-16">
      <nav class="w-full h-full">
        <ul class="w-full flex items-center justify-center h-full">
          <li class="w-20 h-full flex flex-col items-center justify-center">
            <NuxtLink
              to="/"
              class="flex items-center justify-center cursor-pointer mb-1"
              :class="{ 'text-tomato': isActive('/').value }"
            >
              <OutlineSearch
                size="24px"
                :strokeWidth="isActive('/').value ? '3px' : '2px'"
              />
            </NuxtLink>
            <span
              class="text-xs text-light"
              :class="{
                'font-medium': isActive('/').value,
                'text-tomato': isActive('/').value,
              }"
              >Explora</span
            >
          </li>
          <li class="w-20 h-full flex flex-col items-center justify-center">
            <NuxtLink
              to="/"
              class="flex items-center justify-center cursor-pointer mb-1"
            >
              <OutlineHeart
                size="24px"
                :strokeWidth="isActive('/fav').value ? '3px' : '2px'"
              />
            </NuxtLink>
            <span
              class="text-xs text-light"
              :class="{
                'font-medium': isActive('/fav').value,
                'text-tomato': isActive('/fav').value,
              }"
              >Favoritos</span
            >
          </li>
          <li class="w-20 h-full flex flex-col items-center justify-center">
            <NuxtLink
              to="/"
              class="flex items-center justify-center cursor-pointer mb-1"
            >
              <OutlineLogin
                size="24px"
                :strokeWidth="isActive('/logIn').value ? '3px' : '2px'"
              />
            </NuxtLink>
            <span
              class="text-xs text-light"
              :class="{
                'font-medium': isActive('/logIn').value,
                'text-tomato': isActive('/logIn').value,
              }"
              >Iniciar sesión</span
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import OutlineHeart from "~/components/common/Svg/OutlineHeart.vue";
import OutlineSearch from "~/components/common/Svg/OutlineSearch.vue";
import OutlineLogin from "~/components/common/Svg/OutlineLogin.vue";

const route = useRoute();
const currentPath = route.path;
const currentQuery = route.query;
const currentName = route.name;
const showOnScroll = ref(false);
let lastScrollY = 0;

const defaultClasses =
  "fixed bg-white w-full left-0 right-0 z-50 bg-white border-t border-custom-gray-300 block md:hidden ease-in-out transition-all duration-500";
const activeClasses = "bottom-0";
const inactiveClasses = "-bottom-96";

const { dynamicClasses: tabBarDynamicClasses } = useDynamicClasses(
  showOnScroll,
  defaultClasses,
  activeClasses,
  inactiveClasses
);

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    showOnScroll.value = false;
  } else {
    showOnScroll.value = true;
  }

  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const isActive = (route) => computed(() => currentPath === route);
</script>