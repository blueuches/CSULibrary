1<template>
  <div class="w-full py-6 relative min-h-screen overflow-y-auto flex flex-col items-center bg-white">
    
   
    <div class="w-full sticky top-0 z-30 px-6 mt-4">
      <div class="w-full backdrop-blur-md bg-white/40 py-2 px-8 flex items-center justify-between border border-gray-200 rounded-3xl shadow-lg">
        
        <div class="flex gap-4">
          <button
            v-for="floor in floors"
            :key="floor.id"
            @click="activeFloor = floor.id"
            :class="[
              'px-8 py-2.5 rounded-full font-black transition-all duration-300 text-xs uppercase tracking-widest border-2',
              /* Active State: Uses Dark Green (#0d2b0f) */
              activeFloor === floor.id && !searchQuery
                ? 'bg-[#0d2b0f] border-[#0d2b0f] text-white scale-100 shadow-md'
                : 'bg-transparent border-[#0d2b0f] text-[#0d2b0f] hover:bg-[#1b5e20] hover:border-[#1b5e20] hover:text-white',
            ]"
          >
            {{ floor.name }}
          </button>
        </div>

        <div class="relative w-full max-w-[320px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Section..."
            class="w-full pl-6 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-[#0d2b0f] text-[#0d2b0f] font-bold text-sm focus:outline-none focus:ring-4 focus:ring-[#1b5e20]/10 transition-all shadow-inner"
          />
        </div>
      </div>
    </div>

    <div class="w-full px-4 flex flex-col items-center mt-12 relative z-10">
      <transition-group name="fade" tag="div" class="w-full">
        <div
          v-for="floor in (searchQuery ? filteredFloors : activeFloorData)"
          :key="floor.id"
          class="w-full mb-12"
        >
          <div v-for="wing in floor.wings" :key="wing.name" class="mb-20">
            <div class="flex items-center justify-center mb-10 gap-6">
              <span class="text-yellow-600 font-bold tracking-tighter text-sm">{{ floor.name }}</span>
              <h3 class="text-4xl font-black text-[#0d2b0f] uppercase tracking-tighter">
                {{ wing.name }}
              </h3>
              <div class="h-[2px] flex-grow max-w-[150px] bg-gradient-to-r from-yellow-600 to-transparent"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <div
                v-for="section in wing.sections"
                :key="section.title"
                @click="openGallery(section)"
                class="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-3 bg-gray-100 border border-gray-200"
                :style="section.images.length > 0 ? { backgroundImage: `url(${section.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-[#1b5e20]/95 transition-all duration-500"></div>
                
                <div class="absolute inset-0 p-8 flex flex-col justify-end">
                  <div class="w-10 h-1 bg-[#1b5e20] mb-4 rounded-full transition-all group-hover:w-20"></div>
                  
                  <h4 class="text-white font-black text-2xl leading-tight uppercase group-hover:text-yellow-500 transition-colors duration-300">
                    {{ section.title }}
                  </h4>
                  
                  <p v-if="section.note" class="text-[#66bb6a] text-[10px] font-bold uppercase mt-1 tracking-widest">
                    {{ section.note }}
                  </p>
                  
                  <p class="text-white/80 text-sm mt-4 leading-relaxed line-clamp-3">
                    {{ section.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 bg-[#0d2b0f]/90 flex items-center justify-center p-4 backdrop-blur-sm" @click.self="closeModal">
        <button @click="closeModal" class="absolute top-8 right-8 text-white hover:text-[#66bb6a] text-5xl z-[60] transition-colors">&times;</button>
        
        <div class="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl relative">
          <div v-if="selectedSection" class="flex flex-col">
            
            <div class="relative min-h-[400px] flex items-center justify-center bg-gray-200">
              <button v-if="selectedSection.images.length > 1" @click="prevImg" class="absolute left-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#1b5e20] transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
              </button>

              <img 
                v-if="selectedSection.images.length > 0"
                :src="selectedSection.images[currentImgIndex]" 
                class="w-full h-auto max-h-[60vh] object-contain mx-auto" 
              />

              <button v-if="selectedSection.images.length > 1" @click="nextImg" class="absolute right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#1b5e20] transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div class="flex justify-center gap-3 p-4 bg-gray-50 overflow-x-auto">
              <div 
                v-for="(img, idx) in selectedSection.images" 
                :key="idx"
                @click="currentImgIndex = idx"
                class="w-20 h-14 rounded-lg cursor-pointer border-2 overflow-hidden flex-shrink-0 transition-all"
                :class="currentImgIndex === idx ? 'border-[#1b5e20] scale-105 shadow-md' : 'border-transparent opacity-60'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="p-8 text-center border-t border-gray-100">
              <h2 class="text-[#0d2b0f] text-3xl font-black uppercase mb-2">{{ selectedSection.title }}</h2>
              <p class="text-yellow-600 max-w-2xl mx-auto">{{ selectedSection.description }}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Ribbon from "@/components/Ribbon.vue";
import { ref, computed } from 'vue'

/**
 * DATA INTERFACES
 * Defines the structure of our library gallery data
 */
interface Section {
  title: string;
  description: string;
  note?: string;
  images: string[];
}

interface Wing {
  name: string;
  sections: Section[];
}

interface Floor {
  id: string;
  name: string;
  wings: Wing[];
}

/**
 * STATE MANAGEMENT
 */
const activeFloor = ref('floor1')      // Controls which floor is currently visible
const searchQuery = ref('')            // Holds the user's search input
const showModal = ref(false)           // Controls the gallery pop-up visibility
const selectedSection = ref<Section | null>(null) // Stores which card was clicked
const currentImgIndex = ref(0)         // Tracks current image in the modal slideshow

/**
 * METHODS
 */
const openGallery = (section: Section) => { 
  selectedSection.value = section
  currentImgIndex.value = 0
  showModal.value = true 
}

const closeModal = () => { showModal.value = false }

// Slideshow: Move to next image
const nextImg = () => {
  if (selectedSection.value) {
    currentImgIndex.value = (currentImgIndex.value + 1) % selectedSection.value.images.length
  }
}

// Slideshow: Move to previous image
const prevImg = () => {
  if (selectedSection.value) {
    currentImgIndex.value = currentImgIndex.value === 0 
      ? selectedSection.value.images.length - 1 
      : currentImgIndex.value - 1
  }
}

/**
 * COMPUTED PROPERTIES
 */
// Returns only the floor data for the selected tab
const activeFloorData = computed(() => floors.filter(f => f.id === activeFloor.value))

// Handles search logic across all floors, wings, and sections
const filteredFloors = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return floors.map(f => ({
    ...f,
    wings: f.wings.map(w => ({
      ...w,
      sections: w.sections.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      )
    })).filter(w => w.sections.length > 0)
  })).filter(f => f.wings.length > 0)
})

