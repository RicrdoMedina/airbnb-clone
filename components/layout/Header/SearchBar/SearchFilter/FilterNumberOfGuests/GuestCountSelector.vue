<template>
  <section
    class="absolute top-full right-0 mt-4 bg-white shadow-xl px-6 pt-6 pb-0 z-10 w-96"
  >
    <div class="w-full p-6">
      <CounterCard
        title="Adultos"
        subtitle="Edad: 13 años o más"
        :counter="numberAdults"
        @updateCounter="setNumberAdults"
      />
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Niños"
          subtitle="De 2 a 12 años"
          :counter="numberChildren"
          @updateCounter="setNumberChildren"
        />
      </div>
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Bebés"
          subtitle="Menos de 2 años"
          :counter="numberBabies"
          @updateCounter="setNumberBabies"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard.vue";
import { useSearchStore } from "~/store/HeaderSearchBarStore";

const useSearch = useSearchStore();

const { setNumberAdults, setNumberChildren, setNumberBabies } = useSearch;

const { numberAdults, numberChildren, numberBabies } = storeToRefs(useSearch);

</script>
