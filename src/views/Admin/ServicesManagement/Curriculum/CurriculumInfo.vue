<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar :activeTab="'SERVICES'"></Sidebar>

    <main class="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
      <header class="mb-6">
        <div class="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-slate-500">
          <span>ADMIN</span>
          <span>/</span>
          <span>CURRICULUM</span>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-[#164d23]">
          Curriculum <span class="text-[#f9a825]">Info</span>
        </h1>
      </header>

      <section class="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-bold uppercase tracking-wide text-[#164d23]">Curriculum Info</h2>

        <div class="rounded-xl border border-[#164d23]/20 bg-[#f7faf8] px-6 py-6">
          <div class="flex flex-col gap-2 border-b border-[#164d23]/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Current Program</p>
            <h3 class="text-2xl font-bold uppercase tracking-wide text-[#164d23]">
              {{ curriculumInfo?.program_name || curriculumInfo?.program_sp_name || 'Program Curriculum' }}
            </h3>
          </div>

          <div v-if="isLoading" class="py-6 text-sm text-slate-600">Loading curriculum data from database...</div>
          <div v-else-if="errorMessage" class="py-6 text-sm text-red-600">{{ errorMessage }}</div>
          <div v-else class="grid gap-4 pt-5 md:grid-cols-2">
            <article class="rounded-lg border border-white bg-white p-4 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Revision Year</p>
              <p class="mt-1 text-lg font-bold text-[#164d23]">{{ curriculumInfo?.revision_year ?? 'N/A' }}</p>
            </article>

            <article class="rounded-lg border border-white bg-white p-4 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Revision No.</p>
              <p class="mt-1 text-lg font-bold text-[#164d23]">{{ curriculumInfo?.revision_no ?? 'N/A' }}</p>
            </article>

            <article class="rounded-lg border border-white bg-white p-4 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Effectivity Term</p>
              <p class="mt-1 text-lg font-bold text-[#164d23]">{{ curriculumInfo?.effectivity_term ?? 'N/A' }}</p>
            </article>

            <article class="rounded-lg border border-white bg-white p-4 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Legal Basis</p>
              <p class="mt-1 text-sm text-slate-700">{{ curriculumInfo?.legal_basis ?? 'N/A' }}</p>
            </article>

            <article class="md:col-span-2 rounded-lg border border-white bg-white p-4 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</p>
              <p class="mt-1 text-sm text-slate-700">{{ curriculumInfo?.description ?? 'No description available.' }}</p>
            </article>
          </div>
        </div>

        <div class="rounded-xl border border-[#164d23]/20 bg-[#f7faf8] px-6 py-6">
          <div class="flex items-center justify-between gap-4">
            <h3 class="text-2xl font-bold uppercase tracking-wide text-[#164d23]">
              Program Curriculum Requirements
            </h3>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {{ curriculumDetail?.requirements?.length ?? 0 }} requirements
            </p>
          </div>

          <div v-if="curriculumDetail?.requirements?.length" class="mt-5 space-y-4">
            <article
              v-for="requirement in curriculumDetail.requirements"
              :key="requirement.id"
              class="rounded-lg border border-white bg-white p-4 shadow-sm"
            >
              <div class="flex flex-col gap-1 border-b border-slate-100 pb-3">
                <h4 class="text-lg font-bold text-[#164d23]">{{ requirement.name }}</h4>
                <p v-if="requirement.description" class="text-sm text-slate-600">{{ requirement.description }}</p>
              </div>

              <ul class="mt-3 space-y-2">
                <li
                  v-for="course in requirement.courses"
                  :key="course.id"
                  class="flex flex-col gap-1 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
                >
                  <p class="font-semibold text-slate-900">
                    {{ course.course.course_code || 'N/A' }} - {{ course.course.course_title }}
                  </p>
                  
                </li>
              </ul>
            </article>
          </div>

          <p v-else-if="!isLoading && !errorMessage" class="mt-5 text-sm text-slate-600">
            No curriculum requirements were found for this program.
          </p>
        </div>

        <button
          type="button"
          class="w-fit rounded-lg bg-[#1F8CFF] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1578e0] disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isLoading || !activeProgramId"
          @click="goToProgramStudy"
        >
          View Program Study
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { useCurriculumData } from '@/composables/useCurriculumData'

const route = useRoute()
const router = useRouter()

const {
  activeProgramId,
  activeSpecializationId,
  isLoading,
  errorMessage,
  curriculumInfo,
  curriculumDetail,
  fetchCurriculumData,
} = useCurriculumData()

onMounted(() => {
  void fetchCurriculumData(route)
})

const goToProgramStudy = async (): Promise<void> => {
  if (!activeProgramId.value) {
    return
  }

  await router.push({
    name: 'program-study',
    params: {
      programId: activeProgramId.value,
      ...(activeSpecializationId.value ? { specializationId: activeSpecializationId.value } : {}),
    },
  })
}

watch(
  () => route.fullPath,
  () => {
    void fetchCurriculumData(route)
  },
)

</script>

<style scoped>
/* We keep this empty to avoid conflicting with Tailwind. 
  All margins, padding, and widths are handled via utility classes above.
*/
</style>