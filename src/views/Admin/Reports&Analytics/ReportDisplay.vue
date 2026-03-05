<template>
  <div class="report-root">
    <!-- PAGE HEADER -->
    <header class="report-header">
      <div class="header-left">
        <div class="header-breadcrumb">
          <span>Admin</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span>Reports & Analytics</span>
        </div>
        <h1 class="header-title">Report Display</h1>
        <p class="header-sub">Library borrowing rankings — {{ currentPeriod }}</p>
      </div>
      <div class="header-right">
        <div class="date-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>{{ currentDate }}</span>
        </div>
        <button class="export-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          Export Report
        </button>
      </div>
    </header>

    <!-- STEPPER -->
    <div class="stepper-wrap">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="stepper-item"
        :class="{ 'stepper-item--active': activeStep === i, 'stepper-item--done': activeStep > i }"
        @click="activeStep = i"
      >
        <div class="stepper-circle">
          <span>{{ i + 1 }}</span>
        </div>
        <div class="stepper-label">
          <span class="stepper-title">{{ step.title }}</span>
          <span class="stepper-sub">{{ step.sub }}</span>
        </div>
        <div v-if="i < steps.length - 1" class="stepper-line"></div>
      </div>
    </div>

    <!-- STEP 1: TOP BORROWERS -->
    <div v-if="activeStep === 0" class="rank-panel">
      <div class="panel-head">
        <div class="panel-icon" style="background: rgba(13, 43, 15, 0.08); color: #0d2b0f">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h2 class="panel-title">Top Borrowers</h2>
          <p class="panel-sub">Students with most borrowed books</p>
        </div>
        <span
          class="panel-badge"
          style="
            color: #1b5e20;
            background: rgba(27, 94, 32, 0.08);
            border-color: rgba(27, 94, 32, 0.15);
          "
        >
          {{ topBorrowers.length }} students
        </span>
      </div>
      <div class="rank-list">
        <div
          v-for="(item, i) in topBorrowers"
          :key="item.name"
          class="rank-row"
          :style="`animation-delay: ${i * 0.05}s`"
        >
          <div class="rank-medal" :class="medalClass(i)">
            <svg v-if="i < 3" viewBox="0 0 24 24" fill="currentColor" class="medal-ico">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div class="rank-avatar" :style="`background: ${borrowerColor(item.course)}`">
            {{ initials(item.name) }}
          </div>
          <div class="rank-info">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-detail">{{ item.course }} · {{ item.year }}</span>
          </div>
          <div class="rank-right">
            <span class="rank-count">{{ item.books }}</span>
            <span class="rank-unit">books</span>
            <div class="rank-bar-wrap">
              <div
                class="rank-bar"
                :style="`width:${(item.books / (topBorrowers[0]?.books ?? 1)) * 100}%; background: ${borrowerColor(item.course)}`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- STEP 2: TOP COLLEGES -->
    <div v-if="activeStep === 1" class="rank-panel">
      <div class="panel-head">
        <div class="panel-icon" style="background: rgba(249, 168, 37, 0.1); color: #c8930a">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
          </svg>
        </div>
        <div>
          <h2 class="panel-title">Top Colleges</h2>
          <p class="panel-sub">Colleges with highest library usage</p>
        </div>
        <span
          class="panel-badge"
          style="
            color: #c8930a;
            background: rgba(249, 168, 37, 0.08);
            border-color: rgba(249, 168, 37, 0.2);
          "
        >
          {{ topColleges.length }} colleges
        </span>
      </div>
      <div class="rank-list">
        <div
          v-for="(item, i) in topColleges"
          :key="item.name"
          class="rank-row"
          :style="`animation-delay: ${i * 0.05}s`"
        >
          <div class="rank-medal" :class="medalClass(i)">
            <svg v-if="i < 3" viewBox="0 0 24 24" fill="currentColor" class="medal-ico">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div class="rank-emblem" :style="`background: ${collegeColor(item.abbr)}`">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            </svg>
          </div>
          <div class="rank-info">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-detail">{{ item.abbr }} · {{ item.students }} students</span>
          </div>
          <div class="rank-right">
            <span class="rank-count">{{ item.books }}</span>
            <span class="rank-unit">books</span>
            <div class="rank-bar-wrap">
              <div
                class="rank-bar"
                :style="`width:${(item.books / (topColleges[0]?.books ?? 1)) * 100}%; background: ${collegeColor(item.abbr)}`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- STEP 3: TOP DEPARTMENTS -->
    <div v-if="activeStep === 2" class="rank-panel">
      <div class="panel-head">
        <div class="panel-icon" style="background: rgba(2, 119, 189, 0.1); color: #0277bd">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <div>
          <h2 class="panel-title">Top Departments</h2>
          <p class="panel-sub">Departments with highest library usage</p>
        </div>
        <span
          class="panel-badge"
          style="
            color: #0277bd;
            background: rgba(2, 119, 189, 0.08);
            border-color: rgba(2, 119, 189, 0.18);
          "
        >
          {{ topDepartments.length }} depts
        </span>
      </div>
      <div class="rank-list">
        <div
          v-for="(item, i) in topDepartments"
          :key="item.name"
          class="rank-row"
          :style="`animation-delay: ${i * 0.05}s`"
        >
          <div class="rank-medal" :class="medalClass(i)">
            <svg v-if="i < 3" viewBox="0 0 24 24" fill="currentColor" class="medal-ico">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div class="rank-emblem" :style="`background: ${collegeColor(item.college)}`">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div class="rank-info">
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-detail">{{ item.college }}</span>
          </div>
          <div class="rank-right">
            <span class="rank-count">{{ item.books }}</span>
            <span class="rank-unit">books</span>
            <div class="rank-bar-wrap">
              <div
                class="rank-bar"
                :style="`width:${(item.books / (topDepartments[0]?.books ?? 1)) * 100}%; background: ${collegeColor(item.college)}`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

