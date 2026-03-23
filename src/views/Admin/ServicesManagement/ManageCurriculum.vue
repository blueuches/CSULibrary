<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar :activeTab="'SERVICES'" />

    <main class="report-root curriculum-root">
      <header class="report-header intro-header">
        <div class="header-left">
          <div class="header-breadcrumb !mb-2">
            <span
              class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/services')"
              >BACK</span
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>MANAGE CURRICULUM</span>
          </div>
          <h1 class="header-title intro-title">
            College <span class="text-yellow-500">Curriculum</span>
          </h1>
          <p class="header-sub">
            Browse colleges, inspect program flow, and review semester subjects in one place.
          </p>
        </div>
      </header>

      <section class="kpi-strip">
        <article class="kpi-card">
          <div class="kpi-body">
            <span class="kpi-label">Visible Colleges</span>
            <span class="kpi-value">{{ filteredColleges.length }}</span>
          </div>
        </article>
        <article class="kpi-card">
          <div class="kpi-body">
            <span class="kpi-label">Programs</span>
            <span class="kpi-value">{{ totalPrograms }}</span>
          </div>
        </article>
        <article class="kpi-card">
          <div class="kpi-body">
            <span class="kpi-label">Open College</span>
            <span class="kpi-value status-value">{{ openCollegeName || 'None' }}</span>
          </div>
        </article>
      </section>

      <section class="panel panel--table curriculum-panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Curriculum Cards</h2>
            <p class="panel-sub">
              Click a college card to open its program and curriculum dropdown list.
            </p>
          </div>
        </div>

        <div class="panel-toolbar">
          <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search college, program, or code..."
            />
          </div>
          <div class="toolbar-actions">
            <span class="toolbar-chip">{{ filteredColleges.length }} matches</span>
            <button type="button" class="toolbar-btn" @click="closeAllCards">Collapse All</button>
            <button v-if="searchQuery" type="button" class="toolbar-btn toolbar-btn--ghost" @click="searchQuery = ''">
              Clear Search
            </button>
            <button v-if="activeCollegeId" type="button" class="toolbar-btn toolbar-btn--ghost" @click="closeAllCards" title="Close expanded card">
              Close Card
            </button>
          </div>
        </div>

        <section class="college-grid">
          <div
            v-for="college in filteredColleges"
            :key="college.code"
            class="college-card"
            :class="[
              { 'college-card--open': isCollegeOpen(college.code) },
              isCollegeOpen(college.code) ? 'border-emerald-500 shadow-xl' : '',
              isCollegeDisabled(college) ? 'college-card--disabled' : '',
            ]"
          >
            <button
              type="button"
              class="college-trigger"
              @click="toggleCollege(college)"
              :aria-expanded="isCollegeOpen(college.code)"
              :disabled="isCollegeDisabled(college)"
            >
              <div class="college-trigger-left">
                <span class="college-code">{{ college.code }}</span>
                <span class="college-name">{{ college.name }}</span>
              </div>
              <div class="college-trigger-right">
                <span v-if="college.programs.length > 0" class="college-count"
                  >{{ college.programs.length }} programs</span
                >
                <span v-else class="college-count">No programs yet</span>
                <svg
                  class="chevron"
                  :class="{ 'chevron--open': isCollegeOpen(college.code) }"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </button>

            <Transition name="college-expand">
              <div v-if="isCollegeOpen(college.code)" class="college-body">
              <p v-if="college.programs.length === 0" class="empty-state-text">
                Graduate program list is not yet added.
              </p>
              <details
                v-for="program in college.programs"
                :key="program.name"
                class="program-accordion"
              >
                <summary>
                  <span class="program-name">{{ program.name }}</span>
                  <span class="program-count">{{ program.curriculum.length }} semesters</span>
                </summary>

                <div class="program-body">
                  <details class="curriculum-accordion">
                    <summary class="curriculum-header">
                      <span>View Curriculum</span>
                      <button
                        type="button"
                        class="edit-curriculum-btn"
                        @click.prevent.stop="editCurriculum(college.code, program.name)"
                      >
                        Edit
                      </button>
                    </summary>

                    <div class="semester-grid">
                      <article
                        v-for="semester in program.curriculum"
                        :key="semester.label"
                        class="semester-card"
                      >
                        <h4>{{ semester.label }}</h4>
                        <ul>
                          <li v-for="subject in semester.subjects" :key="subject">{{ subject }}</li>
                        </ul>
                      </article>
                    </div>
                  </details>
                </div>
              </details>
              </div>
            </Transition>
          </div>

          <article v-if="filteredColleges.length === 0" class="empty-search-card">
            <h3>No curriculum cards found</h3>
            <p>Try a different keyword or clear your search filter.</p>
          </article>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import '@/assets/styles/report-analytics.css'

