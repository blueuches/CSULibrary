<template>
  <div
    class="w-full min-h-screen font-['Poppins'] bg-[#f7f5f0] pb-20 pt-[40px] relative overflow-hidden"
  >
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1b5e20]/5 blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#2e7d32]/4 blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
      <div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#f9a825]/4 blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
      <svg class="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b5e20" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="w-full px-4 sm:px-8 lg:px-12 relative z-10">

      <!-- Page Header -->
      <div class="page-header mb-10 text-center">
        <div class="flex mt-8 items-center justify-center gap-3">
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
          <span class="text-[10px] font-extrabold tracking-[0.32em] text-[#1a2e1a] uppercase">Library Services Management</span>
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
        </div>
        <h1
          class="analytics-heading text-[#1a2e1a] uppercase mb-2"
          style="font-family: 'Poppins', sans-serif; letter-spacing: -0.02em"
        >
          Book Analytics
        </h1>
        <p class="text-[13px] text-[#888] leading-relaxed max-w-xl mx-auto font-normal tracking-wide">
          Import an accession file to visualize acquisitions, de-accessions, subject distributions, and collection trends for the CSU Library.
        </p>
      </div>

      <!-- Import Panel -->
      <div class="analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden mb-8">
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
              <Upload class="w-5 h-5 text-[#1b5e20]" />
            </div>
            <div>
              <h3 class="text-[13px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Import Accession File</h3>
              <span class="text-[11px] text-[#aaa] font-normal">Accepts .xlsx, .xls, or .csv — rows become analytics data</span>
            </div>
          </div>
          <div v-if="fileName" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e8f5e9] border border-[#1b5e20]/20">
            <FileSpreadsheet class="w-3.5 h-3.5 text-[#1b5e20]" />
            <span class="text-[11px] font-semibold text-[#1b5e20] max-w-[180px] truncate">{{ fileName }}</span>
          </div>
        </div>
        <div class="px-6 py-6">
          <div
            class="drop-zone border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
            :class="isDragging
              ? 'border-[#1b5e20] bg-[#e8f5e9]/60'
              : 'border-[#1b5e20]/25 bg-[#f9fdf9] hover:border-[#1b5e20]/50 hover:bg-[#f1f8e9]/40'"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="isDragging = false"
            @click="triggerFileInput"
          >
            <input ref="fileInput" type="file" class="hidden" accept=".xlsx,.xls,.csv" @change="onFileChange" />
            <div class="flex flex-col items-center gap-3">
              <div class="w-14 h-14 rounded-2xl bg-[#1b5e20]/8 border border-[#1b5e20]/15 flex items-center justify-center">
                <FileSpreadsheet class="w-7 h-7 text-[#1b5e20]/60" />
              </div>
              <div>
                <p class="text-[13px] font-semibold text-[#333]">
                  <span class="text-[#1b5e20] underline underline-offset-2">Click to upload</span> or drag &amp; drop
                </p>
                <p class="text-[11px] text-[#aaa] mt-1">XLSX, XLS, or CSV · Max 20 MB</p>
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="col in expectedColumns"
              :key="col"
              class="px-2.5 py-1 rounded-md bg-[#f1f8e9] border border-[#1b5e20]/15 text-[10px] font-bold tracking-widest uppercase text-[#1b5e20]/70"
            >{{ col }}</span>
            <span class="text-[10px] text-[#aaa] self-center ml-1">— expected column headers</span>
          </div>
        </div>
      </div>

      <!-- KPI Stat Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="(stat, i) in kpiStats"
          :key="stat.label"
          class="analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm px-5 py-5 flex flex-col gap-2"
          :style="`animation-delay:${0.05 + i * 0.07}s`"
        >
          <div class="flex items-start justify-between">
            <div class="p-2 rounded-lg border" :class="stat.iconBg">
              <component :is="stat.icon" class="w-4 h-4" :class="stat.iconColor" />
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="stat.badgeCls">{{ stat.badge }}</span>
          </div>
          <div>
            <p class="text-[26px] font-black text-[#1a2e1a] leading-none">{{ stat.value }}</p>
            <p class="text-[10px] font-bold tracking-widest uppercase text-[#888] mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Row: Acquisitions Timeline + Subject Distribution -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

        <!-- Bar chart (3/5) -->
        <div class="lg:col-span-3 analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.2s">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
                <TrendingUp class="w-4 h-4 text-[#1b5e20]" />
              </div>
              <div>
                <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Acquisitions Timeline</h3>
                <span class="text-[10px] text-[#aaa]">Monthly newly acquired books</span>
              </div>
            </div>
            <select
              v-model="selectedYear"
              class="text-[11px] font-semibold border border-[#1b5e20]/20 bg-[#f9fdf9] rounded-lg px-3 py-1.5 text-[#333] focus:outline-none"
            >
              <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
          <div class="px-6 py-5">
            <svg viewBox="0 0 560 190" class="w-full" xmlns="http://www.w3.org/2000/svg">
              <line v-for="t in [0, 10, 20, 30, 40]" :key="t"
                x1="32" :y1="14 + 148 * (1 - t / 40)" x2="548" :y2="14 + 148 * (1 - t / 40)"
                stroke="#e8f5e9" stroke-width="1" />
              <text v-for="t in [0, 10, 20, 30, 40]" :key="`y${t}`"
                x="26" :y="14 + 148 * (1 - t / 40) + 4"
                font-size="9" fill="#bbb" text-anchor="end" font-family="Poppins">{{ t }}</text>
              <g v-for="bar in chartBars" :key="bar.label">
                <rect
                  :x="bar.x" :y="bar.y" :width="bar.w" :height="bar.h" rx="3"
                  :fill="bar.highlight ? '#1b5e20' : '#a5d6a7'"
                  class="chart-bar" :style="`animation-delay:${bar.delay}s`"
                />
                <text :x="bar.cx" y="177" font-size="9" fill="#aaa" text-anchor="middle" font-family="Poppins">{{ bar.label }}</text>
                <text v-if="bar.val > 0" :x="bar.cx" :y="bar.y - 4"
                  font-size="9" :fill="bar.highlight ? '#1b5e20' : '#aaa'"
                  font-weight="700" text-anchor="middle" font-family="Poppins">{{ bar.val }}</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Subject bars (2/5) -->
        <div class="lg:col-span-2 analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.25s">
          <div class="flex items-center gap-3 px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
              <PieChart class="w-4 h-4 text-[#1b5e20]" />
            </div>
            <div>
              <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Subject Distribution</h3>
              <span class="text-[10px] text-[#aaa]">Top categories by count</span>
            </div>
          </div>
          <div class="px-6 py-5 flex flex-col gap-3">
            <div v-for="(s, i) in subjects" :key="s.name" class="subject-row" :style="`animation-delay:${0.07 * i}s`">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[11px] font-semibold text-[#333] truncate max-w-[65%]">{{ s.name }}</span>
                <span class="text-[10px] font-bold text-[#1b5e20]">{{ s.count }} <span class="text-[#bbb] font-normal">({{ s.pct }}%)</span></span>
              </div>
              <div class="h-[6px] rounded-full bg-[#e8f5e9] overflow-hidden">
                <div class="h-full rounded-full bg-[#1b5e20] bar-fill" :style="`--target-w:${s.pct}%; animation-delay:${0.1 * i}s`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row: Newly Acquired + De-Accession -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <!-- Newly Acquired -->
        <div class="analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.3s">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
                <BookPlus class="w-4 h-4 text-[#1b5e20]" />
              </div>
              <div>
                <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Newly Acquired Books</h3>
                <span class="text-[10px] text-[#aaa]">March 2026</span>
              </div>
            </div>
            <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b5e20] border border-[#1b5e20]/20">
              {{ newlyAcquired.length }} books
            </span>
          </div>
          <div class="divide-y divide-[#f0f7f0] max-h-[280px] overflow-y-auto">
            <div
              v-for="(book, i) in newlyAcquired"
              :key="i"
              class="px-6 py-3 flex items-start gap-3 hover:bg-[#f9fdf9] transition-colors book-row"
              :style="`animation-delay:${0.04 * i}s`"
            >
              <div class="w-6 h-6 rounded-md bg-[#1b5e20]/8 border border-[#1b5e20]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen class="w-3 h-3 text-[#1b5e20]" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-[12px] font-semibold text-[#1a2e1a] leading-tight truncate">{{ book.title }}</p>
                <p class="text-[10px] text-[#aaa] mt-0.5">{{ book.author }} · {{ book.subject }}</p>
              </div>
              <span class="text-[10px] font-bold text-[#f9a825] flex-shrink-0 pt-0.5">Acc#{{ book.accNo }}</span>
            </div>
          </div>
        </div>

        <!-- De-Accession -->
        <div class="analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.35s">
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#fce4ec]/60 bg-gradient-to-r from-[#fce4ec]/30 to-white">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-red-50 border border-red-100">
                <BookX class="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-red-500">De-Accession Books</h3>
                <span class="text-[10px] text-[#aaa]">Withdrawn / removed from collection</span>
              </div>
            </div>
            <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-100">
              {{ deAccessioned.length }} books
            </span>
          </div>
          <div class="divide-y divide-[#fff0f0] max-h-[280px] overflow-y-auto">
            <div
              v-for="(book, i) in deAccessioned"
              :key="i"
              class="px-6 py-3 flex items-start gap-3 hover:bg-[#fff5f5] transition-colors book-row"
              :style="`animation-delay:${0.04 * i}s`"
            >
              <div class="w-6 h-6 rounded-md bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookX class="w-3 h-3 text-red-400" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-[12px] font-semibold text-[#1a2e1a] leading-tight truncate">{{ book.title }}</p>
                <p class="text-[10px] text-[#aaa] mt-0.5">{{ book.author }} · {{ book.subject }}</p>
              </div>
              <div class="flex flex-col items-end flex-shrink-0">
                <span class="text-[10px] font-bold text-red-400">Acc#{{ book.accNo }}</span>
                <span class="text-[9px] text-[#ccc]">{{ book.dateRemoved }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row: Publication Year + Language Split -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <!-- Pub Year Brackets (2/3) -->
        <div class="lg:col-span-2 analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.4s">
          <div class="flex items-center gap-3 px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
              <CalendarDays class="w-4 h-4 text-[#1b5e20]" />
            </div>
            <div>
              <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Books by Publication Year</h3>
              <span class="text-[10px] text-[#aaa]">Distribution across decade brackets</span>
            </div>
          </div>
          <div class="px-6 py-5 flex flex-col gap-3.5">
            <div v-for="(br, i) in pubBrackets" :key="br.label" class="pub-row" :style="`animation-delay:${0.06 * i}s`">
              <div class="flex items-center gap-3">
                <span class="text-[11px] font-bold text-[#555] w-24 flex-shrink-0">{{ br.label }}</span>
                <div class="flex-1 h-[8px] rounded-full bg-[#e8f5e9] overflow-hidden">
                  <div class="h-full rounded-full bar-fill" :style="`--target-w:${br.pct}%; background:${br.color}; animation-delay:${0.1 * i}s`"></div>
                </div>
                <span class="text-[11px] font-bold text-[#1b5e20] w-12 text-right flex-shrink-0">{{ br.count.toLocaleString() }}</span>
                <span class="text-[10px] text-[#bbb] w-8 text-right flex-shrink-0">{{ br.pct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Language Donut (1/3) -->
        <div class="analytics-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden" style="animation-delay:0.45s">
          <div class="flex items-center gap-3 px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
              <Languages class="w-4 h-4 text-[#1b5e20]" />
            </div>
            <div>
              <h3 class="text-[12px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Language Split</h3>
              <span class="text-[10px] text-[#aaa]">By book language</span>
            </div>
          </div>
          <div class="px-6 py-5">
            <div class="flex justify-center mb-5">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="50" fill="none" stroke="#e8f5e9" stroke-width="22" />
                <!-- English 72% → dash 226.2 -->
                <circle cx="70" cy="70" r="50" fill="none" stroke="#1b5e20" stroke-width="22"
                  stroke-dasharray="226 88" stroke-dashoffset="-78.5"
                  class="donut-seg" style="animation-delay:0s" />
                <!-- Filipino 15% → 47.1 -->
                <circle cx="70" cy="70" r="50" fill="none" stroke="#66bb6a" stroke-width="22"
                  stroke-dasharray="47 267" stroke-dashoffset="-304.5"
                  class="donut-seg" style="animation-delay:0.1s" />
                <!-- Spanish 8% → 25.1 -->
                <circle cx="70" cy="70" r="50" fill="none" stroke="#a5d6a7" stroke-width="22"
                  stroke-dasharray="25 289" stroke-dashoffset="-351.5"
                  class="donut-seg" style="animation-delay:0.18s" />
                <!-- Others 5% → 15.7 -->
                <circle cx="70" cy="70" r="50" fill="none" stroke="#f9a825" stroke-width="22"
                  stroke-dasharray="16 298" stroke-dashoffset="-376.5"
                  class="donut-seg" style="animation-delay:0.24s" />
                <text x="70" y="65" font-size="17" font-weight="900" text-anchor="middle" fill="#1a2e1a" font-family="Poppins">1,248</text>
                <text x="70" y="80" font-size="8" text-anchor="middle" fill="#aaa" font-family="Poppins">TOTAL</text>
              </svg>
            </div>
            <div class="flex flex-col gap-2">
              <div v-for="lang in languages" :key="lang.name" class="flex items-center gap-2.5">
                <div class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="`background:${lang.color}`"></div>
                <span class="text-[11px] text-[#555] flex-1">{{ lang.name }}</span>
                <span class="text-[11px] font-bold text-[#333]">{{ lang.pct }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Footer -->
      <div class="analytics-card bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md" style="animation-delay:0.5s">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-white/10 border border-white/15">
            <Library class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-white font-black text-[16px] tracking-tight">CSU Library — Collection Report</p>
            <p class="text-white/60 text-[11px] mt-0.5">Generated · March 10, 2026</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <p class="text-white font-black text-[22px] leading-none">1,248</p>
            <p class="text-white/60 text-[10px] uppercase tracking-widest mt-0.5">Total Books</p>
          </div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center">
            <p class="text-white font-black text-[22px] leading-none">34</p>
            <p class="text-white/60 text-[10px] uppercase tracking-widest mt-0.5">This Month</p>
          </div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center">
            <p class="text-[#f9a825] font-black text-[22px] leading-none">12</p>
            <p class="text-white/60 text-[10px] uppercase tracking-widest mt-0.5">De-Accessioned</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Upload, FileSpreadsheet, BookOpen, BookPlus, BookX,
  TrendingUp, PieChart, CalendarDays, Languages, Library
} from 'lucide-vue-next'

// ── Import UI (visual only) ───────────────────────────────────────────────────
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const fileName = ref('')

function triggerFileInput() {
  fileInput.value?.click()
}
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) fileName.value = file.name
}

// ── Static mock data ──────────────────────────────────────────────────────────

const expectedColumns = [
  'Acc No', 'Title', 'Author', 'Subject',
  'Pub Year', 'Language', 'Status', 'Date Acquired', 'Date Removed'
]

const selectedYear = ref(2026)
const availableYears = [2026, 2025, 2024, 2023]

const kpiStats = [
  {
    label: 'Total Books', value: '1,248', badge: 'Collection', icon: Library,
    iconBg: 'bg-[#1b5e20]/8 border-[#1b5e20]/15', iconColor: 'text-[#1b5e20]', badgeCls: 'bg-[#e8f5e9] text-[#1b5e20]'
  },
  {
    label: 'Newly Acquired', value: '34', badge: 'Mar 2026', icon: BookPlus,
    iconBg: 'bg-[#f9a825]/10 border-[#f9a825]/20', iconColor: 'text-[#f9a825]', badgeCls: 'bg-[#fff3e0] text-[#e65100]'
  },
  {
    label: 'De-Accessioned', value: '12', badge: 'Withdrawn', icon: BookX,
    iconBg: 'bg-red-50 border-red-100', iconColor: 'text-red-400', badgeCls: 'bg-red-50 text-red-500'
  },
  {
    label: 'Subjects', value: '18', badge: '94 authors', icon: PieChart,
    iconBg: 'bg-[#1b5e20]/8 border-[#1b5e20]/15', iconColor: 'text-[#1b5e20]', badgeCls: 'bg-[#e8f5e9] text-[#1b5e20]'
  },
]

// Chart bars — 12 months, March (index 2) highlighted
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const RAW_VALS = [18, 22, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const BAR_AREA_W = 516
const BAR_W = BAR_AREA_W / 12 - 4
const chartBars = MONTHS.map((label, i) => {
  const val = RAW_VALS[i] ?? 0
  const barH = (val / 40) * 148
  const x = 32 + (BAR_AREA_W / 12) * i + 2
  return { x, y: 162 - barH, w: BAR_W, h: barH, cx: x + BAR_W / 2, val, label, highlight: i === 2, delay: 0.04 * i }
})

const subjects = [
  { name: 'Computer Science',  count: 312, pct: 25 },
  { name: 'Engineering',       count: 248, pct: 20 },
  { name: 'Natural Sciences',  count: 199, pct: 16 },
  { name: 'Social Sciences',   count: 175, pct: 14 },
  { name: 'Literature',        count: 150, pct: 12 },
  { name: 'Mathematics',       count: 112, pct: 9  },
  { name: 'General Reference', count: 52,  pct: 4  },
]

const newlyAcquired = [
  { accNo: '24-1101', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell, S.',   subject: 'Computer Science' },
  { accNo: '24-1102', title: 'Design Patterns in Software Engineering',    author: 'Gamma, E.',     subject: 'Engineering'      },
  { accNo: '24-1103', title: 'Organic Chemistry: Principles',              author: 'McMurry, J.',   subject: 'Natural Sciences' },
  { accNo: '24-1104', title: 'Philippine Constitutional Law',              author: 'Bernas, J.',    subject: 'Social Sciences'  },
  { accNo: '24-1105', title: 'Linear Algebra and Its Applications',        author: 'Lay, D.',       subject: 'Mathematics'      },
  { accNo: '24-1106', title: 'Network Security Fundamentals',              author: 'Stallings, W.', subject: 'Computer Science' },
  { accNo: '24-1107', title: 'Fluid Mechanics',                            author: 'Munson, B.',    subject: 'Engineering'      },
  { accNo: '24-1108', title: 'World Literature Anthology',                 author: 'Various',       subject: 'Literature'       },
]

const deAccessioned = [
  { accNo: '98-0042', title: 'BASIC Programming for Beginners',    author: 'Norton, P.',     subject: 'Computer Science',  dateRemoved: 'Feb 12, 2026' },
  { accNo: '97-0118', title: 'Encyclopedia Britannica Vol. 3',     author: 'Various',        subject: 'General Reference', dateRemoved: 'Feb 20, 2026' },
  { accNo: '95-0305', title: 'DOS 6.22 Complete Reference',        author: 'Wolverton, V.', subject: 'Computer Science',  dateRemoved: 'Jan 8, 2026'  },
  { accNo: '99-0211', title: 'Manual of Style (1989 Ed.)',         author: 'Chicago Press',  subject: 'Literature',        dateRemoved: 'Jan 15, 2026' },
  { accNo: '96-0087', title: 'Fortran 77 Programming Guide',       author: 'Etter, D.',      subject: 'Engineering',       dateRemoved: 'Mar 3, 2026'  },
]

const pubBrackets = [
  { label: 'Pre-1970',  count: 48,  pct: 4,  color: '#a5d6a7' },
  { label: '1970–1989', count: 112, pct: 9,  color: '#66bb6a' },
  { label: '1990–1999', count: 198, pct: 16, color: '#43a047' },
  { label: '2000–2009', count: 337, pct: 27, color: '#2e7d32' },
  { label: '2010–2019', count: 424, pct: 34, color: '#1b5e20' },
  { label: '2020–Now',  count: 129, pct: 10, color: '#f9a825' },
]

const languages = [
  { name: 'English',  pct: 72, color: '#1b5e20' },
  { name: 'Filipino', pct: 15, color: '#66bb6a' },
  { name: 'Spanish',  pct: 8,  color: '#a5d6a7' },
  { name: 'Others',   pct: 5,  color: '#f9a825' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.page-header {
  opacity: 0;
  animation: fadeUp 0.5s ease forwards;
}
.analytics-card {
  opacity: 0;
  animation: fadeUp 0.45s ease forwards;
}
.analytics-heading {
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  line-height: 1.02;
  margin: 10px 0 8px;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* SVG bar grow */
.chart-bar {
  transform-origin: bottom;
  transform-box: fill-box;
  opacity: 0;
  animation: barGrow 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes barGrow {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}

/* Horizontal progress bar fill */
.bar-fill {
  width: 0;
  animation: fillBar 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes fillBar {
  to { width: var(--target-w, 0%); }
}

.subject-row, .book-row, .pub-row {
  opacity: 0;
  animation: fadeUp 0.35s ease forwards;
}

/* Donut segments */
.donut-seg {
  opacity: 0;
  animation: donutFade 0.6s ease forwards;
}
@keyframes donutFade {
  to { opacity: 1; }
}

/* Scrollbar */
.overflow-y-auto::-webkit-scrollbar       { width: 4px; }
.overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #c8e6c9; border-radius: 4px; }
</style>