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

                <button type="button" class="modal-close" @click="closeCurriculumModal">Open Program Study</button>
              </section>
            </div>

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

<style src="@/assets/styles/manage-curriculum.css">

</style>
