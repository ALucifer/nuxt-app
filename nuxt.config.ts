// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  modules: [
    '@nuxt/devtools',
    '@sidebase/nuxt-auth',
    '@vee-validate/nuxt',
    '@nuxt/image',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'acceptHMRUpdate',
          ['defineStore', 'definePiniaStore', 'acceptHMRUpdate'],
        ],
      },
    ],
  ],
  auth: {
    origin: 'http://127.0.0.1:3333',
    baseURL: process.env.AUTH_ORIGIN,
    globalAppMiddleware: true,
    isEnabled: true,
    provider: {
      type: 'authjs',
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
  head: {
    link: [
      { rel: 'icon', href: '/favicon.png' }
      // Si vous utilisez un fichier PNG, utilisez 'image/png' comme type
    ]
  },
  devtools: {
    timeline: {
      enabled: true,
    },
  },
  routeRules: {
    '/profile/messages': { redirect: '/profile' }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
})