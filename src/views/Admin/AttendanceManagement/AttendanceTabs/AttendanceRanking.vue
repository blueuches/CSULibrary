<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />
    <main class="flex-1 p-8 overflow-y-auto">
      <AdminPageHeader :breadcrumbs="['Admin', 'Attendance']" title="Attendance Ranking">
        <template #subtitle>
          Monitor engagement trends, track visitor headcounts, and review attendance by category.
        </template>
        <template #actions>
          <div class="date-badge flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <svg class="w-4 h-4 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm font-semibold text-green-900">{{ currentDate }}</span>
          </div>
        </template>
      </AdminPageHeader>

      <div class="kpi-strip mb-8 flex gap-4">
        <div v-for="(stat, i) in attendanceStats" :key="i"
          class="kpi-card flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 transition-all hover:shadow-md"
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

      <section class="panel mb-8 slide-up bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        style="animation-delay: 0.1s">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select
              Department</label>
            <select v-model="filters.department"
              class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none transition-all">
              <option value="All">All Colleges</option>
              <option v-for="(courses, dept) in departmentMapping" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select
              Course</label>
            <select v-model="filters.course"
              class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none transition-all">
              <option value="All">All Programs</option>
              <option v-for="course in availableCourses" :key="course" :value="course">
                {{ course }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="block text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select
              Limit</label>
            <input type="number" v-model="filters.limit"
              class="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-green-700 outline-none" />
          </div>

          <div class="flex gap-4">
            <button @click="handleShowRanking"
              class="w-37.5 bg-[#0d2b0f] text-white px-6 py-2.5 rounded-lg text-xs font-black tracking-widest hover:bg-green-900 transition-all shadow-green-900/20 uppercase">
              Display
            </button>
            <button 
              @click="exportCSV"
              class="w-37.5 bg-yellow-500 border border-transparent text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-yellow-400 transition-all uppercase tracking-widest">
              Export
            </button>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <section class="panel xl:col-span-2 slide-up bg-white rounded-xl shadow-sm border border-gray-100"
          style="animation-delay: 0.3s">
          <div class="panel-head border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 class="panel-title text-lg font-bold text-gray-800">Student Visitor Ranking</h2>
              <p class="panel-sub text-xs text-gray-500">Leaderboard based on individual visit frequency</p>
            </div>
            <div class="px-6 py-3 text-xs text-gray-500 font-semibold">
              {{ displayCountText }}
            </div>
             <span @click="toggleShowAll"
              class="text-xs font-bold text-green-700 underline cursor-pointer" style="margin-top: 15px; margin-right: 20px;">
              {{ showAll ? 'Show Less' : 'See all Records' }}
            </span>
          </div>
          <div class="overflow-y-auto max-h-105">
            <table class="report-table w-full">
              <thead class="bg-gray-50/50">
                <tr>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">Visits</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">ID Number
                  </th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">Full Name
                  </th>
                  <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Course</th>
                  <th class="py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in filteredStudents" :key="student.id_number"
                  class="table-row-animate border-t border-gray-50 hover:bg-green-50/30 transition-colors"
                  :style="{ animationDelay: (0.4 + (index * 0.05)) + 's' }">
                  <td class="p-4"><span class="font-black text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs">{{
                      student.visits }}</span></td>
                  <td class="p-4 text-sm font-medium text-gray-600">{{ student.id_number }}</td>
                  <td class="p-4 text-sm font-bold text-gray-800 uppercase">{{ student.name }}</td>
                  <td class="p-4 text-sm text-start font-semibold text-gray-500" style="padding-left: 28px;">{{
                    student.course }}</td>
                  <td class="p-4 text-sm text-center font-bold text-gray-700">{{ student.year_level }}</td>
                </tr>
                <tr v-if="filteredStudents.length === 0">
                  <td colspan="5" class="p-10 text-center text-gray-400 text-sm italic">No records found for the
                    selected filters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="panel slide-up bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          style="animation-delay: 0.4s">

          <!-- HEADER -->
          <div class="ar-panel-head p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 class="ar-panel-title text-lg font-bold text-gray-800">College Ranking</h2>
            <p class="panel-sub text-xs text-gray-500">Top College Visitor</p>
          </div>

          <!-- SCROLL AREA -->
          <div class="overflow-y-auto max-h-105">

            <table class="ar-table report-table w-full">

              <tbody>
                <tr v-for="(college, index) in collegeData" :key="college.name"
                  class="border-t border-gray-50 hover:bg-green-50/30 transition">

                  <!-- RANK -->
                  <td class="p-4 w-12 text-center">
                    <span :class="['rank-pill', index === 0 ? 'bg-yellow-400' : 'bg-gray-300']"
                      class="text-[10px] font-black px-2 py-0.5 rounded text-white">
                      {{ index + 1 }}
                    </span>
                  </td>

                  <!-- COLLEGE INFO -->
                  <td class="p-4">
                    <div class="text-xs font-bold text-gray-800">
                      {{ college.name }}
                    </div>
                    <div class="text-[10px] text-gray-400 font-bold uppercase">
                      {{ college.code }}
                    </div>
                  </td>

                  <!-- COUNT -->
                  <td class="p-4 text-right font-black text-green-800">
                    {{ college.count }}
                  </td>

                </tr>
              </tbody>

            </table>

          </div>
        </section>
      </div>

      <input type="checkbox" id="success-trigger" class="modal-logic hidden">

<div class="success-modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 invisible opacity-0 transition-all duration-300">
  
  <label for="success-trigger" class="absolute inset-0 bg-[#0d2b0f]/40 backdrop-blur-sm cursor-pointer"></label>

  <div class="modal-card relative bg-white w-full max-w-[340px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 text-center transform scale-95 transition-all duration-500">
    
    <div class="success-ring-container mb-6">
      <div class="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border-4 border-green-100 shadow-inner">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" 
            class="check-path" />
        </svg>
      </div>
    </div>

    <h3 class="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">Export Success!</h3>
    <p class="text-gray-500 text-[13px] leading-relaxed mb-8 px-2">
      Attendance ranking has been exported successfully.
    </p>

    <label for="success-trigger" 
      class="block w-full py-4 bg-[#0d2b0f] text-white text-[11px] font-black rounded-2xl hover:bg-green-900 transition-all cursor-pointer tracking-[0.2em] uppercase shadow-lg shadow-green-900/20 active:scale-95">
      Okay
    </label>
  </div>
</div>

    </main>
  </div>
</template>



<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

/* =====================================================
  TYPES
===================================================== */
interface Log {
  student_id: string
  attendance_type: string
  college: string
  program: string
  name: string
  year_level: number | string
  time_in?: string
  time_out?: string
}

/* =====================================================
  STATE
===================================================== */
const logs = ref<Log[]>([])
const loading = ref(false)

const filters = ref({
  department: 'All',
  course: 'All',
  limit: 10
})



const exportCSV = async () => {
  const data = filteredStudents.value
  const rowCount = data.length
  
  // 1. prepare the File Name
  const timestamp = new Date().getTime();
  const dateString = new Date().toISOString().split('T')[0];
  const finalFileName = `attendance-ranking-${dateString}-${timestamp}.csv`;

  // 2. Generate CSV content
  const headers = ['ID Number', 'Name', 'Course', 'Year Level', 'Visits']
  const rows = data.map(s => [
    s.id_number,
    s.name,
    s.course,
    s.year_level,
    s.visits
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n')

  try {
    // 3. Save to Database (export_batches table)
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('export_batches')
      .insert([
        {
          file_name: finalFileName, 
          file_type: 'CSV',
          uploaded_by: user?.id || null, 
          exported_by_name: user?.user_metadata?.full_name || 'Admin', 
          row_count: rowCount,
          status: 'Completed'
        }
      ])

    if (error) throw error

    // 4. Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', finalFileName) 
    link.click()
    
    
    const successTrigger = document.getElementById('success-trigger') as HTMLInputElement;
    if (successTrigger) {
      successTrigger.checked = true;
    }
    
  } catch (err) {
    console.error('Export recording failed:', err)
    alert('Failed to record export batch.')
  }
}

/* =====================================================
  FETCH DATA
===================================================== */

const showAll = ref(false)


const fetchAttendance = async () => {
  loading.value = true

  const { data, error } = await supabase
    .from('attendance_logs')
    .select(`
      student_id,
      attendance_type,
      time_in,
      time_out,
      students (
        college,
        program,
        first_name,
        last_name,
        year_level
      )
    `)

  if (error) {
    console.error('Fetch error:', error.message)
    loading.value = false
    return
  }

  logs.value = (data || []).map((item: any) => {
    const s = item.students

    return {
      student_id: item.student_id,
      attendance_type: item.attendance_type || 'unknown',
      college: s?.college || 'Unknown',
      program: s?.program || 'Unknown',
      name: s
        ? `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim()
        : 'Unknown Student',
      year_level: s?.year_level ?? '-'
    }
  })

  loading.value = false
}

/* =====================================================
  STUDENT RANKING
===================================================== */
const studentRanking = computed(() => {
  const map: Record<string, any> = {}

  logs.value.forEach(log => {
    if (!map[log.student_id]) {
      map[log.student_id] = {
        id_number: log.student_id,
        name: log.name,
        course: log.program,
        year_level: log.year_level,
        visits: 0
      }
    }

    map[log.student_id].visits++
  })

  return Object.values(map).sort((a: any, b: any) => b.visits - a.visits)
})


const totalDistinctVisits = computed(() => {
  const set = new Set()

  logs.value.forEach(log => {
    const date = new Date(log.time_in || Date.now())
      .toISOString()
      .split('T')[0]

    set.add(`${log.student_id}-${date}`)
  })

  return set.size
})


/* =====================================================
  FILTERED STUDENTS
===================================================== */
const filteredStudents = computed(() => {
  let data = studentRanking.value

  if (filters.value.department !== 'All') {
    data = data.filter(s =>
      logs.value.find(l => l.student_id === s.id_number)?.college === filters.value.department
    )
  }

  if (filters.value.course !== 'All') {
    data = data.filter(s => s.course === filters.value.course)
  }

  return showAll.value ? data : data.slice(0, filters.value.limit)
})

/* =====================================================
  DEPARTMENT + COURSE (DYNAMIC)
===================================================== */
const departmentMapping = computed(() => {
  const map: Record<string, Set<string>> = {}

  logs.value.forEach(log => {
    const college = log.college

    if (!map[college]) {
      map[college] = new Set<string>()
    }

    map[college].add(log.program)
  })

  return map
})

const availableCourses = computed(() => {
  if (filters.value.department === 'All') {
    return [...new Set(logs.value.map(l => l.program))]
  }

  return [
    ...new Set(
      logs.value
        .filter(l => l.college === filters.value.department)
        .map(l => l.program)
    )
  ]
})

/* =====================================================
  COLLEGE RANKING
===================================================== */
const collegeData = computed(() => {
  const counts: Record<string, number> = {}

  logs.value.forEach(log => {
    counts[log.college] = (counts[log.college] || 0) + 1
  })

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      code: name,
      count
    }))
    .sort((a, b) => b.count - a.count)
})

/* =====================================================
  KPI STATS
===================================================== */
const attendanceStats = computed(() => [
  {
    label: 'Total Visits',
    value: totalDistinctVisits.value,
    icon: 'fas fa-users',
    color: '#166534'
  },
  {
    label: 'Top College',
    value: collegeData.value[0]?.name || 'N/A',
    icon: 'fas fa-trophy',
    color: '#ca8a04'
  },
  {
    label: 'Programs',
    value: new Set(logs.value.map(l => l.program)).size,
    icon: 'fas fa-book',
    color: '#2563eb'
  },
  {
    label: 'Colleges',
    value: new Set(logs.value.map(l => l.college)).size,
    icon: 'fas fa-building',
    color: '#7c3aed'
  }
])

/* =====================================================
  DATE
===================================================== */
const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Counttt
const displayCountText = computed(() => {
  const total = studentRanking.value.length
  const shown = filteredStudents.value.length

  return `Showing ${shown} of ${total} records`
})

/* =====================================================
  ACTIONS
===================================================== */
const handleShowRanking = () => {
  showAll.value = false
  console.log('Filters applied:', filters.value)
}

const toggleShowAll = () => {
  showAll.value = !showAll.value
}


/* =====================================================
  LIFECYCLE
===================================================== */
onMounted(() => {
  fetchAttendance()
})
</script>




<style scoped>
.modal-logic:checked ~ .success-modal-overlay {
  visibility: visible;
  opacity: 1;
}

.modal-logic:checked ~ .success-modal-overlay .modal-card {
  transform: scale(1);
  opacity: 1;
}

.check-path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.modal-logic:checked ~ .success-modal-overlay .check-path {
  animation: draw-check 0.8s ease-in-out forwards 0.2s;
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}
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