const currentPeriod = 'February 2026'

const activeStep = ref(0)

const steps = [
  { title: 'Top Borrowers', sub: 'Students' },
  { title: 'Top Colleges', sub: 'College' },
  { title: 'Top Departments', sub: 'Department' },
]

/* ── HELPERS ── */
const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

const courseCollege: Record<string, string> = {
  BSCS: 'CCIS',
  BSIT: 'CCIS',
  BSIS: 'CCIS',
  BSCE: 'CEGS',
  BSME: 'CEGS',
  BSGE: 'CEGS',
  BSGEO: 'CEGS',
  BSABE: 'CEGS',
  BSECE: 'CEGS',
  BSEd: 'CED',
  BSMATH: 'CED',
  BSMath: 'CED',
  BSPSYCH: 'CHASS',
  BSABSOCIO: 'CHASS',
  BSF: 'COFES',
  BSN: 'CAA',
  BSBA: 'CMNS',
  BSEE: 'CEGS',
}

const collegeColors: Record<string, string> = {
  CCIS: '#e65100',
  CEGS: '#7b1c2e',
  CMNS: '#c62828',
  CHASS: '#6a1b9a',
  CAA: '#f9a825',
  COFES: '#1b5e20',
  CED: '#0277bd',
}

const avatarColors = [
  '#1b5e20',
  '#f9a825',
  '#0277bd',
  '#6a1b9a',
  '#c62828',
  '#2e7d32',
  '#e65100',
  '#1565c0',
]
const avatarColor = (i: number) => avatarColors[i % avatarColors.length]
const borrowerColor = (course: string) => collegeColors[courseCollege[course] ?? ''] ?? '#0d2b0f'
const collegeColor = (abbr: string) => collegeColors[abbr] ?? '#0d2b0f'

const barColors = ['#1b5e20', '#f9a825', '#c8930a', 'rgba(13,43,15,0.35)']
const barColor = (i: number) => (i < 3 ? barColors[i] : barColors[3])

const medalClass = (i: number) => {
  if (i === 0) return 'medal--gold'
  if (i === 1) return 'medal--silver'
  if (i === 2) return 'medal--bronze'
  return 'medal--plain'
}

