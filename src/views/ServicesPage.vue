<template>
  <div
    class="relative w-full pb-16 font-poppins antialiased text-white 
           flex flex-col items-center overflow-x-hidden"
  >
    <div class="mt-5 mb-4 group text-center reveal-header">
      <h2 class="text-3xl md:text-4xl font-black text-[#0d2b0f] tracking-wider uppercase transition-all duration-1000 group-[.show-header]:tracking-[0.2em]">
        Services
      </h2>
      <div class="h-1.5 w-1/1 bg-gradient-to-r from-yellow-500 to-green-700 mx-auto rounded-full mt-1 transition-all duration-300 group-hover:w-full"></div>
    </div>

    <div class="relative mt-3 mx-auto px-8 w-full max-w-7xl">
      <p class="text-gray-700 text-lg md:text-xl font-medium text-center mb-16 max-w-3xl mx-auto leading-relaxed">
        The <span class="font-black text-green-800">CSU Library</span> 
        proudly offers a wide range of academic and research services designed to support learning and innovation.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in libraryServices"
          :key="index"
          class="reveal-card group bg-white rounded-2xl overflow-hidden
                 shadow-md hover:shadow-2xl
                 transition-all duration-500
                 hover:-translate-y-3"
        >
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

          <div class="p-6 text-center"> 
            <h3 class="text-lg font-bold text-black mb-2 uppercase tracking-wide relative inline-block">
              {{ service.title }}
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

  <Transition name="fade">
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:opacity-90"
      style="background: #0d2b0f"
      aria-label="Scroll to top"
    >
      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 11l7-7 7 7" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 17l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

const showScrollTop = ref(false)
let observer: IntersectionObserver | null = null

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Reveal Animation Logic
  const observerOptions = {
    threshold: 0.15, // 15% sa card ang makita una mo-trigger
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-card')
      } else {
        // I-remove ang class kung mo-scroll up (para mo-fade out balik)
        entry.target.classList.remove('show-card')
      }
    })
  }, observerOptions)

  // Target tanang card elements
  const cards = document.querySelectorAll('.reveal-card')
  cards.forEach((card) => observer?.observe(card))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})

const libraryServices = [
  { title: 'Online Public Access Catalog (OPAC)', description: 'Electronic catalog for searching available library materials.', icon: BookOpen },
  { title: 'Audio Visual Room', description: 'Viewing and borrowing of digital interactive CDs and DVDs.', icon: PlayCircle },
  { title: 'eLibrary', description: 'Access to online journals, e-books, and digital resources.', icon: Monitor },
  { title: 'Automated Circulation', description: 'Computerized borrowing and returning of books.', icon: Share2 },
  { title: 'Laptop Area', description: 'Designated areas for plugging in and using laptops.', icon: Laptop },
  { title: 'Library Orientation', description: 'Overview of library objectives, facilities, and services.', icon: Info },
  { title: 'Library Instruction', description: 'Guides students in effectively using library resources.', icon: Users },
  { title: 'Book Display / New Arrival', description: 'Newly acquired books displayed for faculty and students.', icon: Book },
  { title: 'Bibliographic Assistance', description: 'Librarians prepare subject-based bibliographies upon request.', icon: List },
]
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* --- REVEAL ANIMATION STYLES --- */
.reveal-card {
  opacity: 0;
  transform: translateY(50px); /* Sugod sa ubos gamay */
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.reveal-card.show-card {
  opacity: 1;
  transform: translateY(0); /* Mobalik sa original position */
}

/* Optional: Staggered Delay (mag sunod-sunod silag gawas) */
@media (min-width: 640px) {
  .reveal-card:nth-child(3n+2) { transition-delay: 150ms; }
  .reveal-card:nth-child(3n+3) { transition-delay: 300ms; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>