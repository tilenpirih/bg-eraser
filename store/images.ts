import type { Config } from '@imgly/background-removal'
import { removeBackground } from '@imgly/background-removal'

export interface TImage {
  originalUrl: string
  processedUrl: string | null
  image: File
  status: 'PENDING' | 'PROCESSING' | 'FINISHED' | 'ERROR'
}
const config: Config = {
  debug: true,
  device: 'gpu',
}
export const useImageStore = defineStore('image', {
  state: () => ({
    images: [] as TImage[],
    processing: false,
  }),
  actions: {
    addImages(images: File[]) {
      for (const image of images) {
        this.images.unshift({
          originalUrl: URL.createObjectURL(image),
          processedUrl: null,
          image,
          status: 'PENDING',
        })
      }
      if (!this.processing){
        this.processLastImage()
      }
    },
    async processLastImage() {
      // find the last image that is still pending
      console.log('test')
      const image = this.images.slice().reverse().find(image => image.status === 'PENDING')
      if (!image) {
        this.processing = false
        return
      }
      this.processing = true
      image.status = 'PROCESSING'

      const response2 = await removeBackground(image.image, config)

      const processedUrl = URL.createObjectURL(response2)
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