<template>
  <div class="wrapper bg-secondary md:bg-white">
    <LayoutHeader />
    <LayoutListingFilters />
    <main>
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
import { useAppDataStore } from "~/store/app/AppDataStore";
import TabBar from "~/components/common/TabBar/TabBar.vue";
import AppModal from "~/components/common/AppModal/AppModal.vue";

const appDataStore = useAppDataStore();

const { fetchAllDataHomePage } = appDataStore;

onMounted(() => {
  fetchAllDataHomePage();
});

console.log("process.env",process.env)

if (process.env.VERCEL_ENV === 'production') {
  console.log("Estamos en el entorno de producción");
} else if (process.env.VERCEL_ENV === 'preview') {
  console.log("Estamos en el entorno de previsualización");
} else if (process.env.VERCEL_ENV === 'development') {
  console.log("Estamos en el entorno de desarrollo");
}
</script>
