<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />
    <main class="flex-1 p-8 overflow-y-auto">
      <header class="report-header intro-header mb-6">
        <div class="header-left">
          <div class="header-breadcrumb mb-2!">
            <span class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/attendance')">BACK</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 inline mx-1">
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
          <div class="date-badge flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <svg class="w-4 h-4 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm font-semibold text-green-900">{{ currentDate }}</span>
          </div>
        </div>
      </header>

      <div class="kpi-strip mb-8 flex gap-4">
        <div v-for="(stat, i) in attendanceStats" :key="i" class="kpi-card flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 transition-all hover:shadow-md"
          :style="{ animationDelay: (i * 0.1) + 's' }">
          <div class="kpi-icon w-12 h-12 flex items-center justify-center rounded-lg"
            :style="{ background: stat.color + '18', color: stat.color }">
            <i :class="stat.icon" class="text-xl"></i>
          </div>
          <div class="kpi-body">
            <div class="kpi-value text-2xl font-bold text-gray-800">{{ stat.value }}</div>
            <span class="kpi-label text-xs uppercase tracking-wider font-bold text-gray-500">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <section class="panel mb-8 slide-up bg-white p-6 rounded-xl shadow-sm border border-gray-100" style="animation-delay: 0.1s">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select Department</label>
            <select v-model="filters.department" class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none transition-all">
              <option value="All">All Departments</option>
              <option v-for="(courses, dept) in departmentMapping" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select Course</label>
            <select v-model="filters.course" class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none transition-all">
              <option value="All">All Courses</option>
              <option v-for="course in availableCourses" :key="course" :value="course">
                {{ course }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select Limit</label>
            <input type="number" v-model="filters.limit" class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none" />
          </div>

          <div class="flex gap-4">
            <button @click="handleShowRanking" 
              class="w-[150px] bg-[#0d2b0f] text-white px-6 py-2.5 rounded-lg text-xs font-black tracking-widest hover:bg-green-900 transition-all shadow-lg shadow-green-900/20 uppercase">
              Display
            </button>
            <button class="w-[150px] bg-yellow-500 border border-transparent text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-yellow-400 transition-all uppercase tracking-widest">
              Export
            </button>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <section class="panel xl:col-span-2 slide-up bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style="animation-delay: 0.3s">
          <div class="panel-head border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 class="panel-title text-lg font-bold text-gray-800">Student Visitor Ranking</h2>
              <p class="panel-sub text-xs text-gray-500">Leaderboard based on individual visit frequency</p>
            </div>
            <span class="text-[11px] font-bold text-green-700 underline cursor-pointer hover:text-green-900" style="margin-right: 30px; margin-top: 20px;">See all Records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="report-table w-full">
              <thead class="bg-gray-50/50">
                <tr>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">Visits</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">ID Number</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">Full Name</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Course</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in filteredStudents" :key="student.id_number" 
                    class="table-row-animate border-t border-gray-50 hover:bg-green-50/30 transition-colors"
                    :style="{ animationDelay: (0.4 + (index * 0.05)) + 's' }">
                  <td class="p-4"><span class="font-black text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs">{{ student.visits }}</span></td>
                  <td class="p-4 text-sm font-medium text-gray-600">{{ student.id_number }}</td>
                  <td class="p-4 text-sm font-bold text-gray-800 uppercase">{{ student.name }}</td>
                  <td class="p-4 text-sm text-center font-semibold text-gray-500">{{ student.course }}</td>
                  <td class="p-4 text-sm text-center font-bold text-gray-700">{{ student.year_level }}</td>
                </tr>
                <tr v-if="filteredStudents.length === 0">
                  <td colspan="5" class="p-10 text-center text-gray-400 text-sm italic">No records found for the selected filters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="panel slide-up bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style="animation-delay: 0.4s">
          <div class="panel-head p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 class="panel-title text-lg font-bold text-gray-800">College Ranking</h2>
            <p class="panel-sub text-xs text-gray-500">Top College Visitor</p>
          </div>
          <table class="report-table w-full">
            <tbody>
              <tr v-for="(college, index) in collegeData" :key="college.name" class="border-t border-gray-50">
                <td class="p-4 w-12 text-center">
                  <span :class="['rank-pill', index === 0 ? 'bg-yellow-400' : 'bg-gray-200']" 
                        class="text-[10px] font-black px-2 py-0.5 rounded text-white">
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="p-4">
                  <div class="text-xs font-bold text-gray-800">{{ college.name }}</div>
                  <div class="text-[10px] text-gray-400 font-bold uppercase">{{ college.code }}</div>
                </td>
                <td class="p-4 text-right font-black text-green-800">{{ college.count }}</td>
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
import { ref, onMounted, computed, watch } from 'vue'

const currentDate = ref('')

// 1. Department to Course Mapping
const departmentMapping: Record<string, string[]> = {
  'CCIS': ['BSIT', 'BSIS'],
  'CED': ['BEED', 'BSED'],
  'CEGS': ['BSCE', 'BSGE'],
  'CHASS': ['BS Psych', 'AB English'],
  'CAA': ['BS Agribiz', 'BS Agri']
}

// Filters State
const filters = ref({
  department: 'CCIS',
  course: 'All',
  limit: 5
})

// 2. Computed: Available Courses based on selected Department
const availableCourses = computed(() => {
  if (filters.value.department === 'All') {
    // Return all unique courses from all departments
    return Object.values(departmentMapping).flat()
  }
  return departmentMapping[filters.value.department] || []
})

// 3. Watcher: Reset Course to 'All' when Department changes
watch(() => filters.value.department, () => {
  filters.value.course = 'All'
})

// KPI Stats
const attendanceStats = ref([
  { label: 'Total Visitors', value: '1,245', icon: 'fas fa-users', color: '#1b5e20' },
  { label: 'Students', value: '980', icon: 'fas fa-user-graduate', color: '#0d2b0f' },
  { label: 'External', value: '265', icon: 'fas fa-walking', color: '#f9a825' },
  { label: 'Top College', value: 'CCIS', icon: 'fas fa-trophy', color: '#f9a825' }
])

// Mock Data
const students = ref([
  { visits: 119, id_number: '241-01691', name: 'FIGURON, SOPHIA GABRIELLE E.', course: 'BSIT', dept: 'CCIS', year_level: 2 },
  { visits: 115, id_number: '241-00581', name: 'ANDRADE, LEA MENDEZ', course: 'BSIT', dept: 'CCIS', year_level: 2 },
  { visits: 115, id_number: '251-02627', name: 'HOMECILLO, JAY BERNARD OPA...', course: 'BSIT', dept: 'CCIS', year_level: 1 },
  { visits: 99, id_number: '251-00326', name: 'YBAÑEZ, SHERELYN HERBOLIN...', course: 'BSIS', dept: 'CCIS', year_level: 1 },
  { visits: 98, id_number: '251-03295', name: 'ABAN, ANDREI CHRISTIAN CUYNO', course: 'BSIT', dept: 'CCIS', year_level: 1 },
  { visits: 85, id_number: '251-04444', name: 'SANTOS, MARIA CLARA', course: 'BEED', dept: 'CED', year_level: 3 },
  { visits: 45, id_number: '251-09999', name: 'DELA CRUZ, JUAN', course: 'BSCE', dept: 'CEGS', year_level: 4 }
])

const collegeData = ref([
  { name: 'College of Computing and Info. Sci.', code: 'CCIS', count: 420 },
  { name: 'College of Education', code: 'CED', count: 350 },
  { name: 'College of Agriculture', code: 'CAA', count: 310 },
  { name: 'College of Engineering', code: 'CEGS', count: 280 }
])

// Filtering Logic
const filteredStudents = computed(() => {
  return students.value
    .filter(s => {
      const deptMatch = filters.value.department === 'All' || s.dept === filters.value.department
      const courseMatch = filters.value.course === 'All' || s.course === filters.value.course
      return deptMatch && courseMatch
    })
    .sort((a, b) => b.visits - a.visits) 
    .slice(0, filters.value.limit)
})

const handleShowRanking = () => {
  console.log('Fetching data for:', filters.value)
}

onMounted(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  currentDate.value = new Date().toLocaleDateString('en-US', options)
})
</script>

<style scoped>
.table-row-animate {
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.4s forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rank-pill {
  display: inline-block;
  min-width: 20px;
}
</style>