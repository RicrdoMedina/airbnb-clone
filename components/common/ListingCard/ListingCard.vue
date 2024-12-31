<template>
  <div class="listing-card w-full flex flex-col items-start justify-start cursor-pointer mb-2">
    <div class="w-full md:h-96 lg:h-80 xl:h-72 2xl:h-72 3xl:h-64 relative rounded-xl overflow-hidden">
      <div class="absolute top-3 left-2 py-1 px-2 bg-white rounded-2xl text-black font-medium text-sm z-10">Favorito entre huéspedes</div>
      <span class="absolute top-3 right-2 w-6 z-10 cursor-pointer">
        <FavIcon/>
      </span>
      <Carousel :items="items" />
    </div>
    <div class="w-full mt-1">
      <h4 class="w-full flex items-center justify-between text-black text-base font-medium">
        Alvorada, Brasil
        <span class="flex items-center justify-start text-light font-normal">
          <img class="w-3 mr-2" src="/images/StarIcon.svg" /> 4.8
        </span>
      </h4>
      <p class="w-full text-light text-base">A 796 kilómetros de distancia</p>
      <p class="w-full text-light text-base">23 – 28 de ene</p>
      <p class="w-full text-light text-base mt-2"><span class="text-black font-medium">$21 USD</span> por noche</p>
    </div>
  </div>
</template>

<script setup>
import Carousel from "~/components/common/Carousel/Carousel.vue";
import FavIcon from "~/components/common/FavIcon/FavIcon.vue";

const items = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-659582799400543824/original/37c503dc-a46e-401f-95f6-da5dd96cf528.jpeg?im_w=720&im_format=avif",
  "https://a0.muscache.com/im/pictures/miso/Hosting-659582799400543824/original/7d81d9d6-556f-4411-acce-e0c113302bae.jpeg?im_w=720&im_format=avif",
];
</script>

<style lang="scss" scoped></style>
