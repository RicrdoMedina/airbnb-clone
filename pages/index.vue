<template>
  <div class="wrapper bg-secondary md:bg-white">
    <LayoutHeader />
    <LayoutListingFilters />
    <main>
      <SwitchCard
        class="flex md:hidden"
        title="Mostrar el Precio Total"
        subtitle="Incluidas todas las tarifas, pero sin contar los impuestos."
        :isLoading="isLoading"
      />
      <LayoutListingWrapper />
      <LayoutTravelInspirationTabs />
      <LayoutFooter />
      <AppModal />
      <TabBar />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppDataStore } from "~/store/app/AppDataStore";
import SwitchCard from "~/components/common/SwitchCard/SwitchCard.vue";
import TabBar from "~/components/common/TabBar/TabBar.vue";
import AppModal from "~/components/common/AppModal/AppModal.vue";

const appDataStore = useAppDataStore();

const { isLoading } = storeToRefs(appDataStore);

const { fetchAllDataHomePage } = appDataStore;

onMounted(() => {
  fetchAllDataHomePage();
});
</script>
