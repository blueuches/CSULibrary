<template>
  <div class="w-full !m-0 !p-0">
    <!-- CAROUSEL -->
    <div class="relative w-full overflow-hidden">
      <!-- Slides Wrapper -->
      <div
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
      >
        <div v-for="(image, index) in images" :key="index" class="min-w-[100%]">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full object-cover"
            :style="{ height: imageHeight }"
          />
        </div>
      </div>

      <!-- Prev Button -->
      <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#0d2b0f] transition p-2"
      >
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Next Button -->
      <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#0d2b0f] transition p-2"
      >
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, i) in images"
          :key="i"
          @click="currentIndex = i"
          class="w-2 h-2 rounded-full transition-all"
          :class="currentIndex === i ? 'bg-[#fbc02d] w-4' : 'bg-[#fbc02d]/50'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import photo1 from '@/assets/images/img.jpg'
import photo2 from '@/assets/images/img0.jpg'
import photo3 from '@/assets/images/img1.jpg'
import photo4 from '@/assets/images/img2.jpg'
import photo5 from '@/assets/images/img3.jpg'

const images = [
  { src: photo1, alt: 'Photo 1' },
  { src: photo2, alt: 'Photo 2' },
  { src: photo3, alt: 'Photo 3' },
  { src: photo4, alt: 'Photo 4' },
  { src: photo5, alt: 'Photo 5' },
]

const imageHeight = '600px'

const currentIndex = ref(0)
const slideWidth = 100

let autoplayInterval: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

onMounted(() => {
  autoplayInterval = setInterval(next, 3000)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
})
</script>

<style scoped></style>
