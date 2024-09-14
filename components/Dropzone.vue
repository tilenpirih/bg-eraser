<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { useImageStore } from '@/store/images'

const imageStore = useImageStore()
const dropZoneRef = ref<HTMLDivElement>()
const fileInputRef = ref<HTMLInputElement>()

function onDrop(files: File[] | null) {
  if (!files)
    return
  imageStore.addImages(files)
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

function onFilesSelected(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    onDrop(Array.from(input.files))
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
})
</script>

<template>
  <v-container>
    <div
      ref="dropZoneRef"
      class="dropzone d-flex justify-center align-center"
      :class="{ isOverDropZone }"
      style="min-height: 300px;"
      @click="triggerFileInput"
    >
      <div class="text-center">
        Drop files here or click to upload
        <div class="text-caption">
          Files must be JPG, PNG, or WEBM
        </div>
      </div>
    </div>
    <input
      ref="fileInputRef"
      type="file"
      class="d-none"
      accept="image/jpeg,image/jpg,image/png,image/webp"
      multiple
      @change="onFilesSelected"
  >
  </v-container>
</template>

<style scoped lang="scss">
.dropzone {
  border-width: 4px;
  border-style: dashed;
  border-radius: 24px;
  border-color: rgba(var(--v-theme-primary), 0.4);
  transition: 0.2s;
  cursor: pointer;
}
.isOverDropZone {
  border-color: rgba(var(--v-theme-primary), 1);
}
</style>