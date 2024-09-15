import type { Config } from '@imgly/background-removal'
import { preload, removeBackground } from '@imgly/background-removal'

export interface TImage {
  originalUrl: string
  processedUrl: string | null
  image: File
  status: 'PENDING' | 'PROCESSING' | 'FINISHED' | 'ERROR'
  name: string
  originalExtension: string
  processedExtension: string | null
  config: Config
}

const config: Config = {
  debug: false,
  device: 'gpu',
  output: {
    quality: 0.8,
    format: 'image/png',
  },
}

if (import.meta.client) {
  preload(config)
}

export const useImageStore = defineStore('image', {
  state: () => ({
    images: [] as TImage[],
    processing: false,
    config: config as Config,
  }),
  actions: {
    addImages(images: File[]) {
      for (const image of images) {
        const name = image.name.split('.')[0]
        const extension = image.name.split('.').pop()?.toUpperCase()

        const validExtensions = ['PNG', 'JPG', 'JPEG', 'WEBP']
        if (!validExtensions.includes(extension || '')) {
          console.warn(`File ${image.name} has an unsupported format: ${extension}`)
          continue
        }

        this.images.unshift({
          originalUrl: URL.createObjectURL(image),
          processedUrl: null,
          image,
          status: 'PENDING',
          name,
          originalExtension: extension || '',
          processedExtension: null,
          config: this.config,
        })
      }

      if (!this.processing) {
        this.processLastImage()
      }
    },
    async processLastImage() {
      const pendingImage = this.images.slice().reverse().find(image => image.status === 'PENDING')
      if (!pendingImage) {
        this.processing = false
        return
      }

      this.processing = true
      pendingImage.status = 'PROCESSING'

      try {
        const response = await removeBackground(pendingImage.image, pendingImage.config)

        const processedUrl = URL.createObjectURL(response)
        pendingImage.processedUrl = processedUrl
        pendingImage.status = 'FINISHED'
        if (this.config?.output?.format) {
          pendingImage.processedExtension = this.config.output.format.split('/')[1]
        }
        else {
          pendingImage.processedExtension = 'png'
        }
      }
      catch (error) {
        console.error('Error processing image:', error)
        pendingImage.status = 'ERROR'
      }

      const hasMorePending = this.images.some(image => image.status === 'PENDING')

      if (hasMorePending) {
        this.processLastImage()
      }
      else {
        this.processing = false
      }
    },
  },
})
