<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import Sidebar from "@/components/Sidebar.vue"
import { getAttendanceLogs } from "@/services/attendanceService"

type Student = {
  id_number?: string
  first_name?: string
  last_name?: string
  program?: string
  college?: string
  year_level?: string | number
}

type AttendanceLog = {
  id: string
  student_id: string
  time_in: string | null
  time_out: string | null
  attendance_type: string | null
  event_id: string | null
  duration_minutes: number | null
  students?: Student | Student[] | null
}

const logs = ref<AttendanceLog[]>([])
const loading = ref(false)
const errorMessage = ref("")

const search = ref("")
const selectedProgram = ref("")
const selectedCollege = ref("")
const selectedYearLevel = ref("")
const selectedAttendanceType = ref("")
const selectedStatus = ref("")
const selectedDate = ref("")

const currentPage = ref(1)
const itemsPerPage = 10

const fetchAttendanceLogs = async () => {
  loading.value = true
  errorMessage.value = ""

  try {
  const data = await getAttendanceLogs()
  logs.value = data || []
} catch (error: unknown) {
  console.error("Failed to fetch attendance logs:", error)

  if (error instanceof Error) {
    errorMessage.value = error.message
  } else {
    errorMessage.value = "Failed to load attendance logs."
  }
} finally {
  loading.value = false
}
}

onMounted(() => {
  fetchAttendanceLogs()
})

const normalizeStudent = (student: Student | Student[] | null | undefined): Student => {
  if (Array.isArray(student)) {
    return student[0] || {}
  }
  return student || {}
}

