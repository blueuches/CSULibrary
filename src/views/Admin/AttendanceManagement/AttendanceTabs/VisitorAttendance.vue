<template>
  <div class="flex h-screen w-full overflow-hidden bg-slate-50">
    <Sidebar />

    <main class="flex-1 overflow-y-auto px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div class="header-breadcrumb !mb-2">
          <span
            class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
            @click="$router.push('/admin/attendance')"
          >
            BACK
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span>VISITOR</span>
        </div>

        <header class="rounded-xl bg-white p-6 shadow-sm">
          <h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">Visitor Attendance</h1>
          <p class="mt-2 text-sm text-slate-600">
            Review and filter visitor entries from the library attendance section.
          </p>
        </header>

        <section class="rounded-xl bg-white p-6 shadow-sm">
          <nav class="flex flex-wrap gap-3" aria-label="Attendance navigation tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              type="button"
              class="rounded-lg px-4 py-2 text-sm font-semibold transition"
              :class="tab === activeTab ? 'bg-[#164d23] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </nav>
        </section>

        <section class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              <h1 class="text-lg font-bold text-slate-900">Visitor Filters</h1>
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div class="space-y-5">
              <div class="grid gap-3 sm:grid-cols-3">
                <label
                  v-for="mode in filterModes"
                  :key="mode.value"
                  class="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                >
                  <input
                    v-model="selectedFilterMode"
                    type="radio"
                    name="visitor-filter-mode"
                    :value="mode.value"
                    class="h-4 w-4 accent-[#164d23]"
                  />
                  <span>{{ mode.label }}</span>
                </label>
              </div>

              <div v-if="selectedFilterMode === 'specific-date'" class="grid gap-4 sm:max-w-md">
                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  Specific Date
                  <input
                    v-model="specificDate"
                    type="date"
                    class="h-11 rounded-lg border border-slate-200 px-4 text-sm outline-none transition focus:border-[#164d23]"
                  />
                </label>
              </div>

              <div v-else-if="selectedFilterMode === 'specific-month'" class="grid gap-4 sm:grid-cols-2 sm:max-w-2xl">
                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  Month
                  <select
                    v-model="specificMonth"
                    class="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#164d23]"
                  >
                    <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                  </select>
                </label>

                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  Year
                  <select
                    v-model="specificYear"
                    class="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#164d23]"
                  >
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                  </select>
                </label>
              </div>

              <div v-else class="grid gap-4 sm:grid-cols-2 sm:max-w-2xl">
                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  Start date
                  <input
                    v-model="periodStartDate"
                    type="date"
                    class="h-11 rounded-lg border border-slate-200 px-4 text-sm outline-none transition focus:border-[#164d23]"
                  />
                </label>

                <label class="grid gap-2 text-sm font-medium text-slate-700">
                  End date
                  <input
                    v-model="periodEndDate"
                    type="date"
                    class="h-11 rounded-lg border border-slate-200 px-4 text-sm outline-none transition focus:border-[#164d23]"
                  />
                </label>
              </div>
            </div>

            <div class="flex justify-end lg:pt-1">
              <button
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-lg bg-[#164d23] px-5 text-sm font-semibold text-white transition hover:bg-[#123d1b] lg:w-auto"
              >
                Show
              </button>
            </div>
          </div>
        </section>

        <section class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center gap-3">
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
            <h2 class="text-lg font-bold text-slate-900">Visitor Log</h2>
          </div>

          <div class="overflow-hidden rounded-xl border border-slate-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead class="bg-slate-100 text-xs font-bold uppercase tracking-wide text-slate-600">
                  <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Company/Institution</th>
                    <th class="px-4 py-3">Contact Details</th>
                    <th class="px-4 py-3">Purpose/Reason</th>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Time</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white text-slate-700">
                  <tr>
                    <td colspan="6" class="px-4 py-10 text-center text-sm text-slate-500">
                      No visitor records to display.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm font-medium text-slate-700">
              Total number of library visit: <span class="font-bold text-slate-900">0</span>
            </p>

            <button
              type="button"
              class="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Export
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const tabs = [
  'General',
  'Database',
  'Reporting',
  'Search',
  'Student Profile',
  'Student Ranking',
  'Visitor',
]

const activeTab = ref('Visitor')

const filterModes = [
  { label: 'Specific Date', value: 'specific-date' },
  { label: 'Specific Month', value: 'specific-month' },
  { label: 'Period', value: 'period' },
] as const

const selectedFilterMode = ref<(typeof filterModes)[number]['value']>('specific-date')
const specificDate = ref('')
const specificMonth = ref(String(new Date().getMonth() + 1).padStart(2, '0'))
const specificYear = ref(String(new Date().getFullYear()))
const periodStartDate = ref('')
const periodEndDate = ref('')

const months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 6 }, (_, index) => String(currentYear - index))
})
</script>