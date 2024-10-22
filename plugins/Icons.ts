import DownloadIcon from 'vue-material-design-icons/Download.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue'
import SearchIcon from 'vue-material-design-icons/Magnify.vue'
import AddIcon from 'vue-material-design-icons/Plus.vue'
import Facebook from 'vue-material-design-icons/Facebook.vue'
import Twitter from 'vue-material-design-icons/Twitter.vue'
import Instagram from 'vue-material-design-icons/Instagram.vue'
import Menu from 'vue-material-design-icons/Menu.vue'
import Calendar from 'vue-material-design-icons/Calendar.vue'
import Filter from 'vue-material-design-icons/Filter.vue'
import Alert from 'vue-material-design-icons/AlertCircle.vue'
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('download-icon', DownloadIcon)
  nuxtApp.vueApp.component('check-icon', CheckIcon)
  nuxtApp.vueApp.component('close-icon', CloseIcon)
  nuxtApp.vueApp.component('logout-icon', LogoutIcon)
  nuxtApp.vueApp.component('account-icon', AccountIcon)
  nuxtApp.vueApp.component('search-icon', SearchIcon)
  nuxtApp.vueApp.component('plus-icon', AddIcon)
  nuxtApp.vueApp.component('facebook-icon', Facebook)
  nuxtApp.vueApp.component('twitter-icon', Twitter)
  nuxtApp.vueApp.component('instagram-icon', Instagram)
  nuxtApp.vueApp.component('menu-icon', Menu)
  nuxtApp.vueApp.component('calendar-icon', Calendar)
  nuxtApp.vueApp.component('filter-icon', Filter)
  nuxtApp.vueApp.component('alert-icon', Alert)
  nuxtApp.vueApp.component('arrow-left-icon', ArrowLeft)
  nuxtApp.vueApp.component('chevron-right-icon', ChevronRight)
  nuxtApp.vueApp.component('chevron-left-icon', ChevronLeft)
})