type SemesterCurriculum = {
  label: string
  subjects: string[]
}

type ProgramCurriculum = {
  name: string
  curriculum: SemesterCurriculum[]
}

type CollegeCurriculum = {
  code: string
  name: string
  programs: ProgramCurriculum[]
  note?: string
}

type CollegeSeed = {
  code: string
  name: string
  programs: string[]
  note?: string
}

const normalizeFocus = (programName: string): string => {
  const fromParentheses = programName.match(/\(([^)]+)\)/)?.[1]

  if (fromParentheses) {
    return fromParentheses.replace('Major in ', '').trim()
  }

  const stripped = programName
    .replace('Bachelor of Science in ', '')
    .replace('Bachelor of Secondary Education ', '')
    .replace('Bachelor of Elementary Education', 'Elementary Education')
    .trim()
  return stripped
}

const makeSubjectCode = (collegeCode: string, focus: string, level: number): string => {
  const token =
    focus
      .replace(/[^A-Za-z]/g, '')
      .toUpperCase()
      .slice(0, 4) || 'CORE'
  return `${collegeCode}-${token}${level}`
}

const buildDummyCurriculum = (collegeCode: string, programName: string): SemesterCurriculum[] => {
  const focus = normalizeFocus(programName)

  return [
    {
      label: 'Year 1 - 1st Semester',
      subjects: [
        'GE 101 Purposive Communication',
        'GE 102 Mathematics in the Modern World',
        `${makeSubjectCode(collegeCode, focus, 101)} Introduction to ${focus}`,
        `${makeSubjectCode(collegeCode, focus, 102)} Basic Laboratory and Field Skills`,
        'NSTP 101 Civic Welfare Training Service 1',
      ],
    },
    {
      label: 'Year 1 - 2nd Semester',
      subjects: [
        'GE 103 Understanding the Self',
        'GE 104 The Contemporary World',
        `${makeSubjectCode(collegeCode, focus, 103)} Fundamentals of ${focus} Systems`,
        `${makeSubjectCode(collegeCode, focus, 104)} Data Collection and Technical Writing`,
        'PATHFIT 102 Exercise-based Fitness Activities',
      ],
    },
    {
      label: 'Year 2 - 1st Semester',
      subjects: [
        'GE 201 Readings in Philippine History',
        `${makeSubjectCode(collegeCode, focus, 201)} Intermediate ${focus} Concepts`,
        `${makeSubjectCode(collegeCode, focus, 202)} Quantitative Methods for ${focus}`,
        `${makeSubjectCode(collegeCode, focus, 203)} Applied Tools and Instrumentation`,
        'ELEC 201 Professional Elective 1',
      ],
    },
    {
      label: 'Year 2 - 2nd Semester',
      subjects: [
        'GE 202 Ethics',
        `${makeSubjectCode(collegeCode, focus, 204)} Community and Extension Applications`,
        `${makeSubjectCode(collegeCode, focus, 205)} Case Studies in ${focus}`,
        `${makeSubjectCode(collegeCode, focus, 206)} Research Methods and Statistics`,
        'ELEC 202 Professional Elective 2',
      ],
    },
    {
      label: 'Year 3 - 1st Semester',
      subjects: [
        'GE 301 Science, Technology and Society',
        `${makeSubjectCode(collegeCode, focus, 301)} Advanced Topics in ${focus}`,
        `${makeSubjectCode(collegeCode, focus, 302)} Policy, Law and Governance`,
        `${makeSubjectCode(collegeCode, focus, 303)} Seminar in Current Issues`,
        'ELEC 301 Professional Elective 3',
      ],
    },
    {
      label: 'Year 3 - 2nd Semester',
      subjects: [
        `${makeSubjectCode(collegeCode, focus, 304)} Project Design and Proposal Writing`,
        `${makeSubjectCode(collegeCode, focus, 305)} Practicum Preparation`,
        `${makeSubjectCode(collegeCode, focus, 306)} Innovation and Entrepreneurship`,
        'GE 302 Rizal: Life and Works',
        'ELEC 302 Professional Elective 4',
      ],
    },
    {
      label: 'Year 4 - 1st Semester',
      subjects: [
        `${makeSubjectCode(collegeCode, focus, 401)} Internship / On-the-Job Training`,
        `${makeSubjectCode(collegeCode, focus, 402)} Research 1: Thesis Writing`,
        `${makeSubjectCode(collegeCode, focus, 403)} Strategic Management in ${focus}`,
        'ELEC 401 Professional Elective 5',
      ],
    },
    {
      label: 'Year 4 - 2nd Semester',
      subjects: [
        `${makeSubjectCode(collegeCode, focus, 404)} Research 2: Thesis Completion`,
        `${makeSubjectCode(collegeCode, focus, 405)} Integrative Capstone`,
        `${makeSubjectCode(collegeCode, focus, 406)} Comprehensive Review`,
        'COLL 401 Career Development and Employability',
      ],
    },
  ]
}

