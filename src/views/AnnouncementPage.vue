<template>
  <section class="py-5">
    <div class="px-6">

      <!-- Carousel -->
      <!-- <Carousel :items="images" /> -->

      <!-- <Ribbon class="uppercase">
        Announcements
      </Ribbon> -->

      <card>

      </card>

      <!-- ================= MONTHLY EVENTS ================= -->
      <section class="mt-5 mb-10">
        <h2 class="text-3xl tracking-normal text-center font-extrabold text-[#1B5E20] uppercase">
          Monthly Events
        </h2>
        <div class="w-50 h-1 bg-yellow-500 mx-auto mt-1 mb-8 rounded-full"></div>

        <!-- ================= MONTH OVAL FILTER ================= -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">

          <button v-for="month in months" :key="month" @click="selectedEventMonth = month" :class="[
            'px-5 py-2 rounded-full border transition',
            selectedEventMonth === month
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-green-100'
          ]">
            {{ month }}
          </button>
        </div>

        <!-- ================= EVENTS GRID ================= -->
        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div v-for="event in filteredEvents" :key="event.id" class="bg-white rounded-xl shadow overflow-hidden">
            <img :src="event.image" class="w-full h-48 object-cover" />

            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                {{ event.title }}
              </h3>

              <p class="text-sm text-gray-500 mb-2">
                {{ event.date }} • {{ event.time }} • {{ event.location }}
              </p>

              <p class="text-gray-600 text-sm">
                {{ event.description }}
              </p>
            </div>
          </div>

          <p v-if="filteredEvents.length === 0" class="text-center col-span-3 text-gray-500" style="padding: 100px;">
            No events available.
          </p>

        </div>

        <div class="text-center mt-6">
          <router-link to="/top-borrowers" class="text-green-700 hover:underline text-center font-semibold">
           Go to Top Borrowers
          </router-link>
        </div>
      


      </section>

    </div>
  </section>

</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Carousel from "@/components/Announcement/Carousel.vue"
import Ribbon from "@/components/Ribbon.vue"

/* ================= CAROUSEL DATA ================= */

const images = [
  {
    src: "/imgs/a1.jpg",
    text: "Book Fair Month",
    span: "Explore a wide selection of books."
  },
  {
    src: "/imgs/a6.jpg",
    text: "Facilities Offer",
    span: "Try our available facilities."
  },
  {
    src: "/imgs/a3.png",
    text: "Other Announcement & Updates",
    span: "Stay informed about updates."
  }
]

/* ================= FILTER DATA ================= */

const months = [
  "All",
  "Jan", "Feb", "March", "April",
  "May", "June", "July", "Aug",
  "Sep", "Oct", "Nov", "Dec"
]

const selectedEventMonth = ref("All")

/* ================= EVENTS DATA ================= */

const events = [
  {
    id: 1,
    title: "Book Fair 2026",
    month: "March",
    year: "2026",
    date: "March 18, 2026",
    time: "10:00 AM",
    location: "Main Hall",
    description: "Explore a diverse collection of books.",
    image: "/imgs/a8.jpg"
  },
  {
    id: 2,
    title: "Reading Workshop",
    month: "Jan",
    year: "2026",
    date: "January 12, 2026",
    time: "1:00 PM",
    location: "Conference Room",
    description: "Improve reading skills.",
    image: "/imgs/a9.jpg"
  },
  {
    id: 3,
    title: "Science Fair 2027",
    month: "March",
    year: "2027",
    date: "March 10, 2027",
    time: "9:00 AM",
    location: "Auditorium",
    description: "Student science project showcase.",
    image: "/imgs/a6.jpg"
  },
  {
    id: 4,
    title: "Science Fair 2027",
    month: "June",
    year: "2027",
    date: "March 10, 2027",
    time: "9:00 AM",
    location: "Auditorium",
    description: "Student science project showcase.",
    image: "/imgs/a11.jpg"
  },
  {
    id: 5,
    title: "Reading Workshop",
    month: "Aug",
    year: "2026",
    date: "January 12, 2026",
    time: "1:00 PM",
    location: "Conference Room",
    description: "Improve reading skills.",
    image: "/imgs/a13.jpg"
  },
]

/* ================= FILTER LOGIC ================= */

const filteredEvents = computed(() => {
  return events.filter(event =>
    (selectedEventMonth.value === "All" || event.month === selectedEventMonth.value)
  )
})
</script>

<style scoped></style>