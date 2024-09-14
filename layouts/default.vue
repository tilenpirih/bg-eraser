<script setup lang="ts">
useHead({
  title: 'Free image background remover',
  meta: [
    { name: 'description', content: 'Remove background from images for free. Original quality' },
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