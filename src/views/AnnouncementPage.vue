<template>
  <section class="py-5">
  <div class="px-6">
    <!-- <Ribbon class="pb-6">
      Events & Announcement
    </Ribbon> -->

    <Carousel :items="images" />


      <section class="mt-16">
        <h2 class="text-3xl tracking-normal text-center font-extrabold text-[#1B5E20] uppercase"> Monthly Events</h2>
        <div class="w-50 h-1 bg-yellow-500 mx-auto mt-1 mb-8 rounded-full"></div>

        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Card 1 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a8.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a9.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a10.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a11.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a12.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <img src="/imgs/a13.jpg" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">
                Book Fair 2026
              </h3>
              <p class="text-sm text-gray-500 mb-2">
                March 18, 2026 • 10:00 AM • Main Hall
              </p>
              <p class="text-gray-600 text-sm">
                Explore a diverse collection of books and enjoy exclusive
                discounts from participating publishers.
              </p>
            </div>
          </div>

        </div>
      </section>


      <h2 class="mt-10 text-3xl tracking-normal text-center font-extrabold text-[#1B5E20] uppercase"> Top Borrowers</h2>
        <div class="w-50 h-1 bg-yellow-500 mx-auto mt-1 mb-8 rounded-full"></div>

      <!-- Top Borrowers section -->
      <div class="flex flex-col md:flex-row gap-4 justify-center mb-8">

        <!-- Month Filter -->
        <select v-model="selectedMonth"
          class="px-5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          <option>All</option>
          <option>February 2026</option>
          <option>March 2026</option>
          <option>April 2026</option>
        </select>

        <!-- Department Filter -->
        <select v-model="selectedDepartment"
          class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          <option>All</option>
          <option>CCIS</option>
          <option>CEGS</option>
          <option>CHASS</option>

        </select>

      </div>



  </div>
</section>
</template>

<script setup lang="ts">
import Carousel from "@/components/Announcement/Carousel.vue"
// import Ribbon from "@/components/Ribbon.vue"

const images = [
  {
     src: "/imgs/a1.jpg",
     text: "Book Fair Month",
     span: "Explore a wide selection of books from different genres, authors, and publishers. The Book Fair offers an opportunity to discover new readings, access exclusive discounts, and connect with fellow book lovers in a vibrant learning environment."
  },
  {
     src: "/imgs/a6.jpg",
     text: "Facilities Offer",
     span: "Try our available facilities designed to support learning, research, and collaboration. This offer provides access to modern equipment, study spaces, and essential resources to enhance productivity and academic development."
  },
  {
     src: "/imgs/a3.png",
     text: "Other Announcement & Updates",
     span: "Stay informed about additional events, special programs, top borrowers, and important updates happening across the CSU Library."
  }
  
]

import { ref, computed } from "vue"

const selectedMonth = ref("March 2026")
const selectedDepartment = ref("All")

const borrowers = [
  { name: "STudent 1", books: 25, month: "March 2026", department: "Engineering" },
  { name: "Student 2", books: 21, month: "March 2026", department: "Business" },
  { name: "Student 3", books: 18, month: "February 2026", department: "Engineering" }
]

const filteredBorrowers = computed(() => {
  return borrowers.filter(b =>
    (selectedMonth.value === "All" || b.month === selectedMonth.value) &&
    (selectedDepartment.value === "All" || b.department === selectedDepartment.value)
  )
})

</script>

<style scoped>
</style>