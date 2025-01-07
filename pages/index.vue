<template>
  <div class="wrapper">
    <LayoutHeader />
    <LayoutListingFilters />
    <main>
      <div class="w-full flex md:hidden px-6 my-6">
        <div
          class="w-full flex px-4 py-3 border border-custom-gray-300 rounded-lg"
        >
          <div class="flex flex-col">
            <h3 class="text-bold font-medium text-xs flex-grow">
              Mostrar el Precio Total
            </h3>
            <p class="text-xs text-light mt-2">
              Incluidas todas las tarifas, pero sin contar los impuestos.
            </p>
          </div>
          <div class="flex-grow-0 w-20 h-full flex items-center justify-center">
            <SwitchButton v-model="isSwitchOn" />
          </div>
        </div>
      </div>
      <LayoutListingWrapper />
      <LayoutTravelInspirationTabs />
      <LayoutFooter />
      <AppModal/>
      <TabBar />
    </main>
  </div>
</template>

<script setup>
import TabBar from "~/components/common/TabBar/TabBar.vue";
import SwitchButton from "~/components/common/SwitchButton/SwitchButton.vue";
import AppModal from "~/components/common/AppModal/AppModal.vue";

const isSwitchOn = ref(false);
</script>
