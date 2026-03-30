<template>
  <div class="page-shell">
    <Sidebar :activeTab="'ATTENDANCE'" @updateActiveTab="handleTabChange" />

    <div class="page-scroll">
      <header class="attn-header">
        <div class="space-y-4">
          <div class="relative group">
            <div class="header-breadcrumb !mb-2">
              <span>Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>ATTENDANCE</span>
            </div>
            <h1 class="hero-title">
              <span class="hero-word-dark hero-underlined">Library</span>
              <span class="hero-word-gold"> Attendance</span>
            </h1>
            <p class="hero-subtitle">
              Comprehensive overview of institutional engagement and borrowing patterns
            </p>
          </div>
        </div>
      </header>

      <div class="stat-strip">
        <div
          v-for="(s, i) in quickStats"
          :key="s.label"
          class="qstat"
          :style="{ animationDelay: 0.25 + i * 0.08 + 's' }"
        >
          <div class="qstat-icon" v-html="s.icon"></div>
          <div>
            <p class="qstat-val">{{ s.val }}</p>
            <p class="qstat-label">{{ s.label }}</p>
          </div>
          <span class="qstat-badge" :class="s.up ? 'qstat-badge--up' : 'qstat-badge--dn'">
            {{ s.delta }}
          </span>
        </div>
      </div>

      <div class="main-grid">
        <div class="dial-card enhanced">
          <div class="dial-card__header">
            <span class="section-eyebrow">Live Attendance</span>
            <span class="live-chip"><span class="live-dot"></span>LIVE</span>
          </div>

          <div class="gauge-wrap">
            <svg viewBox="0 0 320 320" class="gauge-svg">
              <circle
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke="rgba(13,43,15,0.05)"
                stroke-width="20"
              />

              <circle
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke="url(#gaugeGrad)"
                stroke-width="20"
                stroke-linecap="round"
                :stroke-dasharray="754"
                :stroke-dashoffset="754 - (754 * gaugeFillPercent / 100)"
                transform="rotate(-90 160 160)"
                class="gauge-arc"
              />

              <circle
                cx="160"
                cy="160"
                r="120"
                fill="none"
                stroke="url(#gaugeGlow)"
                stroke-width="28"
                stroke-linecap="round"
                :stroke-dasharray="754"
                :stroke-dashoffset="754 - (754 * gaugeFillPercent / 100)"
                transform="rotate(-90 160 160)"
                class="gauge-glow"
              />

              <defs>
                <linearGradient id="gaugeGrad">
                  <stop offset="0%" stop-color="#f9a825" />
                  <stop offset="100%" stop-color="#0d2b0f" />
                </linearGradient>

                <linearGradient id="gaugeGlow">
                  <stop offset="0%" stop-color="#f9a825" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#0d2b0f" stop-opacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            <div class="gauge-center">
              <div class="gauge-num">
                <span class="gauge-pct">{{ gaugeCount }}</span>
              </div>

              <span class="gauge-sublabel">STUDENTS TODAY</span>

              <span
                class="gauge-status"
                :class="{
                  low: gaugeCount <= 10,
                  mid: gaugeCount > 10 && gaugeCount <= 30,
                  high: gaugeCount > 30
                }"
              >
                {{ gaugeStatus }}
              </span>
            </div>
          </div>

          <div class="flow-row">
            <div class="flow-col">
              <div class="flow-bar-wrap">
                <div class="flow-bar flow-bar--in" :style="{ width: incomingBarWidth }"></div>
              </div>
              <div class="flow-info">
                <span class="flow-label">Incoming</span>
                <span class="flow-num flow-num--in">{{ visitorsToday }}</span>
              </div>
            </div>

            <div class="flow-divider"></div>

            <div class="flow-col">
              <div class="flow-bar-wrap">
                <div class="flow-bar flow-bar--out" :style="{ width: outgoingBarWidth }"></div>
              </div>
              <div class="flow-info">
                <span class="flow-label">Outgoing</span>
                <span class="flow-num flow-num--out">{{ outgoing }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="controls-col">
          <div class="ctrl-header">
            <div>
              <p class="ctrl-eyebrow">Data Orchestration</p>
              <h3 class="ctrl-title">Attendance <em>Overview</em></h3>
              <p class="ctrl-sub">All export data</p>
            </div>

            <button class="sync-btn sync-btn--1" @click="$router.push('/admin/attendance/logs')">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Attendance Logs</span>
            </button>

            <button class="sync-btn sync-btn--2" @click="$router.push('/admin/attendance/import')">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Add Import Records</span>
            </button>
          </div>

          <div class="export-card">
            <div class="ecard-top">
              <div>
                <p class="ecard-eyebrow">Export History</p>
                <h4 class="ecard-title">Recent Exports</h4>
              </div>
              <span class="ecard-count">{{ exportLogs.length }} records</span>
            </div>

            <div class="etable-wrap">
              <table class="etable">
                <thead>
                  <tr>
                    <th>Date Exported</th>
                    <th>File Type</th>
                    <th>Exported By</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(log, i) in exportLogs"
                    :key="i"
                    class="erow"
                    :style="{ animationDelay: 0.6 + i * 0.07 + 's' }"
                  >
                    <td class="erow-date">
                      <span class="erow-date__main">{{ log.date }}</span>
                      <span class="erow-date__time">{{ log.time }}</span>
                    </td>
                    <td>
                      <span :class="['etype-badge', 'etype-badge--' + log.type.toLowerCase()]">
                        {{ log.type }}
                      </span>
                    </td>
                    <td class="erow-user">
                      <div class="erow-avatar">{{ log.user.charAt(0) }}</div>
                      <span>{{ log.user }}</span>
                    </td>
                    <td>
                      <span :class="['estatus', 'estatus--' + log.status]">
                        <span class="estatus-dot"></span>{{ log.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

type StudentInfo = {
  id_number: string
  first_name: string
  middle_name?: string | null
  last_name: string
  program: string | null
  college: string | null
  year_level: number | string | null
}

type AttendanceLog = {
  id: string
  student_id: string
  time_in: string | null
  time_out: string | null
  attendance_type: string | null
  event_id?: string | null
  duration_minutes?: number | null
  students?: StudentInfo | StudentInfo[] | null
}

const logs = ref<AttendanceLog[]>([])
const loading = ref(false)
const barsVisible = ref(false)

const exportLogs = ref([
  { date: 'Mar 11, 2026', time: '09:42 AM', type: 'PDF', user: 'Maria Santos', status: 'success' },
  { date: 'Mar 10, 2026', time: '03:15 PM', type: 'CSV', user: 'Juan dela Cruz', status: 'success' },
  { date: 'Mar 09, 2026', time: '11:08 AM', type: 'XLSX', user: 'Ana Reyes', status: 'success' },
  { date: 'Mar 08, 2026', time: '02:30 PM', type: 'PDF', user: 'Jose Bautista', status: 'failed' },
  { date: 'Mar 07, 2026', time: '08:55 AM', type: 'CSV', user: 'Maria Santos', status: 'success' },
  { date: 'Mar 06, 2026', time: '04:20 PM', type: 'XLSX', user: 'Liza Garcia', status: 'pending' }
])

onMounted(async () => {
  setTimeout(() => {
    barsVisible.value = true
  }, 1600)

  await fetchAttendance()
})

const fetchAttendance = async () => {
  loading.value = true

  try {
    const { data, error } = await supabase
      .from('attendance_logs')
      .select(`
        id,
        student_id,
        time_in,
        time_out,
        attendance_type,
        event_id,
        duration_minutes,
        students!attendance_logs_student_id_fkey (
          id_number,
          first_name,
          middle_name,
          last_name,
          program,
          college,
          year_level
        )
      `)
      .eq('attendance_type', 'library')
      .order('time_in', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      logs.value = []
      return
    }

    logs.value = (data || []).map((item: any) => ({
      ...item,
      students: Array.isArray(item.students) ? item.students[0] ?? null : item.students
    }))

    console.log('Joined logs:', logs.value)
  } catch (err) {
    console.error('Fetch error:', err)
    logs.value = []
  } finally {
    loading.value = false
  }
}

const getDateObject = (value: string | null) => {
  if (!value) return null
  const dt = new Date(value)
  return Number.isNaN(dt.getTime()) ? null : dt
}

const getDateOnly = (value: string | null) => {
  const dt = getDateObject(value)
  if (!dt) return null
  return dt.toISOString().split('T')[0]
}

const getHour = (value: string | null) => {
  const dt = getDateObject(value)
  if (!dt) return null
  return dt.getHours()
}

const getDayName = (value: string | null) => {
  const dt = getDateObject(value)
  if (!dt) return 'Unknown'
  return dt.toLocaleDateString('en-US', { weekday: 'long' })
}

const formatHourLabel = (hour: number) => {
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:00 ${suffix}`
}

const getDurationMinutes = (log: AttendanceLog) => {
  if (typeof log.duration_minutes === 'number' && log.duration_minutes > 0) {
    return log.duration_minutes
  }

  const timeIn = getDateObject(log.time_in)
  const timeOut = getDateObject(log.time_out)

  if (!timeIn || !timeOut) return 0

  const diff = timeOut.getTime() - timeIn.getTime()
  if (diff < 0) return 0

  return Math.round(diff / 60000)
}

const buildGroupedVisits = (
  items: AttendanceLog[],
  key: 'college' | 'program' | 'year_level'
) => {
  const grouped: Record<string, number> = {}

  items.forEach((log) => {
    const student = Array.isArray(log.students) ? log.students[0] : log.students
    const value = student?.[key] ?? 'Unknown'
    const name = String(value)
    grouped[name] = (grouped[name] || 0) + 1
  })

  return Object.entries(grouped)
    .map(([name, visits]) => ({ name, visits }))
    .sort((a, b) => b.visits - a.visits)
}

const visitorsToday = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return logs.value.filter((log) => getDateOnly(log.time_in) === today).length
})

const currentlyInside = computed(() => visitorsToday.value)

const outgoing = computed(() => 0)

const gaugeCount = computed(() => visitorsToday.value)

const gaugeStatus = computed(() => {
  if (gaugeCount.value === 0) return 'No Attendance'
  if (gaugeCount.value <= 10) return 'Low Attendance'
  if (gaugeCount.value <= 30) return 'Moderate'
  return 'High Attendance'
})

const gaugeFillPercent = computed(() => {
  if (gaugeCount.value === 0) return 0
  if (gaugeCount.value <= 10) return 35
  if (gaugeCount.value <= 30) return 65
  return 100
})

const flowMax = computed(() => Math.max(visitorsToday.value, outgoing.value, 1))

const incomingBarWidth = computed(() => {
  return `${Math.max((visitorsToday.value / flowMax.value) * 100, visitorsToday.value ? 12 : 0)}%`
})

const outgoingBarWidth = computed(() => {
  return `${Math.max((outgoing.value / flowMax.value) * 100, outgoing.value ? 12 : 0)}%`
})

const averageStayDuration = computed(() => {
  const durations = logs.value
    .map((log) => getDurationMinutes(log))
    .filter((minutes) => minutes > 0)

  if (!durations.length) return '—'

  const avg = Math.round(
    durations.reduce((sum, minutes) => sum + minutes, 0) / durations.length
  )

  const hrs = Math.floor(avg / 60)
  const mins = avg % 60

  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins} mins`
})

const peakHours = computed(() => {
  const hourMap: Record<number, number> = {}

  logs.value.forEach((log) => {
    const hour = getHour(log.time_in)
    if (hour === null) return
    hourMap[hour] = (hourMap[hour] || 0) + 1
  })

  return Object.entries(hourMap)
    .map(([hour, visits]) => ({
      hour: Number(hour),
      label: formatHourLabel(Number(hour)),
      visits
    }))
    .sort((a, b) => b.visits - a.visits)
})

const peakDays = computed(() => {
  const dayMap: Record<string, number> = {}

  logs.value.forEach((log) => {
    const day = getDayName(log.time_in)
    dayMap[day] = (dayMap[day] || 0) + 1
  })

  return Object.entries(dayMap)
    .map(([day, visits]) => ({ day, visits }))
    .sort((a, b) => b.visits - a.visits)
})

const visitsByCollege = computed(() => buildGroupedVisits(logs.value, 'college'))
const visitsByProgram = computed(() => buildGroupedVisits(logs.value, 'program'))
const visitsByYearLevel = computed(() => buildGroupedVisits(logs.value, 'year_level'))

const topPeakHour = computed(() => peakHours.value[0] || null)
const topPeakDay = computed(() => peakDays.value[0] || null)
const topCollege = computed(() => visitsByCollege.value[0] || null)
const topProgram = computed(() => visitsByProgram.value[0] || null)
const topYearLevel = computed(() => visitsByYearLevel.value[0] || null)

const quickStats = computed(() => [
  {
    val: logs.value.length,
    label: 'Total Library Visits',
    delta: 'All',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    val: topPeakHour.value ? topPeakHour.value.label : 'N/A',
    label: 'Peak Hours',
    delta: topPeakHour.value ? `${topPeakHour.value.visits} visits` : '—',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    val: topPeakDay.value ? topPeakDay.value.day : 'N/A',
    label: 'Peak Days',
    delta: topPeakDay.value ? `${topPeakDay.value.visits} visits` : '—',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`
  },
  {
    val: averageStayDuration.value,
    label: 'Average Stay',
    delta: 'Session',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    val: topCollege.value ? topCollege.value.name : 'N/A',
    label: 'Visits by College',
    delta: topCollege.value ? `${topCollege.value.visits} visits` : '—',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
  },
  {
    val: topProgram.value ? topProgram.value.name : 'N/A',
    label: 'Visits by Program',
    delta: topProgram.value ? `${topProgram.value.visits} visits` : '—',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  },
  {
    val: topYearLevel.value ? `Year ${topYearLevel.value.name}` : 'N/A',
    label: 'Visits by Year Level',
    delta: topYearLevel.value ? `${topYearLevel.value.visits} visits` : '—',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
  }
])

const handleTabChange = (name: string) => {
  console.log('tab:', name)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600;700&display=swap');

/* ─── KEYFRAMES ─── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.88);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes scaleInBounce {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes arcDraw {
  from {
    stroke-dashoffset: 691.2;
  }
  to {
    stroke-dashoffset: 43.9;
  }
}
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes ping {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.8);
    opacity: 0;
  }
}
@keyframes underlineGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* ─── SHELL ─── */
.page-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #edefed;
  font-family: 'DM Sans', sans-serif;
}

.page-scroll {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 48px 80px 48px;
  box-sizing: border-box;
}
.page-scroll::-webkit-scrollbar {
  width: 5px;
}
.page-scroll::-webkit-scrollbar-thumb {
  background: rgba(13, 43, 15, 0.1);
  border-radius: 5px;
}

/* ─── HEADER ─── */
.attn-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* ─── BREADCRUMB ─── */
.header-breadcrumb {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.35);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  /* Animation */
  animation: slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
.header-breadcrumb svg {
  width: 12px;
  height: 12px;
  opacity: 0.4;
}

/* ─── HERO TITLE ─── */
.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  display: inline-block;
  /* Animation */
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
}
.hero-word-dark {
  color: #0d2b0f;
}
.hero-word-gold {
  color: #e6a800;
}
.hero-underlined {
  position: relative;
  display: inline-block;
}
.hero-underlined::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #0d2b0f, #e6a800);
  border-radius: 3px;
  transform-origin: left;
  /* Animation */
  animation: underlineGrow 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}
.hero-subtitle {
  font-size: 0.88rem;
  font-weight: 400;
  color: #6b7280;
  margin-top: 20px;
  /* Animation */
  animation: fadeIn 0.6s ease 0.55s both;
}

/* ─── QUICK STAT STRIP ─── */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
.qstat {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 18px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(13, 43, 15, 0.04);
  /* Animation — delay set inline via :style */
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.qstat:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(13, 43, 15, 0.09);
}
.qstat-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: rgba(13, 43, 15, 0.05);
  color: #0d2b0f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.qstat-val {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0d2b0f;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 2px;
}
.qstat-label {
  font-size: 0.58rem;
  font-weight: 600;
  color: rgba(13, 43, 15, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}
.qstat-badge {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.58rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 7px;
}
.qstat-badge--up {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.qstat-badge--dn {
  background: rgba(198, 40, 40, 0.07);
  color: #c62828;
}

/* ─── MAIN GRID ─── */
.main-grid {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  width: 100%;
}

/* ─── DIAL CARD ─── */
.dial-card {
  background: rgb(206, 225, 207);
  border: 1px solid rgba(177, 207, 43, 0.07);
  border-radius: 28px;
  padding: 28px 24px 24px;
  box-shadow: 0 4px 24px rgba(13, 43, 15, 0.06);
  /* Animation */
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}
.dial-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-eyebrow {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(13, 43, 15, 0.35);
}
.live-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(46, 125, 50, 0.07);
  border: 1px solid rgba(46, 125, 50, 0.18);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.56rem;
  font-weight: 800;
  color: #2e7d32;
  letter-spacing: 0.18em;
  /* Animation */
  animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
}
.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4caf50;
  animation: ping 2s infinite;
}

/* ─── GAUGE ─── */
.gauge-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gauge-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.gauge-arc {
  /* Animates the arc drawing from 0 → 94% fill */
  animation: arcDraw 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
}
.gauge-center {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.gauge-num {
  display: flex;
  align-items: flex-start;
  line-height: 1;
}
.gauge-pct {
  font-family: 'Poppins', sans-serif;
  font-size: 6rem;
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.06em;
  line-height: 1;
  /* Animation */
  animation: countUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
}
.gauge-unit {
  font-size: 1.8rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.25);
  margin-top: 8px;
  font-family: 'Poppins', sans-serif;
  /* Animation */
  animation: fadeIn 0.4s ease 1.3s both;
}
.gauge-sublabel {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  color: rgba(13, 43, 15, 0.3);
  text-transform: uppercase;
  /* Animation */
  animation: fadeIn 0.4s ease 1.4s both;
}
.gauge-max {
  background: #f9a825;
  color: #5a3400;
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  padding: 4px 12px;
  border-radius: 20px;
  margin-top: 4px;
  box-shadow: 0 3px 12px rgba(249, 168, 37, 0.3);
  /* Animation — bounce in after arc completes */
  animation: scaleInBounce 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s both;
}

/* ─── FLOW ROW ─── */
.flow-row {
  display: flex;
  align-items: stretch;
  background: #f4f6f4;
  border-radius: 16px;
  padding: 14px 20px;
  margin-top: 12px;
  /* Animation */
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.4s both;
}
.flow-col {
  flex: 1;
}
.flow-divider {
  width: 1px;
  background: rgba(13, 43, 15, 0.08);
  margin: 0 20px;
  align-self: stretch;
}
.flow-bar-wrap {
  height: 3px;
  background: rgba(13, 43, 15, 0.07);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}
.flow-bar {
  height: 100%;
  border-radius: 2px;
  width: 0;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
/* Once barsVisible = true, transition to the actual width */
.flow-bar--animated {
  width: var(--bar-width);
}
.flow-bar--in {
  background: #f9a825;
}
.flow-bar--out {
  background: rgba(13, 43, 15, 0.2);
}
.flow-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flow-label {
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(13, 43, 15, 0.35);
}
.flow-label--in {
  color: rgba(13, 43, 15, 0.5);
}
.flow-num {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: rgba(13, 43, 15, 0.3);
}
.flow-num--in {
  color: #0d2b0f;
}
.flow-num--out {
  color: rgba(13, 43, 15, 0.3);
}

/* ─── CONTROLS COL ─── */
.controls-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ctrl-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  /* Animation */
  animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}
.ctrl-eyebrow {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c8930a;
  margin: 0 0 4px;
}
.ctrl-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.6rem, 2.2vw, 2rem);
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin: 0 0 4px;
}
.ctrl-title em {
  font-style: italic;
  color: #f9a825;
}
.ctrl-sub {
  font-size: 0.72rem;
  color: rgba(13, 43, 15, 0.4);
  font-weight: 400;
  margin: 0;
}

/* ─── SYNC BTN ─── */
.sync-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 14px 24px;
  background: #0d2b0f;
  color: white;
  border: none;
  border-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(13, 43, 15, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}
/* Staggered button entrance */
.sync-btn--1 {
  animation: scaleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}
.sync-btn--2 {
  animation: scaleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both;
}

.sync-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s;
}
.sync-btn:hover {
  background: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(13, 43, 15, 0.25);
}
.sync-btn:hover::after {
  transform: translateX(100%);
}

/* ─── EXPORT LOGS TABLE ─── */
.export-table-card {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(13, 43, 15, 0.04);
  /* Animation */
  animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}
.etable-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 14px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.06);
}
.etable-eyebrow {
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #c8930a;
  margin: 0 0 3px;
}
.etable-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #0d2b0f;
  letter-spacing: -0.02em;
  margin: 0;
}
.etable-count {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.35);
  letter-spacing: 0.08em;
  background: rgba(13, 43, 15, 0.05);
  padding: 4px 10px;
  border-radius: 20px;
}
.etable-wrap {
  width: 100%;
  overflow-x: auto;
}
.etable {
  width: 100%;
  border-collapse: collapse;
  font-family: 'DM Sans', sans-serif;
}
.etable thead tr {
  background: rgba(13, 43, 15, 0.02);
  border-bottom: 1px solid rgba(13, 43, 15, 0.06);
}
.etable th {
  padding: 10px 16px;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(13, 43, 15, 0.38);
  text-align: left;
  white-space: nowrap;
}
.etable th svg {
  display: inline;
  vertical-align: middle;
  margin-right: 5px;
  opacity: 0.6;
}

/* Table rows — staggered fadeUp, delay set inline via :style */
.erow {
  border-bottom: 1px solid rgba(13, 43, 15, 0.04);
  transition: background 0.15s;
  opacity: 0;
  animation: fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.erow:last-child {
  border-bottom: none;
}
.erow:hover {
  background: rgba(13, 43, 15, 0.02);
}
.erow td {
  padding: 12px 16px;
  vertical-align: middle;
}
.erow-date {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.erow-date__main {
  font-size: 0.72rem;
  font-weight: 700;
  color: #0d2b0f;
}
.erow-date__time {
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(13, 43, 15, 0.35);
}
.etype-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 3px 10px;
  border-radius: 6px;
}
.etype-badge--pdf {
  background: rgba(198, 40, 40, 0.08);
  color: #c62828;
}
.etype-badge--csv {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.etype-badge--xlsx {
  background: rgba(13, 99, 176, 0.08);
  color: #0d63b0;
}
.erow-user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #0d2b0f;
}
.erow-avatar {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: rgba(13, 43, 15, 0.08);
  color: #0d2b0f;
  font-size: 0.62rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-transform: uppercase;
}
.estatus {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: capitalize;
  padding: 3px 10px;
  border-radius: 20px;
}
.estatus-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.estatus--success {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.estatus--success .estatus-dot {
  background: #4caf50;
}
.estatus--failed {
  background: rgba(198, 40, 40, 0.08);
  color: #c62828;
}
.estatus--failed .estatus-dot {
  background: #ef5350;
}
.estatus--pending {
  background: rgba(249, 168, 37, 0.1);
  color: #c8930a;
}
.estatus--pending .estatus-dot {
  background: #f9a825;
  animation: ping 2s infinite;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .stat-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 680px) {
  .page-scroll {
    padding: 20px 16px 60px;
  }
  .attn-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .stat-strip {
    grid-template-columns: 1fr;
  }
}
</style>
