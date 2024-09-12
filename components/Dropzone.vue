<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()
const dropZoneRef = ref<HTMLDivElement>()
function onDrop(files: File[] | null) {
  if (!files) return
  imageStore.addImages(files)
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/png', 'image/webp'],
})
</script>

<template>
  <v-container>
    <div ref="dropZoneRef" class="dropzone d-flex justify-center align-center" :class="{ isOverDropZone }" style="min-height: 300px;">
      Drop files here
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.dropzone {
  border-width: 4px;
  border-style: dashed;
  border-radius: 24px;
  border-color: rgba(var(--v-theme-primary), 0.4);
  transition: 0.2s;
}
.isOverDropZone {
  border-color: rgba(var(--v-theme-primary), 1);
}
</style>