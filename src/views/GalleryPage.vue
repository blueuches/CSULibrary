<template>
  <div class="w-full py-6 relative min-h-screen overflow-y-auto flex flex-col items-center">
    <div
      class="fixed inset-0 -z-10 bg-cover bg-center brightness-75"
      style="
        background-image: url('https://images.unsplash.com/photo-1524492449090-1c8ad998ad3b?auto=format&fit=crop&w=1600&q=30');
      "
    ></div>

    <div class="w-full sticky top-0 z-30 shadow-2xl">
      <div
        class="w-full bg-[#1b3a2f] text-yellow-400 text-center py-6 border-b border-yellow-400/20"
      >
        <h1 class="text-3xl md:text-4xl font-bold tracking-wide uppercase">CSU Library Section</h1>
      </div>

      <div class="w-full bg-[#1b3a2f]/90 backdrop-blur-md py-3 px-4 flex justify-start">
        <div class="relative w-full max-w-[300px] ml-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search all floors..."
            class="w-full pl-10 pr-4 py-2 rounded-lg bg-white/95 border-2 border-yellow-400 text-[#1b3a2f] font-semibold text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all"
          />
          <svg
            class="absolute left-3 top-2.5 h-4 w-4 text-[#1b3a2f]/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="!searchQuery" class="flex flex-wrap justify-center gap-4 my-8 relative z-20">
      <button
        v-for="floor in floors"
        :key="floor.id"
        @click="activeFloor = floor.id"
        :class="[
          'px-6 py-2 rounded-full font-bold transition-all shadow-md',
          activeFloor === floor.id
            ? 'bg-yellow-400 text-[#1b3a2f] scale-105'
            : 'bg-white/80 hover:bg-yellow-400 hover:text-[#1b3a2f]',
        ]"
      >
        {{ floor.name }}
      </button>
    </div>

    <div v-if="searchQuery" class="w-full max-w-5xl px-6 mt-8 mb-4 text-left">
      <h2
        class="text-white text-xl font-bold bg-[#1b3a2f]/80 inline-block px-6 py-2 rounded-r-full border-l-4 border-yellow-400 backdrop-blur-sm"
      >
        Showing Search Results ({{ searchResultCount }} matches found)
      </h2>
    </div>

    <div class="w-full max-w-6xl px-4 flex flex-col items-center">
      <transition-group name="fade" tag="div" class="w-full flex flex-col items-center">
        <div
          v-for="floor in searchQuery ? filteredFloors : activeFloorData"
          :key="floor.id"
          class="w-full flex flex-col items-center mb-10"
        >
          <div v-if="searchQuery" class="w-full max-w-5xl mb-4">
            <span class="text-yellow-400 font-black text-sm uppercase tracking-widest pl-4"
              >📍 {{ floor.name }}</span
            >
          </div>

          <div
            v-for="wing in floor.wings"
            :key="floor.id + '-' + wing.name"
            class="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-12 w-full max-w-5xl mx-auto flex flex-col items-center border border-white"
          >
            <div class="w-full flex items-center justify-center mb-10 gap-6">
              <div class="h-[1px] bg-gray-300 flex-grow"></div>
              <h3 class="text-2xl font-black text-[#1b3a2f] uppercase tracking-tighter px-4">
                {{ wing.name }}
              </h3>
              <div class="h-[1px] bg-gray-300 flex-grow"></div>
            </div>

            <div class="flex flex-wrap justify-center gap-8">
              <div
                v-for="section in wing.sections"
                :key="floor.id + '-' + wing.name + '-' + section.title"
                @click="openGallery(section.images)"
                class="relative w-72 h-64 rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  :src="section.images[0]"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  class="absolute inset-0 bg-[#1b3a2f]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 backdrop-blur-[2px]"
                >
                  <div
                    class="bg-yellow-400 text-[#1b3a2f] px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl"
                  >
                    View Gallery
                  </div>
                </div>

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
                ></div>
                <div class="absolute bottom-6 left-8 right-6 z-20">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-1 h-6 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                    ></div>
                    <div>
                      <h4 class="text-white font-bold text-lg leading-tight uppercase">
                        {{ section.title }}
                      </h4>
                      <p
                        v-if="section.note"
                        class="text-yellow-400 text-[10px] font-black uppercase mt-1"
                      >
                        {{ section.note }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-yellow-400 text-[#1b3a2f] p-4 rounded-full shadow-2xl z-40 hover:scale-110 transition-all border-2 border-[#1b3a2f]"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/98 flex items-center justify-center z-50 p-6 backdrop-blur-md"
    >
      <button
        @click="showModal = false"
        class="absolute top-10 right-10 text-white/50 hover:text-yellow-400 text-5xl"
      >
        &times;
      </button>
      <button
        v-if="currentImages.length > 1"
        @click="prevImage"
        class="absolute left-6 text-yellow-400 text-6xl"
      >
        &#10094;
      </button>
      <div class="flex flex-col items-center max-w-5xl w-full">
        <img
          :src="currentImages[currentIndex]"
          class="rounded-2xl shadow-2xl max-h-[75vh] object-contain"
        />
      </div>
      <button
        v-if="currentImages.length > 1"
        @click="nextImage"
        class="absolute right-6 text-yellow-400 text-6xl"
      >
        &#10095;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// --- 1. Data Definitions (Defined first to avoid hoisting errors) ---
const floors = [
  {
    id: 'floor1',
    name: '1st Floor',
    wings: [
      {
        name: 'Main Wing',
        sections: [
          { title: 'Computer Lab', images: ['https://via.placeholder.com/800'] },
          { title: 'Auditorium', images: ['https://via.placeholder.com/800'] },
        ],
      },
    ],
  },
  {
    id: 'floor2',
    name: '2nd Floor',
    wings: [
      {
        name: 'Right Wing',
        sections: [
          {
            title: 'Discussion Rooms',
            note: 'Rooms 1-3',
            images: ['https://via.placeholder.com/800'],
          },
          { title: 'Huddle Area', images: ['https://via.placeholder.com/800'] },
        ],
      },
      {
        name: 'Left Wing',
        sections: [{ title: 'Filipiniana', images: ['https://via.placeholder.com/800'] }],
      },
    ],
  },
  {
    id: 'floor3',
    name: '3rd Floor',
    wings: [
      {
        name: 'Right Wing',
        sections: [
          {
            title: 'Discussion Rooms',
            note: 'Rooms 1-4',
            images: ['https://via.placeholder.com/800'],
          },
        ],
      },
      {
        name: 'Left Wing',
        sections: [{ title: 'Library Cafe', images: ['https://via.placeholder.com/800'] }],
      },
    ],
  },
]

// --- 2. Reactive State ---
const activeFloor = ref('floor1')
const searchQuery = ref('')
const showModal = ref(false)
const currentImages = ref<string[]>([])
const currentIndex = ref(0)
const showBackToTop = ref(false)

// --- 3. Methods ---
const openGallery = (images: string[]) => {
  currentImages.value = images
  currentIndex.value = 0
  showModal.value = true
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
}

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + currentImages.value.length) % currentImages.value.length
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// --- 4. Lifecycle Hooks ---
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// --- 5. Computed Properties ---

// Filter logic: Search results across ALL floors
const filteredFloors = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()

  return floors
    .map((floor) => ({
      ...floor,
      wings: floor.wings
        .map((wing) => ({
          ...wing,
          sections: wing.sections.filter(
            (s) =>
              s.title.toLowerCase().includes(query) ||
              (s.note && s.note.toLowerCase().includes(query)),
          ),
        }))
        .filter((w) => w.sections.length > 0), //gsgsgsggsgsgsg
    }))
    .filter((f) => f.wings.length > 0)
})

// Current Floor viewing logic (WHEN NOT SEARCHING) //hahshahhahdhhad
const activeFloorData = computed(() => {
  return floors.filter((f) => f.id === activeFloor.value)
})

//hahshsahdhadhahdhahd

//ahhsahidhaidha

//hahdhadhahda

//hadhajdahdaha
const searchResultCount = computed(() => {
  return filteredFloors.value.reduce(
    (acc, f) => acc + f.wings.reduce((a, w) => a + w.sections.length, 0),
    0,
  )
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