const formatDateTime = (value: string | null) => {
  if (!value) return "--"

  return new Date(value).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const getStatus = (log: AttendanceLog) => {
  return log.time_out ? "Checked Out" : "Checked In"
}

const uniquePrograms = computed(() => {
  const values = logs.value
    .map((log) => normalizeStudent(log.students).program)
    .filter(Boolean) as string[]

  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
})

const uniqueColleges = computed(() => {
  const values = logs.value
    .map((log) => normalizeStudent(log.students).college)
    .filter(Boolean) as string[]

  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
})

const uniqueYearLevels = computed(() => {
  const values = logs.value
    .map((log) => normalizeStudent(log.students).year_level)
    .filter((v) => v !== null && v !== undefined && v !== "") as (string | number)[]

  return [...new Set(values.map(String))].sort((a, b) => Number(a) - Number(b))
})

const uniqueAttendanceTypes = computed(() => {
  const values = logs.value
    .map((log) => log.attendance_type)
    .filter(Boolean) as string[]

  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
})

const filteredLogs = computed(() => {
  return logs.value.filter((log) => {
    const student = normalizeStudent(log.students)

    const fullName =
      `${student.first_name || ""} ${student.last_name || ""}`.trim().toLowerCase()

    const idNumber = String(student.id_number || "").toLowerCase()
    const program = String(student.program || "")
    const college = String(student.college || "")
    const yearLevel = String(student.year_level || "")
    const attendanceType = String(log.attendance_type || "")
    const status = getStatus(log)
    const searchValue = search.value.trim().toLowerCase()

    const logDate = log.time_in
      ? new Date(log.time_in).toISOString().slice(0, 10)
      : ""

    const matchesSearch =
      !searchValue ||
      fullName.includes(searchValue) ||
      idNumber.includes(searchValue)

    const matchesProgram =
      !selectedProgram.value || program === selectedProgram.value

    const matchesCollege =
      !selectedCollege.value || college === selectedCollege.value

    const matchesYearLevel =
      !selectedYearLevel.value || yearLevel === selectedYearLevel.value

    const matchesAttendanceType =
      !selectedAttendanceType.value || attendanceType === selectedAttendanceType.value

    const matchesStatus =
      !selectedStatus.value || status === selectedStatus.value

    const matchesDate =
      !selectedDate.value || logDate === selectedDate.value

    return (
      matchesSearch &&
      matchesProgram &&
      matchesCollege &&
      matchesYearLevel &&
      matchesAttendanceType &&
      matchesStatus &&
      matchesDate
    )
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredLogs.value.length / itemsPerPage))
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredLogs.value.slice(start, end)
})

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

watch(
  [
    search,
    selectedProgram,
    selectedCollege,
    selectedYearLevel,
    selectedAttendanceType,
    selectedStatus,
    selectedDate,
  ],
  () => {
    currentPage.value = 1
  }
)

watch(filteredLogs, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

const clearFilters = () => {
  search.value = ""
  selectedProgram.value = ""
  selectedCollege.value = ""
  selectedYearLevel.value = ""
  selectedAttendanceType.value = ""
  selectedStatus.value = ""
  selectedDate.value = ""
  currentPage.value = 1
}

const exportToCSV = () => {
  const headers = [
    "ID Number",
    "Student Name",
    "Program",
    "College",
    "Year Level",
    "Attendance Type",
    "Time In",
    "Time Out",
    "Duration (mins)",
  ]

  const rows = filteredLogs.value.map((log) => {
    const student = normalizeStudent(log.students)

    return [
      student.id_number || "",
      `${student.first_name || ""} ${student.last_name || ""}`.trim(),
      student.program || "",
      student.college || "",
      student.year_level || "",
      log.attendance_type || "",
      log.time_in ? formatDateTime(log.time_in) : "",
      log.time_out ? formatDateTime(log.time_out) : "",
      log.duration_minutes ?? "",
    ]
  })

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `attendance-logs-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="layoutShell">
  <div class="sidebarWrap">
    <Sidebar />
  </div>

  <main class="mainArea">
      <div class="page">
        <div class="wrap">
          <div class="card">
            <div class="headBlock">
              <div class="header-breadcrumb !mb-2">
                <span
                  class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
                  @click="$router.push('/admin/attendance')"
                >
                  BACK
                </span>

                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>

                <span>Attendance</span>
              </div>

              <div class="titleHero">
                <h1 class="heroTitle">
                  <span class="heroTitlePrimary">Attendance</span>
                  <span class="heroTitleAccent">Logs</span>
                </h1>

                <div class="heroUnderline"></div>
              </div>
            </div>

            <div class="toolbar">
              <div class="toolbarLeft">
                <div class="stackCol">
                  <select v-model="selectedProgram" class="control selectControl">
                    <option value="">All Programs</option>
                    <option
                      v-for="program in uniquePrograms"
                      :key="program"
                      :value="program"
                    >
                      {{ program }}
                    </option>
                  </select>

                  <input
                    v-model="selectedDate"
                    type="date"
                    class="control inputControl dateControl"
                  />
                </div>

                <div class="stackCol">
                  <select v-model="selectedCollege" class="control selectControl">
                    <option value="">All Colleges</option>
                    <option
                      v-for="college in uniqueColleges"
                      :key="college"
                      :value="college"
                    >
                      {{ college }}
                    </option>
                  </select>

                  <button @click="clearFilters" class="control actionBtn clearButton">
                    Reset
                  </button>
                </div>

                <select v-model="selectedYearLevel" class="control selectControl narrow">
                  <option value="">All Year</option>
                  <option
                    v-for="year in uniqueYearLevels"
                    :key="year"
                    :value="year"
                  >
                    {{ year }}
                  </option>
                </select>

                <select
                  v-model="selectedAttendanceType"
                  class="control selectControl medium"
                >
                  <option value="">All Types</option>
                  <option
                    v-for="type in uniqueAttendanceTypes"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
              </div>

              <div class="toolbarRight">
  <button @click="exportToCSV" class="exportBtn">
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
  <span>Export CSV</span>
</button>

  <input
    v-model="search"
    type="text"
    placeholder="Search ID number or student name..."
    class="control searchControl"
  />
</div>
            </div>


            <div v-if="errorMessage" class="errorBox">
              {{ errorMessage }}
            </div>

            <div class="tableShell">
              <div class="tableScroll">
                <table class="tbl">
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Student Name</th>
                      <th>Program</th>
                      <th>College</th>
                      <th>Year Level</th>
                      <th>Attendance Type</th>
                      <th>Time In</th>
                      <th>Time Out</th>
                      <th>Duration</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="loading">
                      <td colspan="9" class="empty">
                        Loading attendance logs...
                      </td>
                    </tr>

                    <tr v-else-if="filteredLogs.length === 0">
                      <td colspan="9" class="empty">
                        No attendance records found.
                        <div class="emptyHint">
                          Try changing your search or filter selection.
                        </div>
                      </td>
                    </tr>

                    <tr
                      v-for="log in paginatedLogs"
                      :key="log.id"
                    >
                      <td data-label="ID Number" class="strong">
                        {{ normalizeStudent(log.students).id_number || "--" }}
                      </td>
                      <td data-label="Student Name" class="strong">
                        {{
                          `${normalizeStudent(log.students).first_name || ""} ${normalizeStudent(log.students).last_name || ""}`.trim() || "--"
                        }}
                      </td>
                      <td data-label="Program">
                        {{ normalizeStudent(log.students).program || "--" }}
                      </td>
                      <td data-label="College">
                        {{ normalizeStudent(log.students).college || "--" }}
                      </td>
                      <td data-label="Year Level">
                        {{ normalizeStudent(log.students).year_level || "--" }}
                      </td>
                      <td data-label="Attendance Type">
                        {{ log.attendance_type || "--" }}
                      </td>
                      <td data-label="Time In">
                        {{ formatDateTime(log.time_in) }}
                      </td>
                      <td data-label="Time Out">
                        {{ formatDateTime(log.time_out) }}
                      </td>
                      <td data-label="Duration" class="muted">
                        {{ log.duration_minutes ? `${log.duration_minutes} mins` : "--" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="foot">
  <div class="footText">
    Tip: Use the filters and search to narrow down records faster.
  </div>

  <div class="pager" v-if="filteredLogs.length > itemsPerPage">

    <button
      v-if="currentPage < totalPages"
      class="pagerBtn"
      @click="goToNextPage"
    >
      Next
    </button>
  </div>
</div>
            </div>

            <div class="summaryBar">
  <span class="summaryText">
    Showing
    <span class="summaryStrong">
      {{ filteredLogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}
    </span>
    -
    <span class="summaryStrong">
      {{ Math.min(currentPage * itemsPerPage, filteredLogs.length) }}
    </span>
    of <span class="summaryStrong">{{ filteredLogs.length }}</span> records
  </span>
</div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  --primary: #0d2b0f;
  --primary-2: #165b1b;

  --bg: #f7f2e8;
  --bg-strip: #efe7d9;
  --card: rgba(255, 255, 255, 0.92);

  --border: rgba(13, 43, 15, 0.09);
  --shadow: rgba(13, 43, 15, 0.07);

  --danger: #d32f2f;
  --info: #0288d1;

  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(10px, 2vw, 8px);
  background: linear-gradient(180deg, var(--bg) 0%, #ffffff 100%);
}

.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
}

.card {
  min-height: calc(100vh - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: 0 14px 40px var(--shadow);
  overflow: hidden;
}

.headBlock {
  padding: 20px clamp(14px, 2vw, 24px) 16px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #ffffff 0%, var(--bg-strip) 100%);
}

.crumbs {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.42);
  margin-bottom: 16px;
}

.crumbs span {
  margin: 0 10px;
  color: rgba(13, 43, 15, 0.28);
}

.titleHero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.heroTitle {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  line-height: 0.95;
  font-size: clamp(3rem, 3vw, 1.7rem);
  font-weight: 900;
  letter-spacing: -0.05em;
}

.heroTitlePrimary {
  color: #003b0f;
}

.heroTitleAccent {
  color: #efb72d;
}

.heroUnderline {
  margin-top: 14px;
  width: 150px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #214b1f 0%, #c49317 100%);
}

.titleWrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pageTitle {
  margin: 0;
  font-size: clamp(22px, 2.3vw, 32px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: rgba(13, 43, 15, 0.94);
}

.pageSub {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.58);
}

.toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 16px clamp(14px, 2vw, 24px) 10px;
  flex-wrap: wrap;
}

.toolbarLeft {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.toolbarRight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-left: auto;
  width: 340px;
  max-width: 100%;
}

.exportBtn {
  width: 170px;
  height: 48px;
  padding: 0 18px;
  border: 0;
  border-radius: 18px;
  background: #0a3a10;
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 160ms ease;
  box-shadow: 0 8px 18px rgba(10, 58, 16, 0.18);
}

.exportBtn:hover {
  background: #0d4715;
  transform: translateY(-1px);
}

.exportBtn:active {
  transform: translateY(0);
}

.exportBtn:hover {
  transform: translateY(-1px);
  background: linear-gradient(180deg, #165b1b 0%, #1d6a22 100%);
}

.stackCol {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control {
  height: 52px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: rgba(13, 43, 15, 0.85);
  box-shadow: 0 8px 18px rgba(13, 43, 15, 0.04);
  box-sizing: border-box;
}

.selectControl,
.inputControl,
.searchControl,
.actionBtn {
  font-size: 15px;
  font-weight: 800;
}

.searchControl {
  width: 100%;
  min-width: 0;
  padding: 0 16px;
  outline: none;
}

.selectControl.narrow {
  min-width: 138px;
}

.selectControl.medium {
  min-width: 158px;
}

.inputControl {
  min-width: 176px;
  padding: 0 16px;
  outline: none;
}

.dateControl {
  appearance: auto;
}

.searchControl {
  width: min(390px, 100%);
  min-width: 280px;
  padding: 0 16px;
  outline: none;
}

.searchControl::placeholder,
.inputControl::placeholder {
  color: rgba(13, 43, 15, 0.35);
  font-weight: 800;
}

.actionBtn {
  min-width: 176px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 160ms ease;
}

.clearButton {
  background: linear-gradient(180deg, #f9fbf8 0%, var(--bg-strip) 100%);
  color: rgba(13, 43, 15, 0.8);
}

.clearButton:hover {
  background: linear-gradient(180deg, #ffffff 0%, #e8ddcb 100%);
}

.summaryBar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px clamp(14px, 2vw, 24px) 10px;
}

.summaryText {
  font-size: 13px;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.58);
}

.summaryStrong {
  font-weight: 900;
  color: rgba(13, 43, 15, 0.92);
}

.errorBox {
  margin: 0 clamp(14px, 2vw, 24px) 10px;
  border-radius: 16px;
  border: 1px solid rgba(211, 47, 47, 0.16);
  background: rgba(211, 47, 47, 0.08);
  padding: 12px 14px;
  color: #b71c1c;
  font-weight: 800;
}

.tableShell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: clamp(10px, 1.6vw, 10px);
}

.tableScroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  border-radius: 18px;
  border: 1px solid var(--border);
  background:
    radial-gradient(900px circle at 18% 18%, rgba(34, 197, 94, 0.14), transparent 60%),
    radial-gradient(700px circle at 85% 35%, rgba(16, 185, 129, 0.10), transparent 62%),
    linear-gradient(180deg, #f4fbf6 0%, #eef8f1 55%, #ffffff 100%);
  scrollbar-width: none;
}

.tableScroll::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.tbl {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.tbl tbody tr {
  background: #ffffff;
}

.tbl thead tr {
  background: var(--primary);
}

.tbl th {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  white-space: nowrap;
}

.tbl td {
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: rgba(13, 43, 15, 0.85);
  vertical-align: middle;
  white-space: nowrap;
}

.tbl tbody tr:hover {
  background: rgba(239, 231, 217, 0.55);
}

.muted {
  color: rgba(13, 43, 15, 0.65);
}

.strong {
  font-weight: 900;
  color: rgba(13, 43, 15, 0.92);
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.02em;
}

.pill-info {
  background: rgba(2, 136, 209, 0.1);
  border-color: rgba(2, 136, 209, 0.22);
  color: #026caa;
}

.pill-danger {
  background: rgba(211, 47, 47, 0.1);
  border-color: rgba(211, 47, 47, 0.22);
  color: #b71c1c;
}

.empty {
  text-align: center;
  padding: 28px 16px;
  color: rgba(13, 43, 15, 0.55);
  font-weight: 800;
}

.emptyHint {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.45);
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 6px 2px;
}

.footText {
  font-size: 12px;
  color: rgba(13, 43, 15, 0.55);
  padding-left: 6px;
}

@media (max-width: 1100px) {
  .toolbar {
    align-items: stretch;
  }

  .toolbarRight {
    width: 100%;
    margin-left: 0;
    justify-content: stretch;
  }

  .searchControl {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .toolbarLeft {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }

  .stackCol {
    width: 100%;
  }

  .selectControl,
  .inputControl,
  .actionBtn,
  .searchControl {
    width: 100%;
    min-width: 0;
  }

  .summaryBar {
    justify-content: flex-start;
  }

  .tbl thead {
    display: none;
  }

  .tbl,
  .tbl tbody,
  .tbl tr,
  .tbl td {
    display: block;
    width: 100%;
    white-space: normal;
  }

  .tbl tr {
    border-top: 1px solid var(--border);
    padding: 10px 10px 6px;
  }

  .tbl td {
    border: 0;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .tbl td::before {
    content: attr(data-label);
    font-weight: 900;
    color: rgba(13, 43, 15, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 10px;
    line-height: 1.2;
  }
}

.layoutShell {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg) 0%, #ffffff 100%);
}

.sidebarWrap {
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  z-index: 30;
}

.mainArea {
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>