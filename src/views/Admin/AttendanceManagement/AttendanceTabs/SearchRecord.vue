<template>
  <div class="sr-page flex h-screen bg-[#F4F7F5]">
    <Sidebar />

    <!-- MAIN CONTENT -->
    <div class="sr-main flex-1 p-4 lg:p-8 font-sans text-slate-700 overflow-y-auto">

      <!-- HEADER -->
      <header class="sr-header mb-3">
        <div class="sr-header-container mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <!-- TITLE + BREADCRUMB -->
          <div>

            <div class="sr-breadcrumb">
              <span class="sr-back cursor-pointer" @click="$router.push('/admin/attendance')">
                Back
              </span>
              <i class="fas fa-chevron-right text-slate-400 text-xs mx-2"></i>
              <span>Attendance</span>
            </div>

            <h1 class="sr-title">
              <span class="sr-title-main">
                Student <span class="sr-highlight">Record</span>
              </span>

              <p class="sr-subtitle text-gray-600" style="font-weight: 400; color: gray;">
                Filter and manage student records by college and academic program.
              </p>
            </h1>

          </div>

        </div>
        <!-- SEARCH -->
        <div class="sr-search ml-auto relative w-full lg:w-[40%] group items-end">

          <div class="sr-search-icon absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i class="fas fa-search text-slate-300 group-focus-within:text-[#4A6741] transition-colors"></i>
          </div>

          <input v-model="searchQuery" type="text" placeholder="Search by ID, Name, or Program..."
            class="sr-search-input w-full" />

        </div>
      </header>


      <!-- MAIN GRID -->
      <main class="sr-grid mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- FILTERS -->
        <section class="sr-filters lg:col-span-4 space-y-6">
          <div class="sr-filter-card bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">

            <div class="sr-filter-header flex items-center justify-between mb-8">
              <h2 class="sr-filter-title">
                Filter
              </h2>
            </div>

            <!-- FILTER GRID -->
            <div class="sr-filter-grid grid grid-cols-1 md:grid-cols-2 gap-4">

              <!-- COLLEGE -->
              <div class="sr-college relative">
                <label class="sr-label">
                  College
                </label>

                <button
                  @click="isCollegeOpen = !isCollegeOpen; isProgramOpen = false"
                  type="button"
                  class="sr-dropdown-btn"
                >
                  <span>{{ filters.college === 'All' ? '— College —' : filters.college }}</span>
                  <i class="fas fa-chevron-down" :class="{ 'rotate-180': isCollegeOpen }"></i>
                </button>

                <div v-if="isCollegeOpen" class="sr-dropdown">
                  <div
                    @click="filters.college = 'All'; isCollegeOpen = false"
                    class="sr-option"
                  >
                    — All Colleges —
                  </div>

                  <div
                    v-for="c in colleges"
                    :key="c"
                    @click="filters.college = c; isCollegeOpen = false"
                    class="sr-option"
                  >
                    {{ c }}
                  </div>
                </div>
              </div>

              <!-- PROGRAM -->
              <div class="sr-program relative">
                <label class="sr-label">
                  Program
                </label>

                <button
                  @click="isProgramOpen = !isProgramOpen; isCollegeOpen = false"
                  type="button"
                  class="sr-dropdown-btn"
                >
                  <span>{{ filters.program === 'All' ? '— Program —' : filters.program }}</span>
                  <i class="fas fa-chevron-down" :class="{ 'rotate-180': isProgramOpen }"></i>
                </button>

                <div v-if="isProgramOpen" class="sr-dropdown">
                  <div
                    @click="filters.program = 'All'; isProgramOpen = false"
                    class="sr-option"
                  >
                    — All Programs —
                  </div>

                  <div
                    v-for="p in programs"
                    :key="p"
                    @click="filters.program = p; isProgramOpen = false"
                    class="sr-option"
                  >
                    {{ p }}
                  </div>
                </div>
              </div>

            </div>

            <!-- STATUS -->
            <div class="sr-status mt-5">
              <label class="sr-label">
                Enrollment Status
              </label>

              <div class="sr-status-list grid gap-2">
                <button
                  v-for="status in ['All', 'Enrolled', 'Withdrawn']"
                  :key="status"
                  @click="filters.status = status"
                  :class="filters.status === status ? 'sr-active' : 'sr-inactive'"
                  class="sr-status-btn"
                >
                  {{ status }}
                </button>
              </div>
            </div>

          </div>
        </section>

        <!-- TABLE -->
        <section class="sr-table lg:col-span-8 space-y-6">
          <div class="sr-table-card bg-white rounded-3xl shadow-xl overflow-hidden">

            <!-- HEADER -->
            <div class="sr-table-header px-8 py-6 flex justify-between">
              <div>
                <h3 class="sr-table-title">Registry Database</h3>
                <p class="sr-table-subtitle">
                  {{ filteredStudents.length }} Records Found
                </p>
              </div>
            </div>

            <!-- TABLE -->
            <div class="sr-table-scroll overflow-y-auto max-h-[calc(100vh-300px)] overflow-x-auto pr-2">

              <table class="w-full text-left">

                <thead class="sr-thead text-[10px] uppercase text-slate-400 sticky top-0 bg-white">
                  <tr>
                    <th class="px-8 py-4">Identity</th>
                    <th class="px-8 py-4">College</th>
                    <th class="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="s in filteredStudents"
                    :key="s.studentId"
                    class="sr-row cursor-pointer hover:bg-[#F9FBFA]"
                  >

                    <td class="px-8 py-5">
                      <div class="font-bold">{{ s.name }}</div>
                      <div class="text-xs text-slate-400">
                        {{ s.studentId }} • {{ s.program }}
                      </div>
                    </td>

                    <td class="px-8 py-5">
                      <span class="sr-badge">
                        {{ s.college }}
                      </span>
                    </td>

                    <td class="px-8 py-5 text-right">
                      <span :class="statusStyle(s.status)" class="px-3 py-1 rounded-full text-xs">
                        {{ s.status }}
                      </span>
                    </td>

                  </tr>
                </tbody>

              </table>

              <!-- LOADING -->
              <div v-if="loading" class="sr-loading py-20 flex justify-center">
                Fetching the student data...
              </div>

              <!-- EMPTY -->
              <div v-else-if="filteredStudents.length === 0" class="sr-empty py-20 flex justify-center">
                No Records Matched
              </div>

            </div>
          </div>

        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'
import '@/assets/styles/student-record.css'

interface Student {
  studentId: string
  name: string
  program: string
  college: string
  status: string
}

const students = ref<Student[]>([])
const loading = ref(true)

const searchQuery = ref('')
const isOpen = ref(false)
const isCollegeOpen = ref(false)
const isProgramOpen = ref(false)
const filters = ref({
  college: 'All',
  program: 'All',
  status: 'All'
})

/*  PAGINATION SAFE FETCH */
onMounted(async () => {
  loading.value = true

  const pageSize = 1000
  let from = 0
  let all: any[] = []

  while (true) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .range(from, from + pageSize - 1)

    if (error) break
    if (!data || data.length === 0) break

    all = all.concat(data)

    if (data.length < pageSize) break

    from += pageSize
  }

  students.value = all.map(s => ({
    studentId: s.id_number,
    name: `${s.last_name}, ${s.first_name} ${s.middle_name ?? ''}`,
    program: s.program,
    college: s.college, 
    status: s.is_active ? 'Enrolled' : 'Withdrawn'
  }))

  console.log('TOTAL LOADED:', all.length)

  loading.value = false
})

