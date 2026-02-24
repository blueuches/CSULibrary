<template>
  <section class=" py-12">
    <div class=" mx-auto px-6">
      <Carousel :items="images" />

      <div class="mt-20">
        <h2 class="text-3xl font-bold mb-8">
          📅 Monthly Events
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ...
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import Carousel from "@/components/Announcement/Carousel.vue"
import MonthlyEvent from "@/components/Announcement/MonthlyEvent.vue"


const events = [
  {
    title: "Research Workshop",
    date: "March 12, 2026",
    time: "2:00 PM",
    location: "Library Hall A"
  },
  {
    title: "Book Discussion",
    date: "March 18, 2026",
    time: "10:00 AM",
    location: "Room 204"
  }
]

/* If you want to use a reusable Ribbon component,
   import it like this:
   import Ribbon from "@/components/Ribbon.vue"
*/

const images = [
  "/imgs/a1.jpg",
  "/imgs/a2.jpg",
  "/imgs/a3.png"
]

defineProps<{
  label: string
}>()
</script>

<style scoped>
</style>