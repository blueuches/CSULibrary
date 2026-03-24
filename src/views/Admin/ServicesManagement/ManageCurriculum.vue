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
          <div v-if="isLoading" class="empty-search-card">
            <h3>Loading curriculums...</h3>
            <p>Fetching data from the database.</p>
          </div>

          <div v-else-if="errorMessage" class="empty-search-card" style="border-color: #ef4444;">
            <h3>Error Loading Curriculums</h3>
            <p>{{ errorMessage }}</p>
            <button type="button" class="toolbar-btn" @click="loadCurriculums" style="margin-top: 12px;">
              Retry
            </button>
          </div>

          <div
            v-for="college in filteredColleges"
            v-else
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
                  <div class="curriculum-actions">
                    <button
                      type="button"
                      class="view-curriculum-btn"
                      @click.prevent.stop="openCurriculumModal(college.code, program)"
                    >
                      View Curriculum
                    </button>
                    <button
                      type="button"
                      class="edit-curriculum-btn"
                      @click.prevent.stop="editCurriculum(college.code, program.name)"
                    >
                      Edit
                    </button>
                  </div>

                  <p v-if="program.curriculum.length" class="program-meta-note">
                    {{ program.curriculum.length }} curriculum revision(s) available for this program.
                  </p>
                  <p v-else class="program-meta-note">
                    No curriculum revision available yet for this program.
                  </p>
                </div>
              </details>
              </div>
            </Transition>
          </div>

          <article v-if="!isLoading && !errorMessage && filteredColleges.length === 0" class="empty-search-card">
            <h3>No curriculum cards found</h3>
            <p>Try a different keyword or clear your search filter.</p>
          </article>
        </section>
      </section>

      <Transition name="modal-fade">
        <div
          v-if="isCurriculumModalOpen"
          class="curriculum-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum details"
          @click.self="closeCurriculumModal"
        >
          <article class="curriculum-modal">
            <header class="curriculum-modal-head">
              <div>
                <p class="modal-badge">{{ modalCollegeCode }}</p>
                <h3>{{ modalProgramName }}</h3>
                <p class="modal-subtitle">Curriculum detail fetched from the database.</p>
              </div>
              <button type="button" class="modal-close" @click="closeCurriculumModal">Close</button>
            </header>

            <div v-if="isCurriculumModalLoading" class="modal-state">Loading curriculum details...</div>

            <div v-else-if="curriculumModalError" class="modal-state modal-state--error">
              {{ curriculumModalError }}
            </div>

            <div v-else-if="activeCurriculumDetail" class="curriculum-modal-body">
              <section class="description-panel">
                <h4>Description</h4>
                <p>
                  {{ activeCurriculumDetail.description || 'No description provided for this curriculum revision.' }}
                </p>
              </section>

              <section class="meta-grid">
                <article class="meta-card">
                  <span>Revision Year</span>
                  <strong>{{ activeCurriculumDetail.revision_year ?? 'N/A' }}</strong>
                </article>
                <article class="meta-card">
                  <span>Revision No.</span>
                  <strong>{{ activeCurriculumDetail.revision_no || 'N/A' }}</strong>
                </article>
                <article class="meta-card">
                  <span>Legal Basis</span>
                  <strong>{{ activeCurriculumDetail.legal_basis || 'N/A' }}</strong>
                </article>
                <article class="meta-card">
                  <span>Effectivity Term</span>
                  <strong>{{ activeCurriculumDetail.effectivity_term || 'N/A' }}</strong>
                </article>
              </section>
            </div>

            <div v-else class="modal-state">No curriculum details found for this program.</div>
          </article>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import {
  getCurriculums,
  getCurriculumDetailByProgramId,
  transformCurriculumsToCollege,
} from '@/services/curriculumService'
import type { CollegeCurriculum, CurriculumDetail, ProgramCurriculum } from '@/types/Curriculum'
import '@/assets/styles/report-analytics.css'

// State management
const colleges = ref<CollegeCurriculum[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

// Curriculum detail modal state
const isCurriculumModalOpen = ref(false)
const isCurriculumModalLoading = ref(false)
const curriculumModalError = ref<string | null>(null)
const modalProgramName = ref('')
const modalCollegeCode = ref('')
const activeCurriculumDetail = ref<CurriculumDetail | null>(null)

// Track which college card is currently open (by unique college id/code)
const activeCollegeId = ref<string | null>(null)
const openCollegeName = ref<string>('None')

const loadCurriculums = async (): Promise<void> => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const curriculumData = await getCurriculums()
    colleges.value = transformCurriculumsToCollege(curriculumData)
    console.log('Loaded curriculums:', colleges.value)
  } catch (error) {
    console.error('Failed to load curriculums:', error)
    errorMessage.value = 'Failed to load curriculums. Please try again.'
    colleges.value = []
  } finally {
    isLoading.value = false
  }
}

const closeCurriculumModal = (): void => {
  isCurriculumModalOpen.value = false
  isCurriculumModalLoading.value = false
  curriculumModalError.value = null
  activeCurriculumDetail.value = null
}

