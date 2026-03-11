<template>
  <div
    class="relative w-full pb-20 font-poppins antialiased text-white flex flex-col items-center overflow-x-hidden bg-[#f8fafc]"
  >
    <div
      class="absolute top-0 -left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
    ></div>
    <div
      class="absolute top-40 -right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
    ></div>
    <div
      class="absolute bottom-20 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
    ></div>

    <!-- HEADER: same style as Upcoming Events -->
    <div class="relative z-10 mt-16 mb-6 text-center reveal-header">
      <div class="flex items-center justify-center gap-3 mb-2">
        <span class="block w-10 h-[2px] bg-yellow-500 rounded-full"></span>
        <span class="text-[10px] font-extrabold tracking-[0.32em] text-[#1a2e1a] uppercase">
          What we offer
        </span>
      </div>
      <h1
        class="services text-5xl md:text-7xl font-black text-[#0d2b0f] text-center tracking-tight uppercase leading-none"
      >
        Services
      </h1>
    </div>

    <div class="relative z-10 mt-1 mx-auto px-6 w-full max-w-7xl">
      <div class="relative mb-20 text-center">
        <div
          class="inline-block p-8 md:p-10 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 shadow-xl max-w-4xl mx-auto"
        >
          <p class="text-gray-700 text-lg md:text-xl font-light leading-relaxed italic">
            "The
            <span class="font-black text-green-900 not-italic border-b-4 border-yellow-500/50"
              >CSU Library</span
            >
            is committed to providing high-quality academic resources, fostering an environment of
            <span class="text-[#0d2b0f] font-bold not-italic">innovation and discovery</span>."
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <div
          v-for="(service, index) in libraryServices"
          :key="index"
          class="reveal-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
        >
          <div
            class="h-44 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1b5e20]/10 to-[#2e7d32]/20"
            ></div>

            <div
              class="relative z-10 p-5 rounded-2xl bg-[#1b5e20]/10 backdrop-blur-sm border border-[#1b5e20]/20 group-hover:bg-[#1b5e20] group-hover:rotate-6 transition-all duration-500"
            >
              <component
                :is="service.icon"
                class="w-10 h-10 text-[#1b5e20] group-hover:text-white transition-colors duration-500"
              />
            </div>
          </div>

          <div class="p-8 text-center">
            <h3
              class="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider relative inline-block"
            >
              {{ service.title }}
              <span
                class="block h-1 w-0 group-hover:w-full rounded-full bg-gradient-to-r from-yellow-500 to-green-700 mt-1 transition-all duration-500"
              ></span>
            </h3>

            <p class="text-gray-600 text-sm md:text-base leading-relaxed">
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
      class="fixed bottom-8 right-8 z-50 rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-900 active:scale-95"
      style="background: #0d2b0f"
      aria-label="Scroll to top"
    >
      <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 11l7-7 7 7M5 17l7-7 7 7"
        />
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

  const observerOptions = { threshold: 0.1 }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-card')
      } else {
        entry.target.classList.remove('show-card')
      }
    });
  }, observerOptions)

  document.querySelectorAll('.reveal-card').forEach((card) => observer?.observe(card))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})

const libraryServices = [
  {
    title: 'Online Public Access Catalog (OPAC)',
    description: 'Electronic catalog for searching available library materials with ease.',
    icon: BookOpen,
  },
  {
    title: 'Audio Visual Room',
    description: 'Experience digital learning through our collection of interactive CDs and DVDs.',
    icon: PlayCircle,
  },
  {
    title: 'eLibrary',
    description:
      'Instant access to premium online journals, e-books, and global digital resources.',
    icon: Monitor,
  },
  {
    title: 'Automated Circulation',
    description: 'Efficient and computerized system for borrowing and returning library materials.',
    icon: Share2,
  },
  {
    title: 'Laptop Area',
    description: 'Comfortable spaces equipped with power outlets for your personal devices.',
    icon: Laptop,
  },
  {
    title: 'Library Orientation',
    description: 'A comprehensive guide to our facilities, rules, and world-class services.',
    icon: Info,
  },
  {
    title: 'Library Instruction',
    description: 'Empowering students with the skills to navigate and use resources effectively.',
    icon: Users,
  },
  {
    title: 'Book Display / New Arrival',
    description: 'Be the first to explore our latest acquisitions and featured collections.',
    icon: Book,
  },
  {
    title: 'Bibliographic Assistance',
    description: 'Expert librarians help you curate subject-based bibliographies for research.',
    icon: List,
  },
]
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* --- REVEAL ANIMATION --- */
.reveal-card {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

.reveal-card.show-card {
  opacity: 1;
  transform: translateY(0);
}

/* --- BACKGROUND BLOBS --- */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 10s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* --- TRANSITIONS --- */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.services {
  margin: 10px 0 0;
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  line-height: 1.02;
}
</style>
