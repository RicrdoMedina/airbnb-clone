<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-white z-50"
  >
    <div class="w-full h-full">
      <button @click="closeModal" class="absolute w-8 h-8 rounded-full flex items-center justify-center top-4 left-4 border border-custom-gray-400">
        <img class="w-3" src="/images/CloseIcon.svg" alt="Close" />
      </button>

      <component :is="currentComponent" v-bind="componentProps" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAppModalStore } from "~/store/AppModalStore";
import { storeToRefs } from "pinia";
import MobileSearchFilter from "~/components/common/MobileSearchFilter/MobileSearchFilter.vue";

const useModalStore = useAppModalStore();

const { setOpen } = useModalStore;

const { isOpen, selectedComponent, props } = storeToRefs(useModalStore);

const currentComponent = computed(() => {
  if (selectedComponent.value === "MobileSearchFilter") return MobileSearchFilter;
});
const componentProps = computed(() => props || {});

const closeModal = () => {
  setOpen(false)
};
</script>