const openCurriculumModal = async (
  collegeCode: string,
  program: ProgramCurriculum,
): Promise<void> => {
  modalCollegeCode.value = collegeCode
  modalProgramName.value = program.name
  isCurriculumModalOpen.value = true
  isCurriculumModalLoading.value = true
  curriculumModalError.value = null
  activeCurriculumDetail.value = null

  try {
    activeCurriculumDetail.value = await getCurriculumDetailByProgramId(program.id)
  } catch (error) {
    console.error('Failed to load curriculum detail:', error)
    curriculumModalError.value = 'Failed to load curriculum details. Please try again.'
  } finally {
    isCurriculumModalLoading.value = false
  }
}

const editCurriculum = (collegeCode: string, programName: string): void => {
  const message = `Edit requested for ${collegeCode} - ${programName}`
  console.log(message)
  window.alert(message)
}

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
 */
const toggleCollege = (college: CollegeCurriculum): void => {
  if (isCollegeDisabled(college)) {
    return
  }

  if (activeCollegeId.value === college.code) {
    activeCollegeId.value = null
    openCollegeName.value = 'None'
  } else {
    activeCollegeId.value = college.code
    openCollegeName.value = college.code
  }
}

const isCollegeOpen = (collegeCode: string): boolean => {
  return activeCollegeId.value === collegeCode
}

const handleEscapeKey = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && isCurriculumModalOpen.value) {
    closeCurriculumModal()
  }
}

onMounted(() => {
  void loadCurriculums()
  window.addEventListener('keydown', handleEscapeKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapeKey)
})

const totalPrograms = computed(() =>
  colleges.value.reduce((sum, college) => sum + college.programs.length, 0),
)

const searchQuery = ref('')

const filteredColleges = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return colleges.value

  return colleges.value.filter((college) => {
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

.curriculum-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.view-curriculum-btn {
  border: 1px solid rgba(13, 43, 15, 0.12);
  border-radius: 8px;
  background: #0d2b0f;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
  padding: 0.46rem 0.76rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.view-curriculum-btn:hover {
  background: #173e1a;
  transform: translateY(-1px);
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

.program-meta-note {
  margin: 0.55rem 0 0;
  font-size: 0.78rem;
  color: rgba(13, 43, 15, 0.65);
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.curriculum-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 18, 12, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
  padding: 20px;
}

.curriculum-modal {
  width: min(820px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f9fcf8 100%);
  border: 1px solid rgba(13, 43, 15, 0.11);
  box-shadow: 0 24px 60px rgba(13, 43, 15, 0.24);
  padding: 18px;
}

.curriculum-modal-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.12);
  padding-bottom: 12px;
}

.modal-badge {
  display: inline-flex;
  align-items: center;
  margin: 0;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #1b5e20;
  background: #e9f4ea;
  border: 1px solid #cae0cc;
}

.curriculum-modal-head h3 {
  margin: 0.5rem 0 0.3rem;
  color: #0d2b0f;
  font-size: 1.1rem;
}

.modal-subtitle {
  margin: 0;
  color: rgba(13, 43, 15, 0.62);
  font-size: 0.82rem;
}

.modal-close {
  border: 1px solid rgba(13, 43, 15, 0.15);
  border-radius: 10px;
  background: #fff;
  color: #0d2b0f;
  height: 34px;
  padding: 0 12px;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}

.modal-close:hover {
  background: #0d2b0f;
  color: #fff;
}

.curriculum-modal-body {
  margin-top: 14px;
  display: grid;
  gap: 12px;
}

.description-panel {
  border: 1px solid rgba(13, 43, 15, 0.12);
  background: #f4faf4;
  border-radius: 14px;
  padding: 14px;
}

.description-panel h4 {
  margin: 0;
  color: #0d2b0f;
  font-size: 0.92rem;
}

.description-panel p {
  margin: 0.55rem 0 0;
  color: #27452c;
  line-height: 1.55;
  font-size: 0.92rem;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.meta-card {
  border: 1px solid rgba(13, 43, 15, 0.1);
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 3px 14px rgba(13, 43, 15, 0.07);
  padding: 12px;
  display: grid;
  gap: 0.32rem;
}

.meta-card span {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.56);
  font-weight: 700;
}

.meta-card strong {
  font-size: 0.88rem;
  color: #163818;
  line-height: 1.35;
}

.modal-state {
  margin-top: 12px;
  border: 1px dashed rgba(13, 43, 15, 0.24);
  border-radius: 12px;
  background: #f8fbf8;
  padding: 14px;
  color: rgba(13, 43, 15, 0.7);
  font-size: 0.86rem;
}

.modal-state--error {
  border-color: rgba(220, 38, 38, 0.35);
  color: #991b1b;
  background: #fef2f2;
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

  .curriculum-modal {
    padding: 14px;
  }

  .curriculum-modal-head {
    flex-direction: column;
  }

  .modal-close {
    width: 100%;
  }
}
</style>
