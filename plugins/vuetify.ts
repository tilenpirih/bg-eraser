import type { ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { sl } from 'vuetify/locale'

// #4290f5
const defaultTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#83d2e4',
    secondary: '#b1cbd1',
    background: '#0e1416',
    surface: '#1b2122',
    danger: '#93000a',
  },
}

if (import.meta.client) {
  const localTheme = JSON.parse(localStorage.getItem('theme') as string)
  if (localTheme && defaultTheme.colors) {
    defaultTheme.dark = localTheme.dark
    defaultTheme.colors.primary = localTheme.primary
    defaultTheme.colors.secondary = localTheme.secondary
    defaultTheme.colors.background = localTheme.background
    defaultTheme.colors.surface = localTheme.surface
    defaultTheme.colors.danger = localTheme.danger
    if (localTheme.danger)
      defaultTheme.colors.danger = localTheme.danger
    if (localTheme.error)
      defaultTheme.colors.error = localTheme.error
    if (localTheme.info)
      defaultTheme.colors.info = localTheme.info
    if (localTheme.success)
      defaultTheme.colors.success = localTheme.success
    if (localTheme.warning)
      defaultTheme.colors.warning = localTheme.warning
  }
}
export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      VNumberInput,
    },
    theme: {
      defaultTheme: 'defaultTheme',
      themes: {
        defaultTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    locale: {
      locale: 'sl',
      fallback: 'en',
      messages: { sl },
    },
    defaults: {
      VBtn: {
        color: 'primary',
        class: 'text-none',
      },
      VProgressLinear: {
        rounded: true,
        height: '12',
        color: 'primary',
      },
    },
  })

  app.vueApp.use(vuetify)
})