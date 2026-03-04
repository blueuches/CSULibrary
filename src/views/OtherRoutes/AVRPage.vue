<template>
  <div class="w-full py-6 px-4 max-w-7xl mx-auto">
    <!-- Back Button + Tags (full width, outside grid) -->
    <div class="flex items-center gap-3 mb-3">
      <button
        @click="$router.back()"
        class="inline-flex items-center gap-1 text-sm font-semibold text-[#1b5e20] hover:underline"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <span
        style="
          font-size: 0.75rem;
          font-weight: 700;
          color: #1b5e20;
          border-left: 3px solid #1b5e20;
          padding-left: 8px;
        "
        >Services</span
      >
      <span
        style="
          font-size: 0.75rem;
          font-weight: 700;
          color: #1b5e20;
          border-left: 3px solid #f9a825;
          padding-left: 8px;
        "
        >Caraga State University Library</span
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT: Calendar (2/3) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Page Header (inside left col, aligns with sidebar) -->
        <div>
          <h1
            style="font-size: 2.2rem; font-weight: 900; color: #0d2b0f; line-height: 1.2"
            class="mb-2"
          >
            AVR Room Reservation
          </h1>
          <p style="font-size: 0.95rem; color: #555; max-width: 520px; line-height: 1.6">
            Reserve the Audio-Visual Room for academic presentations, seminars, and events at Caraga
            State University Library.
          </p>
        </div>

        <!-- Download Banner -->
        <div
          class="flex items-center justify-between px-5 py-4 rounded-xl"
          style="background: linear-gradient(135deg, #0d2b0f 0%, #1b5e20 100%); color: white"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg" style="background: rgba(255, 255, 255, 0.15)">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p style="font-size: 0.85rem; font-weight: 700">Reservation Form Required</p>
              <p style="font-size: 0.75rem; opacity: 0.8">
                Download and fill out the form before your visit
              </p>
            </div>
          </div>
          <a
            href="#"
            class="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            style="background: #f9a825; color: #0d2b0f; font-size: 0.8rem; white-space: nowrap"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Form
          </a>
        </div>

        <!-- Custom Calendar -->
        <div
          class="rounded-xl overflow-hidden"
          style="border: 2px solid #e0e0e0; box-shadow: 0 4px 24px rgba(13, 43, 15, 0.08)"
        >
          <!-- Calendar Top Bar -->
          <div
            class="flex items-center justify-between px-5 py-3"
            style="background: #0d2b0f; color: white"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.05em"
                >AVR Reservation Calendar</span
              >
            </div>
            <div class="flex items-center gap-2">
              <span
                class="text-xs px-2 py-1 rounded-full"
                style="background: #f9a825; color: #0d2b0f; font-weight: 700"
                >GMT+08</span
              >
              <button @click="prevMonth" class="p-1 rounded transition hover:bg-white/20">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span
                style="font-size: 0.85rem; font-weight: 700; min-width: 130px; text-align: center"
                >{{ monthLabel }}</span
              >
              <button @click="nextMonth" class="p-1 rounded transition hover:bg-white/20">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Day Labels -->
          <div
            class="grid grid-cols-7 text-center"
            style="background: #f1f8f1; border-bottom: 1px solid #e0e0e0"
          >
            <div
              v-for="d in dayLabels"
              :key="d"
              class="py-2"
              style="font-size: 0.75rem; font-weight: 700; color: #1b5e20"
            >
              {{ d }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7" style="background: white">
            <div
              v-for="(cell, i) in calendarCells"
              :key="i"
              class="border-r border-b"
              style="border-color: #f0f0f0; min-height: 78px; padding: 6px 8px"
              :style="!cell.isCurrentMonth ? 'background: #fafafa' : ''"
            >
              <span
                class="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold"
                :style="
                  cell.isToday
                    ? 'background: #0d2b0f; color: white;'
                    : cell.isCurrentMonth
                      ? 'color: #222;'
                      : 'color: #ccc;'
                "
                >{{ cell.day }}</span
              >
              <div
                v-for="(ev, ei) in cell.events"
                :key="ei"
                class="mt-1 rounded px-1.5 py-0.5 truncate"
                style="font-size: 0.7rem; font-weight: 600"
                :style="ev.style"
              >
                {{ ev.label }}
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div
            class="flex flex-wrap items-center gap-4 px-5 py-3"
            style="border-top: 1px solid #e0e0e0; background: #f9fdf9"
          >
            <span
              style="
                font-size: 0.72rem;
                font-weight: 700;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              "
              >Legend:</span
            >
            <div class="flex items-center gap-1.5">
              <span
                class="w-3 h-3 rounded-sm"
                style="background: #bbdefb; display: inline-block"
              ></span>
              <span style="font-size: 0.72rem; color: #444; font-weight: 600">Reserved</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="w-3 h-3 rounded-sm"
                style="background: #c8e6c9; display: inline-block"
              ></span>
              <span style="font-size: 0.72rem; color: #444; font-weight: 600">Available</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="w-3 h-3 rounded-sm"
                style="background: #ffcdd2; display: inline-block"
              ></span>
              <span style="font-size: 0.72rem; color: #444; font-weight: 600">Unavailable</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Info Cards (1/3) -->
      <div class="lg:col-span-1 flex flex-col gap-4 self-start sticky top-6">
        <!-- Room Info — dark gradient same as Total Colleges card -->
        <div
          class="rounded-xl p-5"
          style="background: linear-gradient(135deg, #0d2b0f 0%, #1b5e20 100%); color: white"
        >
          <p
            style="
              font-size: 0.75rem;
              opacity: 0.7;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            "
            class="mb-1"
          >
            Room Details
          </p>
          <p style="font-size: 1.5rem; font-weight: 900; line-height: 1.2" class="mb-3">
            Audio-Visual Room
          </p>
          <div
            class="flex flex-col gap-3 pt-3"
            style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-4 h-4 flex-shrink-0"
                style="opacity: 0.8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                />
              </svg>
              <div>
                <p style="font-size: 0.72rem; opacity: 0.7; font-weight: 600">Capacity</p>
                <p style="font-size: 0.88rem; font-weight: 800">Up to 50 persons</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="w-4 h-4 flex-shrink-0"
                style="opacity: 0.8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p style="font-size: 0.72rem; opacity: 0.7; font-weight: 600">Operating Hours</p>
                <p style="font-size: 0.88rem; font-weight: 800">Mon–Fri, 8:00 AM – 5:00 PM</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="w-4 h-4 flex-shrink-0"
                style="opacity: 0.8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <div>
                <p style="font-size: 0.72rem; opacity: 0.7; font-weight: 600">Advance Booking</p>
                <p style="font-size: 0.88rem; font-weight: 800">At least 3 days before use</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="rounded-xl p-5" style="border: 2px solid #e8f5e9; background: #f9fdf9">
          <h3
            style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
            class="mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              style="color: #1b5e20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Amenities
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="item in amenities" :key="item" class="flex items-center gap-2">
              <svg
                class="w-3.5 h-3.5 flex-shrink-0"
                style="color: #1b5e20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span style="font-size: 0.78rem; color: #333; font-weight: 600">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- How to Reserve -->
        <div class="rounded-xl p-5" style="border: 2px solid #fff3cd; background: #fffdf0">
          <h3
            style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
            class="mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              style="color: #f9a825"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How to Reserve
          </h3>
          <div class="flex flex-col gap-3">
            <div v-for="(step, i) in steps" :key="i" class="flex items-start gap-3">
              <div
                class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
                style="background: #0d2b0f; font-size: 0.7rem; font-weight: 800"
              >
                {{ i + 1 }}
              </div>
              <p style="font-size: 0.8rem; color: #444; line-height: 1.5; padding-top: 2px">
                {{ step }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div
          class="rounded-xl p-5 flex items-center gap-4"
          style="background: #0d2b0f; color: white"
        >
          <div class="p-3 rounded-xl flex-shrink-0" style="background: rgba(255, 255, 255, 0.1)">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p style="font-size: 0.75rem; opacity: 0.7; font-weight: 600">Inquiries</p>
            <p style="font-size: 0.9rem; font-weight: 800">CSU Library Office</p>
            <p style="font-size: 0.78rem; opacity: 0.8">library@carsu.edu.ph</p>
          </div>
        </div>

        <!-- Library Updates -->
        <div>
          <h2
            style="
              font-size: 1.2rem;
              font-weight: 900;
              color: #0d2b0f;
              border-bottom: 3px solid #f9a825;
              padding-bottom: 8px;
            "
            class="mb-4"
          >
            LIBRARY UPDATES
          </h2>
          <div
            v-for="(post, i) in latestPosts"
            :key="i"
            class="flex gap-3 mb-4 cursor-pointer group"
          >
            <img
              :src="post.image"
              :alt="post.title"
              class="w-20 h-16 object-cover rounded flex-shrink-0"
            />
            <div>
              <p
                class="group-hover:text-[#1b5e20] transition-colors duration-200"
                style="font-size: 0.85rem; font-weight: 700; color: #1b5e20; line-height: 1.4"
              >
                {{ post.title }}
              </p>
              <p style="font-size: 0.75rem; color: #888" class="mt-1">{{ post.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCROLL TO TOP -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:opacity-90"
        style="background: #0d2b0f"
      >
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 11l7-7 7 7"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 17l7-7 7 7"
          />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ── Scroll to Top ────────────────────────────────────── */
const showScrollTop = ref(false)
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthLabel = computed(() =>
  new Date(currentYear.value, currentMonth.value, 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  }),
)

const events = [
  {
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-10`,
    label: 'Dept Seminar',
    style: 'background:#bbdefb; color:#1565c0;',
  },
  {
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-15`,
    label: 'Thesis Defense',
    style: 'background:#bbdefb; color:#1565c0;',
  },
  {
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-18`,
    label: 'Unavailable',
    style: 'background:#ffcdd2; color:#c62828;',
  },
  {
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-22`,
    label: 'Book Club',
    style: 'background:#bbdefb; color:#1565c0;',
  },
]

const calendarCells = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells: {
    day: number
    isCurrentMonth: boolean
    isToday: boolean
    events: { label: string; style: string }[]
  }[] = []

  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, isCurrentMonth: false, isToday: false, events: [] })

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isToday =
      d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
    const dayEvents = events
      .filter((e) => e.date === dateStr)
      .map((e) => ({ label: e.label, style: e.style }))
    cells.push({ day: d, isCurrentMonth: true, isToday, events: dayEvents })
  }

  const remainder = cells.length % 7
  if (remainder !== 0)
    for (let d = 1; d <= 7 - remainder; d++)
      cells.push({ day: d, isCurrentMonth: false, isToday: false, events: [] })

  return cells
})

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else currentMonth.value--
}
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else currentMonth.value++
}

const amenities = [
  'Projector',
  'White Screen',
  'Sound System',
  'Air Conditioned',
  'Wi-Fi Access',
  'Whiteboard',
  'Podium',
  'HDMI / VGA',
]
const steps = [
  'Download the reservation form from the link above.',
  'Fill out all required details including date, time, and purpose.',
  'Submit the form to the Library Office at least 3 days before.',
  'Wait for confirmation from the library staff.',
  'Present your confirmation slip on the day of use.',
]

const latestPosts = [
  {
    image: new URL('@/assets/images/card2.jpg', import.meta.url).href,
    title: 'National Book Week Celebration',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/card3.png', import.meta.url).href,
    title: 'STARBOOKS - DOST-STII',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/reservation.jpg', import.meta.url).href,
    title: 'AVR Reservation',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/top.jpg', import.meta.url).href,
    title: 'Top Library Borrowers and Visitors',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/newly_acc_books.png', import.meta.url).href,
    title: 'Newly Acquired Books',
    date: 'February 19, 2026',
  },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
