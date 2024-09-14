<script setup lang="ts">
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()

async function downloadAll() {
  const zip = new JSZip()
  imageStore.images.forEach(image => {
    const filename = image.name
    const ext = image.extension
    const processedUrl = image.processedUrl
    console.log(filename, ext, processedUrl)
    zip.file(image.processedUrl, image.processedUrl)
  })
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'images.zip')
}
</script>

<template>
  <v-container>
    <div v-for="image in imageStore.images" :key="image.originalUrl">
      <div class="d-flex">
        <!-- <v-img max-height="200" :src="image.originalUrl" alt="image" />
        <div>{{ image.status }}</div>
        <v-img v-if="image.processedUrl" max-height="200" :src="image.processedUrl" alt="image" /> -->
      </div>
    </div>
    <v-row>
      <v-col v-for="image in imageStore.images" :key="image.originalUrl" cols="12" sm="6" md="4" lg="3" xl="2">
        <gallery-image :image="image" />
      </v-col>
    </v-row>
    <div v-if="imageStore.images.length > 1">
      <v-btn @click="downloadAll()">
        download all images
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>