/**
 * GALLERY DATA
 */
const floors: Floor[] = [
  {
    id: 'floor1',
    name: '1st Floor',
    wings: [
      { 
        name: 'Main Wing', 
        sections: [
          { title: 'Computer Lab', description: 'High-speed internet and modern workstations for digital research.', images: ['/imgs/Gallery/comlab1.JPG','/imgs/Gallery/comlab1.JPG'] },
          { title: 'Auditorium', description: 'A spacious venue equipped for seminars and large lectures.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'Award and Recognition Area', description: 'Showcasing the excellence and achievements of the university community.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'Natural Science Museum', description: 'A collection of biological and physical science specimens for educational display.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'PWD Section', description: 'Inclusive learning area specifically designed for persons with disabilities.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'Wall of Merit', description: 'Honoring the notable contributors and distinguished alumni of the institution.', images: ['/imgs/Gallery/comlab1.JPG'] }
        ]
      },
      {
        name: 'Administrative Wing',
        sections: [
          { title: 'Office of the University Librarian', description: 'The administrative heart of the library system.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'Technical Room', description: 'IT infrastructure and server management area.', images: ['/imgs/Gallery/comlab1.JPG'] },
          { title: 'Board Room', description: 'Executive meeting space for library board and faculty committees.', images: ['/imgs/Gallery/comlab1.JPG'] }
        ]
      }
    ]
  },
  {
    id: 'floor2',
    name: '2nd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Circulation', description: 'The hub for borrowing and returning books.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'General Reference', description: 'Global reference materials.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Reserve', description: 'High-demand course materials.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Discussion Room', note: '1, 2, 3', description: 'Group brainstorming spaces.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Huddle Area', description: 'Casual group discussions.', images: ['/imgs/Gallery/huddle1.JPG'] },
        { title: 'Phone Booth', description: 'Quiet pod for personal calls.', images: ['/imgs/Gallery/Pb1.jpg'] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Filipiniana', description: 'Books about the Philippines.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Periodicals', description: 'Newspapers and journals.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Shelving Area', description: 'Stacks housing physical books.', images: ['/imgs/Gallery/shelving1.jpg'] },
        { title: 'Reading Hub', description: 'Silent zone for deep focus.', images: ['/imgs/Gallery/read1.JPG'] },
        { title: 'Phone Booth', description: 'Isolated sound-insulated unit.', images: ['/imgs/Gallery/Pb1.jpg'] }
      ]}
    ]
  },
  {
    id: 'floor3',
    name: '3rd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Nap Pad', note: 'Female', description: 'Serene resting area for female students.', images: ['/imgs/Gallery/nappad.JPG'] },
        { title: 'Activity Loft', description: 'Creative space for workshops.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Quiet Room', description: 'Strictly silent atmosphere.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Multimedia Room', description: 'Digital media center.', images: ['/imgs/Gallery/comlab1.JPG'] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Nap Pad', note: 'Male', description: 'Sleeping pods for male students.', images: ['/imgs/Gallery/nappad.JPG'] },
        { title: 'Library Cafe', description: 'Snacks and coffee browsing area.', images: ['/imgs/Gallery/cafe1.jpg'] },
        { title: 'Activity Center', description: 'Flexible event space.', images: ['/imgs/Gallery/comlab1.JPG'] },
        { title: 'Phone Booth', description: 'Focused private conversations.', images: ['/imgs/Gallery/comlab1.JPG'] }
      ]}
    ]
  }
]
</script>

<style scoped>
/* Page transition animation styles */
.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }

/* Custom Scrollbar Styling - Dark Green (#0d2b0f) */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #0d2b0f; border-radius: 10px; }

/* Deep selector to ensure Ribbon component uses full width */
:deep(.csu-ribbon-wrap .page-inner) {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 30px;
}
</style>