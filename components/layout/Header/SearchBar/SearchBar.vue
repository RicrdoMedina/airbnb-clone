<template>
  <form class="w-108 mx-auto block relative" action="">
    <SearchOptions/>
    <SearchFilter/>
  </form>
</template>

<script setup>
import SearchFilter from './SearchFilter/SearchFilter.vue';
import SearchOptions from './SearchOptions.vue';
</script>
