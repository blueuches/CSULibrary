<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f0f4f1]">

    <!-- SIDEBAR (fixed, never scrolls) -->
    <Sidebar />

    <!-- MAIN CONTENT (scrolls independently) -->
    <main class="report-root flex-1 overflow-y-auto">

      <!-- HEADER -->
      <header class="report-header relative z-[60] overflow-visible">
        <div class="header-left">
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="header-breadcrumb">
              <span>Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>Reporting</span>
            </div>
          </div>
          <h1 class="header-title intro-title">
            Library <span class="text-yellow-500">Reporting</span>
          </h1>
          <p class="header-sub">Generate and review reports by department, course, and duration.</p>
        </div>
      </header>

      <!-- CONTENT -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <!-- LEFT PANEL: Filters -->
          <div class="bg-white rounded-2xl border border-[#c2d4cb] overflow-hidden">

            <!-- Card Header -->
            <div class="px-6 py-4 border-b border-[#d4e4da]">
              <p class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Report Filters</p>
            </div>

            <div class="px-6 py-5 space-y-5">

              <!-- Department -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Department</label>
                <div class="relative">
                  <select
                    v-model="selectedDept"
                    @change="onDeptChange"
                    class="w-full bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-3 py-2 text-sm text-[#0d2b0f] appearance-none outline-none focus:border-[#0d2b0f] transition-colors"
                  >
                    <option value="">— choose department —</option>
                    <option v-for="(_, dept) in departments" :key="dept" :value="dept">{{ dept }}</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4a7060]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </span>
                </div>
              </div>

              <!-- Course -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Course</label>
                <div class="relative">
                  <select
                    v-model="selectedCourse"
                    :disabled="!selectedDept"
                    class="w-full bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-3 py-2 text-sm text-[#0d2b0f] appearance-none outline-none focus:border-[#0d2b0f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="">— choose course —</option>
                    <option v-for="course in availableCourses" :key="course" :value="course">{{ course }}</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4a7060]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </span>
                </div>
              </div>

              <div class="h-px bg-[#d4e4da]" />

              <!-- Duration -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Duration</label>
                <div class="space-y-3">

                  <!-- Specific Day -->
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" v-model="durationType" value="day" class="hidden" />
                    <span
                      class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                      :class="durationType === 'day' ? 'border-[#0d2b0f] bg-[#0d2b0f]' : 'border-[#c2d4cb] bg-[#f0f4f1]'"
                    >
                      <span v-if="durationType === 'day'" class="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span class="text-sm text-[#3d6455]">Specific day</span>
                    <span v-if="durationType === 'day'" class="ml-auto text-xs font-medium text-[#0d2b0f] bg-[#e6f2ec] border border-[#a8ccb8] rounded-lg px-3 py-1">
                      {{ todayLabel }}
                    </span>
                  </label>

                  <!-- Specific Month -->
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="radio" v-model="durationType" value="month" class="hidden" />
                    <span
                      class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                      :class="durationType === 'month' ? 'border-[#0d2b0f] bg-[#0d2b0f]' : 'border-[#c2d4cb] bg-[#f0f4f1]'"
                    >
                      <span v-if="durationType === 'month'" class="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span class="text-sm text-[#3d6455]">Specific month</span>
                    <div v-if="durationType === 'month'" class="ml-auto flex gap-2">
                      <select v-model="selectedMonth" class="bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-2 py-1 text-xs text-[#0d2b0f] outline-none focus:border-[#0d2b0f]">
                        <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                      </select>
                      <select v-model="selectedYear" class="bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-2 py-1 text-xs text-[#0d2b0f] outline-none focus:border-[#0d2b0f]">
                        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                      </select>
                    </div>
                  </label>

                  <!-- Semester -->
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="radio" v-model="durationType" value="semester" class="hidden" />
                    <span
                      class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                      :class="durationType === 'semester' ? 'border-[#0d2b0f] bg-[#0d2b0f]' : 'border-[#c2d4cb] bg-[#f0f4f1]'"
                    >
                      <span v-if="durationType === 'semester'" class="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span class="text-sm text-[#3d6455]">Semester</span>
                    <div v-if="durationType === 'semester'" class="ml-auto">
                      <select v-model="selectedSemester" class="bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-2 py-1 text-xs text-[#0d2b0f] outline-none focus:border-[#0d2b0f]">
                        <option>1st Semester</option>
                        <option>2nd Semester</option>
                        <option>Summer</option>
                      </select>
                    </div>
                  </label>

                </div>
              </div>

              <div class="h-px bg-[#d4e4da]" />

              <!-- Period Range -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Period</label>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-medium text-[#0d2b0f] bg-[#e6f2ec] border border-[#a8ccb8] rounded-lg px-3 py-1.5 flex-1 text-center">{{ todayLabel }}</span>
                  <span class="text-xs text-[#4a7060]">to</span>
                  <span class="text-xs font-medium text-[#0d2b0f] bg-[#e6f2ec] border border-[#a8ccb8] rounded-lg px-3 py-1.5 flex-1 text-center">{{ todayLabel }}</span>
                </div>
              </div>

              <!-- School Year -->
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">School year</span>
                <span class="ml-auto text-xs font-semibold text-[#0d2b0f] bg-[#e6f2ec] border border-[#a8ccb8] rounded-lg px-4 py-1.5">2025 — 2026</span>
              </div>

            </div>
          </div>

          <!-- RIGHT PANEL: Chart Options + Palette -->
          <div class="space-y-6">

            <!-- Chart Display Options -->
            <div class="bg-white rounded-2xl border border-[#c2d4cb] overflow-hidden">
              <div class="px-6 py-4 border-b border-[#d4e4da]">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Chart Display</p>
              </div>
              <div class="px-6 py-5 space-y-3">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="radio" v-model="chartView" value="separate" class="hidden" />
                  <span
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    :class="chartView === 'separate' ? 'border-[#0d2b0f] bg-[#0d2b0f]' : 'border-[#c2d4cb] bg-[#f0f4f1]'"
                  >
                    <span v-if="chartView === 'separate'" class="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  <span class="text-sm text-[#3d6455]">Show separate charts for course and year level</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="radio" v-model="chartView" value="single" class="hidden" />
                  <span
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    :class="chartView === 'single' ? 'border-[#0d2b0f] bg-[#0d2b0f]' : 'border-[#c2d4cb] bg-[#f0f4f1]'"
                  >
                    <span v-if="chartView === 'single'" class="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  <span class="text-sm text-[#3d6455]">Show single chart for course and year level</span>
                </label>
              </div>
            </div>

            <!-- Color Palette -->
            <div class="bg-white rounded-2xl border border-[#c2d4cb] overflow-hidden">
              <div class="px-6 py-4 border-b border-[#d4e4da]">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Color Palette</p>
              </div>
              <div class="px-6 py-5 space-y-4">
                <div class="relative">
                  <select
                    v-model="selectedPalette"
                    class="w-full bg-[#f0f4f1] border border-[#c2d4cb] rounded-lg px-3 py-2 text-sm text-[#0d2b0f] appearance-none outline-none focus:border-[#0d2b0f] transition-colors"
                  >
                    <option v-for="(_, name) in palettes" :key="name" :value="name">{{ name }}</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4a7060]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </span>
                </div>
                <div class="flex gap-2 p-3 bg-[#f0f4f1] rounded-xl border border-[#d4e4da]">
                  <div
                    v-for="color in palettes[selectedPalette]"
                    :key="color"
                    class="w-8 h-8 rounded-md border border-white/10 flex-1"
                    :style="{ background: color }"
                  />
                </div>
              </div>
            </div>

            <!-- Generate Button -->
            <button
              @click="generateReport"
              :disabled="isGenerating"
              class="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              :class="isGenerating ? 'bg-[#8ab5a0] text-[#3d6455]' : 'bg-[#0d2b0f] text-white hover:bg-[#183d1b] active:scale-[0.98]'"
            >
              {{ isGenerating ? 'Generating...' : 'Generate Report' }}
            </button>

            <!-- Progress + Status -->
            <div v-if="isGenerating || statusMsg" class="space-y-2">
              <div class="h-1 w-full bg-[#d4e4da] rounded-full overflow-hidden">
                <div
                  class="h-full bg-[#0d2b0f] rounded-full transition-all duration-300 ease-out"
                  :style="{ width: progress + '%' }"
                />
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full flex-shrink-0"
                  :class="statusColor === 'green' ? 'bg-[#0d2b0f]' : statusColor === 'yellow' ? 'bg-[#b45309]' : 'bg-[#0d2b0f]'"
                />
                <span class="text-xs" :class="statusColor === 'green' ? 'text-[#0d2b0f]' : statusColor === 'yellow' ? 'text-[#b45309]' : 'text-[#0d2b0f]'">
                  {{ statusMsg }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { jsPDF } from 'jspdf'
import Sidebar from '@/components/Sidebar.vue'

// ── Data ──────────────────────────────────────────────────────────────────────

const departments: Record<string, string[]> = {
  'College of Engineering and Geo Science': [
    'BS Agricultural and Biosystem Engineering',
    'BS Civil Engineering',
    'BS Electronics Engineering',
    'BS Geodetic Engineering',
    'BS Geology',
    'BS Mining Engineering'
  ],
  'College of Computing and Information Technology': [
    'BS Information Technology',
    'BS Information System',
    'BS Computer Science'
  ],
  'College of Education': [
    'Bachelor of Secondary Education',
    'Bachelor of Elementary Education'
  ],
  'College of Mathematics and Natural Sciences': [
    'BS Applied Mathematics',
    'BS Biology',
    'BS Chemistry',
    'BS Marine Biology',
    'BS Mathematics',
    'BS Physics'
  ],
  'College of Agriculture and Agri-Industries': [
    'BS Agriculture'
  ],
  'College of Forestry and Environmental Sciences': [
    'BS Agroforestry',
    'BS Environmental Science',
    'BS Forestry'
  ],
  'College of Humanities and Social Sciences': [
    'BA Sociology',
    'BS Psychology',
    'BS Social Work'
  ],
  'Graduate Studies': [
    'Doctor of Education',
    'Master of Arts in Education',
    'Master od Arts in Public Administration',
    'Master of Science Education',
    'Master of Science in Biology',
    'Master of Science in Mathematics',
    'Master of Sceince in Mathematics Education',
    'PHD in Mathematics',
    'PHD in Mathematics Education',
    'PHD in Science Education'
  ],
}

const palettes: Record<string, string[]> = {
  Pastel:     ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D7BAFF', '#FFB3E6'],
  Vivid:      ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#5856D6', '#FF2D55'],
  Monochrome: ['#F5F5F5', '#DCDCDC', '#C0C0C0', '#A0A0A0', '#787878', '#505050', '#282828'],
  Ocean:      ['#CAF0F8', '#90E0EF', '#48CAE4', '#00B4D8', '#0096C7', '#0077B6', '#023E8A'],
  Sunset:     ['#FFCA3A', '#FF924C', '#FF595E', '#C9184A', '#9D0208', '#6A040F', '#370617'],
}

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const years  = ['2024', '2025', '2026']

// ── State ─────────────────────────────────────────────────────────────────────

const selectedDept     = ref('')
const selectedCourse   = ref('')
const durationType     = ref<'day' | 'month' | 'semester'>('day')
const selectedMonth    = ref('March')
const selectedYear     = ref('2026')
const selectedSemester = ref('1st Semester')
const chartView        = ref<'separate' | 'single'>('separate')
const selectedPalette  = ref('Pastel')

const isGenerating = ref(false)
const progress     = ref(0)
const statusMsg    = ref('')
const statusColor  = ref<'blue' | 'yellow' | 'green'>('blue')

// ── Computed ──────────────────────────────────────────────────────────────────

const availableCourses = computed(() =>
  selectedDept.value ? departments[selectedDept.value] : []
)

const todayLabel = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
})

// ── Methods ───────────────────────────────────────────────────────────────────

function onDeptChange() {
  selectedCourse.value = ''
}

async function generateReport() {
  if (!selectedDept.value) {
    statusMsg.value = 'Please select a department first.'
    statusColor.value = 'yellow'
    progress.value = 0
    return
  }

  if (!selectedCourse.value) {
    statusMsg.value = 'Please select a course first.'
    statusColor.value = 'yellow'
    progress.value = 0
    return
  }

  isGenerating.value = true
  statusMsg.value = 'Generating PDF report...'
  statusColor.value = 'blue'
  progress.value = 10

  try {
    const doc = new jsPDF('l', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    const extractedDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const extractedTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    })

    // White background
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Default colors
    doc.setTextColor(40, 40, 40)
    doc.setDrawColor(120, 120, 120)
    doc.setLineWidth(0.4)

    // ===== LOGO PLACEHOLDER =====
    const logoX = 12
    const logoY = 10
    const logoW = 20
    const logoH = 20

    doc.rect(logoX, logoY, logoW, logoH)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.text('LOGO', logoX + (logoW / 2), logoY + 11, { align: 'center' })

    // ===== HEADER =====
    doc.setTextColor(40, 40, 40)

    doc.setFont('times', 'bold')
    doc.setFontSize(20)
    doc.text('Caraga State University', 38, 18)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text('Ampayon, Butuan City', 38, 27)

    doc.setFont('times', 'bold')
    doc.setFontSize(13)
    doc.text(`Extracted: ${extractedDate}`, 210, 18)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(extractedTime, 233, 27)

    doc.setFont('times', 'normal')
    doc.setFontSize(10)

    const headerLine =
      `College: ${selectedDept.value} | Program: ${selectedCourse.value} | Month: ${selectedMonth.value} | Year: ${selectedYear.value} | School Year: 2025 to 2026`

    doc.text(headerLine, 38, 35)

    progress.value = 30

    // ===== LEFT MAIN CONTENT =====
    // increased height so the lower part is occupied more
    const leftX = 18
    const leftY = 42
    const leftW = 165
    const leftH = 122

    doc.setDrawColor(120, 120, 120)
    doc.rect(leftX, leftY, leftW, leftH)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.text('CHART / TABLE AREA', leftX + leftW / 2, leftY + 8, { align: 'center' })

    // sample inner grid placeholder
    doc.setDrawColor(180, 180, 180)

    // more rows to occupy the taller area
    for (let i = 1; i <= 8; i++) {
      const lineY = leftY + 10 + i * 13
      doc.line(leftX + 1, lineY, leftX + leftW - 1, lineY)
    }

    for (let i = 1; i <= 6; i++) {
      const lineX = leftX + i * 24
      doc.line(lineX, leftY + 10, lineX, leftY + leftH - 1)
    }

    progress.value = 55

    // ===== RIGHT LEGEND + DESCRIPTION =====
    // moved slightly up and increased height to match left section better
    const sideX = 192
    const sideY = 48
    const sideW = 85
    const sideH = 108

    doc.setDrawColor(120, 120, 120)
    doc.rect(sideX, sideY, sideW, sideH)
    doc.line(sideX, sideY + 25, sideX + sideW, sideY + 25)

    doc.setFont('times', 'normal')
    doc.setFontSize(10.5)
    doc.setTextColor(40, 40, 40)
    doc.text('Legend:', sideX + 2, sideY + 6)
    doc.text('Horizontal Bar', sideX + 2, sideY + 12)
    doc.text('X-axis', sideX + 2, sideY + 18)
    doc.text('Y-axis', sideX + 2, sideY + 24)

    doc.text('Description:', sideX + 2, sideY + 31)

    const description =
      `The chart presents the selected library report data for ${selectedCourse.value} under ${selectedDept.value}. This report uses a landscape layout with the main visualization on the left and the legend and description panel on the right.`

    const wrappedDesc = doc.splitTextToSize(description, sideW - 4)
    doc.text(wrappedDesc, sideX + 2, sideY + 38)

    progress.value = 80

    // Footer - pushed lower
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(90, 90, 90)
    doc.text('Generated by ACCESS', pageWidth / 2, pageHeight - 4, { align: 'center' })

    progress.value = 100
    doc.save('Library_Report.pdf')

    isGenerating.value = false
    statusMsg.value = 'PDF report generated successfully.'
    statusColor.value = 'green'
  } catch (error) {
    console.error(error)
    isGenerating.value = false
    statusMsg.value = 'Failed to generate PDF report.'
    statusColor.value = 'yellow'
    progress.value = 0
  }
}
</script>

<style scoped>
.report-root {
  font-family: 'DM Sans', sans-serif;
}

.report-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #dfe6dd;
  background: #f0f4f1;
  margin-top: 0;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4a7060;
  margin-bottom: 0.35rem;
}

.header-breadcrumb svg {
  width: 0.9rem;
  height: 0.9rem;
  color: #4a7060;
}

.header-title {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 800;
  color: #0d2b0f;
  line-height: 1.15;
  letter-spacing: -0.01em;
  font-family: 'DM Sans', sans-serif;
}

.header-sub {
  font-size: 0.82rem;
  color: #5b725d;
  font-weight: 400;
  margin-top: 0.15rem;
}
</style>