<script setup lang="ts">
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()
console.log(imageStore.images)
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
      <v-col v-for="image in imageStore.images" :key="image.originalUrl" cols="12" sm="3">
        <v-card rounded="lg">
          <v-img v-if="image.status === 'FINISHED' && image.processedUrl" :src="image.processedUrl" />
          <v-img v-else :src="image.originalUrl" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>