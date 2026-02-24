<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps<{
  items: string[]
}>()

const currentIndex = ref(0)
let interval: number

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.items.length) % props.items.length
}

onMounted(() => {
  interval = window.setInterval(next, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-2xl">

    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in items"
        :key="index"
        class="min-w-full h-50"
      >
        <img
          :src="image"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Prev -->
    <button
      @click="prev"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow"
    >
      ◀
    </button>

    <!-- Next -->
    <button
      @click="next"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow"
    >
      ▶
    </button>

  </div>
</template>