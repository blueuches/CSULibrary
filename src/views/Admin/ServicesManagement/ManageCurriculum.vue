<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar :activeTab="'SERVICES'" />

    <main class="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
      <header class="mb-6">
        <div class="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-slate-500">
          <span>ADMIN</span>
          <span>/</span>
          <span>MANAGE CURRICULUM</span>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-[#164d23]">
          College <span class="text-[#f9a825]">Curriculum</span>
        </h1>
        <p class="mt-2 text-sm text-slate-600">Select a college to open its programs and view curriculum details.</p>
      </header>

      <section class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Visible Colleges</p>
          <p class="mt-1 text-2xl font-bold text-[#164d23]">{{ visibleCollegeCount }}</p>
        </article>

        <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Programs</p>
          <p class="mt-1 text-2xl font-bold text-[#164d23]">{{ totalProgramCount }}</p>
        </article>

        <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Open College</p>
          <p class="mt-1 text-2xl font-bold text-[#f9a825]">{{ openCollegeLabel }}</p>
        </article>
      </section>

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          v-for="college in colleges"
          :key="college.code"
          type="button"
          class="rounded-xl border border-[#d8e3db] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#164d23] hover:shadow-md"
          @click="openCollege(college.code)"
        >
          <p class="text-lg font-bold text-[#164d23]">{{ college.code }}</p>
          <p class="mt-1 text-sm font-medium text-slate-700">{{ college.name }}</p>
          <p class="mt-3 text-xs font-semibold text-slate-500">{{ college.programs.length }} programs</p>
        </button>
      </section>

      <Transition name="fade-pop">
        <div
          v-if="selectedCollege"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Program list"
          @click.self="closeProgramModal"
        >
          <article class="w-full max-w-3xl rounded-xl bg-white shadow-2xl">
            <header class="flex items-start justify-between gap-4 rounded-t-xl bg-[#164d23] px-6 py-4 text-white">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#f9e6a6]">{{ selectedCollege.code }}</p>
                <h2 class="text-xl font-bold">{{ selectedCollege.name }}</h2>
                <p class="mt-1 text-sm text-emerald-100">Select a program to view its curriculum details.</p>
              </div>
              <button
                type="button"
                class="rounded-md border border-white/40 px-3 py-1 text-lg font-bold leading-none text-white hover:bg-white/15"
                @click="closeProgramModal"
                aria-label="Close program modal"
              >
                X
              </button>
            </header>

            <div class="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div class="space-y-2">
                <div
                  v-for="program in selectedCollege.programs"
                  :key="program.id"
                  class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p class="text-sm font-medium text-slate-800">{{ program.name }}</p>
                  <button
                    type="button"
                    class="rounded-lg bg-[#164d23] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#123d1c]"
                    @click="viewCurriculum(program.id, program.name)"
                  >
                    View Curriculum
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

type ProgramItem = {
  id: string
  name: string
}

type CollegeItem = {
  code: string
  name: string
  programs: ProgramItem[]
}

const router = useRouter()

const collegeProgramMap = reactive<CollegeItem[]>([
  {
    code: 'COFES',
    name: 'College of Forestry and Environmental Science',
    programs: [
      { id: 'cofes-bs-forestry-general-forestry', name: 'Bachelor of Science in Forestry (General Forestry)' },
      { id: 'cofes-bs-environmental-science-bses', name: 'Bachelor of Science in Environmental Science (BSES)' },
      { id: 'cofes-bs-agroforestry-bsaf', name: 'Bachelor of Science in Agroforestry (BSAF)' },
    ],
  },
  {
    code: 'CMNS',
    name: 'College of Mathematics and Natural Sciences',
    programs: [
      { id: 'cmns-bs-physics', name: 'Bachelor of Science in Physics' },
      { id: 'cmns-bs-mathematics', name: 'Bachelor of Science in Mathematics' },
      { id: 'cmns-bs-marine-biology', name: 'Bachelor of Science in Marine Biology' },
      { id: 'cmns-bs-chemistry', name: 'Bachelor of Science in Chemistry' },
      { id: 'cmns-bs-biology-microbiology', name: 'Bachelor of Science in Biology (Major in Microbiology)' },
      { id: 'cmns-bs-biology-medical-biology', name: 'Bachelor of Science in Biology (Major in Medical Biology)' },
      { id: 'cmns-bs-applied-mathematics', name: 'Bachelor of Science in Applied Mathematics' },
      { id: 'cmns-bs-biodiversity-conservation', name: 'Bachelor of Science in Biodiversity Conservation' },
    ],
  },
  {
    code: 'CHASS',
    name: 'College of Humanities, Arts, and Social Sciences',
    programs: [
      { id: 'chass-bs-social-work', name: 'Bachelor of Science in Social Work' },
      { id: 'chass-bs-psychology', name: 'Bachelor of Science in Psychology' },
      { id: 'chass-bs-sociology', name: 'Bachelor of Science in Sociology' },
    ],
  },
  {
    code: 'CEGS',
    name: 'College of Engineering and Geosciences',
    programs: [
      { id: 'cegs-bs-mining-engineering', name: 'Bachelor of Science in Mining Engineering' },
      { id: 'cegs-bs-geology', name: 'Bachelor of Science in Geology' },
      { id: 'cegs-bs-geodetic-engineering', name: 'Bachelor of Science in Geodetic Engineering' },
      { id: 'cegs-bs-electronics-engineering', name: 'Bachelor of Science in Electronics Engineering' },
      { id: 'cegs-bs-civil-engineering', name: 'Bachelor of Science in Civil Engineering' },
      { id: 'cegs-bs-agricultural-and-biosystems-engineering', name: 'Bachelor of Science in Agricultural and Biosystems Engineering' },
    ],
  },
  {
    code: 'CED',
    name: 'College of Education',
    programs: [
      { id: 'ced-bse-science', name: 'Bachelor of Secondary Education (Science)' },
      { id: 'ced-bse-mathematics', name: 'Bachelor of Secondary Education (Mathematics)' },
      { id: 'ced-bse-filipino', name: 'Bachelor of Secondary Education (Filipino)' },
      { id: 'ced-bse-english', name: 'Bachelor of Secondary Education (English)' },
      { id: 'ced-beed', name: 'Bachelor of Elementary Education' },
    ],
  },
  {
    code: 'CCIS',
    name: 'College of Computing and Information Sciences',
    programs: [
      { id: 'ccis-bs-information-technology', name: 'Bachelor of Science in Information Technology' },
      { id: 'ccis-bs-information-system', name: 'Bachelor of Science in Information System' },
      { id: 'ccis-bs-computer-science', name: 'Bachelor of Science in Computer Science' },
    ],
  },
  {
    code: 'CAA',
    name: 'College of Agriculture and Agribusiness',
    programs: [
      { id: 'caa-bs-agriculture-soil-science', name: 'Bachelor of Science in Agriculture (Soil Science)' },
      { id: 'caa-bs-agriculture-horticulture', name: 'Bachelor of Science in Agriculture (Horticulture)' },
      { id: 'caa-bs-agriculture-crop-protection', name: 'Bachelor of Science in Agriculture (Crop Protection)' },
      { id: 'caa-bs-agriculture-animal-science', name: 'Bachelor of Science in Agriculture (Animal Science)' },
      { id: 'caa-bs-agriculture-agronomy', name: 'Bachelor of Science in Agriculture (Agronomy)' },
      { id: 'caa-bs-agriculture-agricultural-economics', name: 'Bachelor of Science in Agriculture (Agriculture Economics)' },
    ],
  },
  {
    code: 'GS',
    name: 'Graduate Studies',
    programs: [
      { id: 'gs-placeholder-1', name: 'Graduate Program' },
    ],
  },
])

const selectedCollegeCode = ref<string | null>(null)

const colleges = computed(() => collegeProgramMap)

const selectedCollege = computed(() => {
  if (!selectedCollegeCode.value) return null
  return colleges.value.find((item) => item.code === selectedCollegeCode.value) ?? null
})

const visibleCollegeCount = computed(() => colleges.value.length)

const totalProgramCount = computed(() =>
  colleges.value.reduce((sum, college) => sum + college.programs.length, 0),
)

const openCollegeLabel = computed(() => selectedCollege.value?.code ?? 'None')

const openCollege = (collegeCode: string): void => {
  selectedCollegeCode.value = collegeCode
}

const closeProgramModal = (): void => {
  selectedCollegeCode.value = null
}

const viewCurriculum = async (programId: string, programName: string): Promise<void> => {
  try {
    const { data: program, error } = await supabase
      .from('programs')
      .select('id')
      .eq('program_name', programName)
      .maybeSingle()

    if (error) {
      console.error('Error fetching program:', error)
      alert('Error loading program. Please try again.')
      return
    }

    if (!program) {
      console.error('Program not found:', programName)
      alert('Program not found in database.')
      return
    }

    await router.push({
      name: 'curriculum-info-dynamic',
      params: { programId: program.id },
    })
    closeProgramModal()
  } catch (err) {
    console.error('Navigation error:', err)
    alert('An error occurred. Please try again.')
  }
}

const onEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && selectedCollege.value) {
    closeProgramModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEscape)
})
</script>

<style scoped>
.fade-pop-enter-active,
.fade-pop-leave-active {
  transition: opacity 0.2s ease;
}

.fade-pop-enter-from,
.fade-pop-leave-to {
  opacity: 0;
}
</style>
