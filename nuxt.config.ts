import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  css: [
    '@/assets/css/fontawesome.min.css',
    '@/assets/css/slick.css',
     "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    '@/assets/css/magnific-popup.css',
    '@/assets/css/nice-select.css',
    '@/assets/css/animate.css',
    '@/assets/css/style.css',
  ],
  meta: {
    script: [
      // {
      //   type: 'text/javascript',
      //   src: '/js/jquery-3.5.1.min.js',
      // },
      {
        type: 'text/javascript',
        src: '/js/bootstrap.js',
      },
    ]
  },
  router: {
    // turns off prefetching (since the default is true)
    prefetchLinks: false,
  },
  vue: {
    config: {
      unwrapInjectedRef: true
    }
  },
})
