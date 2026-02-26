<template>
  <section class="py-12">
    <div class="mx-auto px-6">
      <Carousel :items="images" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Carousel from "@/components/Announcement/Carousel.vue"

const images = [
  "/imgs/a1.jpg",
  "/imgs/a2.jpg",
  "/imgs/a3.png"
]

defineProps<{
  label: string
}>()
</script>
