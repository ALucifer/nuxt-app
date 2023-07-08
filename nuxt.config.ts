
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  modules: [
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
  }
})
