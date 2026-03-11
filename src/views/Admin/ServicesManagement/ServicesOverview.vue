<template>
  <div class="relative w-full min-h-screen pb-20 font-poppins antialiased text-[#0d2b0f] flex flex-col items-center overflow-x-hidden bg-[#f8fafc]">
    
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
    <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-100/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse animation-delay-2000"></div>

    <div class="relative z-10 w-full max-w-7xl px-6 pt-16">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="h-[2px] w-8 bg-yellow-500"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">System Administrator</span>
          </div>
          <h1 class="text-6xl md:text-8xl font-[1000] uppercase tracking-tighter leading-none">
            Library<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0d2b0f] to-green-600">Portal</span>
          </h1>
        </div>
        <div class="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">AD</div>
          <div class="text-left">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Server</p>
            <p class="text-sm font-black text-[#0d2b0f]">Node_Main_01</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-full">
        
        <div @click="goTo('services')" class="md:col-span-2 md:row-span-2 bento-card group bg-[#0d2b0f] text-white p-10 overflow-hidden relative">
          <div class="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <LayoutGrid :size="180" />
          </div>
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span class="px-4 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest">Module 01</span>
              <h2 class="text-4xl font-black uppercase mt-6 mb-4">Manage<br/>Services</h2>
              <p class="text-white/60 text-sm max-w-xs leading-relaxed">Update your core library offerings, orientation schedules, and digital resource descriptions.</p>
            </div>
            <div class="flex items-center gap-3 font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
              Launch Interface <ArrowRight :size="16" class="text-yellow-500" />
            </div>
          </div>
        </div>

        <div @click="goTo('records')" class="md:col-span-2 bento-card group bg-white p-8 flex items-center gap-8 border border-gray-100 shadow-sm hover:shadow-xl">
          <div class="w-24 h-24 rounded-3xl bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-500">
            <Database :size="40" />
          </div>
          <div>
            <h3 class="text-2xl font-black uppercase tracking-tight">Database Records</h3>
            <p class="text-gray-400 text-xs mt-1">Student logs & Book Inventory</p>
          </div>
        </div>

        <div @click="goTo('gallery')" class="bento-card group bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl text-center">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <ImageIcon :size="28" />
          </div>
          <h3 class="font-black uppercase text-sm tracking-widest">Gallery</h3>
          <p class="text-[10px] text-gray-400 mt-2">24 New Uploads</p>
        </div>

        <div @click="goTo('rooms')" class="bento-card group bg-gradient-to-br from-green-500 to-green-700 p-8 text-white shadow-lg hover:shadow-green-200">
          <div class="flex justify-between items-start mb-8">
            <CalendarCheck :size="24" />
            <div class="w-2 h-2 rounded-full bg-white animate-ping"></div>
          </div>
          <h3 class="font-black uppercase text-sm tracking-widest">Reservations</h3>
          <p class="text-white/70 text-[10px] mt-2 italic">Live Room Tracking</p>
        </div>

      </div>
    </div>

    <Transition name="fade">
      <div v-if="currentView !== 'overview'" class="fixed inset-0 z-[100] bg-[#f8fafc] p-10 flex flex-col items-center">
        <button @click="currentView = 'overview'" class="absolute top-10 left-10 flex items-center gap-2 font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
          <ArrowLeft :size="20" /> Return to Command
        </button>
        <div class="mt-20 text-center">
          <h2 class="text-7xl font-black uppercase tracking-tighter opacity-10 mb-[-40px]">{{ currentView }}</h2>
          <h2 class="text-5xl font-black uppercase tracking-tighter relative z-10">Active Session: {{ currentView }}</h2>
          <div class="mt-12 p-20 border-2 border-dashed border-gray-200 rounded-[4rem] text-gray-400">
            Interface for <b>{{ currentView }}</b> is loading...
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  LayoutGrid, 
  Image as ImageIcon, 
  Database, 
  CalendarCheck, 
  ArrowRight,
  ArrowLeft
} from 'lucide-vue-next'

const currentView = ref('overview')

const goTo = (view) => {
  currentView.value = view
}
</script>

<style scoped>
.bento-card {
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
}

.bento-card:hover {
  transform: scale(0.98);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}
.animation-delay-2000 { animation-delay: 2s; }
</style>