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
            <div v-if="activeTab === 'DASHBOARD'" class="space-y-12">
              <div class="space-y-4">
                <div class="space-y-2">
                  <h2
                    class="text-[#0d2b0f] text-6xl md:text-7xl font-black tracking-tighter anim-slide-up"
                  >
                    Welcome,
                    <span class="text-[#f9a825] anim-shimmer"> {{ firstName || 'User' }} </span>.
                  </h2>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <div
                  v-for="(stat, i) in quickStats"
                  :key="stat.label"
                  class="group bg-white border-2 border-[#1b5e20] p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:bg-[#1b5e20] hover:-translate-y-2 shadow-md hover:shadow-xl cursor-pointer anim-card-in"
                  :style="{ animationDelay: `${i * 0.1}s` }"
                >
                  <span
                    class="mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 text-[#f9a825] group-hover:text-white"
                    v-html="stat.icon"
                  ></span>
                  <h3
                    class="text-[#1b5e20] text-3xl font-black tracking-tight transition-colors duration-300 group-hover:text-white anim-count"
                  >
                    <span v-if="typeof stat.value === 'number'">
                      {{ stat.value }}
                    </span>

                    <span v-else-if="stat.value && stat.value !== '—'">
                      {{ stat.value }}
                    </span>

                    <span v-else class="opacity-40"> — </span>
                  </h3>
                  <p
                    class="text-[#1b5e20] text-[10px] uppercase font-bold tracking-[0.2em] mt-1 transition-colors duration-300 group-hover:text-white/90"
                  >
                    {{ stat.label }}
                  </p>
                  <div
                    class="w-0 group-hover:w-8 h-0.5 bg-[#f9a825] mt-3 transition-all duration-300 rounded-full"
                  ></div>
                </div>
              </div>

              <div
                class="relative py-4 max-w-2xl mx-auto anim-fade-in"
                style="animation-delay: 0.5s"
              >
                <p
                  class="text-[#1b5e20] text-3xl md:text-2xl font-serif italic font-medium leading-tight px-6 relative z-10"
                >
                  "{{ currentQuote.text }}"
                </p>
                <p
                  class="mt-3 text-[#1b5e20] font-bold tracking-[0.3em] uppercase text-[11px] opacity-80"
                >
                  — {{ currentQuote.author }}
                </p>
                <div
                  class="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#1b5e20] to-[#f9a825] rounded-full anim-expand"
                ></div>
              </div>
            </div>

            <div v-else class="text-[#1b5e20] space-y-4 anim-slide-up">
              <h2 class="text-5xl font-black uppercase tracking-tighter">{{ activeTab }}</h2>
              <div class="h-1 w-16 bg-[#1b5e20] mx-auto anim-expand"></div>
              <p class="text-[#1b5e20] font-light italic text-lg opacity-80">
                Accessing database records...
              </p>
            </div>
          </div>
        </transition>
      </div>

      <footer class="relative z-20 p-6 text-center">
        <p class="text-[#1b5e20] text-[10px] uppercase tracking-[0.5em] font-black">
          Caraga State University Library Management
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

const firstName = ref('')

// ACTIVE TAB HANDLER
const handleTabChange = (name: string) => {
  activeTab.value = name
}

// CURRENT DATE
const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
)

// QUOTE
const currentQuote = ref({
  text: 'A library is not a luxury but one of the necessities of life.',
  author: 'Henry Ward Beecher',
})

// actual values
const usersLoggedIn = ref(0)
const topDepartment = ref('—')
const monthlyAttendance = ref(0)
const activeVisitors = ref(0)

// display values
const displayUsers = ref<number | null>(null)
const displayMonthly = ref<number | null>(null)
const displayVisitors = ref<number | null>(null)

const animateValue = (displayRef: any, finalValue: number, duration = 800) => {
  if (finalValue === 0) {
    displayRef.value = 0
    return
  }

  let start = finalValue * 0.3
  const increment = (finalValue - start) / (duration / 16)

  displayRef.value = Math.floor(start)

  const counter = setInterval(() => {
    start += increment

    if (start >= finalValue) {
      displayRef.value = finalValue
      clearInterval(counter)
    } else {
      displayRef.value = Math.floor(start)
    }
  }, 16)
}

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data } = await supabase
      .from('users')
      .select('first_name')
      .eq('email', user.email)
      .single()

    if (data) firstName.value = data.first_name
  }

  // USERS LOGGED IN
  const { count: activeCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  usersLoggedIn.value = activeCount ?? 0

  // TOP DEPARTMENT
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
        if (college) {
          collegeCounts[college] = (collegeCounts[college] ?? 0) + 1
        }
      })

      const top = Object.entries(collegeCounts).sort((a, b) => b[1] - a[1])[0]
      if (top) topDepartment.value = top[0]
    }
  }

  // MONTHLY ATTENDANCE
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const { count: monthCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', startOfMonth)
    .lte('time_in', endOfMonth)

  monthlyAttendance.value = monthCount ?? 0

  // ACTIVE VISITORS (today)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  ).toISOString()

  const { count: todayCount } = await supabase
    .from('attendance_logs')
    .select('*', { count: 'exact', head: true })
    .gte('time_in', startOfDay)
    .lte('time_in', endOfDay)

  activeVisitors.value = todayCount ?? 0

  // RUN ANIMATION (after fetch)
  animateValue(displayUsers, usersLoggedIn.value)
  animateValue(displayMonthly, monthlyAttendance.value)
  animateValue(displayVisitors, activeVisitors.value)
})

const activeTab = ref('DASHBOARD')

const quickStats = computed(() => [
  {
    label: 'Users Logged In',
    value: displayUsers.value,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
  },
  {
    label: 'Top Department',
    value: topDepartment.value,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,
  },
  {
    label: 'Total Monthly Attendance',
    value: displayMonthly.value,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14l2.5 2.5L16 11"/>
    </svg>`,
  },
  {
    label: 'Active Visitors',
    value: displayVisitors.value,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
h2,
h3 {
  letter-spacing: -0.02em;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.anim-slide-up {
  animation: slideUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.anim-fade-in {
  opacity: 0;
  animation: fadeIn 0.7s ease both;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.anim-card-in {
  opacity: 0;
  animation: cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes expand {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 4rem;
    opacity: 1;
  }
}
.anim-expand {
  width: 0;
  animation: expand 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
.anim-shimmer {
  background: linear-gradient(90deg, #f9a825 25%, #fde68a 50%, #f9a825 75%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
