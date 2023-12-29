import { defineStore } from "pinia";

export const useTabStore = defineStore({
  id: "tabs",
  state: () => {
    return {
      items: {
        "tournament-view": "overview",
      },
    };
  },
  actions: {
    setActiveTabByKeyName(key: string, value: string) {
      // @ts-ignore
      this.items[key] = value;
    },
    isActiveTabByKeyName(key: string, value: string) {
      // @ts-ignore
      return this.items[key] === value;
    },
  },
});
