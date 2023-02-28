import { createPinia, setActivePinia } from "pinia";
import { defineNuxtPlugin } from "#imports";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  pinia.use(({ store }) => {
    store.router = useRouter()
  })
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  if (process.server) {
    nuxtApp.payload.pinia = pinia.state.value;
  } else if (nuxtApp.payload && nuxtApp.payload.pinia) {
    pinia.state.value = nuxtApp.payload.pinia;
  }
  return {
    provide: {
      pinia
    }
  };
});
