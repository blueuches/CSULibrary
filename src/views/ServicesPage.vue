<template>
  <div class="w-full pb-10 font-['Poppins'] text-gray-800 flex flex-col items-center bg-gray-50 overflow-x-hidden">
    
    <div class="relative mb-10 w-full max-w-7xl mx-auto pl-4">
  
  <!-- Ribbon -->
    <div class="csu-ribbon-wrap">
      <div class="page-inner">
        <div class="csu-ribbon">
          <span class="csu-ribbon-title">SERVICES</span>
        </div>
      </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-8 w-full pb-10"> 
  <p class="text-gray-800 leading-relaxed text-lg font-medium text-center mb-16 pt-5">
    The 
    <span class="font-[900] text-[#1b5e20] text-2xl tracking-tight mx-1">
      CSU Library
    </span> 
    provides the following services:
  </p>


      <div class="grid grid-cols-1 gap-x-30 gap-y-8 items-stretch pl-5">
        <div v-for="(service, index) in libraryServices" :key="index" 
             class="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
          
          <div class="w-2 h-7 bg-yellow-400 shrink-0 group-hover:h-10 transition-all"></div>
          
          <div>
            <h3 class="font-black text-lg text-gray-950 mb-2 leading-tight uppercase tracking-tight">
              {{ service.title }}
            </h3>
            <p class="text-black-700 leading-relaxed text-sm font-medium">
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
        class="fixed bottom-6 right-6 z-50 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:opacity-90 shadow-lg"
        style="background: #1b5e20"
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

const showScrollTop = ref(false);

const libraryServices = [
  { title: "Online Public Access Catalog (OPAC)", description: "- where terminals are provided for available library materials. It is the electronic version of the paper Card Catalog." },
  { title: "Audio Visual Room", description: "- for viewing and borrowing of digital interactive CDs and DVDs." },
  { title: "eLibrary", description: "- access to online resources such as online journals and magazines, research on educational websites, e-books, video streaming and printing." },
  { title: "Automated Circulation", description: "- borrowing and returning of books are computerized. It also records daily performance and provides bibliographic information." },
  { title: "Laptop Area", description: "- this service allow clients to plug their laptops on designated area." },
  { title: "OPAC Tutorial", description: "- to search for the material, the OPAC has nine options available: title, author, call number, subject, series, keyword, category, power and events. Type the search word in the appropriate box." },
  { title: "Library Resource Sharing", description: "- accommodates the researcher from other schools and government organizations." },
  { title: "Library Orientation", description: "- provides a good understanding of the library's objectives, facilities, resources and services." },
  { title: "Library Instruction", description: "- its goal is to teach, educate and evaluate students on how to use the library effectively." },
  { title: "Book Display/New Arrival", description: "- bibliographic of newly processed books is posted on the bulletin board. These books are displayed in the new arrival area. Members of the faculty are given the priority to examine and borrow these books." },
  { title: "Bibliographic Assistance", description: "- librarians prepare bibliographies on certain subjects upon request by students and faculty." },
  { title: "Acquisition List", description: "- technical librarian prepares and distribute acquisition lists which enumerate the materials acquired by the library in certain period within the semester. The lists are written in bibliographic format." },
  { title: "Book Selection", description: "- faculty are encouraged actively to participate in the selection of books for the library. Forms on which to write the complete bibliographic information of the books to be recommended are available at the librarian's desk." }
];

// Logic para sa pag-scroll
function handleScroll() {
  showScrollTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>