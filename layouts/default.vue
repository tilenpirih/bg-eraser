<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'Free image background remover',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Remove image backgrounds instantly and for free. No limits, no hidden fees. Just fast and easy background remover.' },
    { property: 'og:title', content: 'Free image background remover' },
    { property: 'og:image', content: `${runtimeConfig.public.BASE_URL}/img/OGImage.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${runtimeConfig.public.BASE_URL}` },
    { name: 'keywords', content: 'background, remover, free, background remover, image, image background remover, remove background, remove image background' },
    { name: 'author', content: 'Tilen Pirih' },
  ],
})
</script>

<template>
  <v-app class="bg-background">
    <navbar style="margin-bottom: 64px;" />
    <v-main>
      <slot />
    </v-main>
    <custom-footer />
  </v-app>
</template>