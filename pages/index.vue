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
const config = useRuntimeConfig();

const appDataStore = useAppDataStore();

const { fetchAllDataHomePage } = appDataStore;

onMounted(() => {
  fetchAllDataHomePage();
});

console.log("URL desde el cliente:", config.public.NUXT_PUBLIC_SERVER_URL);

</script>