const colleges = computed(() =>
  [...new Set(students.value.map(s => s.college))]
)

const programs = computed(() =>
  [...new Set(students.value.map(s => s.program))]
)

/* FILTERED DATA */
const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const q = searchQuery.value.toLowerCase()

    return (
      (s.name.toLowerCase().includes(q) ||
        s.studentId.includes(q) ||
        s.program.toLowerCase().includes(q)) &&
      (filters.value.college === 'All' || s.college === filters.value.college) &&
      (filters.value.program === 'All' || s.program === filters.value.program) &&
      (filters.value.status === 'All' || s.status === filters.value.status)
    )
  })
})

/* RESET */
// const resetFilters = () => {
//   searchQuery.value = ''
//   filters.value = {
//     college: 'All',
//     program: 'All',
//     status: 'All'
//   }
// }

/* STATUS STYLE */
const statusOptions = ['All', 'Enrolled', 'Withdrawn']
const statusStyle = (status: string) => {
  if (status === 'Enrolled') return 'bg-green-100 text-green-700'
  if (status === 'Withdrawn') return 'bg-red-100 text-red-600'
  if (status === 'Graduated') return 'bg-blue-100 text-blue-600'
  return 'bg-gray-100'
}
</script>



<style scoped>
.table-scroll {
  scroll-behavior: smooth;
}

.table-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-scroll::-webkit-scrollbar-track {
  background: transparent;
  margin: 6px 0;
}

.table-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #cbd5e1, #94a3b8);
  /* soft slate gradient */
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
  transition: all 0.25s ease;
}


.table-scroll:hover::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #4A6741, #3b5534);
}


.table-scroll::-webkit-scrollbar-thumb:active {
  background: #2f3e2c;
}


.table-scroll::-webkit-scrollbar-corner {
  background: transparent;
}


.table-scroll {
  margin-right: 5px;
  scrollbar-width: 12px;
  scrollbar-color: #063913 transparent;
}
</style>
