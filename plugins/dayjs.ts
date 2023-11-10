import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import duration from 'dayjs/plugin/duration.js'
import "dayjs/locale/fr.js";

export default defineNuxtPlugin((nuxtApp) => {
    dayjs.extend(relativeTime).locale('fr')
    dayjs.extend(duration)
    nuxtApp.provide('dayjs', dayjs)
})

declare module '#app' {
    interface NuxtApp { $dayjs: dayjs.Dayjs }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties { $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs }
}