const collegeSeed: CollegeSeed[] = [
  {
    code: 'COFES',
    name: 'College of Forestry and Environmental Sciences',
    programs: [
      'Bachelor of Science in Forestry (General Forestry)',
      'Bachelor of Science in Environmental Science (BSES)',
      'Bachelor of Science in Agroforestry (BSAF)',
    ],
  },
  {
    code: 'CMNS',
    name: 'College of Mathematics and Natural Sciences',
    programs: [
      'Bachelor of Science in Physics',
      'Bachelor of Science in Mathematics',
      'Bachelor of Science in Marine Biology',
      'Bachelor of Science in Chemistry',
      'Bachelor of Science in Biology (Major in Microbiology)',
      'Bachelor of Science in Biology (Major in Medical Biology)',
      'Bachelor of Science in Applied Mathematics',
      'Bachelor of Science in Biodiversity Conservation',
    ],
  },
  {
    code: 'CHASS',
    name: 'College of Humanities and Social Sciences',
    programs: [
      'Bachelor of Science in Social Work',
      'Bachelor of Science in Psychology',
      'Bachelor of Science in Sociology',
    ],
  },
  {
    code: 'CEGS',
    name: 'College of Engineering and Geosciences',
    programs: [
      'Bachelor of Science in Mining Engineering',
      'Bachelor of Science in Geology',
      'Bachelor of Science in Geodetic Engineering',
      'Bachelor of Science in Electronics Engineering',
      'Bachelor of Science in Civil Engineering',
      'Bachelor of Science in Agricultural and Biosystems Engineering',
    ],
  },
  {
    code: 'CED',
    name: 'College of Education',
    programs: [
      'Bachelor of Secondary Education (Science)',
      'Bachelor of Secondary Education (Mathematics)',
      'Bachelor of Secondary Education (Filipino)',
      'Bachelor of Secondary Education (English)',
      'Bachelor of Elementary Education',
    ],
  },
  {
    code: 'CCIS',
    name: 'College of Computing and Information Sciences',
    programs: [
      'Bachelor of Science in Information Technology',
      'Bachelor of Science in Information System',
      'Bachelor of Science in Computer Science',
    ],
  },
  {
    code: 'CAA',
    name: 'College of Agriculture and Agri-industries',
    programs: [
      'Bachelor of Science in Agriculture (Soil Science)',
      'Bachelor of Science in Agriculture (Horticulture)',
      'Bachelor of Science in Agriculture (Crop Protection)',
      'Bachelor of Science in Agriculture (Animal Science)',
      'Bachelor of Science in Agriculture (Agronomy)',
      'Bachelor of Science in Agriculture (Agriculture Economics)',
    ],
  },
  {
    code: 'GS',
    name: 'Graduate Studies',
    programs: [],
  },
]

const colleges: CollegeCurriculum[] = collegeSeed.map((college) => ({
  code: college.code,
  name: college.name,
  note: college.note,
  programs: college.programs.map((programName) => ({
    name: programName,
    curriculum: buildDummyCurriculum(college.code, programName),
  })),
}))

const editCurriculum = (collegeCode: string, programName: string): void => {
  const message = `Edit requested for ${collegeCode} - ${programName}`
  console.log(message)
  window.alert(message)
}

