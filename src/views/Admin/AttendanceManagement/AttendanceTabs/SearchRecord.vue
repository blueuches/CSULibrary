<template>
  <div class="page-shell flex min-h-screen bg-[#F4F7F5]">
    <Sidebar />

    <div class="flex-1 p-4 lg:p-8 font-sans text-slate-700 overflow-y-auto">
      
      <!-- <header class="max-w-7xl mx-auto mb-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
              <span>Administrator</span>
              <span class="text-slate-300">/</span>
              <span class="text-[#4A6741]">University Registry</span>
            </nav>
            <h1 class="text-5xl font-black tracking-tight text-slate-900">
              Student <span class="text-[#D4A017] italic">Portal</span>
            </h1>
          </div> -->

           <!-- HEADER -->
      <header class="attn-header">
        <div>
          <div class="header-breadcrumb">
            <span class="breadcrumb-back" @click="$router.push('/admin/attendance')">Back</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>Attendance</span>
          </div>
           <h1 class="hero-title">
            <span class="hero-word-dark hero-underlined">Library</span>
          </h1>

          <div class="relative flex-1 max-w-md group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-300 group-focus-within:text-[#4A6741] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search by ID, Name, or Course..." 
              class="w-full bg-white border-2 border-transparent pl-12 pr-4 py-4 rounded-2xl focus:border-[#4A6741]/20 focus:ring-4 focus:ring-[#4A6741]/5 transition-all outline-none shadow-sm text-sm font-medium"
            />
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <section class="lg:col-span-4 space-y-6">
          <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-xs font-black uppercase tracking-widest text-slate-400">Advance Filter</h2>
              <button @click="resetFilters" class="text-[10px] font-bold text-[#D4A017] hover:underline uppercase">Reset All</button>
            </div>

            <div class="space-y-6">
              <div>
                <label class="text-[10px] font-black uppercase text-slate-500 ml-1 mb-2 block">Department</label>
                <div class="relative">
                  <select v-model="filters.department" class="w-full bg-slate-50 border-none px-5 py-4 rounded-2xl text-sm font-bold text-slate-600 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#4A6741]/10">
                    <option value="All">— choose department —</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase text-slate-500 ml-1 mb-3 block">Enrollment Status</label>
                <div class="grid grid-cols-1 gap-2">
                  <button 
                    v-for="status in ['All', 'Enrolled', 'Withdrawn', 'Graduated']" 
                    :key="status"
                    @click="filters.status = status"
                    :class="filters.status === status ? 'bg-[#0A2619] text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100 hover:border-[#4A6741]/30'"
                    class="w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold transition-all flex justify-between items-center"
                  >
                    {{ status }}
                    <span v-if="filters.status === status" class="w-1.5 h-1.5 bg-[#D4A017] rounded-full"></span>
                  </button>
                </div>
              </div>

              <button class="w-full py-5 bg-[#0A2619] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#123324] transition-all shadow-lg shadow-green-900/10 active:scale-95">
                Generate View
              </button>
            </div>
          </div>
        </section>

        <section class="lg:col-span-8 space-y-6">
          <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
            <div class="px-8 py-7 border-b border-slate-50 flex justify-between items-center bg-[#FCFDFC]">
              <div>
                <h3 class="font-black text-slate-800 uppercase tracking-tight text-sm">Registry Database</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">{{ filteredStudents.length }} Records Found</p>
              </div>
              <button class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black text-slate-500 transition-colors uppercase tracking-widest">Export Data</button>
            </div>

            <div class="overflow-x-auto min-h-[480px]">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 bg-slate-50/20">
                    <th class="px-8 py-5">Identity Info</th>
                    <th class="px-8 py-5">Department</th>
                    <th class="px-8 py-5 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="student in filteredStudents" :key="student.studentId" @click="selectStudent(student)"
                    class="group cursor-pointer hover:bg-[#F9FBFA] transition-all"
                  >
                    <td class="px-8 py-6">
                      <div class="text-sm font-bold text-slate-700 group-hover:text-[#4A6741] transition-colors">{{ student.name }}</div>
                      <div class="text-[10px] font-mono text-slate-300">{{ student.studentId }} • {{ student.course }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <span class="text-[9px] font-black bg-slate-100 px-2.5 py-1 rounded-md text-slate-500 uppercase">{{ student.department }}</span>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <span :class="statusStyle(student.status)" class="text-[9px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-full border">
                        {{ student.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="filteredStudents.length === 0" class="py-24 text-center">
                <p class="text-slate-300 font-black text-xs uppercase tracking-[0.2em]">No Records Matched</p>
              </div>
            </div>
          </div>

          <transition name="slide-up">
            <div v-if="selectedStudent" class="bg-[#0A2619] p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 right-0 p-12 bg-[#D4A017]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div class="flex items-center gap-6 relative z-10">
                <div class="w-14 h-14 bg-[#D4A017] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {{ selectedStudent.name.charAt(0) }}
                </div>
                <div>
                  <p class="text-white text-lg font-black tracking-tight">{{ selectedStudent.name }}</p>
                  <p class="text-[#D4A017] text-[10px] font-black uppercase tracking-widest opacity-80">{{ selectedStudent.studentId }} • {{ selectedStudent.course }}</p>
                </div>
              </div>
              <div class="flex gap-3 relative z-10">
                <button @click="selectedStudent = null" class="px-6 py-3 text-white/50 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all">Dismiss</button>
                <button class="px-8 py-3 bg-white text-[#0A2619] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D4A017] hover:text-white transition-all shadow-xl">Update Entry</button>
              </div>
            </div>
          </transition>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

interface Student {
  studentId: string;
  name: string;
  course: string;
  department: string;
  status: string;
}

// Fixed Search and Filter state
const searchQuery = ref('')
const selectedStudent = ref<Student | null>(null)
const filters = ref({
  department: 'All',
  status: 'All'
})

const departments = ['CICS', 'COED', 'CASS', 'CEIT']

const students = ref<Student[]>([
  { studentId: '2023-1002', name: 'Santos, Ricardo L.', course: 'BSCS', department: 'CICS', status: 'Enrolled' },
  { studentId: '2022-0451', name: 'Villanueva, Maria Q.', course: 'BSEd', department: 'COED', status: 'Enrolled' },
  { studentId: '2021-0889', name: 'Gomez, Fernando D.', course: 'BA Comm', department: 'CASS', status: 'Withdrawn' },
  { studentId: '2023-0012', name: 'Alonzo, Beatrice R.', course: 'BSIT', department: 'CICS', status: 'Enrolled' },
  { studentId: '2020-0992', name: 'Luna, Clarisse D.', course: 'BSCE', department: 'CEIT', status: 'Graduated' },
])

const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = s.name.toLowerCase().includes(q) || s.studentId.includes(q) || s.course.toLowerCase().includes(q)
    const matchDept = filters.value.department === 'All' || s.department === filters.value.department
    const matchStatus = filters.value.status === 'All' || s.status === filters.value.status
    return matchSearch && matchDept && matchStatus
  })
})

const selectStudent = (student: Student) => { 
  selectedStudent.value = student 
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.value = { department: 'All', status: 'All' }
}

const statusStyle = (status: string) => {
  switch (status) {
    case 'Enrolled': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
    case 'Withdrawn': return 'bg-rose-50 text-rose-600 border-rose-100'
    case 'Graduated': return 'bg-blue-50 text-blue-600 border-blue-100'
    default: return 'bg-slate-50 text-slate-500 border-slate-100'
  }
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

/* Scrollbar refinement */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
</style>