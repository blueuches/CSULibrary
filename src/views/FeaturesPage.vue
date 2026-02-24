<template>
  <div class="w-full h-full min-h-[80vh] flex items-center justify-center bg-gray-50 font-['Poppins'] py-12">

    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

        <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden border-t-[6px] border-[#1b5e20] transition-all hover:shadow-xl">
          <div 
            @click="openImage('https://csulibrary.github.io/carsulibrary/images/features/research_clinic.jpg')"
            class="h-48 bg-cover bg-center cursor-pointer relative"
            style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80')"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-[#1b5e20]/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">
              Research Clinic
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow text-center">
            <h3 class="text-xl font-bold text-[#1b5e20] mb-2">
              Thesis Support
            </h3>

            <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
              Stuck in a research rut or struggling to start your paper? Our librarians provide expert guidance on literature reviews and methodology.
            </p>

            <div class="mt-auto pt-4 border-t border-gray-100">
              <span class="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
                Inquire At
              </span>
              <p class="text-[#1b5e20] font-bold text-sm">
                FILIPINIANA SECTION
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden border-t-[6px] border-[#ffb74d] transition-all hover:shadow-xl">
          <div 
            @click="isModalOpen = true" 
            class="h-48 relative cursor-pointer group overflow-hidden"
          >
            <div 
              class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
              style="background-image: url('https://img.youtube.com/vi/Lv0URTSBniY/hqdefault.jpg')"
            ></div>

            <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div class="w-14 h-14 rounded-full bg-[#ffb74d] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow text-center">
            <h3 class="text-xl font-bold text-[#c68400] mb-2">
              Virtual Tour
            </h3>

            <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
              Explore our modern facilities and collection areas from the comfort of your device. See where your next big idea starts.
            </p>

            <button 
              @click="isModalOpen = true"
              class="mt-auto w-full py-2.5 bg-[#ffb74d] text-white font-semibold rounded-lg hover:bg-[#ffa726] transition-all text-sm shadow-sm"
            >
              Watch Video
            </button>
          </div>
        </div>

        <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden border-t-[6px] border-[#66bb6a] transition-all hover:shadow-xl">
          <div 
            class="h-48 bg-cover bg-center relative"
            style="background-image: url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80')"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-[#2e7d32]/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">
              Orientation
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow text-center">
            <h3 class="text-xl font-bold text-[#2e7d32] mb-2">
              Library Orientation
            </h3>

            <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
              First time here? Maximize your academic success by learning how to navigate our physical and digital resource collections effectively.
            </p>

            <div class="mt-auto pt-4">
              <div class="inline-flex items-center text-[#2e7d32] font-medium text-sm cursor-pointer hover:underline">
                View Gallery
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      @click.self="isModalOpen = false"
    >
      <div class="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <button 
          @click="isModalOpen = false"
          class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#ffb74d] transition-colors z-10"
        >
          ✕
        </button>
        <iframe 
          class="w-full h-full"
          src="https://www.youtube.com/embed/Lv0URTSBniY?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

function openImage(url: string) {
  window.open(url, '_blank')
}
</script>

<style scoped>
/* Empty as requested */
</style>