/* ── DATA ── */
const topBorrowers = [
  { name: 'Maria Santos', course: 'BSCS', year: '3rd Year', books: 48 },
  { name: 'Juan dela Cruz', course: 'BSEd', year: '4th Year', books: 43 },
  { name: 'Ana Reyes', course: 'BSIT', year: '2nd Year', books: 39 },
  { name: 'Carlo Mendoza', course: 'BSCE', year: '3rd Year', books: 35 },
  { name: 'Liza Navarro', course: 'BSN', year: '4th Year', books: 31 },
  { name: 'Mark Villanueva', course: 'BSBA', year: '2nd Year', books: 28 },
  { name: 'Rosa Catalan', course: 'BSEE', year: '3rd Year', books: 25 },
  { name: 'Jerome Bautista', course: 'BSME', year: '1st Year', books: 22 },
  { name: 'Trisha Abad', course: 'BSF', year: '4th Year', books: 20 },
  { name: 'Nino Espiritu', course: 'BSMATH', year: '3rd Year', books: 18 },
]

const topColleges = [
  {
    name: 'College of Computing and Information Sciences',
    abbr: 'CCIS',
    students: 1842,
    books: 1240,
  },
  { name: 'College of Engineering and Geosciences', abbr: 'CEGS', students: 1620, books: 1085 },
  { name: 'College of Education', abbr: 'CED', students: 1210, books: 920 },
  { name: 'College of Humanities and Social Sciences', abbr: 'CHASS', students: 890, books: 780 },
  { name: 'College of Agriculture and Agri-Industries', abbr: 'CAA', students: 760, books: 640 },
  {
    name: 'College of Forestry and Environmental Sciences',
    abbr: 'COFES',
    students: 540,
    books: 495,
  },
  { name: 'College of Mathematics and Natural Sciences', abbr: 'CMNS', students: 480, books: 420 },
]

const topDepartments = [
  { name: 'BS Information Technology', college: 'CCIS', members: 18, books: 680 },
  { name: 'BS Computer Science', college: 'CCIS', members: 15, books: 560 },
  { name: 'BS Information Systems', college: 'CCIS', members: 14, books: 490 },
  { name: 'BS Civil Engineering', college: 'CEGS', members: 16, books: 445 },
  { name: 'BS Mechanical Engineering', college: 'CEGS', members: 13, books: 390 },
  { name: 'BS Geodetic Engineering', college: 'CEGS', members: 11, books: 350 },
  { name: 'BS Electronics & Comm. Engineering', college: 'CEGS', members: 12, books: 320 },
  { name: 'BS Geology', college: 'CEGS', members: 10, books: 295 },
  { name: 'BS Agricultural & Biosystems Engineering', college: 'CEGS', members: 9, books: 260 },
  { name: 'BS Mathematics', college: 'CED', members: 14, books: 230 },
  { name: 'BS Psychology', college: 'CHASS', members: 11, books: 210 },
  { name: 'BS Sociology', college: 'CHASS', members: 8, books: 185 },
]
</script>

<style scoped>
/* ── ROOT ─────────────────────────────────────────── */
.report-root {
  min-height: 100vh;
  background: #f5f3ef;
  font-family: 'Poppins', sans-serif;
  color: #0d2b0f;
  padding: 32px 36px 80px;
}

/* ── HEADER ───────────────────────────────────────── */
.report-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
}

.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.4);
  margin-bottom: 8px;
}
.header-breadcrumb svg {
  width: 12px;
  height: 12px;
}

.header-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 6px;
}

.header-sub {
  font-size: 0.8rem;
  color: rgba(13, 43, 15, 0.45);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.09);
  border-radius: 10px;
  font-size: 0.73rem;
  font-weight: 600;
  color: rgba(13, 43, 15, 0.55);
  box-shadow: 0 2px 8px rgba(13, 43, 15, 0.05);
}
.date-badge svg {
  width: 14px;
  height: 14px;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background: #0d2b0f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
  transition:
    background 0.2s,
    transform 0.2s;
}
.export-btn:hover {
  background: #1b5e20;
  transform: translateY(-1px);
}
.export-btn svg {
  width: 15px;
  height: 15px;
}

