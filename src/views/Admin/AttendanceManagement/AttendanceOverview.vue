<template>
  <div class="w-full py-10 px-8 font-sans antialiased bg-[#FAFDFB] min-h-screen text-[#0d2b0f] relative overflow-hidden">
    
    <div class="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-[#0d2b0f]/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 -left-32 w-[35rem] h-[35rem] bg-[#facc15]/5 rounded-full blur-[120px] pointer-events-none"></div>

    <header class="relative z-30 flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
      <div class="space-y-4">
        <nav class="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-slate-400">
          <span class="hover:text-[#0d2b0f] cursor-pointer transition-colors">ADMIN</span>
          <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-width="4"/></svg>
          <span class="text-[#0d2b0f]">ATTENDANCE</span>
        </nav>

        <div class="relative group">
          <h1 class="text-6xl font-black tracking-tighter flex items-center gap-4 transition-transform group-hover:scale-[1.01] duration-500">
            <span class="text-[#0d2b0f]">Library</span>
            <span class="text-[#facc15] drop-shadow-[0_10px_10px_rgba(250,204,21,0.2)]">Attendnce</span>
          </h1>
          <div class="relative h-2.5 w-64 bg-[#0d2b0f] rounded-full mt-3 overflow-visible shadow-sm">
            <div class="absolute -right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-slate-200 border-2 border-white rounded-full shadow-md"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#facc15]/20 to-[#facc15]/80 blur-sm rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col items-end gap-5">
        <div class="flex gap-3">
          <div class="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white shadow-sm flex items-center gap-3">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span class="text-[10px] font-black text-emerald-700 tracking-wider">SYSTEM_NODE: ACTIVE</span>
          </div>
          <div class="bg-[#0d2b0f] px-5 py-2.5 rounded-2xl text-[10px] font-bold text-white shadow-lg shadow-[#0d2b0f]/10">
            March 11, 2026
          </div>
        </div>
        
        <div class="flex items-center gap-1.5 bg-white/40 backdrop-blur-xl p-1.5 rounded-[1.8rem] border border-white/60 shadow-xl shadow-slate-200/40">
          <button v-for="tab in ['Overview', 'Insights', 'Admin']" :key="tab"
            @click="activeTab = tab"
            :class="activeTab === tab ? 'bg-[#0d2b0f] text-white shadow-lg scale-105' : 'text-slate-400 hover:text-[#0d2b0f] hover:bg-white/50'"
            class="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
            {{ tab }}
          </button>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start relative z-20">
      
      <div class="xl:col-span-5 space-y-8">
        <div class="relative group p-2 bg-white rounded-[5rem] shadow-2xl shadow-emerald-950/5 border border-white overflow-hidden">
          <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-[#facc15]/10 rounded-full blur-3xl group-hover:bg-[#facc15]/20 transition-colors duration-700"></div>
          
          <div class="relative z-10 w-full aspect-square bg-white rounded-[4.5rem] flex flex-col items-center justify-center text-center">
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" stroke-width="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#0d2b0f" stroke-width="8" 
                    stroke-dasharray="282.7" 
                    :stroke-dashoffset="282.7 - (282.7 * 0.94)" 
                    stroke-linecap="round" class="transition-all duration-1000 ease-out" />
                </svg>
            </div>
            
            <div class="relative z-10">
              <p class="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Live Occupancy</p>
              <div class="relative inline-block">
                 <h2 class="text-[11rem] font-black text-[#0d2b0f] tracking-tighter leading-none">94</h2>
                 <span class="absolute -right-12 top-10 text-5xl font-black text-[#0d2b0f]/20">%</span>
                 <div class="absolute -right-8 -top-2 bg-[#facc15] text-[#0d2b0f] px-5 py-2 rounded-full text-[13px] font-black italic shadow-xl shadow-yellow-400/30 transform hover:scale-110 transition-transform cursor-default">MAX</div>
              </div>
              
              <div class="mt-12 flex items-center justify-center gap-10">
                 <div class="text-center group/stat">
                   <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover/stat:text-emerald-600 transition-colors">Incoming</p>
                   <p class="text-3xl font-black text-[#0d2b0f] tracking-tighter">+24</p>
                 </div>
                 <div class="w-[1px] h-12 bg-slate-100"></div>
                 <div class="text-center group/stat">
                   <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover/stat:text-slate-600 transition-colors">Outgoing</p>
                   <p class="text-3xl font-black text-slate-300 tracking-tighter">-12</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="xl:col-span-7 space-y-8">
        <div class="flex items-center justify-between px-4">
          <div>
            <h3 class="text-4xl font-black text-[#0d2b0f] tracking-tighter italic">Data Orchestration</h3>
            <p class="text-slate-400 text-sm font-semibold tracking-tight">System parameters and filter matrices.</p>
          </div>
          <button class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:bg-[#0d2b0f] hover:text-white transition-all duration-300 hover:rotate-90">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="(filter, idx) in filters" :key="filter.label" 
               @click="toggleFilter(idx)"
               class="relative group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
            <div :class="filter.active ? 'bg-[#0d2b0f] shadow-2xl shadow-emerald-950/20' : 'bg-white border-slate-100 hover:border-[#facc15]/40'"
                 class="p-10 rounded-[3.8rem] border transition-all duration-500 overflow-hidden relative min-h-[180px] flex flex-col justify-between">
              
              <div v-if="filter.active" class="absolute -right-8 -bottom-8 text-white/5">
                <svg class="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>

              <div class="flex justify-between items-center relative z-10">
                <span class="text-[10px] font-black uppercase tracking-[0.4em]"
                      :class="filter.active ? 'text-[#facc15]' : 'text-slate-300'">
                  STEP 0{{ idx + 1 }}
                </span>
                <div v-if="filter.active" class="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-pulse"></div>
              </div>
              
              <div class="relative z-10 mt-6">
                <p class="text-[11px] font-black uppercase tracking-widest mb-1.5" :class="filter.active ? 'text-white/40' : 'text-slate-300'">{{ filter.label }}</p>
                <div class="flex items-center justify-between gap-2">
                    <select v-model="filter.selected" 
                      @click.stop 
                      @change="filter.active = true"
                      class="bg-transparent border-none text-3xl font-black tracking-tighter focus:ring-0 cursor-pointer outline-none appearance-none p-0 w-full"
                      :class="filter.active ? 'text-white' : 'text-[#0d2b0f]'">
                      <option v-for="opt in filter.options" :key="opt" :value="opt" class="text-[#0d2b0f] font-bold">{{ opt }}</option>
                    </select>
                    <svg class="w-6 h-6 shrink-0 transition-transform group-hover:translate-y-1" 
                         :class="filter.active ? 'text-[#facc15]' : 'text-[#0d2b0f]'" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-3 rounded-[4.5rem] border border-slate-50 shadow-2xl shadow-slate-200/50 group">
          <div class="bg-slate-50/40 p-10 rounded-[4rem] flex flex-col lg:flex-row items-center gap-10 border border-white/80">
            <div class="flex-1 w-full flex items-center gap-8">
              <div class="w-16 h-16 rounded-3xl bg-[#facc15] flex items-center justify-center text-[#0d2b0f] shadow-lg shadow-yellow-400/20 group-hover:rotate-12 transition-transform">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" stroke-width="2.5"/></svg>
              </div>
              <div class="flex-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-1">Historical Anchor Point</label>
                <input type="date" class="w-full bg-transparent border-none text-4xl font-black text-[#0d2b0f] focus:ring-0 outline-none cursor-pointer tracking-tighter p-0 selection:bg-[#facc15]" />
              </div>
            </div>
            
            <button class="w-full lg:w-auto px-16 py-8 bg-[#0d2b0f] text-white rounded-[2.8rem] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-[#153a18] hover:shadow-2xl hover:shadow-[#0d2b0f]/30 transition-all active:scale-95 group/btn overflow-hidden relative">
              <span class="relative z-10">Sync Analysis</span>
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
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

// ENHANCED: Added 'selected' property to track state per filter correctly
const filters = ref([
  { label: 'Yearly Scope', active: true, selected: 'Academic Year 2026', options: ['Academic Year 2026', 'Academic Year 2025'] },
  { label: 'Monthly Term', active: false, selected: 'March (Active)', options: ['March (Active)', 'February', 'January'] },
  { label: 'Week Range', active: false, selected: 'Week 09', options: ['Week 09', 'Week 08', 'Week 07'] },
  { label: 'Term Type', active: false, selected: 'All Terms', options: ['All Terms', 'Spring Semester', 'Fall Semester'] }
])

const toggleFilter = (index: number) => {
  // Logic Fix: Only de-activate others if we are turning one ON
  filters.value.forEach((f, i) => {
    if (i === index) f.active = true
    else f.active = false
  })
}
</script>

<style scoped>
/* Hidden Custom Calendar UI */
input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: transparent;
    cursor: pointer;
    transform: scale(3.5);
    filter: opacity(0);
    position: absolute;
    right: 0;
    width: 100%;
}

h1, h2, h3 {
  line-height: 0.85;
}

/* Custom transition for gauge stroke */
.transition-all {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>