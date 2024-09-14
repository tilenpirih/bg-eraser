<script setup lang="ts">
import type { TImage } from '@/store/images'

const props = defineProps<{
  image: TImage
}>()
const overlay = ref(false)
watch(() => props.image.status, status => {
  if (status === 'PROCESSING' || status === 'PENDING') {
    overlay.value = true
  }
  else {
    overlay.value = false
  }
}, { immediate: true })

function downloadImage() {
  const link = document.createElement('a')
  link.href = props.image.processedUrl || props.image.originalUrl
  link.download = `${props.image.name}_removedbackground.webp`
  link.click()
}
</script>

<template>
  <v-card rounded="lg">
    <v-overlay
      v-model="overlay"
      class="align-center justify-center"
      contained
    >
      <v-progress-circular indeterminate color="primary" />
    </v-overlay>

    <v-img v-if="image.status === 'FINISHED' && image.processedUrl" aspect-ratio="1" :src="image.processedUrl" />
    <v-img v-else aspect-ratio="1" :src="image.originalUrl" />
    <div>
      download image
      <v-btn :disabled="image.status !== 'FINISHED'" color="primary" @click="downloadImage">
        Download
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>

</style>