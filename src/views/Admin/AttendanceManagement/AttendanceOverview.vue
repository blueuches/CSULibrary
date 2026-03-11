<template>
  <div class="w-full py-12 px-6 font-sans antialiased bg-[#FAFDFB] min-h-screen text-slate-900 relative overflow-hidden">
    
    <div class="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-[#228B22]/5 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute top-1/2 -left-24 w-80 h-80 bg-yellow-400/5 rounded-full blur-[100px]"></div>

    <div class="relative z-20 flex flex-col lg:flex-row items-center justify-between mb-12 gap-6 bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-2xl shadow-emerald-950/5">
      <div class="flex items-center gap-6 px-4">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-tr from-[#228B22] to-yellow-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
            <span class="text-xl font-black text-[#006400] leading-none">BIB</span>
            <span class="text-[7px] font-bold text-[#228B22] uppercase tracking-[0.2em]">Portal</span>
          </div>
        </div>
        <div class="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
        <div>
          <h1 class="text-2xl font-black text-[#006400] tracking-tighter">Library Intelligence</h1>
          <p class="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#228B22] animate-ping"></span>
            System Node: Active
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-3 bg-slate-50/50 p-2 rounded-[1.8rem] border border-slate-100">
        <button v-for="tab in ['Overview', 'Insights', 'Admin']" :key="tab"
          @click="activeTab = tab"
          :class="activeTab === tab ? 'bg-white shadow-md text-[#006400]' : 'text-slate-400 hover:text-slate-600'"
          class="px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-10 items-start relative z-10">
      
      <div class="xl:col-span-2 space-y-8">
        <div class="relative group p-1 bg-gradient-to-b from-white to-emerald-50 rounded-[5rem] shadow-sm border border-white">
          <div class="relative z-10 w-full aspect-square bg-white rounded-[4.8rem] shadow-2xl shadow-emerald-950/5 flex flex-col items-center justify-center text-center overflow-hidden">
            
            <div class="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div class="w-48 h-48 border border-[#228B22] rounded-full animate-ping"></div>
              <div class="absolute w-80 h-80 border border-[#228B22]/30 rounded-full animate-[ping_3s_infinite]"></div>
            </div>
            
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 relative z-10">Live Occupancy</p>
            <div class="relative inline-block">
               <h2 class="text-[9rem] font-black text-[#006400] tracking-tighter leading-none mb-2">94<span class="text-4xl text-[#228B22]">%</span></h2>
               <div class="absolute -right-8 top-4 bg-yellow-400 text-[#006400] px-3 py-1 rounded-full text-[10px] font-black italic shadow-lg shadow-yellow-400/30">MAX</div>
            </div>
            
            <div class="mt-6 flex items-center gap-6">
               <div class="text-center">
                 <p class="text-[10px] font-bold text-slate-400 uppercase">Incoming</p>
                 <p class="text-xl font-black text-[#006400]">+24</p>
               </div>
               <div class="w-[1px] h-8 bg-slate-100"></div>
               <div class="text-center">
                 <p class="text-[10px] font-bold text-slate-400 uppercase">Outgoing</p>
                 <p class="text-xl font-black text-slate-400">-12</p>
               </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
           <div class="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <p class="text-[9px] font-black text-[#228B22] uppercase mb-4 tracking-widest">Available Seats</p>
              <div class="flex items-end justify-between">
                <p class="text-4xl font-black text-[#006400]">18</p>
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#228B22] flex items-center justify-center group-hover:bg-[#228B22] group-hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
           </div>
           <div class="bg-[#006400] p-6 rounded-[2.5rem] shadow-xl text-white">
              <p class="text-[9px] font-bold text-emerald-300 uppercase mb-4 tracking-widest">Wait Time</p>
              <div class="flex items-end justify-between">
                <p class="text-4xl font-black">~4<span class="text-sm">m</span></p>
                <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div class="xl:col-span-3 space-y-8">
        
        <div class="flex items-center justify-between px-2">
          <div>
            <h3 class="text-3xl font-black text-[#006400] tracking-tighter italic">Data Orchestration</h3>
            <p class="text-slate-400 text-xs font-medium">Fine-tune the intelligence parameters below.</p>
          </div>
          <button class="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="(filter, idx) in filters" :key="filter.label" 
               @click="toggleFilter(idx)"
               class="relative group cursor-pointer">
            <div :class="filter.active ? 'bg-[#006400] shadow-2xl shadow-emerald-900/20 translate-y-[-4px]' : 'bg-white hover:border-[#228B22]/30'"
                 class="p-8 rounded-[3rem] border border-slate-100 transition-all duration-500 overflow-hidden relative active:scale-95">
              
              <div v-if="filter.active" class="absolute right-0 bottom-0 text-white/5 opacity-20 transform translate-x-4 translate-y-4">
                <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>

              <div class="flex justify-between items-center mb-6">
                <span class="text-[10px] font-black uppercase tracking-[0.2em]"
                      :class="filter.active ? 'text-emerald-300' : 'text-slate-400'">
                  STEP 0{{ idx + 1 }}
                </span>
                <div v-if="filter.active" class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
              </div>
              
              <div class="relative">
                <p class="text-[10px] font-bold uppercase mb-1" :class="filter.active ? 'text-emerald-100/50' : 'text-slate-300'">{{ filter.label }}</p>
                <select @click.stop class="w-full bg-transparent border-none text-2xl font-black tracking-tighter focus:ring-0 cursor-pointer outline-none appearance-none p-0 relative z-10"
                        :class="filter.active ? 'text-white' : 'text-[#006400]'">
                  <option v-for="opt in filter.options" :key="opt" class="text-[#006400] bg-white">{{ opt }}</option>
                </select>
                <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" :class="filter.active ? 'text-white' : 'text-[#228B22]'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 9l4 4 4-4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#FAFDFB] p-1.5 rounded-[4rem] border border-slate-200 shadow-inner group transition-all">
          <div class="bg-white p-10 rounded-[3.8rem] flex flex-col lg:flex-row items-center gap-10">
            <div class="flex-1 w-full">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Historical Anchor</label>
              </div>
              <input type="date" class="w-full bg-transparent border-none text-4xl font-black text-[#006400] focus:ring-0 outline-none cursor-pointer tracking-tighter p-0" />
            </div>
            
            <button class="w-full lg:w-auto px-12 py-6 bg-[#006400] text-white rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#228B22] hover:shadow-2xl hover:shadow-emerald-900/40 transition-all active:scale-95">
              Sync Analysis
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('Overview')

const filters = ref([
  { label: 'Yearly Scope', active: true, options: ['Academic Year 2026', 'Academic Year 2025'] },
  { label: 'Monthly Term', active: false, options: ['March (Active)', 'February', 'January'] },
  { label: 'Week Range', active: false, options: ['Week 09', 'Week 08', 'Week 07'] },
  { label: 'Term Type', active: false, options: ['All Terms', 'Spring Semester', 'Fall Semester'] }
])

const toggleFilter = (index: number) => {
  filters.value.forEach((f, i) => {
    if (i === index) f.active = !f.active
    else f.active = false
  })
}
</script>

<style scoped>
/* High-End Date Picker Styling */
input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: transparent;
    cursor: pointer;
    transform: scale(2);
    filter: opacity(0);
    position: absolute;
    right: 0;
    width: 100%;
}

/* Typography Fluidity */
h2 {
  line-height: 0.85;
}

/* Hide scrollbars but allow scrolling for mobile responsiveness */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Custom Animation for Ping */
@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>