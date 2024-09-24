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
      // @ts-expect-error no need to check this
      this.items[key] = value;
    },
    isActiveTabByKeyName(key: string, value: string) {
      // @ts-expect-error no need to check this
      return this.items[key] === value;
    },
  },
});
