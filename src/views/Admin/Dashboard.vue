<template>
  <div class="flex h-screen bg-white overflow-hidden font-sans">
    <Sidebar :activeTab="activeTab" @updateActiveTab="handleTabChange" />

    <main class="flex-1 relative overflow-hidden flex flex-col min-w-0">
      <header class="relative z-20 h-20 flex items-center justify-between px-12 bg-transparent">
        <div class="flex flex-col">
          <span class="font-bold text-sm uppercase tracking-widest text-[#1b5e20]">
            {{ activeTab }} VIEW
          </span>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right hidden md:block">
            <p class="text-xs font-medium text-[#1b5e20]">{{ currentDate }}</p>
          </div>
        </div>
      </header>

      <div
        class="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-6 overflow-y-auto"
      >
        <transition name="fade" mode="out-in">
          <div :key="activeTab" class="w-full max-w-6xl py-12">
            <!-- DASHBOARD -->
            <div v-if="activeTab === 'DASHBOARD'" class="space-y-12">
              <h2 class="text-[#0d2b0f] text-6xl md:text-7xl font-black">
                Welcome,
                <span class="text-[#f9a825]">{{ firstName || 'User' }}</span
                >.
              </h2>

              <!-- STATS -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <div
                  v-for="(stat, i) in quickStats"
                  :key="stat.label"
                  class="stat-card-wrapper"
                  :style="{ '--i': i }"
                  @mousemove="onMouseMove($event, i)"
                  @mouseleave="onMouseLeave(i)"
                >
                  <div
                    class="stat-card"
                    :ref="
                      (el) => {
                        cardRefs[i] = el
                      }
                    "
                    :style="cardStyles[i]"
                  >
                    <!-- Mouse-tracked shimmer -->
                    <div class="stat-shimmer" :style="shimmerStyles[i]"></div>

                    <!-- Top accent bar -->
                    <div class="stat-accent-bar"></div>

                    <!-- ICON -->
                    <span class="stat-icon" v-html="stat.icon"></span>

                    <!-- VALUE -->
                    <h3 class="stat-value">{{ stat.value ?? '—' }}</h3>

                    <!-- LABEL -->
                    <p class="stat-label">{{ stat.label }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- OTHER TABS -->
            <div v-else class="text-[#1b5e20]">
              <h2 class="text-5xl font-black">{{ activeTab }}</h2>
              <p>Loading...</p>
            </div>
          </div>
        </transition>
      </div>

      <!-- FOOTER -->
      <footer class="p-6 text-center">
        <p class="text-[10px] uppercase tracking-[0.5em] font-black text-[#1b5e20]">
          Caraga State University Library Management
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

/* ======================
   STATE
====================== */
const firstName = ref('')
const activeTab = ref('DASHBOARD')

const monthlyAttendance = ref(0)
const activeVisitors = ref(0)
const timedOutVisitors = ref(0)
const topDepartment = ref('—')

const displayMonthly = ref<number | null>(null)
const displayVisitors = ref<number | null>(null)
const displayTimedOut = ref<number | null>(null)

/* ======================
   3D TILT
====================== */
const CARD_COUNT = 4
const cardRefs = reactive<any[]>(new Array(CARD_COUNT).fill(null))

// inline style strings applied to each card
const cardStyles = reactive<string[]>(
  new Array(CARD_COUNT).fill('transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1);'),
)
const shimmerStyles = reactive<string[]>(new Array(CARD_COUNT).fill(''))

function onMouseMove(e: MouseEvent, index: number) {
  const card = cardRefs[index]
  if (!card) return

  const rect = (card as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const cx = rect.width / 2
  const cy = rect.height / 2

  // Max ±18deg tilt — more dramatic so it's clearly visible
  const rotY = ((x - cx) / cx) * 18
  const rotX = -((y - cy) / cy) * 18

  // Perspective on wrapper CSS, so just rotateX/Y + scale here
  cardStyles[index] = `transform: rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05);`

  // Radial highlight follows cursor
  const px = (x / rect.width) * 100
  const py = (y / rect.height) * 100
  shimmerStyles[index] =
    `background: radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22) 0%, transparent 60%);`
}

function onMouseLeave(index: number) {
  cardStyles[index] = 'transform: rotateX(0deg) rotateY(0deg) scale(1);'
  shimmerStyles[index] = ''
}

/* ======================
   HELPERS
====================== */
const handleTabChange = (name: string) => {
  activeTab.value = name
}

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
)

/* ======================
   COUNT-UP ANIMATION
====================== */
const animateValue = (target: any, final: number, duration = 800) => {
  let start = Math.floor(final * 0.3)
  const step = (final - start) / (duration / 16)
  target.value = start
  const interval = setInterval(() => {
    start += step
    if (start >= final) {
      target.value = final
      clearInterval(interval)
    } else target.value = Math.floor(start)
  }, 16)
}

/* ======================
   LOAD DATA
====================== */
onMounted(async () => {
  const { data: auth } = await supabase.auth.getUser()
  if (auth?.user) {
    const { data } = await supabase
      .from('users')
      .select('first_name')
      .eq('email', auth.user.email)
      .single()
    if (data) firstName.value = data.first_name
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const { count: monthCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', startOfMonth)
    .lte('time_in', endOfMonth)
  monthlyAttendance.value = monthCount ?? 0
  animateValue(displayMonthly, monthlyAttendance.value)

  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  ).toISOString()

  const { count: activeCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', startOfDay)
    .lte('time_in', endOfDay)
    .is('time_out', null)
  activeVisitors.value = activeCount ?? 0

  const { count: timedOutCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', startOfDay)
    .lte('time_in', endOfDay)
    .not('time_out', 'is', null)
  timedOutVisitors.value = timedOutCount ?? 0

  animateValue(displayVisitors, activeVisitors.value)
  animateValue(displayTimedOut, timedOutVisitors.value)

  const { data: attendanceData } = await supabase.from('attendance_logs').select('student_id')
  if (attendanceData && attendanceData.length > 0) {
    const studentIds = [...new Set(attendanceData.map((a) => a.student_id))]
    const { data: studentsData } = await supabase
      .from('students')
      .select('id_number, college')
      .in('id_number', studentIds)

    if (studentsData) {
      const collegeMap: Record<string, string> = {}
      studentsData.forEach((s) => {
        collegeMap[s.id_number] = s.college
      })

      const collegeCounts: Record<string, number> = {}
      attendanceData.forEach((a) => {
        const college = collegeMap[a.student_id]
        if (college) collegeCounts[college] = (collegeCounts[college] ?? 0) + 1
      })

      const top = Object.entries(collegeCounts).sort((a, b) => b[1] - a[1])[0]
      if (top) topDepartment.value = top[0]
    }
  }
})

/* ======================
   STATS
====================== */
const quickStats = computed(() => [
  {
    label: 'Top Department',
    value: topDepartment.value,
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    label: 'Monthly Attendance',
    value: displayMonthly.value,
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14l2.5 2.5L16 11"/></svg>`,
  },
  {
    label: 'Active Visitors',
    value: displayVisitors.value,
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    label: 'Visitors Timed Out',
    value: displayTimedOut.value,
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  },
])
</script>

<style scoped>
/* ── Wrapper — perspective container ── */
.stat-card-wrapper {
  animation: card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 0.1s);
  /* perspective must be on the PARENT, not the card itself */
  perspective: 600px;
  perspective-origin: center center;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Card ── */
.stat-card {
  position: relative;
  background: #fff;
  border: 2px solid #1b5e20;
  border-radius: 1rem;
  padding: 1.75rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;
  /* DO NOT use overflow:hidden — it flattens 3D in some browsers */
  transform-style: preserve-3d;
  will-change: transform;

  /* smooth spring-back when mouse leaves */
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    background 0.28s ease,
    border-color 0.28s ease;
}

.stat-card-wrapper:hover .stat-card {
  background: #1b5e20;
  border-color: #2e7d32;
  box-shadow:
    0 30px 60px rgba(27, 94, 32, 0.3),
    0 10px 20px rgba(27, 94, 32, 0.18);
}

/* ── Mouse-tracked radial shimmer ── */
.stat-shimmer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  transition: background 0.08s linear;
}

/* ── Amber top-edge accent ── */
.stat-accent-bar {
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f9a825, transparent);
  opacity: 0;
  transition: opacity 0.28s ease;
}

.stat-card-wrapper:hover .stat-accent-bar {
  opacity: 1;
}

/* ── Icon ── */
.stat-icon {
  color: #f9a825;
  display: flex;
  transition:
    color 0.28s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.stat-card-wrapper:hover .stat-icon {
  color: #fff;
  transform: scale(1.18);
}

/* ── Value ── */
.stat-value {
  font-size: 2.25rem;
  font-weight: 900;
  margin-top: 0.5rem;
  color: #1b5e20;
  line-height: 1;
  transition: color 0.28s ease;
}

.stat-card-wrapper:hover .stat-value {
  color: #fff;
}

/* ── Label ── */
.stat-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 800;
  margin-top: 0.375rem;
  color: #1b5e20;
  transition: color 0.28s ease;
}

.stat-card-wrapper:hover .stat-label {
  color: rgba(255, 255, 255, 0.85);
}

/* ── Tab fade ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
