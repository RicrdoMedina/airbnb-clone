<template>
  <section
    class="absolute top-full right-0 mt-4 bg-white shadow-xl px-6 pt-6 pb-0 z-10 w-96"
  >
    <div class="w-full p-6">
      <CounterCard
        title="Adultos"
        subtitle="Edad: 13 años o más"
        :counter="values.adults"
        @updateCounter="setNumberAdults"
      />
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Niños"
          subtitle="De 2 a 12 años"
          :counter="values.children"
          @updateCounter="setNumberChildren"
        />
      </div>
      <div class="w-full mt-4 pt-4 border-t border-gray-200">
        <CounterCard
          title="Bebés"
          subtitle="Menos de 2 años"
          :counter="values.babies"
          @updateCounter="setNumberBabies"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import CounterCard from "~/components/common/CounterCard.vue";
import { useFiltersStore } from "~/store/HeaderSearchBarStore";

const useSearch = useFiltersStore();

const { updateValue, values } = useSearch;


function setNumberAdults (value) {
updateValue("adults",value)
}

function setNumberChildren (value) {
updateValue("children",value)
}


function setNumberBabies (value) {
updateValue("babies",value)
}

</script>
