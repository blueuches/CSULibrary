<template>
  <div class="w-full py-6 relative min-h-screen overflow-y-auto flex flex-col items-center">
    <div
      class="fixed inset-0 -z-10 bg-cover bg-center brightness-50"
      style="background-image: url('https://images.unsplash.com/photo-1524492449090-1c8ad998ad3b?auto=format&fit=crop&w=1600&q=30');"
    ></div>

    <div class="w-full sticky top-0 z-30">
      <div class="w-full bg-black/20 backdrop-blur-xl py-6 px-8 flex items-center justify-between border-b border-white/10">
        
        <div class="relative w-full max-w-[280px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Section..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 border-2 border-yellow-400 text-[#1b3a2f] font-semibold text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all shadow-lg"
          />
          <svg class="absolute left-3 top-3 h-4 w-4 text-[#1b3a2f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex gap-4 absolute left-1/2 -translate-x-1/2">
          <button
            v-for="floor in floors"
            :key="floor.id"
            @click="activeFloor = floor.id"
            :class="[
              'px-8 py-2.5 rounded-full font-black transition-all shadow-xl text-xs uppercase tracking-widest border-2',
              activeFloor === floor.id && !searchQuery
                ? 'bg-yellow-400 border-yellow-400 text-[#1b3a2f] scale-110'
                : 'bg-black/40 border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400',
            ]"
          >
            {{ floor.name }}
          </button>
        </div>

        <div class="w-[280px] hidden lg:block"></div>
      </div>
    </div>

    <div class="w-full max-w-7xl px-4 flex flex-col items-center mt-12 relative z-10">
      <transition-group name="fade" tag="div" class="w-full">
        <div
          v-for="floor in searchQuery ? filteredFloors : activeFloorData"
          :key="floor.id"
          class="w-full mb-12"
        >
          <div v-for="wing in floor.wings" :key="wing.name" class="mb-20">
            <div class="flex items-center justify-center mb-10 gap-6">
              <span class="text-yellow-400 font-bold tracking-tighter text-sm">{{ floor.name }}</span>
              <h3 class="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-md">
                {{ wing.name }}
              </h3>
              <div class="h-[2px] flex-grow max-w-[100px] bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <div
                v-for="section in wing.sections"
                :key="section.title"
                @click="openGallery(section.images)"
                class="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-[#1b3a2f]/60 backdrop-blur-md border border-white/10"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-[#1b3a2f]/90 group-hover:bg-[#1b3a2f]/40 transition-all duration-500"></div>
                
                <div class="absolute inset-0 p-8 flex flex-col justify-end">
                  <div class="w-10 h-1 bg-yellow-400 mb-4 rounded-full transition-all group-hover:w-20"></div>
                  
                  <h4 class="text-white font-black text-2xl leading-tight uppercase group-hover:text-yellow-400 transition-colors">
                    {{ section.title }}
                  </h4>
                  
                  <p v-if="section.note" class="text-yellow-400 text-[10px] font-bold uppercase mt-1 tracking-widest">
                    {{ section.note }}
                  </p>

                  <p class="text-white/80 text-sm mt-4 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                    {{ section.description }}
                  </p>
                  
                  <div class="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <span class="text-[10px] text-yellow-400 font-black uppercase">Enter Section</span>
                    <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
       <button @click="showModal = false" class="absolute top-8 right-8 text-white hover:text-yellow-400 text-4xl">&times;</button>
       <div class="bg-white/10 p-12 rounded-3xl border border-white/20 max-w-lg text-center">
         <h2 class="text-yellow-400 text-2xl font-black mb-4 uppercase">Section Gallery</h2>
         <p class="text-white/70">Images for this section are being prepared. Check back soon!</p>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const floors = [
  {
    id: 'floor1',
    name: '1st Floor',
    wings: [{ 
      name: 'Main Wing', 
      sections: [
        { title: 'Computer Lab', description: 'High-speed internet and modern workstations for digital research and academic tasks.', images: [] },
        { title: 'Auditorium', description: 'A spacious venue equipped for seminars, large lectures, and university presentations.', images: [] }
      ]
    }]
  },
  {
    id: 'floor2',
    name: '2nd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Circulation', description: 'The central hub for borrowing, returning, and managing your library book accounts.', images: [] },
        { title: 'General Reference', description: 'Comprehensive collection of encyclopedias, dictionaries, and global reference materials.', images: [] },
        { title: 'Reserve', description: 'High-demand course materials and textbooks reserved for short-term student use.', images: [] },
        { title: 'Discussion Room', note: '1, 2, 3', description: 'Private sound-proof spaces for group brainstorming and collaborative projects.', images: [] },
        { title: 'Huddle Area', description: 'Semi-private open spaces designed for quick meetings and casual group discussions.', images: [] },
        { title: 'Phone Booth', description: 'A quiet, private acoustic pod for taking important personal or professional calls.', images: [] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Filipiniana', description: 'A dedicated collection of books and documents written by Filipinos or about the Philippines.', images: [] },
        { title: 'Periodicals', description: 'Up-to-date newspapers, academic journals, and popular magazines for current research.', images: [] },
        { title: 'Shelving Area', description: 'Organized stacks housing the library\'s extensive physical book collections.', images: [] },
        { title: 'Discussion Room', note: '4', description: 'Extended group study space equipped with whiteboards and modern furniture.', images: [] },
        { title: 'Huddle Area', description: 'Comfortable corner for small teams to sync and collaborate on assignments.', images: [] },
        { title: 'Reading Hub', description: 'A brightly lit, silent zone perfect for deep focus and long-duration reading sessions.', images: [] },
        { title: 'Rectangular Collaborative Lounge', description: 'Wide open lounge designed for cross-functional group activities and social learning.', images: [] },
        { title: 'Phone Booth', description: 'Isolated sound-insulated unit for secure and silent communication.', images: [] }
      ]}
    ]
  },
  {
    id: 'floor3',
    name: '3rd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Nap Pad', note: 'Female', description: 'A serene, safe resting area for female students to recharge between classes.', images: [] },
        { title: 'Activity Loft', description: 'Elevated creative space for hands-on learning, workshops, and student activities.', images: [] },
        { title: 'Discussion Room', note: '1, 2, 3, 4', description: 'Versatile rooms for larger group study and student-led organizations.', images: [] },
        { title: 'Quiet Room', description: 'Strictly silent atmosphere for students requiring zero-distraction concentration.', images: [] },
        { title: 'Multimedia and Viewing Room', description: 'Digital media center for watching documentaries, films, and video-based learning.', images: [] },
        { title: 'Phone Booth', description: 'Private space for voice calls without disturbing the floor\'s quiet zones.', images: [] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Nap Pad', note: 'Male', description: 'Comfortable sleeping pods for male students needing a quick rest and rejuvenation.', images: [] },
        { title: 'Storytelling Area', description: 'Creative corner for narrative sessions, literary talks, and open-mic reading.', images: [] },
        { title: 'Decision Theater', description: 'Tech-enabled data visualization space for advanced research and presentation.', images: [] },
        { title: 'Library Cafe', description: 'Relaxed area to enjoy light snacks and coffee while browsing your favorite books.', images: [] },
        { title: 'Exhibit Area', description: 'A curated gallery space showcasing university art, history, and student projects.', images: [] },
        { title: 'Business Area', description: 'Equipped with printers, scanners, and tools for professional document preparation.', images: [] },
        { title: 'Activity Center', description: 'Flexible event space for student engagement and collaborative community events.', images: [] },
        { title: 'Phone Booth', description: 'Compact acoustic station for focused private conversations.', images: [] }
      ]}
    ]
  }
]

const activeFloor = ref('floor1')
const searchQuery = ref('')
const showModal = ref(false)

const openGallery = (images: string[]) => { showModal.value = true }

const activeFloorData = computed(() => floors.filter(f => f.id === activeFloor.value))
const filteredFloors = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return floors.map(f => ({
    ...f,
    wings: f.wings.map(w => ({
      ...w,
      sections: w.sections.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) || 
        (s.note && s.note.toLowerCase().includes(q))
      )
    })).filter(w => w.sections.length > 0)
  })).filter(f => f.wings.length > 0)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
::-webkit-scrollbar-thumb { background: #facc15; border-radius: 10px; }
</style>