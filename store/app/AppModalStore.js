import { defineStore } from "pinia";

export const useAppModalStore = defineStore("appModalStore", () => {
  const isOpen = ref(false);

  const hideFooter = ref(false);

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

  function setHideFooter(hide) {
    hideFooter.value = hide;
  }

  return {
    isOpen,
    selectedComponent,
    props,
    hideFooter,
    setOpen,
    setSelectedComponent,
    setProps,
    setHideFooter,
  };
});
