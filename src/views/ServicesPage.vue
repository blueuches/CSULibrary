<template>
  <div class="w-full pb-10 font-poppins antialiased text-green-950 flex flex-col items-center bg-gray-50 overflow-x-hidden">
    
    <!-- <div class="relative mb-10 w-full pt-1">
      <Ribbon class="mt-6">SERVICES</Ribbon>
    </div> -->
    
    <div class="mx-auto px-8 w-full pb-10"> 
    <Ribbon class="mt-6">SERVICES</Ribbon>

      <p class="text-green-950 leading-relaxed text-lg font-medium text-center mb-16 pt-5">
        The 
        <span class="font-black text-[#1b5e20] text-2xl tracking-tight mx-1">
          CSU Library
        </span> 
        provides the following services:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div v-for="(service, index) in libraryServices" :key="index" 
             class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 
                    hover:shadow-[0_8px_30px_rgb(27,94,32,0.15)] hover:-translate-y-1 group cursor-pointer">
          
          <div class="w-1.5 h-10 bg-[#f9a825] shrink-0 rounded-full mt-1"></div>
          
          <div>
            <h3 class="font-bold text-lg text-green-950 mb-2 leading-tight uppercase tracking-wide">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm font-normal">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        style="background: #0d2b0f"
      >
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 11l7-7 7 7" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 17l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Ribbon from '@/components/Ribbon.vue';

const libraryServices = [
  { title: "Online Public Access Catalog (OPAC)", description: "Terminals provided for available library materials. It is the electronic version of the paper Card Catalog." },
  { title: "Audio Visual Room", description: "For viewing and borrowing of digital interactive CDs and DVDs." },
  { title: "eLibrary", description: "Access to online resources such as online journals, research websites, e-books, video streaming, and printing." },
  { title: "Automated Circulation", description: "Borrowing and returning of books are computerized. It also records daily performance and provides bibliographic information." },
  { title: "Laptop Area", description: "This service allows clients to plug their laptops in designated areas." },
  { title: "OPAC Tutorial", description: "Training to search for materials using nine options: title, author, call number, subject, series, keyword, category, power, and events." },
  { title: "Library Resource Sharing", description: "Accommodates researchers from other schools and government organizations." },
  { title: "Library Orientation", description: "Provides an understanding of the library's objectives, facilities, resources, and services." },
  { title: "Library Instruction", description: "Educates students on how to use the library resources effectively." },
  { title: "Book Display/New Arrival", description: "Newly processed books are posted on the bulletin board and displayed in the new arrival area for faculty and students." },
  { title: "Bibliographic Assistance", description: "Librarians prepare bibliographies on specific subjects upon request." },
  { title: "Acquisition List", description: "Technical librarians prepare lists of materials acquired by the library during the semester." },
  { title: "Book Selection", description: "Faculty are encouraged to participate in recommending books for the library collection." }
];

const showScrollTop = ref(false);

function handleScroll() {
  showScrollTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

:deep(.csu-ribbon-wrap .page-inner) {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 30px;
}
</style>
