<script setup lang="ts">
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()

async function downloadAll() {
  const zip = new JSZip()
  const imagePromises = imageStore.images.map(async image => {
    const filename = `${image.name}.${image.processedExtension}`
    if (!image.processedUrl) {
      return
    }
    const response = await fetch(image.processedUrl)
    const blob = await response.blob()
    zip.file(filename, blob)
  })
  await Promise.all(imagePromises)
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'images.zip')
}
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col v-for="image in imageStore.images" :key="image.originalUrl" cols="12" sm="6" md="6" lg="4" xl="3">
        <gallery-image :image="image" />
      </v-col>
    </v-row>
    <v-row v-if="imageStore.images.length > 1" class="d-flex justify-center">
      <v-col cols="auto">
        <v-btn class="rounded-lg" :disabled="imageStore.processing" @click="downloadAll()">
          Download all images
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="rounded-lg" color="danger" :disabled="imageStore.processing" @click="imageStore.images = []">
          Delete all images
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>