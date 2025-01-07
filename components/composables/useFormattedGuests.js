import { computed } from "vue";

export function useFormattedGuests(values) {
  const formattedNumberGuests = computed(() => {
    const numberGuests = values.adults + values.children + values.babies;

    if (!numberGuests) return "¿Cuántos?";

    return `${numberGuests} huéspedes`;
  });

  return { formattedNumberGuests };
}
