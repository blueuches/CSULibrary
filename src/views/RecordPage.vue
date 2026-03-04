
Features page
<template>
  <div class="w-full min-h-screen bg-gray-50 font-['Poppins'] pb-12 pt-[25px]">

    <div class="w-full px-4 sm:px-6 lg:px-8">

      <Ribbon>RECORDS</Ribbon>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">

  <!-- DATA UPLOAD -->
  <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
    
    <div class="h-48 flex items-center justify-center bg-gray-100">
      <img 
        src="@/assets/images/recordpage/folder-upload-icon.png" 
        alt="Data Upload"
        class="h-24 object-contain"
      />
    </div>

    <div class="p-6 flex flex-col flex-grow text-center">
      <h3 class="text-xl font-bold text-[#1b5e20] mb-2">
        Data Upload
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify flex-grow">
        Access uploaded institutional records, research documents, and archived files 
        shared by the library. Browse and download official academic data and materials 
        organized for easy retrieval.
      </p>

      <a 
        href="https://drive.google.com/drive/folders/10VykxJ5P2C_OwVsF0Ym_ef4TUuFdq9I6"
        target="_blank"
        class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#1b5e20] hover:text-white transition"
      >
        Go to Data Upload
      </a>
    </div>
  </div>


  <!-- CD-ROM DOWNLOAD -->
  <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
    
    <div class="h-48 flex items-center justify-center bg-gray-100">
      <img 
        src="@/assets/images/recordpage/folder-download-icon.png" 
        alt="CD-ROM Download"
        class="h-24 object-contain"
      />
    </div>

    <div class="p-6 flex flex-col flex-grow text-center">
      <h3 class="text-xl font-bold text-[#1b5e20] mb-2">
        CD-ROM Download
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify flex-grow">
        Download digitized CD-ROM contents including archived theses, reference 
        materials, and multimedia resources previously stored in physical formats, 
        now made accessible online for convenience.
      </p>

      <a 
        href="#"
        class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#1b5e20] hover:text-white transition"
      >
        Download CD-ROM
      </a>
    </div>
  </div>


  <!-- E-BOOKS GDRIVE -->
  <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
    
    <div class="h-48 flex items-center justify-center bg-gray-100">
      <img 
        src="@/assets/images/recordpage/download-book-icon.png" 
        alt="E-books Gdrive"
        class="h-24 object-contain"
      />
    </div>

    <div class="p-6 flex flex-col flex-grow text-center">
      <h3 class="text-xl font-bold text-[#1b5e20] mb-2">
        E-books GDrive
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify flex-grow">
        Explore our collection of electronic books available via Google Drive. 
        Access textbooks, reference books, and academic materials in digital format 
        anytime and anywhere.
      </p>

      <a 
        href="https://drive.google.com/drive/folders/1-2P2uJiziZHND_8gH5-d20uDmAiPs5gt"
        target="_blank"
        class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#1b5e20] hover:text-white transition"
      >
        Go to E-books
      </a>
    </div>
  </div>


  <!-- E-RESOURCES -->
  <div class="flex flex-col w-full h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
    
    <div class="h-48 flex items-center justify-center bg-gray-100">
      <img 
        src="@/assets/images/recordpage/find-book-icon.png" 
        alt="E-Resources"
        class="h-24 object-contain"
      />
    </div>

    <div class="p-6 flex flex-col flex-grow text-center">
      <h3 class="text-xl font-bold text-[#1b5e20] mb-2">
        E-Resources
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify flex-grow">
        Access subscribed online databases, journals, research portals, and other 
        electronic academic resources provided by the library to support learning, 
        teaching, and research activities.
      </p>

      <RouterLink
        :to="{ name: 'eresources' }"
        class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#1b5e20] hover:text-white transition text-center"
      >
        Go to E-Resources
      </RouterLink>
    </div>
  </div>

</div>
    </div>
    

    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      @click.self="isModalOpen = false"
    >
      <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
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

    <div 
      v-if="isOrientationModalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      @click.self="isOrientationModalOpen = false"
    >
      <div class="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <button 
          @click="isOrientationModalOpen = false"
          class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#66bb6a] transition-colors z-10"
        >
          ✕
        </button>
        <iframe 
          class="w-full h-full"
          src="https://www.youtube.com/embed/HAEPrH2aYpc?autoplay=1" 
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
import Ribbon from '@/components/Ribbon.vue';

const isModalOpen = ref(false)
const isOrientationModalOpen = ref(false)
</script>

<style scoped>
:deep(.csu-ribbon-wrap .page-inner) {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 30px;
}
</style>