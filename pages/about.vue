<script setup lang="ts">

</script>

<template>
  <v-container class=" d-flex align-center text-center" style="max-width: 750px; min-height: 30vh">
    <div>
      This tool was born out of frustration when I needed to remove the background from an image—a task that should be simple. However, every tool I found online had paid limitations or required a subscription for full-resolution images. These were some of the top results when I searched "remove background from image" on Google:
      <br>
      <a href="https://www.remove.bg/" target="_blank">https://www.remove.bg/</a><br>
      <a href="https://www.adobe.com/express/feature/image/remove-background" target="_blank">https://www.adobe.com/express/feature/image/remove-background</a><br>
      <a href="https://www.photoroom.com/tools/background-remover" target="_blank">https://www.photoroom.com/tools/background-remover</a><br>
      <a href="https://www.pixelcut.ai/t/background-remover" target="_blank">https://www.pixelcut.ai/t/background-remover</a><br>
      <a href="https://www.slazzer.com/upload" target="_blank">https://www.slazzer.com/upload</a><br>
      <a href="https://www.iloveimg.com/remove-background" target="_blank">https://www.iloveimg.com/remove-background</a><br>
      <div class="mt-3">
        That's why I decided to create this tool, which runs entirely on the client side, allowing you to remove backgrounds without any restrictions or hidden costs.
      </div>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
a {
  color: rgba(var(--v-theme-primary), 1);
}
</style>