// Track which college card is currently open (by unique college id/code)
const activeCollegeId = ref<string | null>(null)
const openCollegeName = ref<string>('None')

const isCollegeDisabled = (college: CollegeCurriculum): boolean => {
  return college.programs.length === 0
}

const closeAllCards = (): void => {
  activeCollegeId.value = null
  openCollegeName.value = 'None'
}

/**
 * Toggle a specific college card open/closed.
 * Only one card can be open at a time.
 * Clicking the same card again closes it.
 * @param college - Target college card
 */
const toggleCollege = (college: CollegeCurriculum): void => {
  if (isCollegeDisabled(college)) {
    return
  }

  if (activeCollegeId.value === college.code) {
    // Card is already open, so close it
    activeCollegeId.value = null
    openCollegeName.value = 'None'
  } else {
    // Open this card (automatically closes any previously opened card)
    activeCollegeId.value = college.code
    openCollegeName.value = college.code
  }
}

/**
 * Check if a specific college card is currently open.
 * @param collegeCode - The college code to check
 * @returns true if this college's card is open
 */
const isCollegeOpen = (collegeCode: string): boolean => {
  return activeCollegeId.value === collegeCode
}

const totalPrograms = computed(() =>
  colleges.reduce((sum, college) => sum + college.programs.length, 0),
)

const searchQuery = ref('')

const filteredColleges = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return colleges

  return colleges.filter((college) => {
    const collegeMatch =
      college.code.toLowerCase().includes(query) || college.name.toLowerCase().includes(query)

    const programMatch = college.programs.some((program) =>
      program.name.toLowerCase().includes(query),
    )

    return collegeMatch || programMatch
  })
})
</script>

<style scoped>
.curriculum-root {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
}

.curriculum-root.report-root {
  padding: 24px 24px 28px;
}

.status-value {
  color: #f9a825;
  font-size: 1rem;
}

.curriculum-panel {
  padding-top: 16px;
  min-height: calc(100vh - 205px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.college-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 14px;
  align-content: start;
}

.panel-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: -4px;
}

.search-wrap {
  flex: 1;
  min-width: 260px;
  max-width: 560px;
  position: relative;
}

.search-wrap svg {
  position: absolute;
  left: 12px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  color: rgba(13, 43, 15, 0.38);
  pointer-events: none;
}

.search-wrap input {
  width: 100%;
  height: 40px;
  border: 1px solid rgba(13, 43, 15, 0.14);
  border-radius: 12px;
  padding: 0 12px 0 38px;
  background: #fff;
  color: #0d2b0f;
  font-size: 0.84rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-wrap input:focus {
  border-color: rgba(13, 43, 15, 0.32);
  box-shadow: 0 0 0 3px rgba(13, 43, 15, 0.08);
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.toolbar-chip {
  display: inline-flex;
  align-items: center;
  height: 34px;
  border-radius: 999px;
  padding: 0 12px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #1b5e20;
  background: #ebf5ec;
  border: 1px solid #cde2cf;
}

.toolbar-btn {
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(13, 43, 15, 0.16);
  background: #fff;
  color: #0d2b0f;
  padding: 0 12px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.toolbar-btn:hover {
  background: #0d2b0f;
  border-color: #0d2b0f;
  color: #fff;
}

.toolbar-btn--ghost {
  color: #5a745d;
}

.program-accordion,
.curriculum-accordion {
  border: 1px solid rgba(13, 43, 15, 0.09);
  border-radius: 12px;
  background: #fff;
}

.college-card {
  border: 1px solid rgba(13, 43, 15, 0.09);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 6px 22px rgba(13, 43, 15, 0.07);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.college-card--open {
  border-color: rgba(13, 43, 15, 0.25);
  box-shadow: 0 12px 30px rgba(13, 43, 15, 0.12);
  transform: translateY(-1px);
}

.college-card--disabled {
  opacity: 0.7;
  background: #f3f4f6;
}

.college-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #fcfdfb 100%);
  border: none;
  cursor: pointer;
  text-align: left;
}

.college-trigger:hover {
  background: linear-gradient(180deg, #f9fbf8 0%, #f3f8f3 100%);
}

.college-trigger:disabled {
  cursor: not-allowed;
  background: #f3f4f6;
}

.college-trigger:disabled:hover {
  background: #f3f4f6;
}

.college-trigger-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.college-trigger-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.chevron {
  width: 18px;
  height: 18px;
  color: #5a745d;
  transition: transform 0.25s ease;
}

.chevron--open {
  transform: rotate(180deg);
}

.college-expand-enter-active,
.college-expand-leave-active {
  transition: max-height 0.28s ease, opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
}

.college-expand-enter-from,
.college-expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
}

.college-expand-enter-to,
.college-expand-leave-from {
  max-height: 1200px;
  opacity: 1;
  transform: translateY(0);
}

.program-accordion summary,
.curriculum-accordion summary {
  list-style: none;
  cursor: pointer;
}

.program-accordion summary::-webkit-details-marker,
.curriculum-accordion summary::-webkit-details-marker {
  display: none;
}

.college-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
}

.college-name {
  font-weight: 700;
  color: #0d2b0f;
  font-size: 0.95rem;
  margin: 0;
}

.college-body {
  padding: 0 1rem 1rem;
  display: grid;
  gap: 0.65rem;
  border-top: 1px solid #ebf3ec;
  padding-top: 0.85rem;
}

.program-accordion > summary {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  background: #f7faf7;
  border-radius: 12px;
}

.program-name {
  color: #0d2b0f;
  font-weight: 600;
}

.program-count {
  color: #5a745d;
  font-size: 0.8rem;
  font-weight: 600;
}

.program-body {
  padding: 0.55rem 0.65rem 0.75rem;
}

.curriculum-accordion > summary {
  padding: 0.7rem 0.85rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.8);
  background: #eef4ef;
  border-radius: 12px;
}

.curriculum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.65rem;
}

