import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: false },
  app:{
    head:{
      title: 'Free image background remover',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Remove image backgrounds instantly and for free. No limits, no hidden fees. Just fast and easy background remover.' },
        { property: 'og:title', content: 'Free image background remover' },
        { property: 'og:image', content: `${process.env.BASE_URL}/img/OGImage.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${process.env.BASE_URL}` },
        { name: 'keywords', content: 'background, remover, free, background remover, image, image background remover, remove background, remove image background' },
        { name: 'author', content: 'Tilen Pirih' },
      ],
    }
  },
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
  nitro: {
    preset: 'bun',
  },
})
