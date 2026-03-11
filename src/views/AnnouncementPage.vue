<template>
  <section class="py-12 bg-white min-h-screen overflow-hidden">
    <div class="max-[100%] mx-auto px-8">
      
      <div class="page-inner">
        <div class="section-title section-title-center">
          <span class="section-kicker title-container">
            <span class="kicker-line"></span>
            <span class="kicker-text">WHAT'S HAPPENING AT CSU LIBRARY</span>
          </span>
          <h1 class="section-headline title-headline"><span>UPCOMING </span>EVENTS</h1>
        </div>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <nav class="flex items-center gap-1 overflow-x-auto mx-auto pb-2 scrollbar-hide nav-reveal">
          <button
            v-for="(month, index) in months"
            :key="month"
            @click="selectedEventMonth = month"
            :class="[
              'pill-entrance whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedEventMonth === month
                ? 'bg-green-900 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
            :style="{ '--p-i': index }"
          >
            {{ month }}
          </button>
        </nav>
      </div>

      <div v-if="pinnedEvents.length > 0" class="mb-15 relative event-carousel">
        <div class="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div 
            class="flex transition-transform duration-700 ease-in-out" 
            :style="{ transform: `translateX(-${currentPinnedIndex * 100}%)` }"
          >
            <div 
              v-for="event in pinnedEvents" 
              :key="'pinned-' + event.id"
              class="min-w-full group relative bg-green-900 flex flex-col md:flex-row h-auto md:h-[350px]"
            >
              <div class="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img :src="event.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div class="md:w-1/2 p-10 flex flex-col justify-center space-y-4">
                <span class="bg-yellow-400 text-green-900 self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                  📌 Pinned Highlight
                </span>
                <h3 class="text-3xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">
                  {{ event.title }}
                </h3>
                <p class="text-green-100/70 text-sm leading-relaxed line-clamp-3">
                  {{ event.description }}
                </p>
                <div class="pt-4 flex items-center gap-3 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                  <span>{{ event.location }}</span>
                  <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span class="text-white/60">{{ event.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="pinnedEvents.length > 1" class="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <button @click="prevPinned" class="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 transform -translate-x-4 group-hover/carousel:translate-x-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button @click="nextPinned" class="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 transform translate-x-4 group-hover/carousel:translate-x-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div v-if="pinnedEvents.length > 1" class="absolute bottom-6 right-10 flex gap-2">
            <button 
              v-for="(_, i) in pinnedEvents" 
              :key="i" 
              @click="currentPinnedIndex = i"
              :class="['h-1.5 rounded-full transition-all duration-300', currentPinnedIndex === i ? 'w-8 bg-yellow-400' : 'w-2 bg-white/30']"
            ></button>
          </div>
        </div>
      </div>

      <div>
        <transition-group
          name="shuffle"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="(event, index) in filteredEvents"
            :key="event.id"
            class="group cursor-pointer event-card"
            :style="{ '--i': index }"
          >
            <div class="relative aspect-[16/10] overflow-hidden rounded-3xl mb-5 bg-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500">
              <div v-if="event.pinned" class="absolute top-4 left-4 z-10 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-[9px] font-black tracking-tighter shadow-lg">
                📌 Pinned
              </div>
              
              <img :src="event.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <div class="absolute top-4 right-4">
                <div class="backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border border-white/20"
                     :style="{ background: event.color, color: '#fff' }">
                  {{ event.month }} '{{ event.year.slice(-2) }}
                </div>
              </div>
            </div>

            <div class="space-y-3 transform transition-transform duration-500 group-hover:translate-x-1">
              <div class="flex items-center gap-2 text-yellow-600 text-[10px] font-black uppercase tracking-widest">
                <span>{{ event.location }}</span>
                <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span class="text-gray-400 font-bold">{{ event.time }}</span>
              </div>
              <h3 class="event-card-title text-xl font-extrabold text-gray-900 transition-colors group-hover:text-green-800">
                {{ event.title }}
              </h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {{ event.description }}
              </p>
            </div>
          </div>
        </transition-group>
      </div>

      <div v-if="filteredEvents.length === 0" class="text-center py-32 animate-fade-in">
        <div class="flex justify-center mb-4 text-gray-300 text-6xl no-events-icon">
          <i class="fas fa-book-open"></i>
        </div>
        <p class="text-gray-400 font-medium italic text-lg">No events scheduled for {{ selectedEventMonth }}.</p>
      </div>

      <div class="flex justify-center mt-20">
        <router-link
          to="/top-borrowers"
          class="inline-block bg-green-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 hover:scale-105 transition transform duration-300 animate-pop-in cta-btn"
        >
          View Top Borrowers
        </router-link>
      </div>
    </div>

    <Transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-110"
        style="background: #0d2b0f"
      >
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 11l7-7 7 7" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 17l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Assets
import announcement_pic from '@/assets/images/announcementpage/a1.jpg'
import announcement_pic2 from '@/assets/images/announcementpage/a14.jpg'
import announcement_pic3 from '@/assets/images/announcementpage/a15.jpg'
import announcement_pic4 from '@/assets/images/announcementpage/a16.jpg'
import announcement_pic5 from '@/assets/images/announcementpage/a17.jpg'

const months = ['All', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const selectedEventMonth = ref('All')
const showScrollTop = ref(false)
const currentPinnedIndex = ref(0)
let carouselTimer: any = null

const events = [
  { id: 1, title: 'Book Fair 2026', month: 'March', year: '2026', time: '10:00 AM', location: 'Main Hall', description: 'Explore a diverse collection of books and meet local authors.', image: announcement_pic, color: '#0d2b0f', pinned: false },
  { id: 2, title: 'Reading Workshop', month: 'Jan', year: '2026', time: '1:00 PM', location: 'Conference Room', description: 'Improve reading speed and comprehension with our expert-led session.', image: announcement_pic2, color: '#0d2b0f', pinned: false },
  { id: 3, title: 'Storytelling Session', month: 'March', year: '2027', time: '9:00 AM', location: 'Storytelling Room', description: 'Interactive storytelling for kids with crafts and fun learning activities.', image: announcement_pic3, color: '#0d2b0f', pinned: false },
  { id: 4, title: 'Art Exhibition', month: 'June', year: '2027', time: '9:00 AM', location: 'Exhibit Area', description: 'A celebration of local talent and contemporary visual arts.', image: announcement_pic4, color: '#0d2b0f', pinned: true },
  { id: 5, title: 'Art & Literature Exhibition', month: 'Aug', year: '2026', time: '1:00 PM', location: 'Library Museum', description: 'Display of student artwork inspired by literary works, open for public viewing.', image: announcement_pic5, color: '#0d2b0f', pinned: true },
]

// LOGIC: Pinned Events Carousel
const pinnedEvents = computed(() => {
  return events.filter(e => e.pinned && (selectedEventMonth.value === 'All' || e.month === selectedEventMonth.value))
})

const nextPinned = () => {
  currentPinnedIndex.value = (currentPinnedIndex.value + 1) % pinnedEvents.value.length
}
const prevPinned = () => {
  currentPinnedIndex.value = (currentPinnedIndex.value - 1 + pinnedEvents.value.length) % pinnedEvents.value.length
}

const startCarousel = () => {
  stopCarousel()
  if (pinnedEvents.value.length > 1) {
    carouselTimer = setInterval(nextPinned, 5000)
  }
}
const stopCarousel = () => {
  if (carouselTimer) clearInterval(carouselTimer)
}

// LOGIC: Main Grid (Pinned stay at top)
const filteredEvents = computed(() => {
  return events
    .filter(e => selectedEventMonth.value === 'All' || e.month === selectedEventMonth.value)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
})

// Lifecycle & Utilities
function handleScroll() { showScrollTop.value = window.scrollY > 300 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  startCarousel()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopCarousel()
})
</script>

<style scoped>
.section { font-family: 'Poppins', sans-serif; }
.section-title { width: min(100%, 1500px); margin: 8px auto 14px; text-align: center; }
.section-kicker { display: inline-flex; align-items: center; gap: 14px; }
.kicker-text { font-weight: 800; letter-spacing: 6px; font-size: 0.7rem; color: #0d2b0f; text-transform: uppercase; }
.section-headline { margin: 10px 0 1%; font-weight: 900; font-size: clamp(1.6rem, 5vw, 3.3rem); color: #0d2b0f; text-transform: uppercase; }

/* Animations */
@keyframes fadeSlideUp { to { opacity: 1; transform: translateY(0); } }
.title-container { opacity: 0; transform: translateY(30px); animation: fadeSlideUp 0.9s ease forwards; }
.title-headline { opacity: 0; transform: translateY(25px); animation: fadeSlideUp 1s ease forwards; animation-delay: 0.4s; }
.event-carousel { opacity: 0; transform: translateY(25px); animation: fadeSlideUp 1s ease forwards; animation-delay: 0.4s; }

.kicker-line { 
  display: inline-block; height: 3px; width: 60px; 
  background: linear-gradient(90deg, #dfb753, #fbc02d); 
  border-radius: 999px; transform: scaleX(0); transform-origin: left; 
  animation: lineReveal 0.9s ease forwards; animation-delay: 0.3s; 
}
@keyframes lineReveal { to { transform: scaleX(1); } }

.pill-entrance { 
  opacity: 0; transform: translateY(10px); 
  animation: pillPop 0.5s ease-out calc(var(--p-i) * 0.05s + 0.4s) forwards; 
}
@keyframes pillPop { to { opacity: 1; transform: translateY(0); } }

.event-card { 
  opacity: 0; transform: translateY(30px); 
  animation: cardIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.1s + 0.5s) forwards; 
}
@keyframes cardIn { to { opacity: 1; transform: translateY(0); } }

/* Grid Shuffle */
.shuffle-move { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.shuffle-enter-active { transition: opacity 0.4s ease; }
.shuffle-enter-from { opacity: 0; }
.shuffle-leave-active { display: none; position: absolute; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.no-events-icon { animation: floatBounce 1.2s ease-in-out infinite alternate; }
@keyframes floatBounce { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>