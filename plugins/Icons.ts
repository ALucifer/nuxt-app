import DownloadIcon from "vue-material-design-icons/Download.vue";
import CheckIcon from 'vue-material-design-icons/Check.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue'
import SearchIcon from 'vue-material-design-icons/Magnify.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("download-icon", DownloadIcon);
  nuxtApp.vueApp.component("check-icon", CheckIcon);
  nuxtApp.vueApp.component("close-icon", CloseIcon);
  nuxtApp.vueApp.component('logout-icon', LogoutIcon)
  nuxtApp.vueApp.component('account-icon', AccountIcon)
  nuxtApp.vueApp.component('search-icon', SearchIcon)
});
