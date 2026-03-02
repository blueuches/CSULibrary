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
                @click="openGallery(section)"
                class="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-[#1b3a2f]/60 border border-white/10"
                :style="section.images.length > 0 ? { backgroundImage: `url(${section.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-[#1b3a2f]/90 group-hover:from-black/20 transition-all duration-500"></div>
                
                <div class="absolute inset-0 p-8 flex flex-col justify-end">
                  <div class="w-10 h-1 bg-yellow-400 mb-4 rounded-full transition-all group-hover:w-20"></div>
                  <h4 class="text-white font-black text-2xl leading-tight uppercase group-hover:text-yellow-400 transition-colors">
                    {{ section.title }}
                  </h4>
                  <p v-if="section.note" class="text-yellow-400 text-[10px] font-bold uppercase mt-1 tracking-widest">
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

    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" @click.self="closeModal">
        <button @click="closeModal" class="absolute top-8 right-8 text-white hover:text-yellow-400 text-5xl z-[60]">&times;</button>
        
        <div class="w-full max-w-5xl overflow-hidden rounded-3xl bg-[#1b3a2f]/60 border border-white/20 shadow-2xl relative">
          <div v-if="selectedSection" class="flex flex-col">
            
            <div class="relative min-h-[400px] flex items-center justify-center bg-black/20 group">
              <button v-if="selectedSection.images.length > 1" @click="prevImg" class="absolute left-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-yellow-400 hover:text-black transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
              </button>

              <img 
                v-if="selectedSection.images.length > 0"
                :src="selectedSection.images[currentImgIndex]" 
                class="w-full h-auto max-h-[60vh] object-contain mx-auto transition-opacity duration-300" 
              />

              <button v-if="selectedSection.images.length > 1" @click="nextImg" class="absolute right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-yellow-400 hover:text-black transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div class="flex justify-center gap-3 p-4 bg-black/40 overflow-x-auto">
              <div 
                v-for="(img, idx) in selectedSection.images" 
                :key="idx"
                @click="currentImgIndex = idx"
                class="w-20 h-14 rounded-lg cursor-pointer border-2 overflow-hidden flex-shrink-0 transition-all"
                :class="currentImgIndex === idx ? 'border-yellow-400 scale-110' : 'border-white/10 opacity-50'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="p-8 bg-black/60 text-center">
              <h2 class="text-yellow-400 text-3xl font-black uppercase mb-2">{{ selectedSection.title }}</h2>
              <p class="text-white/80">{{ selectedSection.description }}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const floors: Floor[] = [
  {
    id: 'floor1',
    name: '1st Floor',
    wings: [
      { 
        name: 'Main Wing', 
        sections: [
          { 
            title: 'Computer Lab', 
            description: 'High-speed internet and modern workstations for digital research.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Auditorium', 
            description: 'A spacious venue equipped for seminars and large lectures.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Award and Recognition Area', 
            description: 'Showcasing the excellence and achievements of the university community.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Natural Science Museum', 
            description: 'A collection of biological and physical science specimens for educational display.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'PWD Section', 
            description: 'Inclusive learning area specifically designed for persons with disabilities.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Wall of Merit', 
            description: 'Honoring the notable contributors and distinguished alumni of the institution.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          }
        ]
      },
      {
        name: 'Administrative Wing',
        sections: [
          { 
            title: 'Office of the University Librarian', 
            description: 'The administrative heart of the library system.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Technical Room', 
            description: 'IT infrastructure and server management area.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          },
          { 
            title: 'Board Room', 
            description: 'Executive meeting space for library board and faculty committees.', 
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] 
          }
        ]
      }
    ]
  },
  {
    id: 'floor2',
    name: '2nd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Circulation', description: 'The hub for borrowing and returning books.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'General Reference', description: 'Global reference materials.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Reserve', description: 'High-demand course materials.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Discussion Room', note: '1, 2, 3', description: 'Group brainstorming spaces.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Huddle Area', description: 'Casual group discussions.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Phone Booth', description: 'Quiet pod for personal calls.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Filipiniana', description: 'Books about the Philippines.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Periodicals', description: 'Newspapers and journals.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Shelving Area', description: 'Stacks housing physical books.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Reading Hub', description: 'Silent zone for deep focus.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Phone Booth', description: 'Isolated sound-insulated unit.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] }
      ]}
    ]
  },
  {
    id: 'floor3',
    name: '3rd Floor',
    wings: [
      { name: 'Right Wing', sections: [
        { title: 'Nap Pad', note: 'Female', description: 'Serene resting area for female students.', images: ['/imgs/Gallery/nappad.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Activity Loft', description: 'Creative space for workshops.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Quiet Room', description: 'Strictly silent atmosphere.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Multimedia Room', description: 'Digital media center.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] }
      ]},
      { name: 'Left Wing', sections: [
        { title: 'Nap Pad', note: 'Male', description: 'Sleeping pods for male students.', images: ['/imgs/Gallery/nappad.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Library Cafe', description: 'Snacks and coffee browsing area.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Activity Center', description: 'Flexible event space.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] },
        { title: 'Phone Booth', description: 'Focused private conversations.', images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'] }
      ]}
    ]
  }
]

const activeFloor = ref('floor1')
const searchQuery = ref('')
const showModal = ref(false)
const selectedSection = ref<Section | null>(null)
const currentImgIndex = ref(0)

const openGallery = (section: Section) => { 
  selectedSection.value = section
  currentImgIndex.value = 0
  showModal.value = true 
}

const closeModal = () => { showModal.value = false }

const nextImg = () => {
  if (selectedSection.value) {
    currentImgIndex.value = (currentImgIndex.value + 1) % selectedSection.value.images.length
  }
}

const prevImg = () => {
  if (selectedSection.value) {
    currentImgIndex.value = currentImgIndex.value === 0 
      ? selectedSection.value.images.length - 1 
      : currentImgIndex.value - 1
  }
}

const activeFloorData = computed(() => floors.filter(f => f.id === activeFloor.value))
const filteredFloors = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return floors.map(f => ({
    ...f,
    wings: f.wings.map(w => ({
      ...w,
      sections: w.sections.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    })).filter(w => w.sections.length > 0)
  })).filter(f => f.wings.length > 0)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #facc15; border-radius: 10px; }
</style>