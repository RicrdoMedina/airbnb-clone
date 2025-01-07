import { defineStore } from "pinia";

export const useAppModalStore = defineStore("appModalStore", () => {
  const isOpen = ref(false);

  const selectedComponent = ref(null);

  const props = ref(null);

  function setOpen(open) {
    isOpen.value = open;
  }

  function setSelectedComponent(componentName) {
    selectedComponent.value = componentName;
  }

  function setProps(props) {
    props.value = props;
  }

  return {
    isOpen,
    selectedComponent,
    props,
    setOpen,
    setSelectedComponent,
    setProps,
  };
});
