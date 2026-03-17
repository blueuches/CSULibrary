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
                ? 'bg-[#0d2b0f] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
            :style="{ '--p-i': index }"
          >
            {{ month }}
          </button>
        </nav>
      </div>

      <div v-if="pinnedEvents.length > 0" class="mb-15 relative event-carousel group/carousel">
        <div class="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
          <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentPinnedIndex * 100}%)` }"
          >
            <div
              v-for="event in pinnedEvents"
              :key="'pinned-' + event.id"
              class="min-w-full group relative bg-[#0d2b0f] flex flex-col md:flex-row h-auto md:h-[350px]"
            >
              <div class="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  :src="event.image"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div class="md:w-1/2 p-10 flex flex-col justify-center space-y-4">
                <span class="bg-yellow-400 text-green-900 self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                  Pinned Highlight
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
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="nextPinned" class="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/carousel:opacity-100 transform translate-x-4 group-hover/carousel:translate-x-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div v-if="pinnedEvents.length > 1" class="absolute bottom-6 right-10 flex gap-2">
            <button
              v-for="(_, i) in pinnedEvents"
              :key="i"
              @click="goToPinned(i)"
              :class="['h-1.5 rounded-full transition-all duration-300', currentPinnedIndex === i ? 'w-8 bg-yellow-400' : 'w-2 bg-white/30']"
            ></button>
          </div>
        </div>
      </div>

      <div>
        <transition-group name="shuffle" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(event, index) in filteredEvents"
            :key="event.id"
            class="group cursor-pointer event-card"
            :style="{ '--i': index }"
          >
            <div class="relative aspect-[16/10] overflow-hidden rounded-3xl mb-5 bg-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500">
              <img :src="event.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute top-4 right-4">
                <div class="backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border border-white/20" :style="{ background: '#0d2b0f', color: '#fff' }">
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
              <h3 class="text-xl font-extrabold text-gray-900 transition-colors group-hover:text-green-800">
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
        <p class="text-gray-400 font-medium italic text-lg">No events scheduled for {{ selectedEventMonth }}.</p>
      </div>

      <div class="flex justify-center mt-20">
        <router-link to="/top-borrowers" class="inline-block bg-[#0d2b0f] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#1b5e20] hover:scale-105 transition transform duration-300 animate-pop-in cta-btn">
          View Top Borrowers
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

const events = ref<any[]>([])
const selectedEventMonth = ref('All')
const showScrollTop = ref(false)
const currentPinnedIndex = ref(0)
let carouselTimer: any = null

const months = [
  'All', 'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
]

const fetchEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('type', 'announcement')
      .order('start_date', { ascending: true })

    if (error) throw error

    events.value = (data || []).map((event, index) => {
      const date = new Date(event.start_date)
      return {
        ...event,
        image: event.images,
        // KINI ANG IMPORTANTE: 'long' para "January", "February", etc.
        month: date.toLocaleString('en-US', { month: 'long' }), 
        year: date.getFullYear().toString(),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pinned: index < 3 
      }
    })
    startCarousel()
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// CAROUSEL DATA (Fixed highlights)
const pinnedEvents = computed(() => events.value.filter(e => e.pinned))

// GRID DATA (Sorted by date ONLY, no "pinned" prioritization)
const filteredEvents = computed(() => {
  return events.value
    .filter(e => selectedEventMonth.value === 'All' || e.month === selectedEventMonth.value)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
})

// CAROUSEL CONTROLS
const nextPinned = () => {
  if (pinnedEvents.value.length === 0) return
  currentPinnedIndex.value = (currentPinnedIndex.value + 1) % pinnedEvents.value.length
}

const prevPinned = () => {
  if (pinnedEvents.value.length === 0) return
  currentPinnedIndex.value = (currentPinnedIndex.value - 1 + pinnedEvents.value.length) % pinnedEvents.value.length
}

const goToPinned = (index: number) => {
  currentPinnedIndex.value = index
  startCarousel() // reset timer on manual click
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

const handleScroll = () => { showScrollTop.value = window.scrollY > 300 }

onMounted(() => {
  fetchEvents()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopCarousel()
})
</script>

<style scoped>
/* Base Fonts & Transitions */
.section {
  font-family: 'Poppins', sans-serif;
}

.section-title {
  width: min(100%, 1500px);
  margin: 8px auto 14px;
  text-align: center;
}
.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.kicker-text {
  font-weight: 800;
  letter-spacing: 6px;
  font-size: 0.7rem;
  color: #0d2b0f;
  text-transform: uppercase;
}
.section-headline {
  margin: 10px 0 1%;
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  color: #0d2b0f;
  text-transform: uppercase;
}
.section {
  font-family: 'Poppins', sans-serif;
}
.section-title {
  width: min(100%, 1500px);
  margin: 8px auto 14px;
  text-align: center;
}
.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.kicker-text {
  font-weight: 800;
  letter-spacing: 6px;
  font-size: 0.7rem;
  color: #0d2b0f;
  text-transform: uppercase;
}
.section-headline {
  margin: 10px 0 1%;
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  color: #0d2b0f;
  text-transform: uppercase;
}

/* Animations */
@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.title-container {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeSlideUp 0.9s ease forwards;
}
.title-headline {
  opacity: 0;
  transform: translateY(25px);
  animation: fadeSlideUp 1s ease forwards;
  animation-delay: 0.4s;
}
.event-carousel {
  opacity: 0;
  transform: translateY(25px);
  animation: fadeSlideUp 1s ease forwards;
  animation-delay: 0.4s;
}

.kicker-line {
  display: inline-block;
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #dfb753, #fbc02d);
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left;
  animation: lineReveal 0.9s ease forwards;
  animation-delay: 0.3s;
}
@keyframes lineReveal {
  to {
    transform: scaleX(1);
  }
}

.pill-entrance {
  opacity: 0;
  transform: translateY(10px);
  animation: pillPop 0.5s ease-out calc(var(--p-i) * 0.05s + 0.4s) forwards;
}
@keyframes pillPop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.event-card {
  opacity: 0;
  transform: translateY(30px);
  animation: cardIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.1s + 0.5s) forwards;
}
@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Grid Shuffle */
.shuffle-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.shuffle-enter-active {
  transition: opacity 0.4s ease;
}
.shuffle-enter-from {
  opacity: 0;
}
.shuffle-leave-active {
  display: none;
  position: absolute;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-events-icon {
  animation: floatBounce 1.2s ease-in-out infinite alternate;
}
@keyframes floatBounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>