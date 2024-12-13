import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ['@/assets/css/main.scss'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // ...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules: {
    '/**': { ssr: false },
  },
  nitro: {
    preset: 'bun',
  },
})
