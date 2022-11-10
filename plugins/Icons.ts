import DownloadIcon from "vue-material-design-icons/Download.vue";
import CheckIcon from 'vue-material-design-icons/Check.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("download-icon", DownloadIcon);
  nuxtApp.vueApp.component("check-icon", CheckIcon);
    nuxtApp.vueApp.component("close-icon", CloseIcon);
});
