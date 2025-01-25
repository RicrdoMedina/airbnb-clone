import { computed, unref, isRef } from "vue";

export function useDynamicClasses(
  flagOrComparison,
  defaultClasses,
  activeClasses,
  inactiveClasses
) {
  const resolveClasses = (classes) => {
    const resolved = unref(classes);
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

    const isActive =
      typeof flagOrComparison === "function"
        ? flagOrComparison()
        : unref(flagOrComparison);

    const active = isActive
      ? resolveClasses(activeClasses)
      : resolveClasses(inactiveClasses);

    return `${baseClasses} ${active}`.trim();
  });

  return { dynamicClasses };
}
