<template>
  <div
    class="relative w-full pb-16 font-poppins antialiased text-white 
           flex flex-col items-center overflow-x-hidden"
  >
      <Ribbon class = "mt-5">SERVICES</Ribbon>

    <div class="relative mt-5 mx-auto px-8 w-full max-w-7xl">

      <!-- DESCRIPTION -->
      <p
        class="text-black text-lg md:text-xl font-semibold text-center mb-16 max-w-3xl mx-auto"
      >
        The
        <span class="font-black text-green-800 mx-1">
          CSU Library
        </span>
        proudly offers a wide range of academic and research services
        designed to support learning and innovation.
      </p>

      <!-- SERVICES GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in libraryServices"
          :key="index"
          class="group bg-white rounded-2xl overflow-hidden
                 shadow-md hover:shadow-2xl
                 transition-all duration-500
                 hover:-translate-y-3"
        >
          <!-- TOP ICON AREA -->
          <div
            class="h-40 flex items-center justify-center
                   bg-[#0d2b0f]" 
          >
            <component
              :is="service.icon"
              class="w-20 h-20 text-white
                     transition-transform duration-500
                     group-hover:scale-110"
            />
          </div>

          <!-- CONTENT -->
          <div class="p-6 text-center"> 
            <h3 class="text-lg font-bold text-black mb-2 uppercase tracking-wide relative inline-block">
              {{ service.title }}
              <!-- Gradient underline auto-adjusts to title width -->
              <span
                class="block h-1 rounded-full bg-gradient-to-r from-yellow-500 to-green-700 mt-1"
              ></span>
            </h3>

            <p class="text-black text-m leading-relaxed mb-4">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BookOpen,
  Monitor,
  Laptop,
  PlayCircle,
  Share2,
  Info,
  Book,
  List,
  Users,
} from 'lucide-vue-next'

import Ribbon from '@/components/Ribbon.vue' 

const libraryServices = [
  {
    title: 'Online Public Access Catalog (OPAC)',
    description:
      'Electronic catalog for searching available library materials.',
    icon: BookOpen,
  },
  {
    title: 'Audio Visual Room',
    description:
      'Viewing and borrowing of digital interactive CDs and DVDs.',
    icon: PlayCircle,
  },
  {
    title: 'eLibrary',
    description:
      'Access to online journals, e-books, and digital resources.',
    icon: Monitor,
  },
  {
    title: 'Automated Circulation',
    description:
      'Computerized borrowing and returning of books.',
    icon: Share2,
  },
  {
    title: 'Laptop Area',
    description:
      'Designated areas for plugging in and using laptops.',
    icon: Laptop,
  },
  {
    title: 'Library Orientation',
    description:
      'Overview of library objectives, facilities, and services.',
    icon: Info,
  },
  {
    title: 'Library Instruction',
    description:
      'Guides students in effectively using library resources.',
    icon: Users,
  },
  {
    title: 'Book Display / New Arrival',
    description:
      'Newly acquired books displayed for faculty and students.',
    icon: Book,
  },
  {
    title: 'Bibliographic Assistance',
    description:
      'Librarians prepare subject-based bibliographies upon request.',
    icon: List,
  },
]
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>