/* ── STEPPER ──────────────────────────────────────── */
.stepper-wrap {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 16px;
  padding: 20px 28px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(13, 43, 15, 0.05);
  gap: 0;
}

.stepper-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
  min-width: 0;
}

.stepper-item:last-child {
  flex: 0 0 auto;
}

.stepper-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 900;
  flex-shrink: 0;
  background: #f0ede7;
  color: rgba(13, 43, 15, 0.35);
  border: 2px solid transparent;
  transition: all 0.25s ease;
}

.stepper-item--active .stepper-circle {
  background: #0d2b0f;
  color: white;
  border-color: #0d2b0f;
  box-shadow: 0 4px 12px rgba(13, 43, 15, 0.25);
}

.stepper-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stepper-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: rgba(13, 43, 15, 0.35);
  white-space: nowrap;
  transition: color 0.25s ease;
}

.stepper-item--active .stepper-title {
  color: #0d2b0f;
}

.stepper-sub {
  font-size: 0.65rem;
  color: rgba(13, 43, 15, 0.3);
  white-space: nowrap;
}

.stepper-item--active .stepper-sub {
  color: rgba(13, 43, 15, 0.5);
}

.stepper-line {
  flex: 1;
  height: 1px;
  background: rgba(13, 43, 15, 0.1);
  margin: 0 16px;
}

/* ── PANEL ────────────────────────────────────────── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rank-panel {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 20px rgba(13, 43, 15, 0.06);
  animation: fadeUp 0.35s ease both;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.07);
  flex-wrap: wrap;
}

.panel-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.panel-icon svg {
  width: 19px;
  height: 19px;
}

.panel-title {
  font-size: 0.92rem;
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.01em;
  margin: 0 0 3px;
}

.panel-sub {
  font-size: 0.68rem;
  color: rgba(13, 43, 15, 0.4);
  margin: 0;
}

.panel-badge {
  margin-left: auto;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── RANK LIST ────────────────────────────────────── */
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rank-list--horizontal {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

.rank-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 10px;
  transition: background 0.18s;
  animation: fadeUp 0.4s ease both;
}
.rank-row:hover {
  background: rgba(13, 43, 15, 0.025);
}

/* ── MEDAL ────────────────────────────────────────── */
.rank-medal {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 900;
  flex-shrink: 0;
}

.medal--gold {
  background: #f9a825;
  color: #0d2b0f;
  box-shadow: 0 2px 8px rgba(249, 168, 37, 0.4);
}
.medal--silver {
  background: rgba(13, 43, 15, 0.12);
  color: #0d2b0f;
}
.medal--bronze {
  background: rgba(180, 90, 40, 0.14);
  color: #7a3a10;
}
.medal--plain {
  background: #f0ede7;
  color: rgba(13, 43, 15, 0.4);
}

.medal-ico {
  width: 13px;
  height: 13px;
}

/* ── AVATAR / EMBLEM ──────────────────────────────── */
.rank-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
  letter-spacing: 0.03em;
}

.rank-emblem {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.85;
}
.rank-emblem svg {
  width: 16px;
  height: 16px;
  stroke: white;
  stroke-width: 2;
}

/* ── RANK INFO ────────────────────────────────────── */
.rank-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rank-name {
  font-size: 0.8rem;
  font-weight: 800;
  color: #0d2b0f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rank-detail {
  font-size: 0.64rem;
  color: rgba(13, 43, 15, 0.42);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── RANK RIGHT ───────────────────────────────────── */
.rank-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
  min-width: 64px;
}

.rank-count {
  font-size: 0.95rem;
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.02em;
  line-height: 1;
}

.rank-unit {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.35);
  margin-top: -2px;
}

.rank-bar-wrap {
  width: 60px;
  height: 4px;
  background: #f0ede7;
  border-radius: 4px;
  overflow: hidden;
}

.rank-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 900px) {
  .rank-list--horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
  .stepper-line {
    margin: 0 8px;
  }
}

@media (max-width: 768px) {
  .report-root {
    padding: 20px 16px 60px;
  }
  .rank-list--horizontal {
    grid-template-columns: 1fr;
  }
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-right {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .stepper-sub {
    display: none;
  }
}
</style>
