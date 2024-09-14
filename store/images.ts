import type { Config } from '@imgly/background-removal'
import { preload, removeBackground } from '@imgly/background-removal'

export interface TImage {
  originalUrl: string
  processedUrl: string | null
  image: File
  status: 'PENDING' | 'PROCESSING' | 'FINISHED' | 'ERROR'
  name: string
  extension: string
}
const config: Config = {
  debug: false,
  device: 'gpu',
  output: {
    quality: 0.9,
    format: 'image/png',
  },
}
preload(config).then(() => {
  console.log('Asset preloading succeeded')
})
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
        const extension = image.name.split('.').pop()
        if(extension?.toUpperCase() !== 'PNG' && extension?.toUpperCase() !== 'JPG' && extension?.toUpperCase() !== 'JPEG' && extension?.toUpperCase() !== 'WEBP') {
          continue
        }
        this.images.unshift({
          originalUrl: URL.createObjectURL(image),
          processedUrl: null,
          image,
          status: 'PENDING',
          name,
          extension,
        })
      }
      if (!this.processing) {
        this.processLastImage()
      }
    },
    async processLastImage() {
      const image = this.images.slice().reverse().find(image => image.status === 'PENDING')
      if (!image) {
        this.processing = false
        return
      }
      this.processing = true
      image.status = 'PROCESSING'

      const response = await removeBackground(image.image, this.config)

      const processedUrl = URL.createObjectURL(response)
      image.processedUrl = processedUrl
      image.status = 'FINISHED'
      const finished = this.images.some(image => image.status === 'PENDING')

      if (!finished) {
        this.processing = false
      }
      else {
        this.processLastImage()
      }
    },
  },

})