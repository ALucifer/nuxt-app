import { Field, ErrorMessage, Form } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("AppForm", Form);
  nuxtApp.vueApp.component("AppField", Field);
  nuxtApp.vueApp.component("AppErrorMessage", ErrorMessage);
});
