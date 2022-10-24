import { defineStore } from "pinia";

export const useTabStore = defineStore({
  id: " tabs",
  state: () => {
    return {
      items: {
        "tournament-view": "overview",
      },
    };
  },
  getters: {
    getActiveTabByKeyName(key) {
      return this.items[key];
    },
  },
  actions: {
    setActiveTabByKeyName(key, value) {
      this.items[key] = value;
    },
    isActiveTabByKeyName(key, value) {
      return this.items[key] === value;
    },
  },
});
