<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />
    <main class="flex-1 p-8">
      <header class="report-header intro-header">
        <div class="header-left">
          <div class="header-breadcrumb mb-2!">
            <span class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/attendance')">BACK</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>ATTENDANCE RANKING</span>
          </div>

          <h1 class="header-title intro-title">
            Attendance <span class="text-yellow-500">Ranking</span>
          </h1>

          <p class="header-sub">
            Monitor engagement trends, track visitor headcounts, and review attendance by category.
          </p>
        </div>

        <div class="header-right me-4">
          <div class="date-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ currentDate }}
          </div>
        </div>
      </header>

      <div class="kpi-strip">
        <div v-for="(stat, i) in attendanceStats" :key="i" class="kpi-card flex items-center gap-3"
          :style="{ animationDelay: (i * 0.1) + 's' }">

          <div class="kpi-icon flex items-center justify-center"
            :style="{ background: stat.color + '18', color: stat.color }">
            <i :class="stat.icon"></i>
          </div>

          <div class="kpi-body">
            <div class="kpi-value">
              {{ stat.value }}
            </div>
            <span class="kpi-label">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="main-grid">
        <section class="panel slide-up">
          <div class="panel-head">
            <div class="w-full">

              <!-- TOP LINE -->
              <div class="flex justify-between items-center">
                <h2 class="panel-title">College Ranking</h2>
                <span class="me-10 font-bold text-green-800 cursor-pointer"
                  style="text-decoration: underline; font-size: 13px;">
                  See all Records
                </span>
              </div>

              <!-- SUBTEXT -->
              <p class="panel-sub">Top College Visitors</p>

            </div>
          </div>
          <table class="report-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Colleges</th>
                <th class="text-right">Attendance</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-animate" style="animation-delay: 0.4s">
                <td><span class="rank rank--1">1</span></td>
                <td class="name-cell">College of Computing and Information Sciences (CCIS)</td>
                <td class="text-left font-bold" style="padding-left: 30px;">420</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">College of Education (CED)</td>
                <td class="text-left font-bold" style="padding-left: 30px;">350</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">College of Agriculture (CAA)</td>
                <td class="text-left font-bold" style="padding-left: 30px;">350</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">College of Engineering and Geo-Sciences (CEGS)</td>
                <td class="text-left font-bold" style="padding-left: 30px;">350</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">College of Humanities and Social Sciences (CHASS)</td>
                <td class="text-left font-bold" style="padding-left: 30px;">350</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="panel slide-up" style="animation-delay: 0.2s">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">Program Ranking</h2>
              <p class="panel-sub">Attendance by Course</p>
            </div>
          </div>
          <table class="report-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Program Code</th>
                <th class="text-right">Headcount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-animate" style="animation-delay: 0.4s">
                <td><span class="rank rank--1">1</span></td>
                <td class="name-cell">BSIT</td>
                <td class="text-center font-bold">300</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">BEED</td>
                <td class="text-center font-bold">250</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">BS Psych</td>
                <td class="text-center font-bold">80</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">2</span></td>
                <td class="name-cell">BSCE</td>
                <td class="text-center font-bold">68</td>
              </tr>
              <tr class="table-row-animate" style="animation-delay: 0.5s">
                <td><span class="rank rank--2">55</span></td>
                <td class="name-cell">BS Bio</td>
                <td class="text-center font-bold">25</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import '@/assets/styles/attendance-ranking.css'

import { ref, onMounted } from 'vue'

const currentDate = ref('')

const attendanceStats = ref([
  { label: 'Total Visitors', value: '1,245', icon: 'fas fa-users', color: '#1b5e20' },
  { label: 'Students', value: '980', icon: 'fas fa-user-graduate', color: '#0d2b0f' },
  { label: 'External', value: '265', icon: 'fas fa-walking', color: '#f9a825' },
  { label: 'Top College', value: 'CCIS', icon: 'fas fa-trophy', color: '#f9a825' }
])

onMounted(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  currentDate.value = new Date().toLocaleDateString('en-US', options)
})
</script>

<style scoped></style>