.edit-curriculum-btn {
  border: 1px solid rgba(13, 43, 15, 0.1);
  border-radius: 8px;
  background: #fff;
  color: #0d2b0f;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
  padding: 0.42rem 0.66rem;
  cursor: pointer;
}

.edit-curriculum-btn:hover {
  background: #0d2b0f;
  color: #fff;
}

.curriculum-accordion {
  border: none;
  background: transparent;
}

.semester-grid {
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.65rem;
}

.semester-card {
  background: #fff;
  border: 1px solid rgba(13, 43, 15, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 2px 10px rgba(13, 43, 15, 0.05);
}

.college-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  background: rgba(13, 43, 15, 0.08);
  font-size: 0.75rem;
  font-weight: 700;
  color: #0d2b0f;
  white-space: nowrap;
  line-height: 1;
  flex-shrink: 0;
}

.college-count {
  font-size: 0.75rem;
  color: #58735c;
  font-weight: 600;
}

.semester-card h4 {
  margin: 0 0 0.55rem;
  color: #204726;
  font-size: 0.92rem;
}

.semester-card ul {
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.25rem;
}

.semester-card li {
  color: #2d4a31;
  font-size: 0.84rem;
  line-height: 1.35;
}

.college-note {
  margin: 0.85rem 0 0;
  padding: 0.6rem 0.75rem;
  background: #fff8e4;
  border: 1px solid #f1ddaa;
  border-radius: 10px;
  color: #7a5609;
  font-size: 0.84rem;
}

.empty-state-text {
  margin: 0;
  padding: 0.65rem 0.75rem;
  border: 1px dashed rgba(13, 43, 15, 0.2);
  border-radius: 10px;
  color: rgba(13, 43, 15, 0.6);
  font-size: 0.84rem;
  background: #faf8f2;
}

.empty-search-card {
  grid-column: 1 / -1;
  border: 1px dashed rgba(13, 43, 15, 0.22);
  border-radius: 14px;
  background: #f9fbf8;
  padding: 1.25rem;
  text-align: center;
}

.empty-search-card h3 {
  margin: 0;
  color: #0d2b0f;
  font-size: 1rem;
  font-weight: 800;
}

.empty-search-card p {
  margin: 0.4rem 0 0;
  color: rgba(13, 43, 15, 0.62);
  font-size: 0.84rem;
}

@media (max-width: 1100px) {
  .kpi-strip {
    grid-template-columns: repeat(3, 1fr);
  }

  .curriculum-root.report-root {
    padding: 20px 16px 24px;
  }
}

@media (max-width: 800px) {
  .kpi-strip {
    grid-template-columns: 1fr;
  }

  .search-wrap {
    max-width: 100%;
  }
}
</style>
