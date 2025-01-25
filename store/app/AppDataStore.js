import { defineStore } from "pinia";

export const useAppDataStore = defineStore("appDataStore", () => {
  const { $http } = useNuxtApp();
  const listingData = ref([]);
  const listingPageNum = ref(1);
  const listingPageSize = ref(24);
  const listingCurrentNum = ref(24);
  const travelCategoriesData = ref([]);
  const categoriesData = ref([]);
  const isLoading = ref(true);
  const isLoadingListingData = ref(true);
  const error = ref(null);
  const hasMoreResults = ref(true);

  function setListing(val) {
    listingData.value = [...val];
  }

  function setIsLoading(val) {
    isLoading.value = val;
  }

  async function fetchAllDataHomePage() {
    isLoading.value = true;
    isLoadingListingData.value = true;
    error.value = null;
    try {
      const [responseA, responseB, responseC] = await Promise.all([
        $http
          .get(
            `/listings/?pageSize=${listingPageSize.value}&pageNum=${listingPageNum.value}`
          )
          .then((res) => res.data),
        $http.get("/travelCategories").then((res) => res.data),
        $http.get("/filterCategories").then((res) => res.data),
      ]);
      listingData.value = responseA.result;
      travelCategoriesData.value = responseB.result;
      categoriesData.value = responseC.result;
      listingPageNum.value = listingPageNum.value + 1;
      listingCurrentNum.value = listingCurrentNum.value + listingPageSize.value;
    } catch (err) {
      error.value = err.message || "Error fetching data";
    } finally {
      isLoading.value = false;
      isLoadingListingData.value = false;
    }
  }

  async function getListings() {
    isLoadingListingData.value = true;
    error.value = null;
    try {
      const response = await $http
        .get(
          `/listings/?pageSize=${listingPageSize.value}&pageNum=${listingPageNum.value}`
        )
        .then((res) => res.data);
      const listingArr = [...listingData.value];

      if (response.result.length) {
        listingData.value = [...listingArr, ...response.result];
        listingPageNum.value = listingPageNum.value + 1;
        listingCurrentNum.value =
          listingCurrentNum.value + listingPageSize.value;
      } else {
        hasMoreResults.value = false;
      }
    } catch (err) {
      error.value = err.message || "Error fetching data";
    } finally {
      isLoadingListingData.value = false;
    }
  }

  return {
    listingData,
    travelCategoriesData,
    categoriesData,
    isLoading,
    isLoadingListingData,
    listingCurrentNum,
    hasMoreResults,
    setListing,
    setIsLoading,
    fetchAllDataHomePage,
    getListings,
  };
});
