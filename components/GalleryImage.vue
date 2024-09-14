<script setup lang="ts">
import { mdiDelete, mdiDownload } from '@mdi/js'
import type { TImage } from '@/store/images'
import { useImageStore } from '@/store/images'

const props = defineProps<{
  image: TImage
}>()
const overlay = ref(false)
const imagesStore = useImageStore()

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
  link.download = `${props.image.name}_removedbackground.${props.image.processedExtension}`
  link.click()
}

function deleteImage() {
  imagesStore.images = imagesStore.images.filter(image => image.originalUrl !== props.image.originalUrl)
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
    <div class="pa-2 d-flex justify-space-between">
      <v-btn :disabled="image.status !== 'FINISHED'" color="primary" class="rounded-lg" @click="downloadImage">
        Download
        <v-icon :icon="mdiDownload" class="ml-2" />
      </v-btn>
      <v-btn :icon="mdiDelete" :disabled="image.status !== 'FINISHED'" color="danger" size="small" @click="deleteImage()" />
    </div>
  </v-card>
</template>

<style scoped>

</style>