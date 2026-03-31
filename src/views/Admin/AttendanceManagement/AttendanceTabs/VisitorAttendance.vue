<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar :activeTab="activeTab" @updateActiveTab="handleTabChange" />

    <main class="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-10">
      <div class="mx-auto flex min-h-full max-w-3xl items-center justify-center">
        <div class="w-full rounded-2xl border border-amber-200/70 bg-white p-5 shadow-xl shadow-emerald-900/10 sm:p-8">
        <header class="mb-6 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">CSU Library</p>
          <h1 class="mt-2 text-2xl font-bold text-emerald-900 sm:text-3xl">Library Check-in</h1>
          <div class="mx-auto mt-3 h-1.5 w-20 rounded-full bg-amber-400"></div>
        </header>

        <div class="mb-6 rounded-xl bg-emerald-50 p-1.5">
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="rounded-lg px-3 py-2.5 text-sm font-semibold transition"
              :class="
                visitorType === 'student'
                  ? 'bg-[#164d23] text-white shadow'
                  : 'bg-transparent text-emerald-900 hover:bg-emerald-100'
              "
              @click="visitorType = 'student'"
            >
              Student / Faculty
            </button>
            <button
              type="button"
              class="rounded-lg px-3 py-2.5 text-sm font-semibold transition"
              :class="
                visitorType === 'guest'
                  ? 'bg-[#164d23] text-white shadow'
                  : 'bg-transparent text-emerald-900 hover:bg-emerald-100'
              "
              @click="visitorType = 'guest'"
            >
              External Guest / Professional
            </button>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent>
          <template v-if="visitorType === 'student'">
            <div>
              <label for="id-number" class="mb-1.5 block text-sm font-medium text-emerald-900">ID Number</label>
              <input
                id="id-number"
                type="text"
                placeholder="Enter student/faculty ID number"
                class="w-full rounded-xl border border-emerald-200 px-4 py-4 text-base text-emerald-950 outline-none ring-amber-300 transition placeholder:text-emerald-300 focus:border-emerald-700 focus:ring-2"
              />
            </div>

            <button
              type="button"
              class="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#164d23] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Check-in
            </button>
          </template>

          <template v-else>
            <div>
              <label for="full-name" class="mb-1.5 block text-sm font-medium text-emerald-900">Full Name</label>
              <input
                id="full-name"
                type="text"
                placeholder="Enter full name"
                class="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-950 outline-none ring-amber-300 transition placeholder:text-emerald-300 focus:border-emerald-700 focus:ring-2"
              />
            </div>

            <div>
              <label for="office" class="mb-1.5 block text-sm font-medium text-emerald-900">Office / Agency</label>
              <input
                id="office"
                type="text"
                placeholder="e.g., DepEd, LGU"
                class="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-950 outline-none ring-amber-300 transition placeholder:text-emerald-300 focus:border-emerald-700 focus:ring-2"
              />
            </div>

            <div>
              <label for="purpose" class="mb-1.5 block text-sm font-medium text-emerald-900">Purpose of Visit</label>
              <select
                id="purpose"
                class="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 outline-none ring-amber-300 transition focus:border-emerald-700 focus:ring-2"
              >
                <option value="" selected disabled>Select purpose</option>
                <option v-for="purpose in visitPurposes" :key="purpose" :value="purpose">
                  {{ purpose }}
                </option>
              </select>
            </div>

            <button
              type="button"
              class="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#164d23] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Check-in
            </button>
          </template>
        </form>

        <p class="mt-6 rounded-lg border-l-4 border-[#facc15] bg-amber-50 px-4 py-3 text-xs text-emerald-900 sm:text-sm">
          Please present your ID to the Librarian for visual verification.
        </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const activeTab = ref('ATTENDANCE')

const handleTabChange = (name: string) => {
  activeTab.value = name
}

const visitorType = ref<'student' | 'guest'>('student')

const visitPurposes = [
  'Research / Academic Inquiry',
  'Document Request',
  'Official Transaction',
  'Library Tour',
  'Meeting / Coordination',
  'Other'
]
</script>