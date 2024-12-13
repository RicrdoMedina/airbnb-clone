import { computed, unref, isRef } from "vue";

export function useDynamicClasses(
  flagOrComparison, // Puede ser una referencia, prop o función
  defaultClasses,
  activeClasses,
  inactiveClasses
) {
  // Helper para resolver clases (string, object o computed)
  const resolveClasses = (classes) => {
    const resolved = unref(classes); // Maneja ref o computed
    if (typeof resolved === "string") return resolved;
    if (typeof resolved === "object") {
      return Object.entries(resolved)
        .filter(([_, isActive]) => isActive)
        .map(([className]) => className)
        .join(" ");
    }
    return "";
  };

  const dynamicClasses = computed(() => {
    const baseClasses = resolveClasses(defaultClasses);

    // Verificar el tipo de flagOrComparison
    const isActive =
      typeof flagOrComparison === "function"
        ? flagOrComparison() // Ejecutar si es función
        : unref(flagOrComparison); // Resolver si es referencia o prop

    const active = isActive
      ? resolveClasses(activeClasses)
      : resolveClasses(inactiveClasses);

    return `${baseClasses} ${active}`.trim();
  });

  return { dynamicClasses };
}
