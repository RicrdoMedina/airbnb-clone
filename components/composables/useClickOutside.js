import { onMounted, onUnmounted } from "vue";

export function useClickOutside(handleClickOutside) {
  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
}
