// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  modules: [
    '@nuxt/devtools',
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
     "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
    '@/assets/css/nice-select.css',
    '@/assets/css/style.css',
  ],
  router: {
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
