<template>
<<<<<<< HEAD
  <div class="flex h-screen w-full overflow-hidden bg-[#051108]">

    <Sidebar />

    <main class="flex-1 overflow-y-auto">
      <div class="w-full min-h-screen py-8 px-4 md:px-12 bg-[#051108] text-slate-200" style="font-family: 'Poppins', sans-serif;">
        
        <header class="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-1">
            <h2 class="text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <div class="p-2 bg-gradient-to-br from-orange-400 to-orange-400 rounded-2xl shadow-lg shadow-orange-900/20">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              Web Overview
            </h2>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <aside class="lg:col-span-3 space-y-6">
            <div class="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl shadow-inner">
              <p class="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 px-4">Navigation Map</p>
              
              <nav class="space-y-2">
                <div class="rounded-[2rem] overflow-hidden transition-all" :class="activePage === 'home' ? 'bg-white/[0.05] p-2' : ''">
                  <button 
                    @click="activePage = 'home'; activeSubSection = 'carousel'"
                    :class="activePage === 'home' ? 'text-white' : 'text-white/40 hover:text-white/70'"
                    class="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all"
                  >
                    <div class="flex items-center gap-3">
                      <div :class="activePage === 'home' ? 'bg-orange-500 shadow-orange-400/50' : 'bg-white/10'" class="w-1.5 h-6 rounded-full transition-all shadow-lg"></div>
                      Home Page
                    </div>
                    <svg :class="activePage === 'home' ? 'rotate-180 text-orange-400' : 'text-white/20'" class="w-4 h-4 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  
                  <div v-if="activePage === 'home'" class="mt-2 space-y-1">
                    <button 
                      v-for="sub in homeSubSections" :key="sub.id"
                      @click="activeSubSection = sub.id"
                      :class="activeSubSection === sub.id ? 'bg-white/10 text-orange-400 shadow-lg' : 'text-white/40 hover:bg-white/5'"
                      class="w-full text-left py-3 px-10 text-xs font-bold rounded-xl transition-all flex items-center gap-3"
                    >
                      <div class="w-1 h-1 rounded-full bg-current"></div> {{ sub.name }}
                    </button>
                  </div>
                </div>

                <button 
                  @click="activePage = 'about'; activeSubSection = 'banner'"
                  :class="activePage === 'about' ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:bg-white/5'"
                  class="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all"
                >
                  <div class="flex items-center gap-3">
                    <div :class="activePage === 'about' ? 'bg-orange-400 shadow-orange-400/50' : 'bg-white/10'" class="w-1.5 h-6 rounded-full transition-all shadow-lg"></div>
                    About Us
                  </div>
                </button>
              </nav>
            </div>
          </aside>

          <main class="lg:col-span-9 space-y-8 pb-24">
            
            <section v-if="activePage === 'home' && activeSubSection === 'carousel'" class="animate-fade-in">
              <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
                <div class="p-10 bg-gradient-to-br from-[#1a3d21] via-[#0B2010] to-[#051108] flex items-center justify-between text-white border-b border-white/5">
                  <div>
                    <h4 class="font-black text-2xl tracking-tighter">Hero Carousel</h4>
                    <p class="text-green-400/60 text-[10px] font-bold uppercase tracking-widest mt-1">Management for landing page slides</p>
                  </div>
                  <button @click="goToEditor('New Slide', 'new.jpg')" class="px-6 py-3 bg-orange-400 hover:bg-orange-500 rounded-2xl text-xs font-black transition-all shadow-xl shadow-orange-900/40 transform active:scale-95 uppercase tracking-widest">
                    Add Slide
                  </button>
                </div>
                
                <div class="p-8 grid grid-cols-1 gap-4">
                  <div v-for="n in 3" :key="n" class="flex flex-col md:flex-row md:items-center gap-8 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all group">
                    <div class="w-full md:w-44 h-28 bg-slate-200 rounded-[1.5rem] overflow-hidden border border-slate-300 relative">
                       <div class="absolute inset-0 flex items-center justify-center text-slate-400 font-black text-[10px] italic bg-slate-100 uppercase tracking-widest">
                         Slide {{n}} Preview
                       </div>
                    </div>
                    <div class="flex-1 space-y-1 text-center md:text-left">
                      <span class="px-3 py-1 bg-orange-100 text-orange-400 rounded-full text-[9px] font-black uppercase tracking-widest">Carousel Slot {{n}}</span>
                      <h5 class="text-[#0B2010] font-black text-lg">Main_Hero_Asset_{{n}}.webp</h5>
                    </div>
                    <div class="flex gap-3 justify-center">
                      <button @click="goToEditor(`Hero Slide #${n}`, `hero_${n}.jpg`)" class="px-8 py-4 bg-[#0B2010] hover:bg-orange-400 text-white rounded-2xl text-xs font-black shadow-lg transition-all transform hover:-translate-y-1">
                        Change Picture
                      </button>
                      <button class="p-4 text-red-300 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section v-if="activePage === 'home' && activeSubSection === 'cards'" class="animate-fade-in">
              <div class="bg-white rounded-[3rem] shadow-2xl p-10 border border-white/10">
                <header class="mb-10 text-center md:text-left">
                   <h4 class="text-[#0B2010] font-black text-3xl tracking-tighter">Feature Cards</h4>
                   <p class="text-slate-400 text-sm mt-1">Configure icons and representative images for the main services.</p>
                </header>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div v-for="tag in ['Read', 'Learn', 'Discover']" :key="tag" 
                    @click="goToEditor(`${tag} Card`, `lib-${tag.toLowerCase()}.jpg`)"
                    class="group relative"
                  >
                    <div class="aspect-[4/5] bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 group-hover:border-green-700 group-hover:bg-green-50/30 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-8 overflow-hidden">
                       <div class="absolute top-6 right-6 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-300 group-hover:text-green-700 transition-colors">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                       </div>
                       
                       <div class="w-20 h-20 bg-white shadow-xl rounded-[1.5rem] mb-6 flex items-center justify-center text-green-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       </div>
                       
                       <h5 class="font-black text-[#0B2010] tracking-widest text-lg uppercase">{{ tag }}</h5>
                       <p class="text-[9px] font-black text-green-700/80 mt-2 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Change Picture</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section v-if="activePage === 'about'" class="animate-fade-in">
              <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
                <div class="p-10 border-b border-slate-100">
                   <h4 class="text-[#0B2010] font-black text-2xl tracking-tighter">About Us Banner</h4>
                   <p class="text-slate-400 text-sm">Wide aspect ratio image for the page header.</p>
                </div>
                
                <div class="p-10">
                  <div class="relative group rounded-[3rem] overflow-hidden bg-[#051108] aspect-[21/9] shadow-2xl border border-white/5">
                    
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-white/10 group-hover:opacity-40 transition-opacity">
                      <svg class="w-24 h-24 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2V7h2v10z"/></svg>
                      <p class="font-black italic text-xl uppercase tracking-widest">High Definition Asset</p>
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0B2010] via-[#0B2010]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-md">
                      
                      <button 
                        @click="goToEditor('About Us Banner', 'about-bg.jpg')" 
                        class="px-10 py-5 bg-[#0B2010] text-white border border-white/20 font-black rounded-2xl shadow-2xl hover:bg-orange-400 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Replace Banner
                      </button>

                      <p class="text-white/70 text-[10px] font-bold mt-5 uppercase tracking-[0.4em]">
                        Recommended: 2560 x 1080 px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </main>
=======
  <div class="w-full min-h-screen py-8 px-4 md:px-12 bg-white text-gray-800" style="font-family: 'Poppins', sans-serif;">
    <header class="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-1">
        <h2 class="text-4xl font-black text-[#0B2010] tracking-tight flex items-center gap-3">
          <div class="p-2 bg-orange-400 rounded-2xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          Web Overview
        </h2>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <!-- SIDEBAR -->
      <aside class="lg:col-span-3 space-y-6">
        
        <div class="bg-gradient-to-br from-[#1a3d21] via-[#0B2010] to-[#051108] border border-green-900 rounded-[2.5rem] p-6 shadow-sm text-white">

          <p class="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-6 px-4">
            Navigation Map
          </p>
          
          <nav class="space-y-2">

            <!-- HOME -->
            <div class="rounded-[2rem] overflow-hidden transition-all"
              :class="activePage === 'home' ? 'bg-white/10 p-2' : ''">

              <button 
                @click="activePage = 'home'; activeSubSection = 'carousel'"
                :class="activePage === 'home' ? 'text-white' : 'text-white/70 hover:text-white'"
                class="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all"
              >
                <div class="flex items-center gap-3">
                  <div
                    :class="activePage === 'home' ? 'bg-orange-400' : 'bg-white/30'"
                    class="w-1.5 h-6 rounded-full transition-all">
                  </div>

                  Home Page
                  
                </div>

                <svg
                  :class="activePage === 'home' ? 'rotate-180 text-orange-400' : 'text-white/40'"
                  class="w-4 h-4 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- HOME SUBMENU -->
              <div v-if="activePage === 'home'" class="mt-2 space-y-1">

                <button
                  v-for="sub in homeSubSections"
                  :key="sub.id"
                  @click="activeSubSection = sub.id"
                  :class="activeSubSection === sub.id
                  ? 'bg-white/10 text-orange-400 shadow'
                  : 'text-white/70 hover:bg-white/5'"

                  class="w-full text-left py-3 px-10 text-xs font-bold rounded-xl transition-all flex items-center gap-3"
                >
                  <div class="w-1 h-1 rounded-full bg-current"></div>
                  {{ sub.name }}
                </button>
              </div>
            </div>

            <!-- ABOUT -->
            <button
              @click="activePage = 'about'; activeSubSection = 'banner'"
              :class="activePage === 'about'
              ? 'bg-white/10 text-white shadow'
              : 'text-white/70 hover:bg-white/5'"

              class="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all">
              <div class="flex items-center gap-3">
                <div
                  :class="activePage === 'about' ? 'bg-orange-400' : 'bg-white/30'"
                  class="w-1.5 h-6 rounded-full">
                </div>

                About Us

              </div>
            </button>
          </nav>
        </div>
      </aside>


      <!-- MAIN -->
      <main class="lg:col-span-9 space-y-8 pb-24">

        <!-- HERO CAROUSEL -->
        <section v-if="activePage === 'home' && activeSubSection === 'carousel'" class="animate-fade-in">

          <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
            <div class="p-10 bg-gradient-to-br from-[#1a3d21] via-[#0B2010] to-[#051108] flex items-center justify-between text-white border-b border-white/5">
              <div>
                <h4 class="font-black text-2xl tracking-tighter">Hero Carousel</h4>
                <p class="text-green-400/60 text-[10px] font-bold uppercase tracking-widest mt-1">Management for landing page slides</p>
              </div>
              <button @click="goToEditor('New Slide', 'new.jpg')" class="px-6 py-3 bg-orange-400 hover:bg-orange-500 rounded-2xl text-xs font-black transition-all shadow-xl shadow-orange-900/40 transform active:scale-95 uppercase tracking-widest">
                Add Slide
              </button>
            </div>

            <div class="p-8 grid grid-cols-1 gap-4">

              <div v-for="n in 5" :key="n"
                class="flex flex-col md:flex-row md:items-center gap-8 p-6 rounded-[2rem] bg-gray-50 border border-gray-200 hover:shadow-lg transition-all">

                <div class="w-full md:w-44 h-28 bg-gray-200 rounded-[1.5rem] flex items-center justify-center text-gray-500 text-xs font-bold">
                  Slide {{n}} Preview
                </div>

                <div class="flex-1 space-y-1 text-center md:text-left">
                  <span class="px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-xs font-bold">
                    Carousel Slot {{n}}
                  </span>
                  <h5 class="text-gray-900 font-black text-lg">
                    Main_Hero_Asset_{{n}}.webp
                  </h5>
                </div>

                <div class="flex gap-3 justify-center">

                  <button
                    @click="goToEditor(`Hero Slide #${n}`, `hero_${n}.jpg`)"
                    class="px-6 py-3 bg-[#0B2010] hover:bg-orange-500 text-white rounded-xl text-xs font-bold"
                  >
                    Edit Picture
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

         <section v-if="activePage === 'home' && activeSubSection === 'cards'" class="animate-fade-in">
            <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-400">
              <!-- HEADER -->
              <div class="p-10 bg-gradient-to-br from-[#1a3d21] via-[#0B2010] to-[#051108] flex items-center justify-between text-white border-b border-white/10">
                <div>
                  <h4 class="font-black text-2xl tracking-tighter">
                    Feature Cards
                  </h4>
                  <p class="text-green-400/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                    Configure icons and representative images for the main services
                  </p>
                </div>
              </div>

              <!-- CONTENT -->
              <div class="p-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                  <div v-for="tag in ['Read', 'Learn', 'Discover']" :key="tag" 
                    @click="goToEditor(`${tag} Card`, `lib-${tag.toLowerCase()}.jpg`)"
                    class="group relative">

                    <div class="aspect-[4/5] bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-300 group-hover:border-[#0B2010] group-hover:bg-green-50/30 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-8 overflow-hidden">

                      <div class="absolute top-6 right-6 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-300 group-hover:text-green-700 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>

                      <div class="w-20 h-20 bg-white shadow-xl rounded-[1.5rem] mb-6 flex items-center justify-center text-green-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                      <h5 class="font-black text-[#0B2010] tracking-widest text-lg uppercase">{{ tag }}</h5>

                      <p class="text-[9px] font-black text-[#0B2010] mt-2 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Change Picture
                      </p>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

        <!-- ABOUT BANNER -->
        <section v-if="activePage === 'about'" class="animate-fade-in">

          <div class="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-400">

            <div class="p-10 border-b border-gray-300 bg-gradient-to-br from-[#1a3d21] via-[#0B2010] to-[#051108]">
              <h4 class="text-white font-black text-2xl">About Us Banner</h4>
              <p class="text-green-700 text-xs font-bold">
                Wide aspect ratio image for the page header.
              </p>
            </div>

            <div class="p-10">

              <div class="relative group rounded-[3rem] overflow-hidden bg-gray-200 aspect-[21/9] shadow-xl">

                <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">

                  <svg class="w-24 h-24 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                     10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>

                  <p class="font-black italic text-xl uppercase">
                    High Definition Asset
                  </p>

                </div>

                <div class="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center">

                  <button
                    @click="goToEditor('About Us Banner', 'about-bg.jpg')"
                    class="px-10 py-5 bg-orange-400 text-white font-black rounded-2xl shadow-xl hover:bg-orange-500 transition-all"
                  >
                    Replace Banner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
>>>>>>> 68dba52dd2a6da420cb6f59beb0a2072d539abe3
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()

const activePage = ref('home')
const activeSubSection = ref('carousel')

const homeSubSections = [
  { id: 'carousel', name: 'Hero Carousel' },
  { id: 'cards', name: 'Read, Learn, Discover Cards' }
]

<<<<<<< HEAD
const activeSectionLabel = computed(() => {
  if (activePage.value === 'home') {
    const sub = homeSubSections.find(s => s.id === activeSubSection.value)
    return `Home / ${sub ? sub.name : ''}`
  }
  return 'About Us / Header'
})

=======
>>>>>>> 68dba52dd2a6da420cb6f59beb0a2072d539abe3
const goToEditor = (target: string, currentFile: string) => {
  router.push({
    name: 'website-images',
    query: { target, file: currentFile }
  })
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

.animate-fade-in{
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn{
  from{opacity:0;transform:translateY(30px)}
  to{opacity:1;transform:translateY(0)}
}

<<<<<<< HEAD
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #051108; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.4); }
=======
>>>>>>> 68dba52dd2a6da420cb6f59beb0a2072d539abe3
</style>