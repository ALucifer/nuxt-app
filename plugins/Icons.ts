import DownloadIcon from "vue-material-design-icons/Download.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("download-icon", DownloadIcon);
});
