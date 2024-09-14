<script setup lang="ts">
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()
const expanded = ref(false)
const buttonText = computed(() => expanded.value ? 'Close settings' : 'Open settings')
const quality = ref(1)
if (imageStore?.config?.output?.quality) {
  quality.value = imageStore.config.output.quality * 100
}
</script>

<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-btn class="rounded-lg" @click="expanded = !expanded">
        {{ buttonText }}
      </v-btn>
    </div>
    <v-expand-transition>
      <v-card v-if="expanded && imageStore.config?.output?.format" class="text-center rounded-lg mt-3">
        <div class="pa-3">
          Image format
          <div class="d-flex justify-center">
            <v-btn class="rounded-e-0 rounded-lg" :variant="imageStore.config.output.format === 'image/png' ? 'flat' : 'tonal'" @click="imageStore.config.output.format = 'image/png'">
              PNG
            </v-btn>
            <v-btn class="rounded-0" :variant="imageStore.config.output.format === 'image/webp' ? 'flat' : 'tonal'" @click="imageStore.config.output.format = 'image/webp'">
              WEBM
            </v-btn>
            <v-btn class="rounded-s-0 rounded-lg rounded-" :variant="imageStore.config.output.format === 'image/jpeg' ? 'flat' : 'tonal'" @click="imageStore.config.output.format = 'image/jpeg'">
              JPG
            </v-btn>
          </div>
          <div class="mt-3">
            Quality {{ quality }}
          </div>
          <div class="d-flex justify-center">
            <v-slider v-model="quality" style="max-width: 300px;" color="primary" thumb-label thumb-color="primary" step="1" min="1" max="100" @update:model-value="imageStore.config.output.quality = quality / 100" />
          </div>
        </div>
      </v-card>
    </v-expand-transition>
  </v-container>
</template>

<style scoped>

</style>