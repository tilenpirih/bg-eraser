<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
import { useTheme } from 'vuetify'

const defaultTheme = useTheme().themes.value.defaultTheme

const darkTheme = ref({
  primary: '#83d2e4',
  secondary: '#b1cbd1',
  background: '#0e1416',
  surface: '#1b2122',
  danger: '#93000a',
  dark: true,
})
const lightTheme = ref({
  primary: '#006877',
  secondary: '#4a6268',
  background: '#f5fafc',
  surface: '#e9eff0',
  danger: '#ba1a1a',
  dark: true,
})

function switchTheme() {
  if (defaultTheme.dark) {
    defaultTheme.dark = false
    defaultTheme.colors.primary = lightTheme.value.primary
    defaultTheme.colors.secondary = lightTheme.value.secondary
    defaultTheme.colors.surface = lightTheme.value.surface
    defaultTheme.colors.background = lightTheme.value.background
    defaultTheme.colors.danger = lightTheme.value.danger
  }
  else {
    defaultTheme.dark = true
    defaultTheme.colors.primary = darkTheme.value.primary
    defaultTheme.colors.secondary = darkTheme.value.secondary
    defaultTheme.colors.surface = darkTheme.value.surface
    defaultTheme.colors.background = darkTheme.value.background
    defaultTheme.colors.danger = darkTheme.value.danger
  }

  setThemeToLocalStorage()
}
function setThemeToLocalStorage() {
  const theme = {
    dark: defaultTheme.dark,
    primary: defaultTheme.colors.primary,
    secondary: defaultTheme.colors.secondary,
    surface: defaultTheme.colors.surface,
    background: defaultTheme.colors.background,
    danger: defaultTheme.colors.danger,
  }
  localStorage.setItem('theme', JSON.stringify(theme))
}
</script>

<template>
  <v-btn variant="text" size="small" :icon="mdiThemeLightDark" @click="switchTheme()" />
</template>
