<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar :activeTab="'SERVICES'" />

    <main class="report-root curriculum-root">
      <header class="report-header intro-header">
        <div class="header-left">
          <div class="header-breadcrumb !mb-2">
            <span>ADMIN</span>
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
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
            <button
              v-if="searchQuery"
              type="button"
              class="toolbar-btn toolbar-btn--ghost"
              @click="searchQuery = ''"
            >
              Clear Search
            </button>
            <button
              v-if="activeCollegeId"
              type="button"
              class="toolbar-btn toolbar-btn--ghost"
              @click="closeAllCards"
              title="Close expanded card"
            >
              Close Card
            </button>
          </div>
        </div>

        <section class="college-grid">
          <div v-if="isLoading" class="empty-search-card">
            <h3>Loading curriculums...</h3>
            <p>Fetching data from the database.</p>
          </div>

          <div v-else-if="errorMessage" class="empty-search-card" style="border-color: #ef4444">
            <h3>Error Loading Curriculums</h3>
            <p>{{ errorMessage }}</p>
            <button
              type="button"
              class="toolbar-btn"
              @click="loadCurriculums"
              style="margin-top: 12px"
            >
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
                  @toggle="handleProgramToggle($event, program)"
                >
                  <summary>
                    <span class="program-name">{{ program.name }}</span>
                    <span class="program-count">{{ program.curriculum.length }} semesters</span>
                  </summary>

                  <div class="program-body">
                    <section class="program-specialization-ui">
                      <label class="program-specialization-label">Specialization</label>

                      <div
                        v-if="loadingProgramSpecializationsMap[program.id]"
                        class="program-specialization-empty"
                      >
                        Loading specializations...
                      </div>

                      <select
                        v-else-if="programSpecializationsMap[program.id]?.length"
                        v-model="selectedProgramSpecializationMap[program.id]"
                        class="program-specialization-select"
                      >
                        <option
                          v-for="specialization in programSpecializationsMap[program.id]"
                          :key="specialization.id"
                          :value="specialization.id"
                        >
                          {{ specialization.program_sp_name }}
                        </option>
                      </select>

                      <div v-else class="program-specialization-empty">
                        No specialization available.
                      </div>
                    </section>

                    <section class="detail-panel detail-panel--highlight" style="margin-bottom: 16px">
                      <div class="detail-panel-head">
                        <h4>Curriculum Metadata</h4>
                        <span class="detail-panel-tag">Fetched</span>
                      </div>

                      <div v-if="loadingProgramMetadataMap[program.id]" class="program-specialization-empty">
                        Loading curriculum metadata...
                      </div>

                      <div v-else class="meta-grid">
                        <article class="meta-card">
                          <span>Revision Year</span>
                          <strong>{{ resolveProgramMetadataField(program.id, 'revision_year') }}</strong>
                        </article>
                        <article class="meta-card">
                          <span>Revision No.</span>
                          <strong>{{ resolveProgramMetadataField(program.id, 'revision_no') }}</strong>
                        </article>
                        <article class="meta-card">
                          <span>Legal Basis</span>
                          <strong>{{ resolveProgramMetadataField(program.id, 'legal_basis') }}</strong>
                        </article>
                        <article class="meta-card">
                          <span>Effectivity Term</span>
                          <strong>{{ resolveProgramMetadataField(program.id, 'effectivity_term') }}</strong>
                        </article>
                      </div>
                    </section>

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
                      {{ program.curriculum.length }} curriculum revision(s) available for this
                      program.
                    </p>
                    <p v-else class="program-meta-note">
                      No curriculum revision available yet for this program.
                    </p>
                  </div>
                </details>
              </div>
            </Transition>
          </div>

          <article
            v-if="!isLoading && !errorMessage && filteredColleges.length === 0"
            class="empty-search-card"
          >
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

            <div v-if="isCurriculumModalLoading" class="modal-state">
              Loading curriculum details...
            </div>

            <div v-else-if="curriculumModalError" class="modal-state modal-state--error">
              {{ curriculumModalError }}
            </div>

            <div v-else class="curriculum-modal-body">
              <section class="detail-panel detail-panel--highlight">
                <div class="detail-panel-head">
                  <h4>Curriculum Metadata</h4>
                  <span class="detail-panel-tag">Program Level</span>
                </div>

                <div class="meta-grid">
                  <article class="meta-card">
                    <span>Revision Year</span>
                    <strong>{{ curriculumDetail?.revision_year ?? 'N/A' }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Revision No.</span>
                    <strong>{{ curriculumDetail?.revision_no || 'N/A' }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Legal Basis</span>
                    <strong>{{ curriculumDetail?.legal_basis || 'N/A' }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Effectivity Term</span>
                    <strong>{{ curriculumDetail?.effectivity_term || 'N/A' }}</strong>
                  </article>
                </div>
              </section>

              <section v-if="specializations.length" class="detail-panel detail-panel--highlight">
                <div class="detail-panel-head">
                  <h4>Program Specialization</h4>
                  <span class="detail-panel-tag">Curriculum Scope</span>
                </div>

                <p class="detail-panel-copy">
                  <strong>Course:</strong> {{ modalProgramName }}
                </p>

                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  Select Specialization
                  <select
                    v-model="selectedSpecializationId"
                    class="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#164d23]"
                  >
                    <option
                      v-for="specialization in specializations"
                      :key="specialization.id"
                      :value="specialization.id"
                    >
                      {{ specialization.program_sp_name }}
                    </option>
                  </select>
                </label>

                <div v-if="selectedSpecialization" class="meta-grid">
                  <article class="meta-card">
                    <span>Specialization</span>
                    <strong>{{ selectedSpecialization.program_sp_name }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Specialization Code</span>
                    <strong>{{ selectedSpecialization.program_sp_code || 'N/A' }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Revision Year</span>
                    <strong>{{ selectedSpecializationRevisionYear }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Revision No.</span>
                    <strong>{{ selectedSpecializationRevisionNo }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Legal Basis</span>
                    <strong>{{ selectedSpecializationLegalBasis }}</strong>
                  </article>
                  <article class="meta-card">
                    <span>Effectivity Term</span>
                    <strong>{{ selectedSpecializationEffectivityTerm }}</strong>
                  </article>
                </div>

                <section v-if="selectedSpecialization?.description" class="description-panel">
                  <h4>Specialization Description</h4>
                  <p>{{ selectedSpecialization.description }}</p>
                </section>
              </section>

              <section class="detail-panel">
                <div class="detail-panel-head">
                  <h4>Program Study Plan</h4>
                  <span class="detail-panel-tag">Year / Semester</span>
                </div>

                <div v-if="studyPlans.length" class="study-plan-table-wrap">
                  <div class="overflow-x-auto">
                    <table class="study-plan-table">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Semester</th>
                          <th>Code</th>
                          <th>Course / Subject Title</th>
                          <th>Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="row in studyPlans" :key="row.id">
                          <td>{{ row.year_level ?? 'N/A' }}</td>
                          <td>{{ row.semester ?? row.semester_label ?? row.term ?? 'N/A' }}</td>
                          <td>{{ row.course_code || row.subject_code || 'N/A' }}</td>
                          <td>{{ row.course_title || row.subject_title || 'Untitled entry' }}</td>
                          <td>{{ row.units ?? '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <p v-else class="detail-panel-copy detail-panel-copy--muted">
                  No study plan available for this selection.
                </p>
              </section>
            </div>
          </article>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import {
  getCurriculumDetailByProgramId,
  getCurriculums,
  getProgramSpecializationsByProgramId,
  getProgramStudyPlans,
  transformCurriculumsToCollege,
} from '@/services/curriculumService'
import type {
  CollegeCurriculum,
  CurriculumDetail,
  ProgramCurriculum,
  ProgramSpecialization,
  ProgramStudyPlanRow,
} from '@/types/Curriculum'
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
const curriculumDetail = ref<CurriculumDetail | null>(null)
const specializations = ref<ProgramSpecialization[]>([])
const selectedSpecializationId = ref<string>('')
const studyPlans = ref<ProgramStudyPlanRow[]>([])
const activeProgramId = ref<string>('')
const programSpecializationsMap = ref<Record<string, ProgramSpecialization[]>>({})
const programMetadata = ref<Record<string, CurriculumDetail | null>>({})
const selectedProgramSpecializationMap = ref<Record<string, string>>({})
const loadingProgramSpecializationsMap = ref<Record<string, boolean>>({})
const loadingProgramMetadataMap = ref<Record<string, boolean>>({})

// Track which college card is currently open (by unique college id/code)
const activeCollegeId = ref<string | null>(null)
const openCollegeName = ref<string>('None')

const loadCurriculums = async (): Promise<void> => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const curriculumData = await getCurriculums()
    colleges.value = transformCurriculumsToCollege(curriculumData)
    await preloadProgramSpecializations(colleges.value)
    await preloadInitiallyExpandedProgramMetadata(colleges.value)
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
  curriculumDetail.value = null
  specializations.value = []
  selectedSpecializationId.value = ''
  studyPlans.value = []
  activeProgramId.value = ''
}

const selectedSpecialization = computed(() => {
  return specializations.value.find((item) => item.id === selectedSpecializationId.value) ?? null
})

const selectedSpecializationRevisionYear = computed<string | number>(() => {
  return selectedSpecialization.value?.revision_year ?? curriculumDetail.value?.revision_year ?? 'N/A'
})

const selectedSpecializationRevisionNo = computed(() => {
  return selectedSpecialization.value?.revision_no || curriculumDetail.value?.revision_no || 'N/A'
})

const selectedSpecializationLegalBasis = computed(() => {
  return selectedSpecialization.value?.legal_basis || curriculumDetail.value?.legal_basis || 'N/A'
})

const selectedSpecializationEffectivityTerm = computed(() => {
  return selectedSpecialization.value?.effectivity_term || curriculumDetail.value?.effectivity_term || 'N/A'
})

const loadStudyPlans = async (): Promise<void> => {
  if (!activeProgramId.value) {
    studyPlans.value = []
    return
  }

  studyPlans.value = await getProgramStudyPlans(activeProgramId.value, selectedSpecializationId.value || null)
}

const openCurriculumModal = async (
  collegeCode: string,
  program: ProgramCurriculum,
): Promise<void> => {
  modalCollegeCode.value = collegeCode
  modalProgramName.value = program.name
  activeProgramId.value = program.id
  isCurriculumModalOpen.value = true
  isCurriculumModalLoading.value = true
  curriculumModalError.value = null
  curriculumDetail.value = null
  specializations.value = []
  selectedSpecializationId.value = ''
  studyPlans.value = []

  try {
    const [detail, programSpecializations] = await Promise.all([
      getCurriculumDetailByProgramId(program.id),
      getProgramSpecializationsByProgramId(program.id, program.name),
    ])

    curriculumDetail.value = detail
    specializations.value = programSpecializations

    if (programSpecializations.length) {
      selectedSpecializationId.value = programSpecializations[0].id
    }

    await loadStudyPlans()
  } catch (error) {
    console.error('Failed to load curriculum detail:', error)
    const message =
      error && typeof error === 'object' && 'message' in error
        ? String((error as { message?: string }).message)
        : 'Failed to load curriculum details. Please try again.'
    curriculumModalError.value = message
  } finally {
    isCurriculumModalLoading.value = false
  }
}

watch(selectedSpecializationId, () => {
  if (!isCurriculumModalOpen.value || isCurriculumModalLoading.value) {
    return
  }

  void loadStudyPlans()
})

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

const preloadProgramSpecializations = async (collegeRows: CollegeCurriculum[]): Promise<void> => {
  const allPrograms = collegeRows.flatMap((college) => college.programs)

  await Promise.all(
    allPrograms.map(async (program) => {
      await Promise.all([
        ensureProgramSpecializationsLoaded(program),
        ensureProgramMetadataLoaded(program),
      ])
    }),
  )
}

const preloadInitiallyExpandedProgramMetadata = async (
  collegeRows: CollegeCurriculum[],
): Promise<void> => {
  await nextTick()

  const expandedPrograms = collegeRows
    .flatMap((college) => college.programs)

  await Promise.all(expandedPrograms.map(async (program) => ensureProgramMetadataLoaded(program)))
}

const ensureProgramSpecializationsLoaded = async (program: ProgramCurriculum): Promise<void> => {
  if (programSpecializationsMap.value[program.id]) {
    return
  }

  loadingProgramSpecializationsMap.value[program.id] = true

  try {
    const rows = await getProgramSpecializationsByProgramId(program.id, program.name)
    programSpecializationsMap.value[program.id] = rows

    if (rows.length && !selectedProgramSpecializationMap.value[program.id]) {
      selectedProgramSpecializationMap.value[program.id] = rows[0].id
    }
  } catch (error) {
    console.error(`Failed to load specializations for program ${program.name}:`, error)
    programSpecializationsMap.value[program.id] = []
  } finally {
    loadingProgramSpecializationsMap.value[program.id] = false
  }
}

const ensureProgramMetadataLoaded = async (program: ProgramCurriculum): Promise<void> => {
  if (Object.prototype.hasOwnProperty.call(programMetadata.value, program.id)) {
    return
  }

  loadingProgramMetadataMap.value[program.id] = true

  try {
    programMetadata.value[program.id] = await getCurriculumDetailByProgramId(program.id)
  } catch (error) {
    console.error(`Failed to load curriculum metadata for program ${program.name}:`, error)
    programMetadata.value[program.id] = null
  } finally {
    loadingProgramMetadataMap.value[program.id] = false
  }
}

const getSelectedProgramSpecialization = (programId: string): ProgramSpecialization | null => {
  const rows = programSpecializationsMap.value[programId] ?? []
  const selectedId = selectedProgramSpecializationMap.value[programId]
  if (!selectedId) {
    return rows[0] ?? null
  }

  return rows.find((row) => row.id === selectedId) ?? rows[0] ?? null
}

const isEmptyMetadataValue = (value: string | number | null | undefined): boolean => {
  return value === null || value === undefined || String(value).trim() === ''
}

const resolveProgramMetadataField = (
  programId: string,
  field: 'revision_year' | 'revision_no' | 'legal_basis' | 'effectivity_term',
): string | number => {
  const selected = getSelectedProgramSpecialization(programId)
  const detail = programMetadata.value[programId]

  const specializationValue = selected?.[field]
  if (!isEmptyMetadataValue(specializationValue)) {
    return specializationValue as string | number
  }

  const programValue = detail?.[field]
  if (!isEmptyMetadataValue(programValue)) {
    return programValue as string | number
  }

  return 'N/A'
}

const handleProgramToggle = (event: Event, program: ProgramCurriculum): void => {
  const details = event.target as HTMLDetailsElement
  if (!details.open) {
    return
  }

  void ensureProgramSpecializationsLoaded(program)
  void ensureProgramMetadataLoaded(program)
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

    void Promise.all(
      college.programs.map(async (program) => {
        await Promise.all([
          ensureProgramSpecializationsLoaded(program),
          ensureProgramMetadataLoaded(program),
        ])
      }),
    )
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

<style src="@/assets/styles/manage-curriculum.css"></style>
