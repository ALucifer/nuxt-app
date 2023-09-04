
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/image-edge',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  auth: {
    origin: '127.0.0.1:3333',
    globalAppMiddleware: true,
    isEnabled: true,
    globalAppMiddleware: {
      isEnabled: true
    },
    provider: {
      type: 'authjs'
    }
  },
  css: [
    '@/assets/css/fontawesome.min.css',
    '@/assets/css/slick.css',
     "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    '@/assets/css/magnific-popup.css',
    '@/assets/css/nice-select.css',
    '@/assets/css/animate.css',
    '@/assets/css/style.css',
  ],
  router: {
    // turns off prefetching (since the default is true)
    prefetchLinks: false,
  },
  vue: {
    config: {
      unwrapInjectedRef: true
    }
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/davxuwzzl/image/upload/'
    }
  },
})
