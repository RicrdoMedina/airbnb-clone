<template>
  <section class="w-full">
    <div
      class="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-14 3xl:px-16"
    >
      <LoaderListingCard
        v-if="isLoadingListingData"
        v-for="index in listingCurrentNum"
        :key="'loader-' + index"
      />
      <ListingCard
        v-else
        v-for="(listing, index) in listingData"
        :key="'listing-' + index"
        :item="listing"
      />
    </div>
    <div
      class="w-full bg-white flex flex-col items-center justify-center md:px-8 lg:px-12 xl:px-14 2xl:px-14 3xl:px-16 mt-2 md:mt-10 py-10 md:py-0"
      v-if="hasMoreResults"
    >
      <p class="w-full text-center text-black text-lg font-medium px-4 md:px-0">
        Sigue explorando la categoría Casas rurales
      </p>
      <DefaultButton
        class="px-4 py-2 flex items-center justify-center bg-black text-white font-medium text-lg rounded-md mt-4"
        @onClick="getListings"
      >
        <span> Mostrar más</span>
      </DefaultButton>
    </div>
    <div
      class="w-full bg-white flex flex-col items-center justify-center md:px-8 lg:px-12 xl:px-14 2xl:px-14 3xl:px-16 mt-2 md:mt-10 py-10 md:py-0"
      v-else
    >
      <p class="w-full text-center text-black text-lg font-medium px-4 md:px-0">
        No hay más resultados.
      </p>
    </div>
  </section>
</template>
<script setup>
import { useAppDataStore } from "~/store/app/AppDataStore";
import { storeToRefs } from "pinia";
import ListingCard from "~/components/common/ListingCard/ListingCard.vue";
import LoaderListingCard from "~/components/common/Loader/LoaderListingCard/LoaderListingCard.vue";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";
const useDataStore = useAppDataStore();
const { getListings } = useDataStore;
const {  listingData, listingCurrentNum, hasMoreResults,isLoadingListingData } =
  storeToRefs(useDataStore);
</script>
