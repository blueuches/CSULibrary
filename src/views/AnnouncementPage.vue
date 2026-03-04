<template>
  <section class="py-12 bg-white min-h-screen overflow-hidden">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div class="header-reveal">
          <h2 class="text-4xl font-light text-gray-900 tracking-tight">
            Upcoming <span class="font-bold text-green-900">Events</span>
          </h2>
          <div class="w-16 h-1 bg-yellow-500 mt-2 rounded-full line-expand"></div>
          <p class="text-gray-500 mt-2 sub-header-reveal">Explore what's happening this year.</p>
        </div>

        <nav class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide nav-reveal">
          <button
            v-for="(month, index) in months"
            :key="month"
            @click="selectedEventMonth = month"
            :style="{ '--p-i': index }"
            :class="[
              'pill-entrance whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedEventMonth === month
                ? 'bg-green-900 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ month }}
          </button>
        </nav>
      </div>

      <transition-group
        name="shuffle"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
      >
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="group cursor-pointer event-card"
          :style="{ '--i': index }"
        >
          <div class="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
            <img 
              :src="event.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div class="absolute top-3 right-3">
              <div class="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-gray-900 shadow-sm">
                {{ event.month }} '{{ event.year.slice(-2) }}
              </div>
            </div>
          </div>

          <div class="space-y-2 transform transition-transform duration-500 group-hover:translate-x-1">
            <div class="flex items-center gap-2 text-yellow-600 text-xs font-bold uppercase tracking-wider">
              <span>{{ event.location }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span class="text-gray-500 font-medium capitalize">{{ event.time }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
              {{ event.title }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {{ event.description }}
            </p>
          </div>
        </div>
      </transition-group>

      <div v-if="filteredEvents.length === 0" class="text-center py-32 animate-fade-in">
        <!-- Font Awesome Icon with bounce -->
        <div class="flex justify-center mb-4 text-gray-300 text-6xl no-events-icon">
          <i class="fas fa-book-open"></i>
        </div>

        <p class="text-gray-400 font-medium italic text-lg">
          No events scheduled for {{ selectedEventMonth }}.
        </p>
      </div>


      <div class="flex justify-center mt-12">
        <router-link to="/top-borrowers"
          class="inline-block bg-green-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition transform duration-300 animate-pop-in">
          Go to Top Borrowers
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import announcement_pic from "@/assets/images/announcementpage/a1.jpg"
import announcement_pic2 from "@/assets/images/announcementpage/a14.jpg"
import announcement_pic3 from "@/assets/images/announcementpage/a15.jpg"
import announcement_pic4 from "@/assets/images/announcementpage/a16.jpg"
import announcement_pic5 from "@/assets/images/announcementpage/a17.jpg"




const months = ["All", "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const selectedEventMonth = ref("All")

const events = [
  { id: 1, title: "Book Fair 2026", month: "March", year: "2026", time: "10:00 AM", location: "Main Hall", description: "Explore a diverse collection of books and meet local authors.", image: announcement_pic },
  { id: 2, title: "Reading Workshop", month: "Jan", year: "2026", time: "1:00 PM", location: "Conference Room", description: "Improve reading speed and comprehension with our expert-led session.", image: announcement_pic2 },
  { id: 3, title: "Storytelling Session", month: "March", year: "2027", time: "9:00 AM", location: "Storytelling Room", description: "Interactive storytelling for kids with crafts and fun learning activities.", image: announcement_pic3 },
  { id: 4, title: "Art Exhibition", month: "June", year: "2027", time: "9:00 AM", location: "Auditorium", description: "A celebration of local talent and contemporary visual arts.", image: announcement_pic4 },
  { id: 5, title: "Art & Literature Exhibition", month: "Aug", year: "2026", time: "1:00 PM", location: "Library Garden", description: "Display of student artwork inspired by literary works, open for public viewing.", image: announcement_pic5 }
]

const filteredEvents = computed(() => {
  return events.filter(e => selectedEventMonth.value === "All" || e.month === selectedEventMonth.value)
})
</script>

<style scoped>
/*  INITIAL PAGE LOAD ANIMATIONS */
.header-reveal {
  animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.line-expand {
  width: 0;
  animation: expandWidth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

.sub-header-reveal {
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.4s forwards;
}

.pill-entrance {
  opacity: 0;
  transform: translateY(10px);
  animation: pillPop 0.5s ease-out calc(var(--p-i) * 0.05s + 0.4s) forwards;
}

.event-card {
  opacity: 0;
  transform: translateY(30px);
  animation: cardIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.1s + 0.5s) forwards;
}


.shuffle-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.shuffle-enter-active {
  transition: opacity 0.3s ease;
}
.shuffle-enter-from {
  opacity: 0;
}


.shuffle-leave-active {
  display: none;
  position: absolute;
}

/*  KEYFRAMES */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes expandWidth {
  to { width: 64px; }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes pillPop {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardIn {
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

/* Utility */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }


/* Bounce animation for no events icon */
.no-events-icon {
  animation: floatBounce 1.2s ease-in-out infinite alternate;
}

@keyframes floatBounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* sa button borrowers */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-pop-in {
  animation: popIn 0.8s ease-out forwards;
}
</style>