const mockAuthModule = process.env.VITEST ? ['./test/mocks/setup.ts'] : []

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

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
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    ...mockAuthModule,
  ],
  components: {
    global: true,
    dirs: ['~/components/global'],
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },

  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '@/assets/css/nice-select.css',
    '@/assets/css/style.css',
  ],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  routeRules: {
    '/profile/messages': { redirect: '/profile' },
  },

  compatibilityDate: '2024-09-12',

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },

  auth: {
    origin: 'http://127.0.0.1:3333',
    baseURL: process.env.AUTH_ORIGIN,
    globalAppMiddleware: true,
    isEnabled: true,
    provider: {
      type: 'authjs',
    },
    session: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    },
  },

  eslint: {
    config: {
      typescript: true,
      stylistic: true,
    },
  },

  head: {
    link: [
      { rel: 'icon', href: '/favicon.png' },
      // Si vous utilisez un fichier PNG, utilisez 'image/png' comme type
    ],
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/davxuwzzl/image/upload/',
    },
  },
})
